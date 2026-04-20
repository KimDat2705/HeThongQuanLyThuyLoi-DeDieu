import React from 'react';
import styles from './MockPage.module.css';
import { FiMapPin, FiActivity, FiZap, FiSettings } from 'react-icons/fi';

export default function PumpStationMapPage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <div className={styles.headerIconWrapper} style={{ background: '#E0F2FE', color: '#0284C7' }}>
          <FiMapPin />
        </div>
        <div>
          <h1 className={styles.pageTitle}>Bản đồ Trạm bơm</h1>
          <p className={styles.pageSubtitle}>Hệ thống giám sát vận hành các trạm bơm tiêu úng toàn Tỉnh</p>
        </div>
      </div>

      <div className={styles.dashboardGrid}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>TỔNG SỐ TRẠM BƠM</span>
            <div className={styles.statIcon} style={{ background: '#E0F2FE', color: '#0284C7' }}><FiMapPin /></div>
          </div>
          <h2 className={styles.statValue}>142</h2>
          <span className={styles.statChange}><span className={styles.changePos}>100%</span> đã số hóa</span>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>ĐANG VẬN HÀNH</span>
            <div className={styles.statIcon} style={{ background: '#DCFCE7', color: '#16A34A' }}><FiActivity /></div>
          </div>
          <h2 className={styles.statValue}>28</h2>
          <span className={styles.statChange}><span className={styles.changePos}>12</span> trạm đang chạy tối đa công suất</span>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>TỔNG CÔNG SUẤT (m³/h)</span>
            <div className={styles.statIcon} style={{ background: '#FEF3C7', color: '#D97706' }}><FiZap /></div>
          </div>
          <h2 className={styles.statValue}>24,500</h2>
          <span className={styles.statChange}>Đạt 85% năng lực thiết kế</span>
        </div>
      </div>

      <div className={styles.mainContent}>
        <h3 className={styles.contentTitle}><FiMapPin /> Bản đồ Hệ thống Trạm bơm & Kênh tiêu</h3>
        <div className={styles.mockupImage}>
          <FiMapPin size={48} style={{ opacity: 0.5 }} />
          <p style={{ margin: 0 }}>Giao diện Bản đồ Vận hành Trạm bơm GIS (Mô phỏng)</p>
          <div style={{ padding: '8px 16px', background: '#F1F5F9', borderRadius: '4px', fontSize: '12px' }}>Tính năng đang được tích hợp cùng Trung tâm điều hành.</div>
        </div>

        <h3 className={styles.contentTitle} style={{ marginTop: '32px' }}>Trạng thái vận hành trạm bơm chính</h3>
        <table className={styles.glassmorphismTable}>
          <thead>
            <tr>
              <th>Tên Trạm bơm</th>
              <th>Công suất (m³/h)</th>
              <th>Số tổ máy</th>
              <th>Đang chạy</th>
              <th>Tình trạng</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Trạm bơm Kênh Vàng</td>
              <td>12,000</td>
              <td>6</td>
              <td>4</td>
              <td><span className={`${styles.statusBadge} ${styles.statusActive}`}>Bình thường</span></td>
            </tr>
            <tr>
              <td>Trạm bơm Vạn An</td>
              <td>8,500</td>
              <td>4</td>
              <td>4</td>
              <td><span className={`${styles.statusBadge} ${styles.statusWarning}`}>Cảnh báo tải</span></td>
            </tr>
            <tr>
              <td>Trạm bơm Tri Phương</td>
              <td>4,000</td>
              <td>3</td>
              <td>0</td>
              <td><span className={`${styles.statusBadge} ${styles.statusDanger}`}>Đang bảo trì</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
