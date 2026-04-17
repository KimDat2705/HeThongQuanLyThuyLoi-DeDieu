import React, { useState } from 'react';
import styles from './QuickReportForm.module.css';
import { FiWind, FiCloudRain, FiFileText, FiAlertCircle, FiMessageSquare, FiSave } from 'react-icons/fi';
import { submitQuickReport } from '../../services/reportService';
import { useNavigate } from 'react-router-dom';

export default function QuickReportForm({ metaData = {} }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    soHieu: '',
    coQuan: 'SỞ NÔNG NGHIỆP VÀ MÔI TRƯỜNG',
    tieuDe: 'Tình hình thiên tai và công tác ứng phó với bão',
    thoiDiem: '',
    ngayBanHanh: new Date().toLocaleDateString('vi-VN'),
    
    // Bão
    sucGio: '',
    gioGiat: '',
    huongDi: '',
    tocDo: '',
    viTriTamBao: '',
    moTaAnhHuong: '',
    
    // Nước / Mưa
    muaTrungBinh: '',
    muaCaoNhat: '',
    muaThapNhat: '',
    duBaoNuoc: '',
    mayBom: '',
    hoChua: '',
    
    // Công tác, Thiệt hại, Kiến nghị
    congTacUngPho: '',
    tinhHinhThietHai: '',
    kienNghi: '',
    nguoiKy: ''
  });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleLuuBaoCao = async () => {
    setIsSubmitting(true);
    try {
      // Chuyển đổi dữ liệu Form dẹt thành cấu trúc JSON có cấp bậc (giống reportArchiveData)
      const formattedReport = {
        meta: {
          loaiBaoCao: 'Báo cáo nhanh',
          coQuan: formData.coQuan,
          capHanhChinh: metaData.level || 'Tỉnh',
          ngay: formData.ngayBanHanh,
          tieuDe: formData.tieuDe,
          phuDe: formData.thoiDiem,
          trangThai: 'Đã duyệt' // Thường là Chờ duyệt, giả lập Đã duyệt để hiện luôn
        },
        storm: {
          ten: 'Bão Nhiệt Đới (Form Nhập)',
          capBao: formData.sucGio,
          giatCap: formData.gioGiat,
          huongDiChuyen: formData.huongDi,
          tocDo: formData.tocDo + ' km/h',
          dienBien: formData.moTaAnhHuong,
        },
        rainfall: {
          trungBinh: formData.muaTrungBinh,
          caoNhat: { value: formData.muaCaoNhat, tram: 'Trạm nội bộ' },
          thapNhat: { value: formData.muaThapNhat, tram: 'Trạm nội bộ' }
        },
        waterLevel: {
          duBao: formData.duBaoNuoc,
          rivers: [] // Dữ liệu giả lập, thực tế sẽ cần form dạng mảng (Array)
        },
        reservoir: {
          dungTich: formData.hoChua,
          chuY: 'Theo dữ liệu nhập liệu tay'
        },
        pump: {
          total: formData.mayBom,
          active: formData.mayBom,
          details: 'Dữ liệu nhập liệu tay'
        },
        infrastructure: {
          chiDao: formData.congTacUngPho.split('\n').filter(Boolean)
        },
        damage: {
          thietHaiUocTinh: formData.tinhHinhThietHai,
          deNghi: formData.kienNghi
        }
      };

      await submitQuickReport(formattedReport);
      
      alert('Tải dữ liệu lên Đám mây (Firebase) thành công! Giao diện sẽ chuyển về Kho Báo cáo ngay bây giờ.');
      
      // Navigate to /bao-cao
      navigate('/bao-cao');
    } catch (error) {
      alert('Có lỗi xảy ra khi lưu: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      {/* KHUNG 1: THÔNG TIN CHUNG */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <FiFileText className={styles.titleIcon} /> Thông tin chung
        </h3>
        <div className={styles.grid2}>
          <div className={styles.formGroup}>
            <label>Số hiệu báo cáo</label>
            <input type="text" className={styles.input} placeholder="VD: 123/BC-SNNMT" value={formData.soHieu} onChange={handleChange('soHieu')} />
          </div>
          <div className={styles.formGroup}>
            <label>Cơ quan ban hành</label>
            <input type="text" className={styles.input} value={formData.coQuan} onChange={handleChange('coQuan')} />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label>Tiêu đề báo cáo</label>
          <input type="text" className={styles.input} value={formData.tieuDe} onChange={handleChange('tieuDe')} />
        </div>
        <div className={styles.grid2}>
          <div className={styles.formGroup}>
            <label>Thời điểm báo cáo (Từ chiều qua đến sáng nay)</label>
            <input type="text" className={styles.input} placeholder="Từ 16h00 ngày 05/10/2025 đến 06h00 ngày 06/10/2025" value={formData.thoiDiem} onChange={handleChange('thoiDiem')} />
          </div>
          <div className={styles.formGroup}>
            <label>Ngày ban hành</label>
            <input type="text" className={styles.input} placeholder="06/10/2025" value={formData.ngayBanHanh} onChange={handleChange('ngayBanHanh')} />
          </div>
        </div>
      </div>

      {/* KHUNG 2: DIỄN BIẾN BÃO */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <FiWind className={styles.titleIcon} /> I. Diễn biến bão
        </h3>
        <div className={styles.grid4}>
          <div className={styles.formGroup}>
            <label>Sức gió mạnh nhất (Cấp)</label>
            <input type="number" className={styles.input} placeholder="VD: 8" value={formData.sucGio} onChange={handleChange('sucGio')} />
          </div>
          <div className={styles.formGroup}>
            <label>Gió giật (Cấp)</label>
            <input type="number" className={styles.input} placeholder="VD: 10" value={formData.gioGiat} onChange={handleChange('gioGiat')} />
          </div>
          <div className={styles.formGroup}>
            <label>Hướng di chuyển</label>
            <input type="text" className={styles.input} placeholder="VD: Tây Tây Bắc" value={formData.huongDi} onChange={handleChange('huongDi')} />
          </div>
          <div className={styles.formGroup}>
            <label>Tốc độ di chuyển</label>
            <div className={styles.inputGroup}>
              <input type="number" className={styles.input} placeholder="20" value={formData.tocDo} onChange={handleChange('tocDo')} />
              <span className={styles.addOn}>km/h</span>
            </div>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label>Vị trí tâm bão (Tọa độ / Địa điểm)</label>
          <input type="text" className={styles.input} placeholder="Ví dụ: Vị trí tâm bão ở vào khoảng 22,0 độ vĩ Bắc..." value={formData.viTriTamBao} onChange={handleChange('viTriTamBao')} />
        </div>
        <div className={styles.formGroup}>
          <label>Mô tả ảnh hưởng</label>
          <textarea className={styles.textarea} placeholder="Do ảnh hưởng của bão tại tỉnh Bắc Ninh sáng sớm nay..." value={formData.moTaAnhHuong} onChange={handleChange('moTaAnhHuong')}></textarea>
        </div>
      </div>

      {/* KHUNG 3: LƯỢNG MƯA & MỰC NƯỚC */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <FiCloudRain className={styles.titleIcon} /> II. Tình hình mực nước, lượng mưa
        </h3>
        <div className={styles.grid3}>
          <div className={styles.formGroup}>
            <label>Lượng mưa TB</label>
            <div className={styles.inputGroup}>
              <input type="number" className={styles.input} placeholder="7.40" value={formData.muaTrungBinh} onChange={handleChange('muaTrungBinh')} />
              <span className={styles.addOn}>mm</span>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label>Lượng mưa cao nhất</label>
            <div className={styles.inputGroup}>
              <input type="number" className={styles.input} placeholder="66.0" value={formData.muaCaoNhat} onChange={handleChange('muaCaoNhat')} />
              <span className={styles.addOn}>mm</span>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label>Lượng mưa thấp nhất</label>
            <div className={styles.inputGroup}>
              <input type="number" className={styles.input} placeholder="0.0" value={formData.muaThapNhat} onChange={handleChange('muaThapNhat')} />
              <span className={styles.addOn}>mm</span>
            </div>
          </div>
        </div>
        <div className={styles.formGroup} style={{ marginTop: '16px' }}>
          <label>Dự báo mực nước sông (Text)</label>
          <textarea className={styles.textarea} placeholder="Trong 24h tới mực nước các triền sông..." value={formData.duBaoNuoc} onChange={handleChange('duBaoNuoc')}></textarea>
        </div>
        <div className={styles.grid2}>
          <div className={styles.formGroup}>
            <label>Hoạt động máy bơm (Tổng số)</label>
            <div className={styles.inputGroup}>
              <input type="number" className={styles.input} placeholder="112" value={formData.mayBom} onChange={handleChange('mayBom')} />
              <span className={styles.addOn}>máy</span>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label>Dung tích hồ chứa (%)</label>
            <input type="text" className={styles.input} placeholder="Từ 80-98%" value={formData.hoChua} onChange={handleChange('hoChua')} />
          </div>
        </div>
      </div>

      {/* KHUNG 4: CÔNG TÁC ỨNG PHÓ */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <FiAlertCircle className={styles.titleIcon} /> III. Công tác chỉ đạo ứng phó
        </h3>
        <div className={styles.formGroup}>
          <label>Các công văn, chỉ đạo (Mỗi nội dung một dòng)</label>
          <textarea className={styles.textarea} style={{ height: '90px' }} value={formData.congTacUngPho} onChange={handleChange('congTacUngPho')}></textarea>
        </div>
      </div>

      {/* KHUNG 5: THIỆT HẠI & ĐỀ NGHỊ */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <FiMessageSquare className={styles.titleIcon} /> IV. Thiệt hại & Đề nghị
        </h3>
        <div className={styles.formGroup}>
          <label>Tình hình thiệt hại</label>
          <textarea className={styles.textarea} value={formData.tinhHinhThietHai} onChange={handleChange('tinhHinhThietHai')}></textarea>
        </div>
        <div className={styles.formGroup}>
          <label>Đề nghị / Kiến nghị</label>
          <textarea className={styles.textarea} value={formData.kienNghi} onChange={handleChange('kienNghi')}></textarea>
        </div>
        <div className={styles.formGroup}>
          <label>Người ký / Chức vụ</label>
          <div className={styles.inputGroup}>
            <input type="text" className={styles.input} placeholder="KT. GIÁM ĐỐC..." />
            <input type="text" className={styles.input} placeholder="Họ và tên..." value={formData.nguoiKy} onChange={handleChange('nguoiKy')} />
          </div>
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <div className={styles.formActions} style={{marginTop: '0'}}>
        <button className={styles.btnCancel} onClick={() => navigate('/bao-cao')}>Hủy bỏ</button>
        <button 
          className={styles.btnSubmit} 
          onClick={handleLuuBaoCao}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Đang gửi...' : 'Lưu & Trình duyệt báo cáo'}
        </button>
      </div>

    </div>
  );
}
