/* ============================================
   REPORT DATA PANEL — Accordion Layout v3
   2-line header + smooth max-height transition
   ============================================ */
import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './ReportDataPanel.module.css';
import {
  FiWind, FiCloudRain, FiDroplet, FiDatabase,
  FiShield, FiAlertCircle, FiX, FiBarChart2, FiTool,
  FiAlertTriangle, FiMapPin, FiChevronDown,
} from 'react-icons/fi';
import { TbEngine } from 'react-icons/tb';
import { BsHourglassSplit, BsCheckSquareFill } from 'react-icons/bs';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';

/* ===== Accordion Item Component — 2-line header + smooth transition ===== */
function AccordionItem({ id, icon: Icon, title, isOpen, onToggle, children }) {
  const bodyRef = useRef(null);
  const [bodyHeight, setBodyHeight] = useState(0);

  /* Đo chiều cao thực của nội dung mỗi khi mở */
  useEffect(() => {
    if (isOpen && bodyRef.current) {
      setBodyHeight(bodyRef.current.scrollHeight);
    }
  }, [isOpen, children]);

  /* Re-measure on resize (charts may change height) */
  useEffect(() => {
    if (!isOpen || !bodyRef.current) return;
    const ro = new ResizeObserver(() => {
      if (bodyRef.current) setBodyHeight(bodyRef.current.scrollHeight);
    });
    ro.observe(bodyRef.current);
    return () => ro.disconnect();
  }, [isOpen, children]);

  return (
    <div className={`${styles.accordion} ${isOpen ? styles.accordionOpen : ''}`}>
      <button className={styles.accHeader} onClick={() => onToggle(id)}>
        <div className={styles.accIconWrap}>
          <Icon className={styles.accIcon} />
        </div>
        <div className={styles.accHeaderText}>
          <span className={styles.accTitle}>{title}</span>
        </div>
        <FiChevronDown className={`${styles.accChevron} ${isOpen ? styles.accChevronOpen : ''}`} />
      </button>

      {/* Body — always mounted, height animated via CSS */}
      <div
        ref={bodyRef}
        className={styles.accBody}
        style={{ maxHeight: isOpen ? bodyHeight + 'px' : '0px' }}
      >
        <div className={styles.accBodyInner}>
          <div className={styles.accContent}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReportDataPanel({ report, onClose }) {
  // Ensure we have a valid report object, if not provide empty defaults to avoid crashing
  const {
    storm = null,
    rainfall = null,
    waterLevel = null,
    reservoir = null,
    pump = null,
    infrastructure = null,
    damage = null
  } = report || {};

  const [openSections, setOpenSections] = useState(new Set(['storm', 'rain', 'water', 'reservoir', 'pump', 'incident', 'damage']));

  const toggle = useCallback((id) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const isOpen = (id) => openSections.has(id);

  /* === Tính toán dữ liệu === */
  let allStations = [];
  let chartData = [];
  
  if (waterLevel?.rivers) {
    allStations = waterLevel.rivers.flatMap(r =>
      r.stations.map(s => {
        const current = s.readings[s.readings.length - 1].value;
        return {
          ...s, river: r.name, currentValue: current,
          level: current >= s.levels.BD3 ? 'danger' : current >= s.levels.BD1 ? 'warning' : 'safe',
        };
      })
    );

    chartData = allStations.map(s => ({
      name: s.name.length > 8 ? s.name.slice(0, 7) + '…' : s.name,
      mucNuoc: s.currentValue,
    }));
  }

  return (
    <aside className={styles.panel} id="report-data-panel">
      <div className={styles.panelHeader}>
        <FiBarChart2 className={styles.panelHeaderIcon} />
        <span>Số liệu trích xuất</span>
        <button className={styles.closeBtn} onClick={onClose} title="Thu gọn">
          <FiX />
        </button>
      </div>
      <div className={styles.panelScroll}>

        {/* ===== 1. BÃO ===== */}
        {storm && (
          <AccordionItem
            id="storm" icon={FiWind} title={storm.ten || "Thông tin Bão"}
            isOpen={isOpen('storm')} onToggle={toggle}
          >
            <div className={styles.stormGrid}>
              <div className={styles.stormItem}>
                <div className={styles.stormVal}>Cấp {storm.capBao}</div>
                <div className={styles.stormLbl}>Sức gió</div>
              </div>
              <div className={styles.stormItem}>
                <div className={styles.stormVal}>Giật {storm.giatCap}</div>
                <div className={styles.stormLbl}>Cấp giật</div>
              </div>
              <div className={styles.stormItem}>
                <div className={styles.stormVal}>{storm.huong}</div>
                <div className={styles.stormLbl}>Hướng</div>
              </div>
              <div className={styles.stormItem}>
                <div className={styles.stormVal}>{storm.tocDo} km/h</div>
                <div className={styles.stormLbl}>Tốc độ</div>
              </div>
            </div>
          </AccordionItem>
        )}

        {/* ===== 2. LƯỢNG MƯA ===== */}
        {rainfall && (
          <AccordionItem
            id="rain" icon={FiCloudRain} title="Lượng mưa"
            isOpen={isOpen('rain')} onToggle={toggle}
          >
            <div className={styles.rainGrid}>
              <div className={`${styles.rainItem} ${styles.bgBlue}`}>
                <div className={styles.rainVal}>{rainfall.trungBinh} mm</div>
                <div className={styles.rainLbl}>Trung bình toàn tỉnh</div>
              </div>
              {rainfall.caoNhat && (
                <div className={`${styles.rainItem} ${styles.bgPink}`}>
                  <div className={styles.rainVal}>{rainfall.caoNhat.value} mm</div>
                  <div className={styles.rainLbl}>Cao nhất ({rainfall.caoNhat.tram})</div>
                </div>
              )}
              {rainfall.thapNhat && (
                <div className={`${styles.rainItem} ${styles.bgGreen}`}>
                  <div className={styles.rainVal}>{rainfall.thapNhat.value} mm</div>
                  <div className={styles.rainLbl}>Thấp nhất ({rainfall.thapNhat.trams?.length || 1} trạm)</div>
                </div>
              )}
            </div>
          </AccordionItem>
        )}

        {/* ===== 3. MỰC NƯỚC SÔNG ===== */}
        {waterLevel && (
          <AccordionItem
            id="water" icon={FiDroplet} title="Mực nước sông"
            isOpen={isOpen('water')} onToggle={toggle}
          >
            {chartData.length > 0 && (
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
            )}
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
            {chartData.length === 0 && waterLevel.moTa && (
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, marginBottom: '10px' }}>
                {waterLevel.moTa}
              </div>
            )}
            {waterLevel.duBao && (
              <div className={styles.forecastBadge}>
                <HiOutlineSpeakerphone size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>{waterLevel.duBao}</div>
              </div>
            )}
          </AccordionItem>
        )}

        {/* ===== 4. HỒ CHỨA (tách riêng) ===== */}
        {reservoir && (
          <AccordionItem
            id="reservoir" icon={FiDatabase} title="Dung tích hồ chứa"
            isOpen={isOpen('reservoir')} onToggle={toggle}
          >
            <div className={styles.resContainer}>
              <div className={styles.resTrack}>
                <div className={styles.resFill} style={{ width: `${reservoir.maxPercent}%` }}></div>
                <div className={styles.resText}>{reservoir.minPercent}—{reservoir.maxPercent}%</div>
              </div>
            </div>
            <div className={styles.resLbl}>Dung tích thiết kế</div>
          </AccordionItem>
        )}

        {/* ===== 5. MÁY BƠM TIÊU ===== */}
        {pump && (
          <AccordionItem
            id="pump" icon={TbEngine} title="Máy bơm tiêu"
            isOpen={isOpen('pump')} onToggle={toggle}
          >
            <div className={styles.pumpHeaderRow}>
              <span className={styles.pumpTotalNum}>{pump.total}</span>
              <span className={styles.pumpTotalLbl}>máy đang hoạt động</span>
            </div>
            {(!pump.areas || pump.areas.length === 0) && pump.moTa && (
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, marginTop: '10px' }}>
                 {pump.moTa}
              </div>
            )}
            <div className={styles.pumpList}>
              {pump.areas?.map((a, i) => (
                <div className={styles.pumpRow} key={i}>
                  <span className={styles.pumpDot} style={{ background: a.color }}></span>
                  <span className={styles.pumpName}>{a.name}</span>
                  <span className={styles.pumpVal}>{a.value} máy</span>
                </div>
              ))}
            </div>
          </AccordionItem>
        )}

        {/* ===== 6. SỰ CỐ CÔNG TRÌNH ===== */}
        {infrastructure && (
          <AccordionItem
            id="incident" icon={FiTool} title="Sự cố công trình"
            isOpen={isOpen('incident')} onToggle={toggle}
          >
            {infrastructure.deDieu?.suCo?.length > 0 && (
              <>
                <div className={styles.incTitle}>
                  <FiAlertTriangle className={styles.incWarningIcon} />
                  Đê điều: {infrastructure.deDieu.suCo.length} sự cố (ổn định)
                </div>
                {infrastructure.deDieu.suCo.map((sc, i) => (
                  <div className={styles.incRow} key={`de-${i}`}>
                    <FiMapPin className={styles.iconPin} />
                    <div>
                      <div className={styles.incLoc}>{sc.viTri} — {sc.tuyen}</div>
                      <div className={styles.incSub}>{sc.diaDiem} • {sc.loai}</div>
                    </div>
                  </div>
                ))}
              </>
            )}
            {(!infrastructure.deDieu?.suCo || infrastructure.deDieu.suCo.length === 0) && infrastructure.deDieu?.moTa && (
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, marginBottom: '8px' }}>
                <strong>Đê điều:</strong> {infrastructure.deDieu.moTa}
              </div>
            )}

            {infrastructure.deDieu?.suCo?.length > 0 && infrastructure.thuyLoi?.satTruot?.length > 0 && (
              <div className={styles.divider}></div>
            )}

            {infrastructure.thuyLoi?.satTruot?.length > 0 && (
              <>
                <div className={styles.incTitle}>
                  <FiAlertTriangle className={styles.incWarningIcon} />
                  Sạt trượt: {infrastructure.thuyLoi.satTruot.length} vị trí
                </div>
                {infrastructure.thuyLoi.satTruot.map((st, i) => (
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
              </>
            )}
            {(!infrastructure.thuyLoi?.satTruot || infrastructure.thuyLoi.satTruot.length === 0) && infrastructure.thuyLoi?.moTa && (
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, marginTop: '8px' }}>
                <strong>Thủy lợi:</strong> {infrastructure.thuyLoi.moTa}
              </div>
            )}
          </AccordionItem>
        )}

        {/* ===== 7. THIỆT HẠI ===== */}
        {damage && (
          <AccordionItem
            id="damage" icon={FiAlertCircle} title="Thiệt hại"
            isOpen={isOpen('damage')} onToggle={toggle}
          >
            {(!damage.cacXaHeNgap || damage.cacXaHeNgap.length === 0) ? (
              damage.tinhHinh ? (
                <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5 }}>
                  {damage.tinhHinh}
                </div>
              ) : (
                <div className={styles.dmgBadge}>
                  <FiAlertCircle className={styles.dmgIcon} />
                  Không có ngập lụt
                </div>
              )
            ) : (
              <div className={styles.dmgText}>
                {damage.cacXaHeNgap?.length} xã/phường có số liệu ngập:{' '}
                {damage.cacXaHeNgap?.join(', ')}
              </div>
            )}
            {damage.thietHaiUocTinh && (
              <div style={{marginTop: '10px', fontSize: '13px'}}>
                <strong>Thiệt hại ước tính:</strong> {damage.thietHaiUocTinh}
              </div>
            )}
          </AccordionItem>
        )}

      </div>
    </aside>
  );
}
