/* ============================================
   KHO LƯU TRỮ BÁO CÁO PCTT — Tỉnh Bắc Ninh
   Chứa nhiều báo cáo từ nhiều nguồn & thời điểm
   ============================================ */

export const reportArchive = [
  // ═══════════ BÁO CÁO 1: Bão số 11 (06/10/2025) ═══════════
  {
    id: 'bc-bao11-061025',
    meta: {
      coQuanCap: 'UBND TỈNH BẮC NINH',
      coQuan: 'SỞ NÔNG NGHIỆP VÀ MÔI TRƯỜNG',
      soHieu: '/BC-SNNMT',
      ngay: '06/10/2025',
      tieuDe: 'BÁO CÁO NHANH',
      phuDe: 'Tình hình thiên tai và công tác ứng phó với bão số 11 trên địa bàn tỉnh',
      thoiDiemBaoCao: '16h00 ngày 05/10/2025 đến 06h00 ngày 06/10/2025',
      nguoiKy: 'Đặng Công Hưởng',
      chucVu: 'PHÓ GIÁM ĐỐC',
      loaiBaoCao: 'Báo cáo nhanh',
      capHanhChinh: 'Tỉnh',
      trangThai: 'Đã duyệt',
      mucDoUuTien: 'Khẩn cấp',
      tags: ['Bão', 'Ngập lụt', 'Đê điều'],
    },
    storm: {
      ten: 'Bão số 11 (Matmo)',
      viTri: 'Hồi 04 giờ, vị trí tâm bão ở vào khoảng 22,0 độ vĩ Bắc; 107,6 độ kinh Đông, trên khu vực phía nam tỉnh Quảng Tây (Trung Quốc). Sức gió mạnh nhất vùng gần tâm bão mạnh cấp 8 (62-74km/h), giật cấp 10. Di chuyển theo hướng Tây Tây Bắc, tốc độ khoảng 20 km/h.',
      anhHuong: 'Do ảnh hưởng của bão tại tỉnh Bắc Ninh sáng sớm nay các nơi bắt đầu có mưa nhỏ; tại trạm khí hậu Lục Ngạn quan trắc được gió cấp 4 (5m/s), giật cấp 5 (9m/s); tại Sơn Động đã quan trắc được gió mạnh cấp 3 (4m/s), giật cấp 4 (6m/s).',
      capBao: 8,
      giatCap: 10,
      huong: 'Tây Tây Bắc',
      tocDo: 20,
    },
    rainfall: {
      tongQuat: 'Từ 16h00 ngày 05/10 đến 06h00 ngày 06/10/2025 trung bình toàn tỉnh là 7,40 mm (cao nhất: 66,0 mm tại trạm TV-Cẩm Đàn, thấp nhất: 0,0 mm tại trạm KT-Bắc Ninh, TV-Phúc Lộc Phương, TV-Đáp Cầu, TV-Bến Hồ).',
      trungBinh: 7.40,
      caoNhat: { tram: 'TV-Cẩm Đàn', value: 66.0 },
      thapNhat: { value: 0.0, trams: ['KT-Bắc Ninh', 'TV-Phúc Lộc Phương', 'TV-Đáp Cầu', 'TV-Bến Hồ'] },
    },
    waterLevel: {
      moTa: 'Hồi 06h00 ngày 06/10/2025 mực nước các sông như sau:',
      duBao: 'Trong 24h tới mực nước các triền sông trong tỉnh có khả năng sẽ lên lại do ảnh hưởng mưa của hoàn lưu bão số 11, khả năng đạt từ báo động 2 đến báo động 3.',
      rivers: [
        {
          name: 'Sông Cầu', tt: 1,
          stations: [
            { name: 'Phúc Lộc Phương', levels: { BD1: 6.00, BD2: 7.00, BD3: 8.00 },
              readings: [
                { time: '16h ngày 05/10', value: 5.63, compare: '<BĐ1: 0,37' },
                { time: '06h ngày 06/10', value: 5.14, compare: '<BĐ1: 0,86' },
              ], delta: -0.49 },
            { name: 'Đáp Cầu', levels: { BD1: 4.30, BD2: 5.30, BD3: 6.30 },
              readings: [
                { time: '16h ngày 05/10', value: 4.67, compare: '>BĐ1: 0,37' },
                { time: '06h ngày 06/10', value: 4.37, compare: '>BĐ1: 0,07' },
              ], delta: -0.30 },
          ],
        },
        {
          name: 'Sông Thương', tt: 2,
          stations: [
            { name: 'Cầu Sơn', levels: { BD1: 14.0, BD2: 15.0, BD3: 16.0 },
              readings: [
                { time: '16h ngày 05/10', value: 14.05, compare: '>BĐ1: 0,05' },
                { time: '06h ngày 06/10', value: 13.98, compare: '<BĐ1: 0,02' },
              ], delta: -0.07 },
            { name: 'Phủ Lạng Thương', levels: { BD1: 4.30, BD2: 5.30, BD3: 6.30 },
              readings: [
                { time: '16h ngày 05/10', value: 4.22, compare: '<BĐ1: 0,08' },
                { time: '06h ngày 06/10', value: 4.00, compare: '<BĐ1: 0,30' },
              ], delta: -0.22 },
          ],
        },
      ],
    },
    reservoir: { moTa: 'Tổng dung tích các hồ chứa trên địa bàn tỉnh đang ở mức từ 80-98% dung tích thiết kế.', minPercent: 80, maxPercent: 98 },
    pump: {
      total: 112,
      areas: [
        { name: 'Bắc Đuống', value: 57, color: '#2E7D32' },
        { name: 'Nam Đuống', value: 14, color: '#1565C0' },
        { name: 'Nam Sông Thương', value: 41, color: '#F9A825' },
      ],
    },
    infrastructure: {
      deDieu: {
        moTa: 'Các sự cố sạt lở mái đê phía đồng tại vị trí K37+600 đê hữu Cầu, xã Yên Trung; sự cố mạch sủi tại K7+200 đê tả Cầu, xã Hợp Thịnh và lỗ sủi tại K57+450 hữu Cầu, phường Kinh Bắc.',
        suCo: [
          { viTri: 'K37+600', tuyen: 'Đê hữu Cầu', diaDiem: 'Xã Yên Trung', loai: 'Sạt lở mái đê phía đồng' },
          { viTri: 'K7+200', tuyen: 'Đê tả Cầu', diaDiem: 'Xã Hợp Thịnh', loai: 'Mạch sủi' },
          { viTri: 'K57+450', tuyen: 'Hữu Cầu', diaDiem: 'Phường Kinh Bắc', loai: 'Lỗ sủi' },
        ],
      },
      thuyLoi: {
        moTa: 'Sự cố sạt trượt tại 04 vị trí bờ hữu sông Ngũ Khê đoạn qua địa bàn xã Tiên Du.',
        satTruot: [
          { viTri: 'K20+745 - K20+756', dai: '11 m', anSau: '1,0 m', trangThai: 'Đang xử lý' },
          { viTri: 'K20+766 - K20+786', dai: '20 m', anSau: '1,1 m', trangThai: 'Đang xử lý' },
          { viTri: 'K22+210 - K22+235', dai: '25 m', anSau: '1,1 m', trangThai: 'Đã xử lý xong' },
          { viTri: 'K22+410 - K20+425', dai: '15 m', anSau: '2,0 m', trangThai: 'Đã xử lý xong' },
        ],
      },
    },
    damage: {
      phatSinh: 'Từ 16h ngày 05/10/2025 đến 06h ngày 06/10/2025: Không phát sinh thêm thiệt hại.',
      tinhHinh: 'Hiện nay các khu vực dân cư ngoài bãi sông thuộc các xã Hợp Thịnh, Xuân Cẩm, Tam Giang, Nếnh và phường Vân Hà hết bị ngập nước.',
      cacXaHeNgap: ['Hợp Thịnh', 'Xuân Cẩm', 'Tam Giang', 'Nếnh', 'Phường Vân Hà'],
    },
  },

  // ═══════════ BÁO CÁO 2: Bão số 3 (Yagi) — 08/09/2025 ═══════════
  {
    id: 'bc-bao3-080925',
    meta: {
      coQuanCap: 'UBND TỈNH BẮC NINH',
      coQuan: 'SỞ NÔNG NGHIỆP VÀ MÔI TRƯỜNG',
      soHieu: '2847/BC-SNNMT',
      ngay: '08/09/2025',
      tieuDe: 'BÁO CÁO NHANH',
      phuDe: 'Tình hình thiên tai và công tác ứng phó với bão số 3 (Yagi) trên địa bàn tỉnh',
      thoiDiemBaoCao: '06h00 ngày 07/09/2025 đến 06h00 ngày 08/09/2025',
      nguoiKy: 'Nguyễn Văn Đại',
      chucVu: 'GIÁM ĐỐC',
      loaiBaoCao: 'Báo cáo nhanh',
      capHanhChinh: 'Tỉnh',
      trangThai: 'Đã duyệt',
      mucDoUuTien: 'Khẩn cấp',
      tags: ['Siêu bão', 'Ngập lụt', 'Thiệt hại lớn'],
    },
    storm: {
      ten: 'Bão số 3 (Yagi)',
      viTri: 'Hồi 10 giờ, tâm bão ở vào khoảng 21,3 độ vĩ Bắc; 107,0 độ kinh Đông, trên khu vực Quảng Ninh. Sức gió mạnh nhất vùng gần tâm bão mạnh cấp 14 (150-166km/h), giật cấp 17. Di chuyển theo hướng Tây Tây Bắc, tốc độ 15 km/h.',
      anhHuong: 'Bão số 3 đổ bộ trực tiếp vào khu vực Bắc Bộ với cường độ siêu bão, gây mưa lớn diện rộng trên toàn tỉnh. Gió giật mạnh nhất đo được tại trạm KT-Bắc Ninh cấp 10 (89km/h). Nhiều cây xanh gãy đổ, tốc mái nhà dân.',
      capBao: 14,
      giatCap: 17,
      huong: 'Tây Tây Bắc',
      tocDo: 15,
    },
    rainfall: {
      tongQuat: 'Từ 06h00 ngày 07/09 đến 06h00 ngày 08/09/2025 trung bình toàn tỉnh là 187,5 mm (cao nhất: 312,0 mm tại trạm TV-Đáp Cầu, thấp nhất: 98,0 mm tại trạm TV-Bến Hồ).',
      trungBinh: 187.5,
      caoNhat: { tram: 'TV-Đáp Cầu', value: 312.0 },
      thapNhat: { value: 98.0, trams: ['TV-Bến Hồ'] },
    },
    waterLevel: {
      moTa: 'Hồi 06h00 ngày 08/09/2025 mực nước các sông đang ở mức rất cao:',
      duBao: 'Trong 24-48h tới mực nước các sông tiếp tục dâng cao do mưa lớn kéo dài, có khả năng vượt báo động 3 tại nhiều trạm.',
      rivers: [
        {
          name: 'Sông Cầu', tt: 1,
          stations: [
            { name: 'Phúc Lộc Phương', levels: { BD1: 6.00, BD2: 7.00, BD3: 8.00 },
              readings: [
                { time: '06h ngày 07/09', value: 6.85, compare: '>BĐ1: 0,85' },
                { time: '06h ngày 08/09', value: 7.92, compare: '>BĐ2: 0,92' },
              ], delta: 1.07 },
            { name: 'Đáp Cầu', levels: { BD1: 4.30, BD2: 5.30, BD3: 6.30 },
              readings: [
                { time: '06h ngày 07/09', value: 5.15, compare: '>BĐ1: 0,85' },
                { time: '06h ngày 08/09', value: 6.48, compare: '>BĐ3: 0,18' },
              ], delta: 1.33 },
          ],
        },
        {
          name: 'Sông Thương', tt: 2,
          stations: [
            { name: 'Phủ Lạng Thương', levels: { BD1: 4.30, BD2: 5.30, BD3: 6.30 },
              readings: [
                { time: '06h ngày 07/09', value: 4.90, compare: '>BĐ1: 0,60' },
                { time: '06h ngày 08/09', value: 5.87, compare: '>BĐ2: 0,57' },
              ], delta: 0.97 },
          ],
        },
      ],
    },
    reservoir: { moTa: 'Tổng dung tích các hồ chứa đang ở mức 95-100% dung tích thiết kế. Một số hồ đã phải xả tràn.', minPercent: 95, maxPercent: 100 },
    pump: {
      total: 112,
      areas: [
        { name: 'Bắc Đuống', value: 57, color: '#2E7D32' },
        { name: 'Nam Đuống', value: 14, color: '#1565C0' },
        { name: 'Nam Sông Thương', value: 41, color: '#F9A825' },
      ],
    },
    infrastructure: {
      deDieu: {
        moTa: 'Nhiều sự cố đê điều nghiêm trọng do mực nước sông dâng cao kết hợp gió giật mạnh.',
        suCo: [
          { viTri: 'K35+200', tuyen: 'Đê hữu Cầu', diaDiem: 'Xã Đông Phong', loai: 'Sạt lở mái đê phía sông' },
          { viTri: 'K12+350', tuyen: 'Đê tả Cầu', diaDiem: 'Xã Việt Thống', loai: 'Thẩm lậu mạnh' },
          { viTri: 'K42+100', tuyen: 'Đê hữu Cầu', diaDiem: 'TT Thắng', loai: 'Nứt dọc mặt đê' },
          { viTri: 'K8+500', tuyen: 'Đê tả Thương', diaDiem: 'Xã Tân Mỹ', loai: 'Sạt lở mái đê' },
          { viTri: 'K15+800', tuyen: 'Đê hữu Đuống', diaDiem: 'Xã Đại Đồng Thành', loai: 'Mạch đùn' },
        ],
      },
      thuyLoi: {
        moTa: 'Nhiều công trình thủy lợi bị hư hại do gió bão và ngập úng.',
        satTruot: [
          { viTri: 'Trạm bơm Đại Đồng', dai: '–', anSau: '–', trangThai: 'Tốc mái — Đang khắc phục' },
          { viTri: 'Kênh N3 Gia Bình', dai: '45 m', anSau: '1,5 m', trangThai: 'Sạt lở — Đang xử lý' },
        ],
      },
    },
    damage: {
      phatSinh: 'Thiệt hại rất lớn: 127 nhà dân bị tốc mái, 3 nhà sập hoàn toàn; 450 ha lúa bị ngập; 12 cột điện gãy đổ; 230 cây xanh gãy đổ.',
      tinhHinh: 'Nhiều khu vực dân cư ven sông bị ngập sâu 0,5-1,5m.  1.250 hộ dân đã được di dời đến nơi an toàn.',
      cacXaHeNgap: [],
      thietHaiUocTinh: '~85 tỷ đồng',
    },
  },

  // ═══════════ BÁO CÁO 3: Mưa lũ cuối tháng 7/2025 ═══════════
  {
    id: 'bc-mualu-250725',
    meta: {
      coQuanCap: 'UBND TỈNH BẮC NINH',
      coQuan: 'SỞ NÔNG NGHIỆP VÀ MÔI TRƯỜNG',
      soHieu: '2156/BC-SNNMT',
      ngay: '25/07/2025',
      tieuDe: 'BÁO CÁO TỔNG HỢP',
      phuDe: 'Tình hình mưa lũ và công tác ứng phó trên địa bàn tỉnh (đợt mưa từ 20-25/07/2025)',
      thoiDiemBaoCao: '06h00 ngày 20/07/2025 đến 18h00 ngày 25/07/2025',
      nguoiKy: 'Đặng Công Hưởng',
      chucVu: 'PHÓ GIÁM ĐỐC',
      loaiBaoCao: 'Báo cáo tổng hợp',
      capHanhChinh: 'Tỉnh',
      trangThai: 'Đã duyệt',
      mucDoUuTien: 'Cao',
      tags: ['Mưa lũ', 'Ngập úng'],
    },
    storm: null,
    rainfall: {
      tongQuat: 'Từ ngày 20/07 đến 25/07/2025, tổng lượng mưa trung bình toàn tỉnh là 245,8 mm. Cao nhất: 398,0 mm tại trạm TV-Cẩm Đàn. Thấp nhất: 156,0 mm tại trạm KT-Bắc Ninh.',
      trungBinh: 245.8,
      caoNhat: { tram: 'TV-Cẩm Đàn', value: 398.0 },
      thapNhat: { value: 156.0, trams: ['KT-Bắc Ninh'] },
    },
    waterLevel: {
      moTa: 'Mực nước các sông dâng nhanh do mưa lớn kéo dài nhiều ngày liên tiếp:',
      duBao: 'Mực nước sông Cầu và sông Thương có xu hướng giảm dần khi mưa đã ngớt.',
      rivers: [
        {
          name: 'Sông Cầu', tt: 1,
          stations: [
            { name: 'Đáp Cầu', levels: { BD1: 4.30, BD2: 5.30, BD3: 6.30 },
              readings: [
                { time: '06h ngày 23/07', value: 5.78, compare: '>BĐ2: 0,48' },
                { time: '18h ngày 25/07', value: 4.95, compare: '>BĐ1: 0,65' },
              ], delta: -0.83 },
          ],
        },
      ],
    },
    reservoir: { moTa: 'Các hồ chứa đang ở mức 85-95% dung tích thiết kế.', minPercent: 85, maxPercent: 95 },
    pump: {
      total: 98,
      areas: [
        { name: 'Bắc Đuống', value: 48, color: '#2E7D32' },
        { name: 'Nam Đuống', value: 12, color: '#1565C0' },
        { name: 'Nam Sông Thương', value: 38, color: '#F9A825' },
      ],
    },
    infrastructure: {
      deDieu: {
        moTa: 'Không phát sinh sự cố đê điều mới trong đợt mưa lũ này.',
        suCo: [],
      },
      thuyLoi: {
        moTa: 'Một số kênh mương bị bồi lấp do nước lũ.',
        satTruot: [],
      },
    },
    damage: {
      phatSinh: '85 ha lúa bị ngập, 12 ha hoa màu bị thiệt hại. 5 hộ dân bị ngập nhà.',
      tinhHinh: 'Tình hình đã ổn định, nước rút dần.',
      cacXaHeNgap: ['Hợp Thịnh', 'Xuân Cẩm'],
    },
  },

  // ═══════════ BÁO CÁO 4: Thiệt hại phường Gia Bình — Bão số 3 ═══════════
  {
    id: 'bc-giabinh-100925',
    meta: {
      coQuanCap: 'UBND PHƯỜNG GIA BÌNH',
      coQuan: 'BAN CHỈ HUY PCTT & TKCN',
      soHieu: '156/BC-BCHPCTT',
      ngay: '10/09/2025',
      tieuDe: 'BÁO CÁO THIỆT HẠI',
      phuDe: 'Tổng hợp thiệt hại do bão số 3 (Yagi) trên địa bàn phường Gia Bình',
      thoiDiemBaoCao: '07/09/2025 đến 10/09/2025',
      nguoiKy: 'Trần Minh Tuấn',
      chucVu: 'TRƯỞNG BAN',
      loaiBaoCao: 'Báo cáo thiệt hại',
      capHanhChinh: 'Phường',
      trangThai: 'Đã duyệt',
      mucDoUuTien: 'Cao',
      tags: ['Bão', 'Thiệt hại', 'Gia Bình'],
    },
    storm: {
      ten: 'Bão số 3 (Yagi)',
      viTri: 'Hoàn lưu bão số 3 gây mưa lớn kéo dài, gió giật mạnh trên địa bàn phường Gia Bình.',
      anhHuong: 'Gió giật cấp 8-9 gây đổ cây, tốc mái, ngập úng diện rộng trên địa bàn 8/14 xã, thị trấn.',
      capBao: 8,
      giatCap: 9,
      huong: 'Tây Bắc',
      tocDo: 15,
    },
    rainfall: {
      tongQuat: 'Lượng mưa đo được trên địa bàn phường Gia Bình từ 07-10/09/2025 là 285,4 mm.',
      trungBinh: 285.4,
      caoNhat: { tram: 'Xã Nhân Thắng', value: 310.0 },
      thapNhat: { value: 245.0, trams: ['TT Gia Bình'] },
    },
    waterLevel: {
      moTa: 'Mực nước sông Đuống đoạn qua khu vực dâng cao:',
      duBao: 'Dự kiến nước rút dần trong 2-3 ngày tới.',
      rivers: [
        {
          name: 'Sông Đuống', tt: 1,
          stations: [
            { name: 'Bến phà Gia Bình', levels: { BD1: 5.50, BD2: 6.50, BD3: 7.50 },
              readings: [
                { time: '06h ngày 09/09', value: 7.12, compare: '>BĐ2: 0,62' },
                { time: '06h ngày 10/09', value: 6.45, compare: '<BĐ2: 0,05' },
              ], delta: -0.67 },
          ],
        },
      ],
    },
    reservoir: null,
    pump: {
      total: 18,
      areas: [
        { name: 'Khu vực TT Gia Bình', value: 6, color: '#2E7D32' },
        { name: 'Khu vực ven sông', value: 8, color: '#1565C0' },
        { name: 'Khu vực nội đồng', value: 4, color: '#F9A825' },
      ],
    },
    infrastructure: {
      deDieu: {
        moTa: 'Đê sông Đuống đoạn qua khu vực bị thẩm lậu tại 2 vị trí.',
        suCo: [
          { viTri: 'K25+300', tuyen: 'Đê hữu Đuống', diaDiem: 'Xã Đại Lai', loai: 'Thẩm lậu' },
          { viTri: 'K28+100', tuyen: 'Đê hữu Đuống', diaDiem: 'Xã Nhân Thắng', loai: 'Sạt mái đê' },
        ],
      },
      thuyLoi: {
        moTa: 'Hệ thống kênh mương bị sạt lở tại 3 vị trí.',
        satTruot: [
          { viTri: 'Kênh chính N2', dai: '30 m', anSau: '0,8 m', trangThai: 'Đã xử lý xong' },
          { viTri: 'Kênh nhánh Đại Bái', dai: '15 m', anSau: '0,5 m', trangThai: 'Đã xử lý xong' },
        ],
      },
    },
    damage: {
      phatSinh: '42 nhà dân bị tốc mái (tôn, fibro); 180 ha lúa ngập úng (trong đó 45 ha mất trắng); 8 cột điện trung thế bị gãy; 85 cây xanh đổ gãy chắn đường giao thông.',
      tinhHinh: '320 hộ dân phải di dời khẩn cấp đến trường học và nhà văn hoá. Hiện nay các hộ đã quay lại nhà, đang được hỗ trợ dọn dẹp.',
      cacXaHeNgap: ['Nhân Thắng', 'Đại Lai', 'Đại Bái'],
      thietHaiUocTinh: '~23,5 tỷ đồng',
    },
  },

  // ═══════════ BÁO CÁO 5: Bão số 5 — 15/08/2025 ═══════════
  {
    id: 'bc-bao5-150825',
    meta: {
      coQuanCap: 'UBND TỈNH BẮC NINH',
      coQuan: 'SỞ NÔNG NGHIỆP VÀ MÔI TRƯỜNG',
      soHieu: '2534/BC-SNNMT',
      ngay: '15/08/2025',
      tieuDe: 'BÁO CÁO NHANH',
      phuDe: 'Tình hình thiên tai và công tác ứng phó với bão số 5 trên địa bàn tỉnh',
      thoiDiemBaoCao: '06h00 ngày 14/08/2025 đến 06h00 ngày 15/08/2025',
      nguoiKy: 'Đặng Công Hưởng',
      chucVu: 'PHÓ GIÁM ĐỐC',
      loaiBaoCao: 'Báo cáo nhanh',
      capHanhChinh: 'Tỉnh',
      trangThai: 'Đã duyệt',
      mucDoUuTien: 'Trung bình',
      tags: ['Bão', 'Ảnh hưởng nhẹ'],
    },
    storm: {
      ten: 'Bão số 5',
      viTri: 'Hồi 07 giờ, tâm bão ở vào khoảng 19,8 độ vĩ Bắc; 106,5 độ kinh Đông, trên khu vực Thanh Hóa. Sức gió mạnh nhất vùng gần tâm bão mạnh cấp 9 (75-88km/h), giật cấp 11.',
      anhHuong: 'Bão đổ bộ vào khu vực Thanh Hóa - Nghệ An, ảnh hưởng gián tiếp đến Bắc Ninh với mưa vừa đến mưa to.',
      capBao: 9,
      giatCap: 11,
      huong: 'Tây Bắc',
      tocDo: 18,
    },
    rainfall: {
      tongQuat: 'Từ 06h00 ngày 14/08 đến 06h00 ngày 15/08/2025 trung bình toàn tỉnh là 45,2 mm.',
      trungBinh: 45.2,
      caoNhat: { tram: 'TV-Cẩm Đàn', value: 78.0 },
      thapNhat: { value: 22.0, trams: ['TV-Bến Hồ'] },
    },
    waterLevel: {
      moTa: 'Mực nước các sông dao động ở mức bình thường, dưới mức báo động 1:',
      duBao: 'Không có nguy cơ ngập lụt trong 24h tới.',
      rivers: [
        {
          name: 'Sông Cầu', tt: 1,
          stations: [
            { name: 'Đáp Cầu', levels: { BD1: 4.30, BD2: 5.30, BD3: 6.30 },
              readings: [
                { time: '06h ngày 14/08', value: 3.45, compare: '<BĐ1: 0,85' },
                { time: '06h ngày 15/08', value: 3.82, compare: '<BĐ1: 0,48' },
              ], delta: 0.37 },
          ],
        },
      ],
    },
    reservoir: { moTa: 'Các hồ chứa ở mức an toàn, 70-82% dung tích thiết kế.', minPercent: 70, maxPercent: 82 },
    pump: {
      total: 45,
      areas: [
        { name: 'Bắc Đuống', value: 20, color: '#2E7D32' },
        { name: 'Nam Đuống', value: 10, color: '#1565C0' },
        { name: 'Nam Sông Thương', value: 15, color: '#F9A825' },
      ],
    },
    infrastructure: {
      deDieu: {
        moTa: 'Không phát sinh sự cố đê điều.',
        suCo: [],
      },
      thuyLoi: {
        moTa: 'Không phát sinh sự cố công trình thủy lợi.',
        satTruot: [],
      },
    },
    damage: {
      phatSinh: 'Không phát sinh thiệt hại đáng kể. Một số diện tích rau màu bị ảnh hưởng nhẹ.',
      tinhHinh: 'Tình hình ổn định, không cần di dời dân.',
      cacXaHeNgap: [],
    },
  },
];

/* ============================================
   HELPER: Tìm báo cáo theo ID
   ============================================ */
export function getReportById(id) {
  return reportArchive.find(r => r.id === id) || null;
}

/* ============================================
   HELPER: Lấy danh sách tóm tắt cho Archive Page
   ============================================ */
export function getArchiveSummary() {
  return reportArchive.map(r => ({
    id: r.id,
    tieuDe: r.meta.tieuDe,
    phuDe: r.meta.phuDe,
    ngay: r.meta.ngay,
    coQuan: r.meta.coQuan,
    loaiBaoCao: r.meta.loaiBaoCao,
    capHanhChinh: r.meta.capHanhChinh,
    trangThai: r.meta.trangThai,
    mucDoUuTien: r.meta.mucDoUuTien,
    tags: r.meta.tags,
    stormName: r.storm?.ten || null,
    rainfallAvg: r.rainfall?.trungBinh || 0,
  }));
}
