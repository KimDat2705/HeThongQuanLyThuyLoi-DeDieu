import React from 'react';
import styles from './MockPage.module.css';
import { FiUsers, FiAward, FiClipboard, FiAlertCircle } from 'react-icons/fi';

export default function ContractorsPage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <div className={styles.headerIconWrapper} style={{ background: '#FFEDD5', color: '#EA580C' }}>
          <FiUsers />
        </div>
        <div>
          <h1 className={styles.pageTitle}>Hồ sơ & Nhà Thầu</h1>
          <p className={styles.pageSubtitle}>Quản lý năng lực và theo dõi vi phạm của các đơn vị thi công, tư vấn giám sát</p>
        </div>
      </div>

      <div className={styles.dashboardGrid}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>NHÀ THẦU ĐẠT CHUẨN NĂNG LỰC</span>
            <div className={styles.statIcon} style={{ background: '#DCFCE7', color: '#16A34A' }}><FiAward /></div>
          </div>
          <h2 className={styles.statValue}>45</h2>
          <span className={styles.statChange}>Cập nhật KQ Đánh giá năm 2025</span>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>ĐANG THAM GIA THI CÔNG</span>
            <div className={styles.statIcon} style={{ background: '#E0F2FE', color: '#0284C7' }}><FiClipboard /></div>
          </div>
          <h2 className={styles.statValue}>12</h2>
          <span className={styles.statChange}><span className={styles.changePos}>Trên phạm vi 18 dự án</span></span>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>NẰM TRONG DANH SÁCH ĐEN</span>
            <div className={styles.statIcon} style={{ background: '#FEE2E2', color: '#DC2626' }}><FiAlertCircle /></div>
          </div>
          <h2 className={styles.statValue}>03</h2>
          <span className={styles.statChange}><span className={styles.changeNeg}>Cấm đấu thầu 3 - 5 năm</span> do gian lận</span>
        </div>
      </div>

      <div className={styles.mainContent}>
        <h3 className={styles.contentTitle}><FiUsers /> Bảng xếp hạng Đơn vị Thi công Uy tín</h3>
        <table className={styles.glassmorphismTable}>
          <thead>
            <tr>
              <th>Hồ Sơ Năng Lực</th>
              <th>Đơn vị thi công</th>
              <th>Số Dự án đã hoàn thành</th>
              <th>Điểm Chất lượng</th>
              <th>Tình trạng HĐ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.textCenter}><FiClipboard size={20} color="#2563EB"/></td>
              <td>Tổng CTCP Xây dựng Nông nghiệp VN</td>
              <td>14 Dự án</td>
              <td>95/100 (Hạng A)</td>
              <td><span className={`${styles.statusBadge} ${styles.statusActive}`}>Đang thực hiện tốt</span></td>
            </tr>
            <tr>
              <td className={styles.textCenter}><FiClipboard size={20} color="#2563EB"/></td>
              <td>Công ty TNHH Tập đoàn Đê điều Hà Nội</td>
              <td>8 Dự án</td>
              <td>88/100 (Hạng B+)</td>
              <td><span className={`${styles.statusBadge} ${styles.statusProgress}`}>Chờ nghiệm thu</span></td>
            </tr>
            <tr>
              <td className={styles.textCenter}><FiClipboard size={20} color="#94A3B8"/></td>
              <td>Công ty Xây dựng Vạn Xuân Bắc Ninh</td>
              <td>2 Dự án</td>
              <td><span className={styles.changeNeg}>45/100 (Vi phạm)</span></td>
              <td><span className={`${styles.statusBadge} ${styles.statusDanger}`}>Đã bị đình chỉ</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
