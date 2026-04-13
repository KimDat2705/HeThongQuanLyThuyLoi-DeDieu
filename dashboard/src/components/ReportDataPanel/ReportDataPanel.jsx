/* ============================================
   REPORT DATA PANEL — Cột trái: Số liệu trích xuất
   Bám sát 100% nội dung bản báo cáo .doc 06/10/2025
   PHIÊN BẢN 7 CARD ĐẦY ĐỦ (để so sánh)
   ============================================ */
import styles from './ReportDataPanel.module.css';
import {
  stormData, rainfallData, waterLevelData,
  reservoirData, pumpData, infrastructureData, damageData,
} from '../../data/reportData';
import {
  FiWind, FiCloudRain, FiDroplet, FiActivity,
  FiDatabase, FiShield, FiAlertTriangle, FiCheckCircle,
  FiX, FiMapPin,
} from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function ReportDataPanel({ onClose }) {
  /* Tính toán trạng thái mực nước */
  const allStations = waterLevelData.rivers.flatMap(r =>
    r.stations.map(s => {
      const current = s.readings[s.readings.length - 1].value;
      return {
        ...s, river: r.name, currentValue: current,
        level: current >= s.levels.BD3 ? 'danger' : current >= s.levels.BD1 ? 'warning' : 'safe',
      };
    })
  );
  const stationsAboveBD1 = allStations.filter(s => s.level !== 'safe');
  const stationsBelowBD1 = allStations.filter(s => s.level === 'safe');

  /* Dữ liệu biểu đồ */
  const waterChartData = allStations.map(s => ({
    name: s.name,
    mucNuoc: s.currentValue,
    BD1: s.levels.BD1,
  }));

  return (
    <aside className={styles.panel} id="report-data-panel">
      <div className={styles.panelHeader}>
        <FiActivity className={styles.panelHeaderIcon} />
        <span>Số liệu trích xuất</span>
        <button className={styles.closeBtn} onClick={onClose} title="Thu gọn số liệu">
          <FiX />
        </button>
      </div>
      <div className={styles.panelScroll}>

        {/* ===== CARD 1: BÃO SỐ 11 (Mục I) ===== */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <FiWind className={styles.cardIcon} />
            <span className={styles.cardTitle}>Bão số 11</span>
          </div>
          <div className={styles.stormGrid}>
            <div className={styles.stormItem}>
              <div className={styles.stormValue}>Cấp {stormData.capBao}</div>
              <div className={styles.stormLabel}>Sức gió</div>
            </div>
            <div className={styles.stormItem}>
              <div className={styles.stormValue}>Giật {stormData.giatCap}</div>
              <div className={styles.stormLabel}>Cấp giật</div>
            </div>
            <div className={styles.stormItem}>
              <div className={styles.stormValue}>{stormData.huong}</div>
              <div className={styles.stormLabel}>Hướng</div>
            </div>
            <div className={styles.stormItem}>
              <div className={styles.stormValue}>{stormData.tocDo} km/h</div>
              <div className={styles.stormLabel}>Tốc độ</div>
            </div>
          </div>
        </div>

        {/* ===== CARD 2: LƯỢNG MƯA (Mục II.1) ===== */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <FiCloudRain className={styles.cardIcon} />
            <span className={styles.cardTitle}>Lượng mưa</span>
          </div>
          <div className={styles.cardSubtitle}>16h ngày 05/10 — 06h ngày 06/10</div>
          <div className={styles.rainfallGrid}>
            <div className={styles.rainfallItem}>
              <div className={styles.rainfallValue}>{rainfallData.trungBinh} mm</div>
              <div className={styles.rainfallLabel}>Trung bình toàn tỉnh</div>
            </div>
            <div className={`${styles.rainfallItem} ${styles.rainfallMax}`}>
              <div className={styles.rainfallValue}>{rainfallData.caoNhat.value} mm</div>
              <div className={styles.rainfallLabel}>Cao nhất ({rainfallData.caoNhat.tram})</div>
            </div>
            <div className={`${styles.rainfallItem} ${styles.rainfallMin}`}>
              <div className={styles.rainfallValue}>{rainfallData.thapNhat.value} mm</div>
              <div className={styles.rainfallLabel}>Thấp nhất ({rainfallData.thapNhat.trams.length} trạm)</div>
            </div>
          </div>
        </div>

        {/* ===== CARD 3: MỰC NƯỚC SÔNG (Mục II.2.1) ===== */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <FiDroplet className={styles.cardIcon} />
            <span className={styles.cardTitle}>Mực nước sông</span>
          </div>
          <div className={styles.cardSubtitle}>Hồi 06h00 ngày 06/10/2025</div>

          {/* Tổng quan trạng thái */}
          <div className={styles.statusGrid}>
            <div className={`${styles.statusItem} ${styles.statusWarning}`}>
              <span className={styles.statusNum}>{stationsAboveBD1.length}</span>
              <span className={styles.statusText}>Trên BĐ1</span>
            </div>
            <div className={`${styles.statusItem} ${styles.statusSafe}`}>
              <span className={styles.statusNum}>{stationsBelowBD1.length}</span>
              <span className={styles.statusText}>Dưới BĐ1</span>
            </div>
          </div>

          {/* Biểu đồ */}
          <ResponsiveContainer width="100%" height={130}>
            <BarChart data={waterChartData} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" fontSize={9} tick={{ fill: '#666' }} />
              <YAxis fontSize={9} tick={{ fill: '#666' }} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
              <Bar dataKey="mucNuoc" name="Mực nước (m)" radius={[4, 4, 0, 0]}>
                {waterChartData.map((_, idx) => {
                  const st = allStations[idx];
                  const fill = st.level === 'danger' ? '#E53935' :
                               st.level === 'warning' ? '#FB8C00' : '#43A047';
                  return <Cell key={idx} fill={fill} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* Bảng chi tiết */}
          <div className={styles.waterTable}>
            <table>
              <thead>
                <tr>
                  <th>Trạm</th>
                  <th>06h (m)</th>
                  <th>Báo động</th>
                </tr>
              </thead>
              <tbody>
                {allStations.map((st, i) => (
                  <tr key={i}>
                    <td>
                      <div className={styles.stationName}>{st.name}</div>
                      <div className={styles.riverName}>{st.river}</div>
                    </td>
                    <td className={styles.valueCell}>{st.currentValue.toFixed(2)}</td>
                    <td>
                      <span className={
                        st.level === 'danger' ? styles.statusDanger :
                        st.level === 'warning' ? styles.statusWarningBadge :
                        styles.statusSafeBadge
                      }>
                        {st.readings[st.readings.length - 1].compare}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.forecastBadge}>
            📢 Dự báo 24h: Mực nước có khả năng lên lại, đạt BĐ2 — BĐ3
          </div>
        </div>

        {/* ===== CARD 4: HỒ CHỨA (Mục II.2.2) ===== */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <FiDatabase className={styles.cardIcon} />
            <span className={styles.cardTitle}>Dung tích hồ chứa</span>
          </div>
          <div className={styles.reservoirBar}>
            <div className={styles.reservoirTrack}>
              <div
                className={styles.reservoirFill}
                style={{ width: `${reservoirData.maxPercent}%` }}
              >
                <span>{reservoirData.minPercent}—{reservoirData.maxPercent}%</span>
              </div>
            </div>
            <div className={styles.reservoirLabel}>Dung tích thiết kế</div>
          </div>
        </div>

        {/* ===== CARD 5: MÁY BƠM TIÊU (Mục II.2.3) ===== */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <FiActivity className={styles.cardIcon} />
            <span className={styles.cardTitle}>Máy bơm tiêu</span>
          </div>
          <div className={styles.pumpTotal}>
            <span className={styles.pumpTotalNum}>{pumpData.total}</span>
            <span className={styles.pumpTotalLabel}>máy đang hoạt động</span>
          </div>
          <div className={styles.pumpLegend}>
            {pumpData.areas.map((a, i) => (
              <div className={styles.pumpRow} key={i}>
                <span className={styles.legendDot} style={{ background: a.color }}></span>
                <span className={styles.pumpName}>{a.name}</span>
                <span className={styles.pumpVal}>{a.value} máy</span>
              </div>
            ))}
          </div>
        </div>

        {/* ===== CARD 6: SỰ CỐ CÔNG TRÌNH (Mục IV) ===== */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <FiShield className={styles.cardIcon} />
            <span className={styles.cardTitle}>Sự cố công trình</span>
          </div>
          {/* Đê điều */}
          <div className={styles.incidentSection}>
            <div className={styles.incidentTitle}>
              <FiAlertTriangle className={styles.incidentIcon} />
              Đê điều: {infrastructureData.deDieu.suCo.length} sự cố (ổn định)
            </div>
            {infrastructureData.deDieu.suCo.map((sc, i) => (
              <div className={styles.incidentRow} key={i}>
                <FiMapPin className={styles.incidentPin} />
                <div>
                  <div className={styles.incidentLocation}>{sc.viTri} — {sc.tuyen}</div>
                  <div className={styles.incidentDetail}>{sc.diaDiem} • {sc.loai}</div>
                </div>
              </div>
            ))}
          </div>
          {/* Thủy lợi */}
          <div className={styles.incidentSection}>
            <div className={styles.incidentTitle}>
              <FiAlertTriangle className={styles.incidentIcon} />
              Sạt trượt: {infrastructureData.thuyLoi.satTruot.length} vị trí (bờ sông Ngũ Huyện Khê)
            </div>
            {infrastructureData.thuyLoi.satTruot.map((st, i) => (
              <div className={styles.incidentRow} key={i}>
                <span>{st.trangThai === 'Đã xử lý xong' ? '✅' : '⏳'}</span>
                <div>
                  <div className={styles.incidentLocation}>{st.viTri}</div>
                  <div className={styles.incidentDetail}>Dài {st.dai}, sâu {st.anSau} — {st.trangThai}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== CARD 7: THIỆT HẠI (Mục V) ===== */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <FiCheckCircle className={styles.cardIcon} />
            <span className={styles.cardTitle}>Tình hình thiệt hại</span>
          </div>
          <div className={styles.statusBadge}>
            <FiCheckCircle className={styles.statusBadgeIcon} />
            Không phát sinh thêm thiệt hại
          </div>
          <div className={styles.cardNote}>
            {damageData.cacXaHeNgap.length} xã/phường đã hết ngập, dân cư đang dọn dẹp
          </div>
          <div className={styles.tagList}>
            {damageData.cacXaHeNgap.map((xa, i) => (
              <span className={styles.tag} key={i}>{xa}</span>
            ))}
          </div>
        </div>

      </div>
    </aside>
  );
}
