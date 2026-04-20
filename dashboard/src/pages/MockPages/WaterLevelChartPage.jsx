import React from 'react';
import styles from './MockPage.module.css';
import { FiBarChart2, FiDroplet, FiAlertTriangle, FiArrowUpRight } from 'react-icons/fi';

export default function WaterLevelChartPage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <div className={styles.headerIconWrapper} style={{ background: '#E0E7FF', color: '#4F46E5' }}>
          <FiBarChart2 />
        </div>
        <div>
          <h1 className={styles.pageTitle}>Biểu đồ mực nước</h1>
          <p className={styles.pageSubtitle}>Phân tích xu hướng mực nước thực tế tại các trạm đo thủy văn</p>
        </div>
      </div>

      <div className={styles.dashboardGrid}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>TRẠM ĐÁP CẦU (Sông Cầu)</span>
            <div className={styles.statIcon} style={{ background: '#E0E7FF', color: '#4F46E5' }}><FiDroplet /></div>
          </div>
          <h2 className={styles.statValue}>4.20m</h2>
          <span className={styles.statChange}><span className={styles.changePos}>An toàn</span> (Dưới BĐ 1 là 5.3m)</span>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>TRẠM BẾN HỒ (Sông Đuống)</span>
            <div className={styles.statIcon} style={{ background: '#FEF3C7', color: '#D97706' }}><FiAlertTriangle /></div>
          </div>
          <h2 className={styles.statValue}>6.85m</h2>
          <span className={styles.statChange}><span className={styles.changeNeg}>Gần BĐ 2</span> (Cách 0.15m)</span>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>TRẠM PHẢ LẠI (S. Thái Bình)</span>
            <div className={styles.statIcon} style={{ background: '#FEE2E2', color: '#DC2626' }}><FiArrowUpRight /></div>
          </div>
          <h2 className={styles.statValue}>5.10m</h2>
          <span className={styles.statChange}><span className={styles.changeNeg}>Vượt BĐ 2</span> (Nguy hiểm)</span>
        </div>
      </div>

      <div className={styles.mainContent}>
        <h3 className={styles.contentTitle}><FiBarChart2 /> Biểu đồ đường đẳng trị (Hydrograph) 7 ngày qua</h3>
        <div className={styles.mockupImage} style={{background: 'linear-gradient(to top, #F8FAFC 0%, transparent 100%)'}}>
          {/* Fake Chart Lines using pure CSS for visual wow without libraries */}
          <div style={{ position: 'relative', width: '80%', height: '250px', borderBottom: '2px solid #94A3B8', borderLeft: '2px solid #94A3B8' }}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', width: '100%', height: '100%', bottom: 0 }}>
              <path d="M0,80 Q20,70 40,50 T60,30 T80,10 T100,5" fill="none" stroke="#EF4444" strokeWidth="2" />
              <path d="M0,90 Q30,85 50,70 T80,50 T100,45" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 2" />
              <path d="M0,95 Q20,95 40,85 T70,80 T100,75" fill="none" stroke="#3B82F6" strokeWidth="3" />
            </svg>
          </div>
          <div style={{ display: 'flex', gap: '24px', marginTop: '16px', fontSize: '12px', fontWeight: 600 }}>
             <span style={{ color: '#EF4444' }}>—— Sông Thái Bình</span>
             <span style={{ color: '#F59E0B' }}>-- Sông Đuống</span>
             <span style={{ color: '#3B82F6' }}>━━ Sông Cầu</span>
          </div>
        </div>
      </div>
    </div>
  );
}
