import React from 'react';
import styles from './MockPage.module.css';
import { FiShield, FiAlertOctagon, FiTrendingUp, FiTool } from 'react-icons/fi';

export default function DikeManagementPage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <div className={styles.headerIconWrapper} style={{ background: '#FEF3C7', color: '#D97706' }}>
          <FiShield />
        </div>
        <div>
          <h1 className={styles.pageTitle}>Quản lý Đê điều</h1>
          <p className={styles.pageSubtitle}>Theo dõi hiện trạng móng, mái đê và các sự cố vi phạm hành lang</p>
        </div>
      </div>

      <div className={styles.dashboardGrid}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>TỔNG CHIỀU DÀI ĐÊ (km)</span>
            <div className={styles.statIcon} style={{ background: '#E0F2FE', color: '#0284C7' }}><FiTrendingUp /></div>
          </div>
          <h2 className={styles.statValue}>134.5</h2>
          <span className={styles.statChange}>Đê cấp I, II, III thuộc TW quản lý</span>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>VỊ TRÍ XUNG YẾU</span>
            <div className={styles.statIcon} style={{ background: '#FEE2E2', color: '#DC2626' }}><FiAlertOctagon /></div>
          </div>
          <h2 className={styles.statValue}>12</h2>
          <span className={styles.statChange}><span className={styles.changeNeg}>+2</span> so với tháng trước</span>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>VI PHẠM HÀNH LANG</span>
            <div className={styles.statIcon} style={{ background: '#FEF3C7', color: '#D97706' }}><FiTool /></div>
          </div>
          <h2 className={styles.statValue}>45</h2>
          <span className={styles.statChange}><span className={styles.changePos}>Đã xử lý 80%</span></span>
        </div>
      </div>

      <div className={styles.mainContent}>
        <h3 className={styles.contentTitle}><FiShield /> Danh sách các tuyến Đê trọng điểm</h3>
        <table className={styles.glassmorphismTable}>
          <thead>
            <tr>
              <th>Tuyến đê</th>
              <th>Chiều dài (km)</th>
              <th>Cấp đê</th>
              <th>Số vị trí xung yếu</th>
              <th>Đánh giá hiện trạng</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Đê Hữu Cầu</td>
              <td>42.5</td>
              <td>Cấp II</td>
              <td>4</td>
              <td><span className={`${styles.statusBadge} ${styles.statusWarning}`}>Cần gia cố mái</span></td>
            </tr>
            <tr>
              <td>Đê Hữu Đuống</td>
              <td>38.0</td>
              <td>Cấp I</td>
              <td>3</td>
              <td><span className={`${styles.statusBadge} ${styles.statusActive}`}>An toàn</span></td>
            </tr>
            <tr>
              <td>Đê Tả Thái Bình</td>
              <td>25.2</td>
              <td>Cấp III</td>
              <td>5</td>
              <td><span className={`${styles.statusBadge} ${styles.statusDanger}`}>Sạt lở uy hiếp chân đê</span></td>
            </tr>
          </tbody>
        </table>

        <h3 className={styles.contentTitle} style={{ marginTop: '32px' }}>Sơ đồ mặt cắt đê Hữu Cầu (Mô phỏng)</h3>
        <div className={styles.mockupImage} style={{ height: '200px' }}>
          <FiTrendingUp size={48} style={{ opacity: 0.5 }} />
          <p style={{ margin: 0 }}>AutoCAD / GIS Cross-section Data Area</p>
        </div>
      </div>
    </div>
  );
}
