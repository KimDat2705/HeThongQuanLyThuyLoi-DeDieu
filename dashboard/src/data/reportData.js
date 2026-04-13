/* ============================================
   DỮ LIỆU MẪU — Báo cáo nhanh PCTT
   Nguồn: "Báo cáo nhanh 06h ngày 06.10.2025.doc"
   Bám sát 100% nội dung bản báo cáo gốc (6 mục)
   ============================================ */

export const reportMeta = {
  coQuanCap: 'UBND TỈNH BẮC NINH',
  coQuan: 'SỞ NÔNG NGHIỆP VÀ MÔI TRƯỜNG',
  soHieu: '/BC-SNNMT',
  ngay: '06/10/2025',
  tieuDe: 'BÁO CÁO NHANH',
  phuDe: 'Tình hình thiên tai và công tác ứng phó với bão số 11 trên địa bàn tỉnh',
  thoiDiemBaoCao: '16h00 ngày 05/10/2025 đến 06h00 ngày 06/10/2025',
  nguoiKy: 'Đặng Công Hưởng',
  chucVu: 'PHÓ GIÁM ĐỐC',
};

// ============ MỤC I: DIỄN BIẾN BÃO SỐ 11 ============
export const stormData = {
  viTri: 'Hồi 04 giờ, vị trí tâm bão ở vào khoảng 22,0 độ vĩ Bắc; 107,6 độ kinh Đông, trên khu vực phía nam tỉnh Quảng Tây (Trung Quốc). Sức gió mạnh nhất vùng gần tâm bão mạnh cấp 8 (62-74km/h), giật cấp 10. Di chuyển theo hướng Tây Tây Bắc, tốc độ khoảng 20 km/h.',
  anhHuong: 'Do ảnh hưởng của bão tại tỉnh Bắc Ninh sáng sớm nay các nơi bắt đầu có mưa nhỏ; tại trạm khí hậu Lục Ngạn quan trắc được gió cấp 4 (5m/s), giật cấp 5 (9m/s); tại Sơn Động đã quan trắc được gió mạnh cấp 3 (4m/s), giật cấp 4 (6m/s).',
  capBao: 8,
  giatCap: 10,
  huong: 'Tây Tây Bắc',
  tocDo: 20,
};

// ============ MỤC II: TÌNH HÌNH MỰC NƯỚC, LƯỢNG MƯA ============

// II.1: Lượng mưa
export const rainfallData = {
  tongQuat: 'Từ 16h00 ngày 05/10 đến 06h00 ngày 06/10/2025 trung bình toàn tỉnh là 7,40 mm (cao nhất: 66,0 mm tại trạm TV-Cẩm Đàn, thấp nhất: 0,0 mm tại trạm KT-Bắc Ninh, TV-Phúc Lộc Phương, TV-Đáp Cầu, TV-Bến Hồ).',
  trungBinh: 7.40,
  caoNhat: { tram: 'TV-Cẩm Đàn', value: 66.0 },
  thapNhat: { value: 0.0, trams: ['KT-Bắc Ninh', 'TV-Phúc Lộc Phương', 'TV-Đáp Cầu', 'TV-Bến Hồ'] },
};

// II.2.1: Mực nước sông
export const waterLevelData = {
  moTa: 'Hồi 06h00 ngày 06/10/2025 mực nước các sông như sau:',
  duBao: 'Trong 24h tới mực nước các triền sông trong tỉnh có khả năng sẽ lên lại do ảnh hưởng mưa của hoàn lưu bão số 11, khả năng đạt từ báo động 2 đến báo động 3.',
  rivers: [
    {
      name: 'Sông Cầu',
      tt: 1,
      stations: [
        {
          name: 'Phúc Lộc Phương',
          levels: { BD1: 6.00, BD2: 7.00, BD3: 8.00 },
          readings: [
            { time: '16h ngày 05/10', value: 5.63, compare: '<BĐ1: 0,37' },
            { time: '06h ngày 06/10', value: 5.14, compare: '<BĐ1: 0,86' },
          ],
          delta: -0.49,
        },
        {
          name: 'Đáp Cầu',
          levels: { BD1: 4.30, BD2: 5.30, BD3: 6.30 },
          readings: [
            { time: '16h ngày 05/10', value: 4.67, compare: '>BĐ1: 0,37' },
            { time: '06h ngày 06/10', value: 4.37, compare: '>BĐ1: 0,07' },
          ],
          delta: -0.30,
        },
      ],
    },
    {
      name: 'Sông Thương',
      tt: 2,
      stations: [
        {
          name: 'Cầu Sơn',
          levels: { BD1: 14.0, BD2: 15.0, BD3: 16.0 },
          readings: [
            { time: '16h ngày 05/10', value: 14.05, compare: '>BĐ1: 0,05' },
            { time: '06h ngày 06/10', value: 13.98, compare: '<BĐ1: 0,02' },
          ],
          delta: -0.07,
        },
        {
          name: 'Phủ Lạng Thương',
          levels: { BD1: 4.30, BD2: 5.30, BD3: 6.30 },
          readings: [
            { time: '16h ngày 05/10', value: 4.22, compare: '<BĐ1: 0,08' },
            { time: '06h ngày 06/10', value: 4.00, compare: '<BĐ1: 0,30' },
          ],
          delta: -0.22,
        },
      ],
    },
  ],
};

