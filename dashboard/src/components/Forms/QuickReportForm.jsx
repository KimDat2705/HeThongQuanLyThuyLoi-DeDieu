import React, { useState } from 'react';
import styles from './QuickReportForm.module.css';
import { FiWind, FiCloudRain, FiFileText, FiAlertCircle, FiMessageSquare, FiSave, FiUploadCloud, FiCheckCircle } from 'react-icons/fi';
import { submitQuickReport } from '../../services/reportService';
import { useNavigate } from 'react-router-dom';
import ReportDocument from '../ReportDocument/ReportDocument';
import { parseWaterLevel, parseReservoir, parsePump, parseDeDieu, parseThuyLoi, parseDaMageArea } from '../../utils/dataExtractor';

export default function QuickReportForm({ metaData = {} }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const [formData, setFormData] = useState({
    soHieu: '',
    coQuan: 'SỞ NÔNG NGHIỆP VÀ MÔI TRƯỜNG',
    coQuanCap: 'UBND TỈNH BẮC NINH',
    tieuDe: 'TÌNH HÌNH THIÊN TAI VÀ CÔNG TÁC ỨNG PHÓ VỚI BÃO',
    thoiDiem: '',
    ngayBanHanh: '',
    
    // Bão
    viTriTamBao: '',
    moTaAnhHuong: '',
    
    // Nước / Mưa
    muaTongQuat: '',
    mucNuocSong: '',
    duBaoNuoc: '',
    hoChua: '',
    mayBom: '',
    
    // Công trình
    congTrinhDeDieu: '',
    congTrinhThuyLoi: '',

    // Thiệt hại, Công tác chỉ đạo
    congTacUngPho: '',
    tinhHinhThietHai: '',
    kienNghi: '',
    nguoiKy: '',
    chucVu: 'KT. GIÁM ĐỐC\nPHÓ GIÁM ĐỐC'
  });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleMockUpload = () => {
    setIsExtracting(true);
    // Giả lập thời gian AI xử lý
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        soHieu: '125/BC-SNNMT',
        thoiDiem: 'Từ 16h00 ngày 05/10/2025 đến 06h00 ngày 06/10/2025',
        tieuDe: 'BÁO CÁO NHANH\nTình hình thiên tai và công tác ứng phó với bão số 11 trên địa bàn tỉnh',
        viTriTamBao: 'Hồi 04 giờ, vị trí tâm bão ở vào khoảng 22,0 độ vĩ Bắc; 107,6 độ kinh Đông, trên khu vực phía nam tỉnh Quảng Tây (Trung Quốc). Sức gió mạnh nhất vùng gần tâm bão cấp 8, giật cấp 10. Di chuyển theo hướng Tây Tây Bắc, tốc độ khoảng 20 km/h.',
        moTaAnhHuong: 'Do ảnh hưởng của bão tại tỉnh Bắc Ninh sáng sớm nay các nơi bắt đầu có mưa nhỏ; tại trạm khí hậu Lục Ngạn gió cấp 4, giật cấp 5.',
        muaTongQuat: 'Từ 16h00 ngày 05/10/2025 đến 06h00 ngày 06/10/2025: Trung bình toàn tỉnh là 7,40 mm (cao nhất: 66,0 mm tại trạm TV Cẩm Đàn, thấp nhất: 0,0 mm tại Bến Hồ).',
        mucNuocSong: 'Mực nước các sông lúc 06h00 ngày 06/10/2025:\nSông Cầu: Trạm Phúc Lộc Phương 5,14m (16h ngày 05/10 là 5,63m, giảm 0,49m); Trạm Đáp Cầu 4,37m (16h ngày 05/10 là 4,67m, giảm 0,30m).\nSông Thương: Trạm Cầu Sơn 13,98m (16h ngày 05/10 là 14,05m, giảm 0,07m); Trạm Phủ Lạng Thương 4,00m (16h ngày 05/10 là 4,22m, giảm 0,22m).',
        duBaoNuoc: 'Trong 24h tới mực nước các triền sông trong tỉnh có khả năng sẽ lên lại do ảnh hưởng mưa của hoàn lưu bão số 11, khả năng đạt từ báo động 2 đến báo động 3.',
        hoChua: 'Tổng dung tích các hồ chứa trên địa bàn tỉnh đang ở mức 80-98% dung tích thiết kế.',
        mayBom: 'Số tổ máy bơm tiêu đang hoạt động 112 máy (Bắc Đuống 57 máy, Nam Đuống 14 máy, Nam Sông Thương 41 máy).',
        congTrinhDeDieu: 'Các sự cố sạt lở mái đê phía đồng tại vị trí K37+600 đê hữu Cầu, xã Yên Trung; sự cố mạch sủi tại K7+200 đê tả Cầu, xã Hợp Thịnh và lỗ sủi tại K57+450 hữu Cầu (các sự cố hiện ổn định).',
        congTacUngPho: '- Ngày 04/10/2025 UBND tỉnh có Công văn 3216/UBND-KTN về việc triển khai các biện pháp ứng phó với cơn bão số 11 trên địa bàn tỉnh;\n- Ngày 05/10/2025 Sở Nông nghiệp và Môi trường có chẩn bị các Văn bản: số 3121/SNN-CCTL về chủ động phòng chống sạt lở;\n- Các địa phương trên địa bàn tỉnh tuyến sông Cầu, sông Thương tiếp tục thực hiện chế độ tuần tra canh gác đê.',
        congTrinhThuyLoi: '- Về công trình thủy lợi: Sự cố sạt trượt tại 04 vị trí bờ hữu sông Ngũ Huyện Khê đoạn qua địa bàn xã Tiên Du: (1) K20+745 - K20+756 dài 11 m, ăn sâu khoảng 1,0 m; (2) K20+766 - K20+786 dài 20 m, ăn sâu khoảng 1,1 m; (3) K22+210 - K22+235 dài 25 m, ăn sâu khoảng 1,1 m; (4) K22+410 - K20+425 dài 15 m, ăn sâu khoảng 2,0m. Hiện tại, đã xử lý xong tại vị trí 3 và 4.',
        tinhHinhThietHai: '- Từ 16h ngày 05/10/2025 đến 06h ngày 06/10/2025: Không phát sinh thêm thiệt hại.\n- Hiện nay các khu vực dân cư ngoài bãi sông thuộc các xã Hợp Thịnh, Xuân Cẩm đang tiếp tục dọn dẹp vệ sinh nơi ở.',
        kienNghi: 'Đề nghị các địa phương, Sở, Ban ngành theo chức năng, nhiệm vụ thường xuyên cập nhật, nắm bắt diễn biến thời tiết và triển khai các biện pháp ứng phó với mưa lũ, các Công ty TNHH một thành viên trực ban nghiêm túc.',
        nguoiKy: 'Đặng Công Hưởng'
      }));
      setIsExtracting(false);
      setUploadSuccess(true);
    }, 2500);
  };

  const generateReportData = () => {
    // Bóc tách thông tin Bão bằng Regex
    const stormNameMatch = formData.tieuDe.match(/bão số \d+/i);
    const stormName = stormNameMatch ? stormNameMatch[0] : 'Thông tin Bão';
    
    const capBaoMatch = formData.viTriTamBao.match(/cấp\s*(\d+)/i);
    const giatCapMatch = formData.viTriTamBao.match(/giật cấp\s*(\d+)/i);
    const huongMatch = formData.viTriTamBao.match(/hướng\s([^\.,]+)/i);
    const tocDoMatch = formData.viTriTamBao.match(/tốc độ\s.*?(\d+)/i);
    
    return {
      meta: {
        loaiBaoCao: 'Báo cáo nhanh',
        coQuan: formData.coQuan,
        coQuanCap: formData.coQuanCap,
        capHanhChinh: metaData.level || 'Tỉnh',
        ngay: formData.ngayBanHanh,
        tieuDe: formData.tieuDe,
        phuDe: formData.thoiDiem,
        trangThai: 'Chờ duyệt',
        soHieu: formData.soHieu,
        nguoiKy: formData.nguoiKy,
        chucVu: formData.chucVu,
      },
      storm: {
        ten: stormName,
        capBao: capBaoMatch ? capBaoMatch[1] : '-',
        giatCap: giatCapMatch ? giatCapMatch[1] : '-',
        huong: huongMatch ? huongMatch[1].trim() : 'Đang cập nhật',
        tocDo: tocDoMatch ? tocDoMatch[1] : 'Đang cập nhật',
        viTri: formData.viTriTamBao,
        anhHuong: formData.moTaAnhHuong,
      },
      rainfall: {
        tongQuat: formData.muaTongQuat,
        trungBinh: formData.muaTongQuat.match(/(\d+(?:[,.]\d+)?)\s*mm/i)?.[1] || '--',
        caoNhat: formData.muaTongQuat.match(/cao nhất.*?(\d+(?:[,.]\d+)?)\s*mm.*?trạm ([a-zA-Z\sđĐ]+)/i) 
                  || formData.muaTongQuat.match(/cao nhất.*?(\d+(?:[,.]\d+)?)\s*mm.*?(?:tại|ở)\s+([^,).]+)/i)
                  ? { value: (formData.muaTongQuat.match(/cao nhất.*?(\d+(?:[,.]\d+)?)\s*mm/i) || [])[1], 
                      tram: (formData.muaTongQuat.match(/cao nhất.*?(?:trạm|tại|ở)\s+([a-zA-Z\sđĐ]+)/i) || [])[1]?.trim() } 
                  : null,
        thapNhat: formData.muaTongQuat.match(/thấp nhất.*?(\d+(?:[,.]\d+)?)\s*mm.*?(?:tại|ở)\s+([^,).]+)/i)
                  ? { value: formData.muaTongQuat.match(/thấp nhất.*?(\d+(?:[,.]\d+)?)\s*mm/i)[1],
                      trams: [formData.muaTongQuat.match(/thấp nhất.*?(?:tại|ở)\s+([^,).]+)/i)[1].trim()] }
                  : null,
      },
      waterLevel: {
        moTa: formData.mucNuocSong,
        rivers: parseWaterLevel(formData.mucNuocSong),
        duBao: formData.duBaoNuoc
                  ? (formData.duBaoNuoc.match(/báo động\s*\d+\s*đến\s*báo động\s*\d+/i)
                      ? 'Dự báo 24h: Khả năng lên ' + formData.duBaoNuoc.match(/báo động\s*\d+\s*đến\s*báo động\s*\d+/i)[0].replace(/báo động\s*/gi, 'BĐ').replace(/\s*đến\s*/gi, ' — ')
                      : formData.duBaoNuoc)
                  : '',
      },
      reservoir: {
        moTa: formData.hoChua,
        ...(parseReservoir(formData.hoChua) || {})
      },
      pump: {
        moTa: formData.mayBom,
        ...parsePump(formData.mayBom)
      },
      infrastructure: {
        deDieu: { moTa: formData.congTrinhDeDieu, suCo: parseDeDieu(formData.congTrinhDeDieu) },
        thuyLoi: { moTa: formData.congTrinhThuyLoi, satTruot: parseThuyLoi(formData.congTrinhThuyLoi) }
      },
      congTacUngPho: formData.congTacUngPho,
      damage: {
        phatSinh: formData.tinhHinhThietHai,
        tinhHinh: formData.tinhHinhThietHai,
        thietHaiUocTinh: formData.tinhHinhThietHai.includes('tỷ') ? formData.tinhHinhThietHai : '',
        cacXaHeNgap: parseDaMageArea(formData.tinhHinhThietHai)
      },
      kienNghi: formData.kienNghi
    };
  };

  const handleLuuBaoCao = async () => {
    setIsSubmitting(true);
    try {
      const formattedReport = generateReportData();
      formattedReport.meta.trangThai = 'Đã duyệt'; // Simulate final submission status

      await submitQuickReport(formattedReport);
      alert('Tải dữ liệu lên hệ thống thành công! Giao diện sẽ chuyển về Kho Báo cáo ngay bây giờ.');
      navigate('/bao-cao');
    } catch (error) {
      alert('Có lỗi xảy ra khi lưu: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPreviewMode) {
    return (
      <div className={styles.formContainer} style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
        <div style={{ background: '#EFF6FF', color: '#1E3A8A', padding: '16px', borderRadius: '8px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid #BFDBFE' }}>
          <FiCheckCircle size={20} color="#2563EB" />
          <span style={{ fontWeight: 500 }}>Vui lòng kiểm tra kỹ lại thông tin trên bản Báo cáo hoàn chỉnh trước khi gửi lên Hệ thống hoặc Lãnh đạo cấp cao.</span>
        </div>

        {/* Render the full report layout */}
        <div style={{ background: '#fff', borderRadius: '10px', border: '1px solid #E2E8F0', padding: '20px', maxHeight: '600px', overflowY: 'auto' }}>
           <ReportDocument report={generateReportData()} />
        </div>

        <div className={styles.previewActions}>
          <button className={styles.btnCancel} onClick={() => setIsPreviewMode(false)}>Quay lại chỉnh sửa</button>
          <button 
            className={styles.btnSubmit} 
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 28px', fontSize: '15px' }}
            onClick={handleLuuBaoCao}
            disabled={isSubmitting}
          >
            <FiSave size={18} /> {isSubmitting ? 'Đang gửi...' : 'Gửi Báo Cáo'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.formContainer}>
      
      {/* KHUNG 1: THÔNG TIN CHUNG */}
      <div className={styles.section}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 className={styles.sectionTitle} style={{ marginBottom: 0 }}>
            <FiFileText className={styles.titleIcon} /> Thông tin báo cáo
          </h3>
          
          <label 
            style={{ 
              cursor: isExtracting ? 'not-allowed' : 'pointer', 
              opacity: isExtracting ? 0.7 : 1, 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              background: uploadSuccess ? '#10B981' : '#2563EB', 
              color: 'white', 
              padding: '8px 16px', 
              borderRadius: '6px', 
              fontSize: '14px', 
              fontWeight: 500, 
              transition: '0.2s',
              boxShadow: '0 2px 4px rgba(37,99,235,0.2)'
            }}
          >
            {isExtracting ? (
              <>Đang phân tích...</>
            ) : uploadSuccess ? (
              <><FiCheckCircle /> Đã nạp dữ liệu AI</>
            ) : (
              <><FiUploadCloud /> Tải lên File Báo Cáo</>
            )}
            <input 
               type="file" 
               accept=".doc,.docx,.pdf"
               style={{ display: 'none' }}
               onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                     handleMockUpload();
                  }
               }}
               disabled={isExtracting}
            />
          </label>
        </div>

        {uploadSuccess && (
          <div style={{ background: '#ECFDF5', color: '#065F46', padding: '10px 14px', borderRadius: '6px', fontSize: '13px', display: 'flex', gap: '8px', alignItems: 'center', border: '1px solid #A7F3D0', marginBottom: '20px' }}>
            <FiCheckCircle size={16} style={{ flexShrink: 0 }} /> 
            <div>Hệ thống đã nhận diện dữ liệu từ tệp tải lên và điền sơ bộ vào Form. Cán bộ hãy rà soát lại thông tin CÒN TRỐNG trước khi duyệt.</div>
          </div>
        )}

        <div className={styles.grid2}>
          <div className={styles.formGroup}>
            <label>Cơ quan quản lý</label>
            <input type="text" className={styles.input} value={formData.coQuanCap} onChange={handleChange('coQuanCap')} />
          </div>
          <div className={styles.formGroup}>
            <label>Cơ quan ban hành</label>
            <input type="text" className={styles.input} value={formData.coQuan} onChange={handleChange('coQuan')} />
          </div>
        </div>
        <div className={styles.grid2}>
          <div className={styles.formGroup}>
            <label>Số hiệu báo cáo</label>
            <input type="text" className={styles.input} placeholder="VD: 125/BC-SNNMT" value={formData.soHieu} onChange={handleChange('soHieu')} />
          </div>
          <div className={styles.formGroup}>
            <label>Ngày ban hành</label>
            <input type="text" className={styles.input} value={formData.ngayBanHanh} onChange={handleChange('ngayBanHanh')} />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label>Tiêu đề báo cáo</label>
          <textarea className={styles.textarea} style={{ minHeight: '60px' }} value={formData.tieuDe} onChange={handleChange('tieuDe')} />
        </div>
        <div className={styles.formGroup}>
          <label>Khoảng thời gian báo cáo</label>
          <input type="text" className={styles.input} placeholder="Từ ... đến ..." value={formData.thoiDiem} onChange={handleChange('thoiDiem')} />
        </div>
      </div>

      {/* KHUNG 2: DIỄN BIẾN BÃO */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <FiWind className={styles.titleIcon} /> I. Diễn biến bão
        </h3>
        <div className={styles.formGroup}>
          <label>Vị trí tâm bão, sức gió, tốc độ</label>
          <textarea className={styles.textarea} placeholder="Hồi 04 giờ..." value={formData.viTriTamBao} onChange={handleChange('viTriTamBao')}></textarea>
        </div>
        <div className={styles.formGroup}>
          <label>Mô tả ảnh hưởng tại địa phương</label>
          <textarea className={styles.textarea} placeholder="Do ảnh hưởng của bão tại tỉnh..." value={formData.moTaAnhHuong} onChange={handleChange('moTaAnhHuong')}></textarea>
        </div>
      </div>

      {/* KHUNG 3: LƯỢNG MƯA & MỰC NƯỚC */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <FiCloudRain className={styles.titleIcon} /> II. Tình hình mực nước, lượng mưa
        </h3>
        <div className={styles.formGroup}>
          <label>1. Lượng mưa chung</label>
          <textarea className={styles.textarea} placeholder="Mô tả mức trung bình, cao nhất, thấp nhất..." value={formData.muaTongQuat} onChange={handleChange('muaTongQuat')} />
        </div>
        <div className={styles.formGroup}>
          <label>2.1 Mực nước các sông</label>
          <textarea className={styles.textarea} placeholder="Ghi chú mực nước tại các trạm sông..." value={formData.mucNuocSong} onChange={handleChange('mucNuocSong')}></textarea>
        </div>
        <div className={styles.formGroup}>
          <label>Dự báo mực nước tiếp theo</label>
          <textarea className={styles.textarea} placeholder="Trong 24h tới..." value={formData.duBaoNuoc} onChange={handleChange('duBaoNuoc')} style={{minHeight: '60px'}}></textarea>
        </div>
        <div className={styles.grid2}>
          <div className={styles.formGroup}>
            <label>2.2 Tình hình hồ chứa</label>
            <input type="text" className={styles.input} placeholder="Tổng dung tích 80-98%..." value={formData.hoChua} onChange={handleChange('hoChua')} />
          </div>
          <div className={styles.formGroup}>
            <label>2.3 Hoạt động máy bơm tiêu</label>
            <input type="text" className={styles.input} placeholder="Số tổ máy đang chạy..." value={formData.mayBom} onChange={handleChange('mayBom')} />
          </div>
        </div>
      </div>

      {/* KHUNG: CÔNG TRÌNH */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <FiAlertCircle className={styles.titleIcon} /> III. Công trình Đê điều, Thủy lợi
        </h3>
        <div className={styles.formGroup}>
          <label>Công trình Đê điều (Sự cố sạt lở, thẩm lậu...)</label>
          <textarea className={styles.textarea} value={formData.congTrinhDeDieu} onChange={handleChange('congTrinhDeDieu')} placeholder="Không có sự cố gì mới hoặc mô tả chi tiết..."></textarea>
        </div>
        <div className={styles.formGroup}>
          <label>Công trình Thủy lợi (Bờ kênh, trạm bơm...)</label>
          <textarea className={styles.textarea} value={formData.congTrinhThuyLoi} onChange={handleChange('congTrinhThuyLoi')} placeholder="Mô tả sự cố thủy lợi..."></textarea>
        </div>
      </div>

      {/* KHUNG: THIỆT HẠI */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <FiAlertCircle className={styles.titleIcon} /> IV. Tình hình thiệt hại
        </h3>
        <div className={styles.formGroup}>
          <label>Tình hình thiệt hại</label>
          <textarea className={styles.textarea} value={formData.tinhHinhThietHai} onChange={handleChange('tinhHinhThietHai')}></textarea>
        </div>
      </div>

      {/* KHUNG: CÔNG TÁC CHỈ ĐẠO */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <FiMessageSquare className={styles.titleIcon} /> V. Công tác chỉ đạo ứng phó
        </h3>
        <div className={styles.formGroup}>
          <label>Công tác chỉ đạo ứng phó (Các văn bản, lệnh ban hành)</label>
          <textarea className={styles.textarea} style={{ height: '120px' }} value={formData.congTacUngPho} onChange={handleChange('congTacUngPho')} placeholder="- Ngày ..."></textarea>
        </div>
      </div>

      {/* KHUNG: ĐỀ NGHỊ */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <FiMessageSquare className={styles.titleIcon} /> VI. Đề nghị
        </h3>
        <div className={styles.formGroup}>
          <label>Đề nghị / Kiến nghị của địa phương</label>
          <textarea className={styles.textarea} style={{ height: '80px' }} value={formData.kienNghi} onChange={handleChange('kienNghi')}></textarea>
        </div>
        
        <div className={styles.grid2} style={{marginTop: '20px'}}>
          <div className={styles.formGroup}>
            <label>Chức vụ người ký</label>
            <textarea className={styles.textarea} style={{minHeight: '60px'}} value={formData.chucVu} onChange={handleChange('chucVu')}></textarea>
          </div>
          <div className={styles.formGroup}>
            <label>Họ tên người ký</label>
            <input type="text" className={styles.input} value={formData.nguoiKy} onChange={handleChange('nguoiKy')} placeholder="Nguyễn Văn A" />
          </div>
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <div className={styles.formActions}>
        <button className={styles.btnCancel} onClick={() => navigate('/bao-cao')}>Hủy bỏ</button>
        <button 
          className={styles.btnSubmit} 
          onClick={() => {
             setIsPreviewMode(true);
          }}
          style={{ background: '#3B82F6', border: 'none' }}
        >
          Duyệt
        </button>
      </div>

    </div>
  );
}
