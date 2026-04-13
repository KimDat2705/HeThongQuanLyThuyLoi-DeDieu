import styles from './MainContent.module.css';
import { FiAlertTriangle } from 'react-icons/fi';
import BacNinhMap from '../BacNinhMap/BacNinhMap';

import OverviewCharts from '../OverviewCharts/OverviewCharts';
import ExecutiveWidgets from '../ExecutiveWidgets/ExecutiveWidgets';

const overallStatus = 'warning';
const statusConfig = {
  good:    { color: '#2E7D32', bg: '#E8F5E9', label: 'BÌNH THƯỜNG',  emoji: '✅' },
  warning: { color: '#E65100', bg: '#FFF8E1', label: 'CẦN THEO DÕI', emoji: '⚠️' },
  danger:  { color: '#E53935', bg: '#FFEBEE', label: 'KHẨN CẤP',     emoji: '🚨' },
};



export default function MainContent() {
  const status = statusConfig[overallStatus];

  return (
    <main className={styles.mainContent} id="main-content">

      {/* ===== BLOCK 1: TÌNH TRẠNG CHUNG ===== */}
      <div
        className={styles.overallBlock}
        style={{ background: status.bg, borderColor: status.color }}
        id="overall-status"
      >
        <div className={styles.overallEmoji}>{status.emoji}</div>
        
        <div className={styles.overallInfo}>
          <div className={styles.overallLabel}>TÌNH TRẠNG TOÀN TỈNH BẮC NINH</div>
          <div className={styles.overallValueRow}>
            <span className={styles.pulseDot} style={{ background: status.color, boxShadow: `0 0 0 0 ${status.color}` }}></span>
            <div className={styles.overallValue} style={{ color: status.color }}>{status.label}</div>
          </div>
          <div className={styles.overallDate}>
            Cập nhật: 12/04/2025 — 15:25
          </div>
        </div>
      </div>



      {/* ===== BLOCK 2: BẢN ĐỒ THỰC ===== */}
      <div className={styles.mapCard} id="map-overview">
        <div className={styles.mapTitle}>Bản đồ giám sát thủy lợi & đê điều — Tỉnh Bắc Ninh</div>
        <div className={styles.mapBody}>
          <BacNinhMap />
        </div>
      </div>
      
      {/* ===== BLOCK 3: WIDGET ĐIỀU HÀNH (Thời tiết, Tiến độ) ===== */}
      <ExecutiveWidgets />

      {/* ===== BLOCK 4: BIỂU ĐỒ TỔNG QUAN ===== */}
      <OverviewCharts />

    </main>
  );
}