// II.2.2: Hồ chứa
export const reservoirData = {
  moTa: 'Tổng dung tích các hồ chứa trên địa bàn tỉnh đang ở mức từ 80-98% dung tích thiết kế.',
  minPercent: 80,
  maxPercent: 98,
};

// II.2.3: Máy bơm tiêu
export const pumpData = {
  total: 112,
  areas: [
    { name: 'Bắc Đuống',       value: 57, color: '#2E7D32' },
    { name: 'Nam Đuống',        value: 14, color: '#1565C0' },
    { name: 'Nam Sông Thương',  value: 41, color: '#F9A825' },
  ],
};

// ============ MỤC III: CÔNG TÁC CHỈ ĐẠO ỨNG PHÓ ============
export const responseActions = [
  {
    date: '04/10/2025',
    text: 'UBND tỉnh có Công văn 3216/UBND-KTN về việc triển khai các biện pháp ứng phó với cơn bão số 11 (Matmo) năm 2025 trên địa bàn tỉnh;',
  },
  {
    date: '03/10/2025',
    text: 'Sở Nông nghiệp và Môi trường có các Văn bản: số 3113/SNN-CCTL về đảm bảo an toàn hạ du khi hồ thủy điện Hòa Bình xả lũ; số 3114/SNN-CCTL về triển khai các biện pháp ứng phó với cơn bão số 11 trên địa bàn tỉnh;',
  },
  {
    date: '05/10/2025',
    text: 'Sở Nông nghiệp và Môi trường có các Văn bản: số 3121/SNN-CCTL Về việc chỉ đạo kiểm tra, rà soát, chấn chỉnh công tác tuần tra, canh gác bảo vệ đê điều trong mùa lũ; số 3122/SNN-CCTL về việc chủ động ứng phó lũ quét, sạt lở đất do ảnh hưởng cơn bão số 11;',
  },
  {
    date: null,
    text: 'BCH PTDS tỉnh rút lệnh báo động I: trên sông Thương tại trạm Thủy văn Phủ Lạng Thương và trên sông Cầu tại trạm Thủy văn Phúc Lộc Phương;',
  },
  {
    date: null,
    text: 'Sở Nông nghiệp và Môi trường tỉnh ban hành các báo cáo nhanh cập nhật tình hình thiên tai trên địa bàn tỉnh. Tiếp tục thành lập các đoàn kiểm tra các công trình đê điều, hồ đập, trạm bơm và các khu vực sự cố trên địa bàn các xã, phường,... để chỉ đạo, hướng dẫn công tác ứng phó với thiên tai bão số 11.',
  },
  {
    date: null,
    text: 'Các địa phương trên địa bàn tỉnh tuyến sông Cầu, sông Thương tiếp tục thực hiện chế độ tuần tra canh gác đê theo quy định.',
  },
];

