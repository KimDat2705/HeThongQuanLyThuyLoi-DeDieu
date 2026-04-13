/* ============================================
   REPORT DATA PANEL — Cột trái: Số liệu trích xuất
   Giao diện 7 Card theo mockups của người dùng
   ============================================ */
import styles from './ReportDataPanel.module.css';
import {
  stormData, rainfallData, waterLevelData,
  reservoirData, pumpData, infrastructureData, damageData,
} from '../../data/reportData';
import {
  FiWind, FiCloudRain, FiDroplet, FiDatabase,
  FiActivity, FiShield, FiCheckCircle, FiX, FiAlertTriangle, FiMapPin
} from 'react-icons/fi';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { BsHourglassSplit, BsCheckSquareFill } from 'react-icons/bs';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';

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

  /* Dữ liệu biểu đồ (rút gọn tên) */
  const chartData = allStations.map(s => ({
    name: s.name.length > 8 ? s.name.slice(0, 7) + '…' : s.name,
    mucNuoc: s.currentValue,
  }));

  const daXuLy = infrastructureData.thuyLoi.satTruot.filter(s => s.trangThai === 'Đã xử lý xong').length;

  return (
    <aside className={styles.panel} id="report-data-panel">
      <div className={styles.panelHeader}>
        <FiActivity className={styles.panelHeaderIcon} />
        <span>Số liệu trích xuất</span>
        <button className={styles.closeBtn} onClick={onClose} title="Thu gọn">
          <FiX />
        </button>
      </div>
      <div className={styles.panelScroll}>

        {/* ===== CARD 1: BÃO SỐ 11 ===== */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <FiWind className={styles.cardIcon} />
            <span className={styles.cardTitle}>Bão số 11</span>
          </div>
          <div className={styles.stormGrid}>
            <div className={styles.stormItem}>
              <div className={styles.stormVal}>Cấp {stormData.capBao}</div>
              <div className={styles.stormLbl}>Sức gió</div>
            </div>
            <div className={styles.stormItem}>
              <div className={styles.stormVal}>Giật {stormData.giatCap}</div>
              <div className={styles.stormLbl}>Cấp giật</div>
            </div>
            <div className={styles.stormItem}>
              <div className={styles.stormVal}>{stormData.huong}</div>
              <div className={styles.stormLbl}>Hướng</div>
            </div>
            <div className={styles.stormItem}>
              <div className={styles.stormVal}>{stormData.tocDo} km/h</div>
              <div className={styles.stormLbl}>Tốc độ</div>
            </div>
          </div>
        </div>

        {/* ===== CARD 2: LƯỢNG MƯA ===== */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <FiCloudRain className={styles.cardIcon} />
            <span className={styles.cardTitle}>Lượng mưa</span>
          </div>
          <div className={styles.cardSubtitle}>16h ngày 05/10 — 06h ngày 06/10</div>
          <div className={styles.rainGrid}>
            <div className={`${styles.rainItem} ${styles.bgBlue}`}>
              <div className={styles.rainVal}>{rainfallData.trungBinh} mm</div>
              <div className={styles.rainLbl}>Trung bình toàn tỉnh</div>
            </div>
            <div className={`${styles.rainItem} ${styles.bgPink}`}>
              <div className={styles.rainVal}>{rainfallData.caoNhat.value} mm</div>
              <div className={styles.rainLbl}>Cao nhất ({rainfallData.caoNhat.tram})</div>
            </div>
            <div className={`${styles.rainItem} ${styles.bgGreen}`}>
              <div className={styles.rainVal}>{rainfallData.thapNhat.value} mm</div>
              <div className={styles.rainLbl}>Thấp nhất ({rainfallData.thapNhat.trams.length} trạm)</div>
            </div>
          </div>
        </div>

        {/* ===== CARD 3: MỰC NƯỚC SÔNG ===== */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <FiDroplet className={styles.cardIcon} />
            <span className={styles.cardTitle}>Mực nước sông (06h 06/10)</span>
          </div>
          
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={chartData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
              <XAxis dataKey="name" fontSize={9} tick={{ fill: '#777' }} interval={0} />
              <YAxis fontSize={9} tick={{ fill: '#777' }} ticks={[0, 4, 8, 12, 16]} />
              <ReferenceLine y={0} stroke="#ccc" />
              <Bar dataKey="mucNuoc" radius={[4, 4, 0, 0]} barSize={26}>
                {chartData.map((_, idx) => {
                  const st = allStations[idx];
                  const fill = st.level === 'danger' ? '#E53935' :
                               st.level === 'warning' ? '#FB8C00' : '#4CAF50';
                  return <Cell key={idx} fill={fill} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <div className={styles.waterLegendList}>
            {allStations.map((st, i) => (
              <div className={styles.waterLegendRow} key={i}>
                <span className={styles.waterDot} style={{
                  background: st.level === 'danger' ? '#E53935' : st.level === 'warning' ? '#FB8C00' : '#4CAF50'
                }}></span>
                <span className={styles.waterName}>{st.name}</span>
                <span className={styles.waterCurrent}>{st.currentValue.toFixed(2)}m</span>
                <span className={`${styles.waterDelta} ${st.delta < 0 ? styles.deltaDown : styles.deltaUp}`}>
                  {st.delta > 0 ? '↑' : '↓'}{Math.abs(st.delta).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className={styles.forecastBadge}>
            <HiOutlineSpeakerphone size={16} />
            Dự báo 24h: Khả năng lên BĐ2 — BĐ3
          </div>
        </div>

        {/* ===== CARD 4: HỒ CHỨA ===== */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <FiDatabase className={styles.cardIcon} />
            <span className={styles.cardTitle}>Dung tích hồ chứa</span>
          </div>
          <div className={styles.resTrack}>
            {reservoirData.minPercent}—{reservoirData.maxPercent}%
          </div>
          <div className={styles.resLbl}>Dung tích thiết kế</div>
        </div>

        {/* ===== CARD 5: MÁY BƠM ====== */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <FiActivity className={styles.cardIcon} />
            <span className={styles.cardTitle}>Máy bơm tiêu</span>
          </div>
          <div className={styles.pumpHeaderRow}>
            <span className={styles.pumpTotalNum}>{pumpData.total}</span>
            <span className={styles.pumpTotalLbl}>máy đang hoạt động</span>
          </div>
          <div className={styles.pumpList}>
            {pumpData.areas.map((a, i) => (
              <div className={styles.pumpRow} key={i}>
                <span className={styles.pumpDot} style={{ background: a.color }}></span>
                <span className={styles.pumpName}>{a.name}</span>
                <span className={styles.pumpVal}>{a.value} máy</span>
              </div>
            ))}
          </div>
        </div>

        {/* ===== CARD 6: SỰ CỐ CÔNG TRÌNH ====== */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <FiShield className={styles.cardIcon} />
            <span className={styles.cardTitle}>Sự cố công trình</span>
          </div>

          <div className={styles.incTitle}>
            <FiAlertTriangle className={styles.incWarningIcon} />
            Đê điều: {infrastructureData.deDieu.suCo.length} sự cố (ổn định)
          </div>
          {infrastructureData.deDieu.suCo.map((sc, i) => (
            <div className={styles.incRow} key={`de-${i}`}>
              <FiMapPin className={styles.iconPin} />
              <div>
                <div className={styles.incLoc}>{sc.viTri} — {sc.tuyen}</div>
                <div className={styles.incSub}>{sc.diaDiem} • {sc.loai}</div>
              </div>
            </div>
          ))}

          <div className={styles.incTitle}>
            <FiAlertTriangle className={styles.incWarningIcon} />
            Sạt trượt: {infrastructureData.thuyLoi.satTruot.length} vị trí (bờ sông Ngũ Huyện Khê)
          </div>
          {infrastructureData.thuyLoi.satTruot.map((st, i) => (
            <div className={styles.incRow} key={`sl-${i}`}>
              {st.trangThai === 'Đã xử lý xong' ? 
                <BsCheckSquareFill className={styles.iconCheck} /> : 
                <BsHourglassSplit className={styles.iconHourglass} />
              }
              <div>
                <div className={styles.incLoc}>{st.viTri}</div>
                <div className={styles.incSub}>Dài {st.dai}, sâu {st.anSau} — {st.trangThai}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ===== CARD 7: THIỆT HẠI ====== */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <FiCheckCircle className={styles.cardIcon} />
            <span className={styles.cardTitle}>Thiệt hại</span>
          </div>
          <div className={styles.dmgBadge}>
            <FiCheckCircle className={styles.dmgIcon} />
            Không phát sinh thêm
          </div>
          <div className={styles.dmgText}>
            {damageData.cacXaHeNgap.length} xã/phường hết ngập:{' '}
            {damageData.cacXaHeNgap.join(', ')}
          </div>
        </div>

      </div>
    </aside>
  );
}
