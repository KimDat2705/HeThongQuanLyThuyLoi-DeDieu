import React from 'react';
import styles from './FloodStatusPage.module.css';
import { FiMapPin, FiClock } from 'react-icons/fi';

export default function FloodStatusPage() {
  // Dữ liệu mô phỏng lượng mưa thực đo (Vrain style)
  const stationRainfall = [
    { id: 1, name: 'Trạm Cầu Bình Than', rain1h: 0, rain24h: 15, status: 'normal', time: '15:00' },
    { id: 2, name: 'Trạm Kênh Vàng', rain1h: 45, rain24h: 120, status: 'warning', time: '15:00' },
    { id: 3, name: 'Trạm Yên Phong', rain1h: 65, rain24h: 180, status: 'danger', time: '15:00' },
    { id: 4, name: 'Trạm Lục Thủy', rain1h: 12, rain24h: 40, status: 'normal', time: '15:00' },
    { id: 5, name: 'Trạm Quế Võ', rain1h: 0, rain24h: 5, status: 'normal', time: '15:00' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'danger': return '#E53935';
      case 'warning': return '#F57C00';
      default: return '#2E7D32';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'danger': return 'Báo động';
      case 'warning': return 'Chú ý';
      default: return 'Bình thường';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Trạm Quan Trắc & Tình Hình Ngập Lụt</h1>
        <p className={styles.subtitle}>Giám sát số liệu lượng mưa liên tục theo thời gian thực (Nguồn: Vrain)</p>
      </div>

      <div className={styles.rainfallContainer}>
        <div className={styles.rainSummary}>
          <div className={styles.summaryBox}>
            <div className={styles.summaryLabel}>Tổng số trạm</div>
            <div className={styles.summaryValue}>{stationRainfall.length}</div>
          </div>
          <div className={styles.summaryBox}>
            <div className={styles.summaryLabel}>Vượt ngưỡng 1h</div>
            <div className={styles.summaryValue} style={{color: '#E53935'}}>
              {stationRainfall.filter(s => s.rain1h > 30).length}
            </div>
          </div>
          <div className={styles.summaryBox}>
            <div className={styles.summaryLabel}>Lượng mưa max (24h)</div>
            <div className={styles.summaryValue}>
              {Math.max(...stationRainfall.map(s => s.rain24h))} <span className={styles.unit}>mm</span>
            </div>
          </div>
        </div>

        <div className={styles.stationsList}>
          <h3 className={styles.listTitle}>Dữ liệu tại các trạm đo</h3>
          <div className={styles.tableWrapper}>
            <table className={styles.stationsTable}>
              <thead>
                <tr>
                  <th>Trạm</th>
                  <th>Cập nhật lúc</th>
                  <th>Lượng mưa 1h (mm)</th>
                  <th>Lượng mưa 24h (mm)</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {stationRainfall.map(station => (
                  <tr key={station.id}>
                    <td className={styles.stationName}>
                      <FiMapPin className={styles.pinIcon} /> {station.name}
                    </td>
                    <td>
                      <div className={styles.timeTag}>
                        <FiClock /> {station.time}
                      </div>
                    </td>
                    <td className={station.rain1h > 30 ? styles.highRain : ''}>
                      {station.rain1h}
                    </td>
                    <td className={station.rain24h > 100 ? styles.highRain : ''}>
                      {station.rain24h}
                    </td>
                    <td>
                      <span className={styles.statusBadge} style={{
                        backgroundColor: `${getStatusColor(station.status)}15`,
                        color: getStatusColor(station.status)
                      }}>
                        {getStatusLabel(station.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
