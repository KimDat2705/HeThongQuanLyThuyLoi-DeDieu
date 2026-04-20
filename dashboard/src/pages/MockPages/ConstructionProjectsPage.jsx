import React from 'react';
import styles from './MockPage.module.css';
import { FiArchive, FiTarget, FiBox, FiClock } from 'react-icons/fi';

export default function ConstructionProjectsPage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <div className={styles.headerIconWrapper} style={{ background: '#F5F3FF', color: '#8B5CF6' }}>
          <FiArchive />
        </div>
        <div>
          <h1 className={styles.pageTitle}>Danh mục Dự án Xây dựng</h1>
          <p className={styles.pageSubtitle}>Quản lý tổng mức đầu tư và tiến độ thi công các công trình trọng điểm</p>
        </div>
      </div>

      <div className={styles.dashboardGrid}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>DỰ ÁN ĐANG THI CÔNG</span>
            <div className={styles.statIcon} style={{ background: '#FEF3C7', color: '#D97706' }}><FiClock /></div>
          </div>
          <h2 className={styles.statValue}>18</h2>
          <span className={styles.statChange}>Chậm tiến độ: <span className={styles.changeNeg}>3 dự án</span></span>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>TỔNG MỨC ĐẦU TƯ (TỈ VNĐ)</span>
            <div className={styles.statIcon} style={{ background: '#DCFCE7', color: '#16A34A' }}><FiBox /></div>
          </div>
          <h2 className={styles.statValue}>5,240</h2>
          <span className={styles.statChange}>Vốn NSNN: 4,100 | Vốn Tỉnh: 1,140</span>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>DỰ ÁN MỚI CHUẨN BỊ (2026)</span>
            <div className={styles.statIcon} style={{ background: '#E0F2FE', color: '#0284C7' }}><FiTarget /></div>
          </div>
          <h2 className={styles.statValue}>5</h2>
          <span className={styles.statChange}><span className={styles.changePos}>Đã phê duyệt chủ trương</span></span>
        </div>
      </div>

      <div className={styles.mainContent}>
        <h3 className={styles.contentTitle}><FiArchive /> Bảng theo dõi tiến độ Dự án</h3>
        <table className={styles.glassmorphismTable}>
          <thead>
            <tr>
              <th>Mã DA</th>
              <th>Tên Công Trình</th>
              <th>Chủ Đầu Tư</th>
              <th>TMĐT (Tỉ VNĐ)</th>
              <th>Khởi công</th>
              <th>Tiến độ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>DA-TL-01</td>
              <td>Nâng cấp đê Hữu Cầu, huyện Yên Phong</td>
              <td>Ban QLDA Nông nghiệp Tỉnh</td>
              <td>450.5</td>
              <td>15/02/2025</td>
              <td>
                <span className={`${styles.statusBadge} ${styles.statusActive}`}>Đúng tiến độ</span>
                <div className={styles.progressBar}><div className={styles.progressFill} style={{width: '65%'}}></div></div>
              </td>
            </tr>
            <tr>
              <td>DA-TB-12</td>
              <td>Xây mới trạm bơm Kênh Vàng II</td>
              <td>Chi cục Thủy lợi</td>
              <td>120.0</td>
              <td>01/06/2025</td>
              <td>
                <span className={`${styles.statusBadge} ${styles.statusProgress}`}>Đang thực hiện</span>
                <div className={styles.progressBar}><div className={styles.progressFill} style={{width: '35%'}}></div></div>
              </td>
            </tr>
            <tr>
              <td>DA-DD-05</td>
              <td>Gia cố sạt lở bờ sông Đuống đoạn Thuận Thành</td>
              <td>Ban QLDA Nông nghiệp Tỉnh</td>
              <td>85.2</td>
              <td>10/01/2025</td>
              <td>
                <span className={`${styles.statusBadge} ${styles.statusWarning}`}>Chậm GPMB</span>
                <div className={styles.progressBar}><div className={styles.progressFill} style={{width: '15%', background: '#F59E0B'}}></div></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