// ============ MỤC IV: TÌNH HÌNH CÔNG TRÌNH ĐÊ ĐIỀU, THỦY LỢI ============
export const infrastructureData = {
  deDieu: {
    moTa: 'Công trình đê điều: các sự cố sạt lở mái đê phía đồng tại vị trí K37+600 đê hữu Cầu, xã Yên Trung; sự cố mạch sủi tại K7+200 đê tả Cầu, xã Hợp Thịnh và lỗ sủi tại K57+450 hữu Cầu, phường Kinh Bắc (các sự cố hiện ổn định). Đề nghị UBND xã Yên Trung, xã Hợp Thịnh, phường Kinh Bắc và các Hạt quản lý đê số 1, Hạt quản lý đê Hiệp Hòa tiếp tục theo dõi và thường xuyên báo cáo diễn biến sự cố về Sở Nông nghiệp và Môi trường (qua Chi cục Thủy lợi).',
    suCo: [
      { viTri: 'K37+600', tuyen: 'Đê hữu Cầu', diaDiem: 'Xã Yên Trung', loai: 'Sạt lở mái đê phía đồng' },
      { viTri: 'K7+200', tuyen: 'Đê tả Cầu', diaDiem: 'Xã Hợp Thịnh', loai: 'Mạch sủi' },
      { viTri: 'K57+450', tuyen: 'Hữu Cầu', diaDiem: 'Phường Kinh Bắc', loai: 'Lỗ sủi' },
    ],
  },
  thuyLoi: {
    moTa: 'Sự cố sạt trượt tại 04 vị trí bờ hữu sông Ngũ Huyện Khê đoạn qua địa bàn xã Tiên Du:',
    satTruot: [
      { viTri: 'K20+745 - K20+756', dai: '11 m', anSau: '1,0 m', trangThai: 'Đang xử lý' },
      { viTri: 'K20+766 - K20+786', dai: '20 m', anSau: '1,1 m', trangThai: 'Đang xử lý' },
      { viTri: 'K22+210 - K22+235', dai: '25 m', anSau: '1,1 m', trangThai: 'Đã xử lý xong' },
      { viTri: 'K22+410 - K20+425', dai: '15 m', anSau: '2,0 m', trangThai: 'Đã xử lý xong' },
    ],
  },
};

// ============ MỤC V: TÌNH HÌNH THIỆT HẠI ============
export const damageData = {
  phatSinh: 'Từ 16h ngày 05/10/2025 đến 06h ngày 06/10/2025: Không phát sinh thêm thiệt hại.',
  tinhHinh: 'Hiện nay các khu vực dân cư ngoài bãi sông thuộc các xã Hợp Thịnh, Xuân Cẩm, Tam Giang, Nếnh và phường Vân Hà hết bị ngập nước. Các hộ dân đang tiếp tục dọn dẹp vệ sinh nơi ở.',
  cacXaHeNgap: ['Hợp Thịnh', 'Xuân Cẩm', 'Tam Giang', 'Nếnh', 'Phường Vân Hà'],
};

// ============ MỤC VI: ĐỀ NGHỊ ============
export const proposalData = {
  noiDung: 'Đề nghị các địa phương, Sở, Ban ngành theo chức năng, nhiệm vụ thường xuyên cập nhật, nắm bắt diễn biến thời tiết và triển khai các biện pháp ứng phó với mưa, lũ, các Công ty TNHH một thành viên KTCTTL trực ban nghiêm túc, chủ động phối hợp với địa phương bơm tiêu úng. Thường xuyên cập nhật thông tin, báo cáo kịp thời về Ban chỉ huy phòng thủ dân sự (cơ quan thường trực Bộ chỉ huy quân sự tỉnh) và Sở Nông nghiệp và Môi trường (qua Chi cục Thủy lợi)./.',
};

// ============ CHAT DATA (SAMPLE) ============
export const chatMessages = [
  {
    role: 'user',
    text: 'Cho tôi xem báo cáo nhanh tình hình thiên tai và công tác ứng phó với bão số 11 trên địa bàn tỉnh Bắc Ninh.',
    time: '09:15',
  },
  {
    role: 'ai',
    text: 'Dạ thưa đồng chí, tôi đã tìm thấy **Báo cáo nhanh /BC-SNNMT** (tính đến 06h00 ngày 06/10/2025) của Sở Nông nghiệp và Môi trường.\n\nBáo cáo ghi nhận bão số 11 **cấp 8, giật cấp 10**, đang di chuyển theo hướng Tây Tây Bắc. Lượng mưa TB toàn tỉnh **7,40 mm**, cao nhất tại Cẩm Đàn **66,0 mm**. Trạm Đáp Cầu ghi nhận mực nước **4,37m (vượt BĐ1)**. Hiện có **112 máy bơm tiêu** đang hoạt động. **03 sự cố** đê điều đang theo dõi, **04 điểm sạt trượt** bờ sông Ngũ Huyện Khê.\n\nBáo cáo đã được hiển thị bên cạnh để đồng chí xem chi tiết.',
    time: '09:15',
    actions: ['📄 Xem toàn bộ', '📊 Trích xuất số liệu', '📥 Tải PDF'],
  },
];

export const chatSuggestions = [
  { icon: 'compare', text: 'So sánh mực nước với đợt bão số 3?' },
  { icon: 'damage', text: 'Tổng thiệt hại ước tính của đợt mưa lũ này?' },
  { icon: 'forecast', text: 'Dự báo mực nước sông Cầu 24h tới?' },
];
