/* ============================================
   REPORT DATA PANEL — Accordion Layout
   Thu gọn / Mở rộng — Đủ thông tin, gọn gàng
   ============================================ */
import { useState } from 'react';
import styles from './ReportDataPanel.module.css';
import {
  stormData, rainfallData, waterLevelData,
  reservoirData, pumpData, infrastructureData, damageData,
} from '../../data/reportData';
import {
  FiWind, FiCloudRain, FiDroplet, FiDatabase,
  FiActivity, FiShield, FiCheckCircle, FiX,
  FiAlertTriangle, FiMapPin, FiChevronDown,
} from 'react-icons/fi';
import { BsHourglassSplit, BsCheckSquareFill } from 'react-icons/bs';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';

export default function ReportDataPanel({ onClose }) {
  // Accordion state: lưu ID các section đang mở
  const [openSections, setOpenSections] = useState(new Set(['water']));

  const toggle = (id) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const isOpen = (id) => openSections.has(id);

  /* === Tính toán dữ liệu === */
  const allStations = waterLevelData.rivers.flatMap(r =>
    r.stations.map(s => {
      const current = s.readings[s.readings.length - 1].value;
      return {
        ...s, river: r.name, currentValue: current,
        level: current >= s.levels.BD3 ? 'danger' : current >= s.levels.BD1 ? 'warning' : 'safe',
      };
    })
  );

  const chartData = allStations.map(s => ({
    name: s.name.length > 8 ? s.name.slice(0, 7) + '…' : s.name,
    mucNuoc: s.currentValue,
  }));

  const aboveBD1 = allStations.filter(s => s.level !== 'safe').length;
  const totalSuCo = infrastructureData.deDieu.suCo.length + infrastructureData.thuyLoi.satTruot.length;

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

        {/* ===== 1. BÃO SỐ 11 ===== */}
        <div className={styles.accordion}>
          <button className={styles.accHeader} onClick={() => toggle('storm')}>
            <FiWind className={styles.accIcon} />
            <span className={styles.accTitle}>Bão số 11</span>
            <span className={styles.accBadge}>Cấp {stormData.capBao} • Giật {stormData.giatCap}</span>
            <FiChevronDown className={`${styles.accChevron} ${isOpen('storm') ? styles.accChevronOpen : ''}`} />
          </button>
          <div className={`${styles.accBody} ${isOpen('storm') ? styles.accBodyOpen : ''}`}>
            <div className={styles.accContent}>
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
          </div>
        </div>

        {/* ===== 2. LƯỢNG MƯA ===== */}
        <div className={styles.accordion}>
          <button className={styles.accHeader} onClick={() => toggle('rain')}>
            <FiCloudRain className={styles.accIcon} />
            <span className={styles.accTitle}>Lượng mưa</span>
            <span className={styles.accBadge}>TB {rainfallData.trungBinh}mm • Max {rainfallData.caoNhat.value}mm</span>
            <FiChevronDown className={`${styles.accChevron} ${isOpen('rain') ? styles.accChevronOpen : ''}`} />
          </button>
          <div className={`${styles.accBody} ${isOpen('rain') ? styles.accBodyOpen : ''}`}>
            <div className={styles.accContent}>
              <div className={styles.accSubtitle}>16h ngày 05/10 — 06h ngày 06/10</div>
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
          </div>
        </div>

        {/* ===== 3. MỰC NƯỚC SÔNG ===== */}
        <div className={styles.accordion}>
          <button className={styles.accHeader} onClick={() => toggle('water')}>
            <FiDroplet className={styles.accIcon} />
            <span className={styles.accTitle}>Mực nước sông</span>
            <span className={`${styles.accBadge} ${aboveBD1 > 0 ? styles.accBadgeWarn : ''}`}>
              {aboveBD1}/{allStations.length} trạm ≥BĐ1
            </span>
            <FiChevronDown className={`${styles.accChevron} ${isOpen('water') ? styles.accChevronOpen : ''}`} />
          </button>
          <div className={`${styles.accBody} ${isOpen('water') ? styles.accBodyOpen : ''}`}>
            <div className={styles.accContent}>
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
          </div>
        </div>

        {/* ===== 4. HỒ CHỨA & MÁY BƠM (gộp) ===== */}
        <div className={styles.accordion}>
          <button className={styles.accHeader} onClick={() => toggle('infra')}>
            <FiDatabase className={styles.accIcon} />
            <span className={styles.accTitle}>Hồ chứa & Máy bơm</span>
            <span className={styles.accBadge}>{reservoirData.maxPercent}% • {pumpData.total} máy</span>
            <FiChevronDown className={`${styles.accChevron} ${isOpen('infra') ? styles.accChevronOpen : ''}`} />
          </button>
          <div className={`${styles.accBody} ${isOpen('infra') ? styles.accBodyOpen : ''}`}>
            <div className={styles.accContent}>
              {/* Hồ chứa */}
              <div className={styles.accSectionLabel}>Dung tích hồ chứa</div>
              <div className={styles.resContainer}>
                <div className={styles.resTrack}>
                  <div className={styles.resFill} style={{ width: `${reservoirData.maxPercent}%` }}></div>
                  <div className={styles.resText}>{reservoirData.minPercent}—{reservoirData.maxPercent}%</div>
                </div>
              </div>
              <div className={styles.resLbl}>Dung tích thiết kế</div>

              <div className={styles.divider}></div>

              {/* Máy bơm */}
              <div className={styles.accSectionLabel}>Máy bơm tiêu</div>
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
          </div>
        </div>

        {/* ===== 5. SỰ CỐ CÔNG TRÌNH ===== */}
        <div className={styles.accordion}>
          <button className={styles.accHeader} onClick={() => toggle('incident')}>
            <FiShield className={styles.accIcon} />
            <span className={styles.accTitle}>Sự cố công trình</span>
            <span className={`${styles.accBadge} ${styles.accBadgeWarn}`}>{totalSuCo} sự cố</span>
            <FiChevronDown className={`${styles.accChevron} ${isOpen('incident') ? styles.accChevronOpen : ''}`} />
          </button>
          <div className={`${styles.accBody} ${isOpen('incident') ? styles.accBodyOpen : ''}`}>
            <div className={styles.accContent}>
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

              <div className={styles.divider}></div>

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
          </div>
        </div>

        {/* ===== 6. THIỆT HẠI ===== */}
        <div className={styles.accordion}>
          <button className={styles.accHeader} onClick={() => toggle('damage')}>
            <FiCheckCircle className={styles.accIcon} />
            <span className={styles.accTitle}>Thiệt hại</span>
            <span className={`${styles.accBadge} ${styles.accBadgeSafe}`}>Không phát sinh</span>
            <FiChevronDown className={`${styles.accChevron} ${isOpen('damage') ? styles.accChevronOpen : ''}`} />
          </button>
          <div className={`${styles.accBody} ${isOpen('damage') ? styles.accBodyOpen : ''}`}>
            <div className={styles.accContent}>
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
        </div>

      </div>
    </aside>
  );
}
