import { FiCloudRain, FiCheckSquare } from 'react-icons/fi';
import styles from './ExecutiveWidgets.module.css';

export default function ExecutiveWidgets() {
  return (
    <div className={styles.container}>
      
      {/* Khối 1: Thời tiết & Khí tượng */}
      <div className={styles.widgetCard}>
        <div className={styles.widgetHeader}>
          <FiCloudRain className={styles.iconInfo} />
          <span>Thời tiết hôm nay</span>
        </div>
        <div className={styles.widgetContent}>
          <div className={styles.weatherAlert}>Cảnh báo Nắng nóng diện rộng</div>
          <div className={styles.weatherMetrics}>
            <div className={styles.metric}>
              <span className={styles.mLabel}>Nhiệt độ</span>
              <span className={styles.mValue}>37°C</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.mLabel}>Khả năng có mưa</span>
              <span className={styles.mValue}>20%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Khối 2: Tiến độ Công việc (Mini Project Tracker) */}
      <div className={styles.widgetCard}>
        <div className={styles.widgetHeader}>
          <FiCheckSquare className={styles.iconMuted} />
          <span>Tiến độ công việc đã giao</span>
        </div>
        <div className={styles.widgetContent}>
          <div className={styles.progressWidget}>
            <div className={styles.progressMain}>
              <div className={styles.progressCircle}>
                <span className={styles.progressVal}>65%</span>
                <span className={styles.progressLbl}>Tổng quan</span>
              </div>
            </div>
            <div className={styles.progressStats}>
              <div className={styles.pStatRow}>
                <div className={styles.pStatLabel}>
                  <span className={styles.pDot} style={{ background: '#4CAF50' }}></span>
                  Kịp tiến độ (8)
                </div>
                <div className={styles.pStatBar}>
                  <div className={styles.pBarFill} style={{ width: '80%', background: '#4CAF50' }}></div>
                </div>
              </div>
              <div className={styles.pStatRow}>
                <div className={styles.pStatLabel}>
                  <span className={styles.pDot} style={{ background: '#FF9800' }}></span>
                  Trễ tiến độ (3)
                </div>
                <div className={styles.pStatBar}>
                  <div className={styles.pBarFill} style={{ width: '30%', background: '#FF9800' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
