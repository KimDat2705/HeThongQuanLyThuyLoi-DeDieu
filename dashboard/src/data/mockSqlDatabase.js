/* ============================================
   MOCK SQL DATABASE
   Đóng vai trò như Data Warehouse dạng bảng để cung cấp số liệu tĩnh (tài sản, tiền bạc, quỹ)
   Tránh cho AI bị ảo giác khi thực hiện cộng trừ nhân chia thống kê.
   ============================================ */

export const mockSqlDatabase = {
  // Bảng Thiết bị Thủy lợi & Máy Bơm
  assets: [
    { trạm_bơm: 'Bắc Đuống', thiết_bị: 'Máy bơm chìm hỗn lưu 4000m3/h', số_lượng: 57, tình_trạng: 'Đang hoạt động tốt', thời_gian_bảo_trì_gần_nhất: '2025-08-15' },
    { trạm_bơm: 'Nam Đuống', thiết_bị: 'Máy bơm hướng trục đứng 8000m3/h', số_lượng: 14, tình_trạng: 'Cần bảo dưỡng', thời_gian_bảo_trì_gần_nhất: '2024-12-01' },
    { trạm_bơm: 'Nam Sông Thương', thiết_bị: 'Máy bơm ly tâm cánh đứng 3000m3/h', số_lượng: 41, tình_trạng: 'Đang hoạt động tốt', thời_gian_bảo_trì_gần_nhất: '2025-05-10' },
    { trạm_bơm: 'Trịnh Xá', thiết_bị: 'Máy phát điện Diesel dự phòng 500KVA', số_lượng: 3, tình_trạng: 'Tốt', thời_gian_bảo_trì_gần_nhất: '2025-09-01' }
  ],

  // Bảng Thông tin Ngân sách giải ngân và Thu chi (VNĐ)
  financials: [
    { danh_mục: 'Quỹ Cứu trợ phòng chống bão lụt', tổng_ngân_sách: 50000000000, đã_chi_tiêu: 15400000000, tồn_quỹ_hiện_tại: 34600000000 },
    { danh_mục: 'Sửa chữa và bảo dưỡng đê điều sông Cầu', tổng_ngân_sách: 15000000000, đã_chi_tiêu: 12000000000, tồn_quỹ_hiện_tại: 3000000000 },
    { danh_mục: 'Giải phóng mặt bằng dự án đập tràn Yên Phong', tổng_ngân_sách: 120000000000, đã_chi_tiêu: 100000000000, tồn_quỹ_hiện_tại: 20000000000 }
  ],

  // Bảng Nhân sự Thường trực
  personnel: [
    { chức_vụ: 'Tổ trưởng tổ tuần tra K37 hữu Cầu', quân_số: 1, sđt_liên_hệ: '0988.123.456' },
    { chức_vụ: 'Cán bộ trực ban đập Đáp Cầu', quân_số: 5, sđt_liên_hệ: '0222.888.999' },
    { chức_vụ: 'Kỹ sư cơ điện tại Trạm Bơm Bắc Đuống', quân_số: 15, sđt_liên_hệ: '0912.333.444' }
  ]
};

/**
 * Hàm lấy cấu trúc dữ liệu mô phỏng như một bảng SQL join vào string text
 */
export function buildSqlContext() {
  let contextStr = `\n\n--- HỆ THỐNG CƠ SỞ DỮ LIỆU SQL NỘI BỘ (Chứa bảng liệu Tĩnh về Tài sản & Ngân sách) ---\n`;
  
  // Tài sản
  contextStr += `* BẢNG TÀI SẢN & THIẾT BỊ (assets):\n`;
  mockSqlDatabase.assets.forEach(asset => {
    contextStr += `- Tại Trạm ${asset.trạm_bơm}: có ${asset.số_lượng} chiếc ${asset.thiết_bị}. Trạng thái: ${asset.tình_trạng}.\n`;
  });

  // Kinh phí
  contextStr += `\n* BẢNG NGÂN SÁCH ĐẦU TƯ & PCTT (financials) (Số liệu tính bằng VNĐ):\n`;
  mockSqlDatabase.financials.forEach(fin => {
    contextStr += `- Hạng mục [${fin.danh_mục}]: Cấp ${fin.tổng_ngân_sách.toLocaleString()} VNĐ, Đã chi ${fin.đã_chi_tiêu.toLocaleString()} VNĐ, Tồn quỹ ${fin.tồn_quỹ_hiện_tại.toLocaleString()} VNĐ.\n`;
  });

  // Nhân sự
  contextStr += `\n* BẢNG NHÂN SỰ ĐIỀU ĐỘNG (personnel):\n`;
  mockSqlDatabase.personnel.forEach(per => {
    contextStr += `- Nhóm: ${per.chức_vụ}. Quân số: ${per.quân_số} người. Hotline: ${per.sđt_liên_hệ}.\n`;
  });

  contextStr += `\nLƯU Ý DÀNH CHO AI TỔNG HỢP (SYNTHESIZER): Hãy xem cấu trúc trên như kết quả "SELECT * FROM DB INNER JOIN". Sử dụng công cụ trí tuệ toán học để tính tổng, trừ, phép tính phần trăm chính xác theo từng hàng khi user yêu cầu.\n`;

  return contextStr;
}
