import { useState } from 'react';
import styles from './DataEntryPage.module.css';
import { FiEdit, FiFileText, FiFilter } from 'react-icons/fi';
import QuickReportForm from '../../components/Forms/QuickReportForm';

export default function DataEntryPage() {
  const [reportType, setReportType] = useState('');
  const [level, setLevel] = useState('Xã');

  const reportTypesList = [
    '',
    'Báo cáo nhanh tình hình thiên tai',
    'Báo cáo tổng kết năm',
    'Phụ lục thống kê thiệt hại'
  ];

  return (
    <div className={styles.pageContainer}>
      <header className={styles.pageHeader}>
        <h1>Nhập liệu Báo cáo</h1>
        <p>Chọn loại mẫu báo cáo và điền thông tin để nộp lên hệ thống quản lý</p>
      </header>

      {/* SETUP / FILTER CARD */}
      <section className={styles.setupCard}>
        <div className={styles.setupTitle}>
          <FiFilter /> Phân loại báo cáo cần nhập
        </div>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>Cấp hành chính báo cáo</label>
            <select
              className={styles.selectBox}
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="Xã/Phường">Cấp Xã/Phường</option>
              <option value="Tỉnh">Cấp Tỉnh (Sở)</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Mẫu báo cáo</label>
            <select
              className={styles.selectBox}
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="" disabled>-- Chọn loại báo cáo --</option>
              <option value="BaoCaoNhanh">Báo cáo nhanh tình hình thiên tai</option>
              <option value="BaoCaoTongKet">Báo cáo tổng kết năm</option>
              <option value="ThongKeThietHai">Phụ lục thống kê thiệt hại (Excel)</option>
            </select>
          </div>
        </div>
      </section>

      {/* DYNAMIC FORM CONTAINER */}
      <section className={styles.dynamicFormContainer}>
        {!reportType ? (
          <div className={styles.emptyState}>
            <FiFileText className={styles.emptyIcon} />
            <h3>Chưa chọn loại báo cáo</h3>
            <p>Vui lòng chọn mục "Mẫu báo cáo" ở phía trên để hệ thống hiển thị biểu mẫu điền dữ liệu tương ứng.</p>
          </div>
        ) : (
          <div>
            <div className={styles.setupTitle}>
              <FiEdit /> Đang nhập liệu: {
                reportType === 'BaoCaoNhanh' ? 'Báo cáo nhanh tình hình thiên tai' :
                reportType === 'BaoCaoTongKet' ? 'Báo cáo tổng kết năm' :
                'Phụ lục thống kê thiệt hại'
              }
            </div>
            
            {/* RENDER FORM DỰA VÀO LOẠI BÁO CÁO */}
            {reportType === 'BaoCaoNhanh' ? (
              <QuickReportForm metaData={{ level, reportType }} />
            ) : (
              <div style={{ padding: '20px', background: '#F8FAFC', borderRadius: '8px', border: '1px dashed #CBD5E1', color: '#64748B', textAlign: 'center', marginTop: '20px' }}>
                <p>Biểu mẫu cho <strong>{reportType}</strong> sẽ được thiết kế ở đây.</p>
                <p style={{ fontSize: '13px' }}>(Đang chờ AI/Developer bóc tách mẫu Excel/Word của người dùng để dựng UI React Form)</p>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
