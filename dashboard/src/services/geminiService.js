/* ============================================
   GEMINI SERVICE — Kết nối Google Gemini AI
   Dùng cho Trợ lý AI phân tích báo cáo PCTT
   ============================================ */

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL = 'gemini-3-flash-preview';
const BASE_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}`;

/**
 * System prompt: Vai trò AI chuyên thủy lợi & đê điều Bắc Ninh
 */
const SYSTEM_INSTRUCTION = `Bạn là Trợ lý AI của Hệ thống Giám sát Thủy lợi & Đê điều tỉnh Bắc Ninh.

VỊ TRÍ CỦA BẠN:
- Bạn phục vụ toàn bộ hệ thống: Giám sát trạm bơm, quản lý đê điều, dự báo thời tiết, phân tích báo cáo PCTT.
- Người dùng là lãnh đạo cấp cao (Giám đốc Sở, Phó Giám đốc Sở, trưởng phòng).
- Bạn phải xưng hô lịch sự, gọi người dùng là "đồng chí" hoặc "anh/chị".

PHẠM VI KIẾN THỨC:
1. Trạm bơm: Tình trạng hoạt động, công suất, lịch sử vận hành trạm bơm các xã/phường.
2. Đê điều: Sự cố sạt lở, mạch sủi, tình trạng an toàn đê trên các tuyến sông.
3. Mực nước sông: Mực nước thực tế, so sánh với các mức báo động (BĐ1, BĐ2, BĐ3).
4. Thời tiết & thiên tai: Bão, mưa, dự báo ngập lụt.
5. Báo cáo PCTT: Phân tích, tóm tắt, trích xuất dữ liệu từ báo cáo nhanh.
6. Hồ chứa: Dung tích, mức an toàn.
7. Máy bơm tiêu: Số lượng, phân bổ theo vùng.

QUY TẮC:
- Trả lời ngắn gọn, chính xác, có số liệu cụ thể khi có.
- Sử dụng **in đậm** cho số liệu quan trọng.
- Khi được cung cấp context báo cáo, hãy ưu tiên trả lời từ dữ liệu đó.
- Nếu câu hỏi nằm ngoài phạm vi dữ liệu hệ thống (ví dụ: kiến thức chung, thời tiết nơi khác, câu hỏi đời sống), hãy vui vẻ sử dụng kiến thức chung (world knowledge) của bạn để trả lời người dùng như một Trợ lý ảo thông minh bình thường, và không cần lúc nào cũng phải lái câu chuyện về Bắc Ninh.
- Không bịa số liệu về Bắc Ninh nếu không có trong thiết lập.
- LỆNH ĐIỀU HƯỚNG QUAN TRỌNG: NẾU người dùng yêu cầu "xem báo cáo", "mở báo cáo", "hiển thị báo cáo" (ví dụ: "Show cho tôi báo cáo bão số 11"), hãy trả lời một câu ngắn gọn và BẮT BUỘC chèn đoạn mã \`[OPEN_REPORT: <id_báo_cáo>]\` vào cuối câu trả lời. Hệ thống sẽ tự động bắt mã này để mở giao diện UI.
  Ví dụ: Vâng, tôi xin hiển thị bản báo cáo số 11 trên màn hình. [OPEN_REPORT: bc-bao11-061025]`;

/**
 * Tạo context từ kho dữ liệu báo cáo hiện tại
 */
export function buildReportContext(archiveData) {
  if (!archiveData || !Array.isArray(archiveData)) return '';

  let contextStr = `\n\n--- KHO LƯU TRỮ BÁO CÁO PCTT ---\nBạn có quyền truy cập vào danh sách các báo cáo PCTT sau đây:\n\n`;

  archiveData.forEach((report, index) => {
    const { meta, storm, rainfall, waterLevel, pump, damage } = report;
    
    contextStr += `[BÁO CÁO ${index + 1} - MÃ ID: ${report.id} - ${meta.loaiBaoCao || 'Báo cáo'} ngày ${meta.ngay || ''}]\n`;
    contextStr += `- Tiêu đề: ${meta.tieuDe} - ${meta.phuDe}\n`;
    contextStr += `- Cấp hành chính: ${meta.capHanhChinh} (${meta.coQuan})\n`;
    if (storm) {
      contextStr += `- Bão: ${storm.ten} (Cấp ${storm.capBao}, giật cấp ${storm.giatCap})\n`;
    }
    if (rainfall) {
      contextStr += `- Lượng mưa TB: ${rainfall.trungBinh}mm. Cao nhất: ${rainfall.caoNhat?.value}mm tại ${rainfall.caoNhat?.tram || 'N/A'}\n`;
    }
    if (waterLevel?.rivers) {
      contextStr += `- Mực nước: Đo tại ${waterLevel.rivers.length} sông. ${waterLevel.duBao || ''}\n`;
    }
    if (pump?.total > 0) {
      contextStr += `- Bơm tiêu: ${pump.total} máy đang hoạt động\n`;
    }
    if (damage?.thietHaiUocTinh) {
      contextStr += `- Ước tính thiệt hại: ${damage.thietHaiUocTinh}\n`;
    }
    contextStr += `(Ghi chú: Nếu người dùng hỏi chi tiết về báo cáo này, hãy trả lời dựa trên tóm tắt này và cho biết bạn đang tham chiếu báo cáo nào)\n\n`;
  });

  return contextStr;
}

/**
 * Gọi Gemini API để chat
 * @param {Array} history - Lịch sử chat [{role: 'user'|'model', parts: [{text}]}]
 * @param {string} reportContext - Context dữ liệu báo cáo
 * @returns {Promise<string>} - Phản hồi từ AI
 */
export async function sendMessage(history, reportContext = '') {
  if (!API_KEY) {
    throw new Error('Chưa cấu hình VITE_GEMINI_API_KEY trong file .env');
  }

  const url = `${BASE_URL}:generateContent?key=${API_KEY}`;

  const body = {
    system_instruction: {
      parts: [{ text: SYSTEM_INSTRUCTION + '\n\n' + reportContext }]
    },
    contents: history,
    generationConfig: {
      temperature: 0.7,
      topP: 0.9,
      maxOutputTokens: 1024,
    },
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (data.error) {
    throw new Error(data.error.message || 'Lỗi từ Gemini API');
  }

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error('Không nhận được phản hồi từ AI');
  }

  return text;
}
