/* ============================================
   REPORT DOCUMENT — Bản báo cáo dạng HTML
   Bám sát 100% file .doc gốc ngày 06/10/2025
   Đầy đủ 6 mục chính
   ============================================ */
import styles from './ReportDocument.module.css';
import {
  reportMeta, stormData, rainfallData, waterLevelData,
  reservoirData, pumpData, responseActions,
  infrastructureData, damageData, proposalData,
} from '../../data/reportData';

export default function ReportDocument() {
  return (
    <section className={styles.documentArea} id="report-document">
      <div className={styles.paper}>

        {/* ===== HEADER CƠ QUAN ===== */}
        <div className={styles.docHeader}>
          <div className={styles.docHeaderLeft}>
            <div className={styles.orgNameSub}>{reportMeta.coQuanCap}</div>
            <div className={styles.orgName}>{reportMeta.coQuan}</div>
            <div className={styles.orgDivider}></div>
            <div className={styles.docNumber}>Số: {reportMeta.soHieu}</div>
          </div>
          <div className={styles.docHeaderRight}>
            <div className={styles.nationTitle}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
            <div className={styles.nationMotto}>Độc lập — Tự do — Hạnh phúc</div>
            <div className={styles.nationDivider}></div>
            <div className={styles.docDate}>
              Bắc Ninh, ngày {reportMeta.ngay.split('/')[0]} tháng {reportMeta.ngay.split('/')[1]} năm {reportMeta.ngay.split('/')[2]}
            </div>
          </div>
        </div>

        {/* ===== TIÊU ĐỀ ===== */}
        <div className={styles.docTitleBlock}>
          <h2 className={styles.docTitle}>{reportMeta.tieuDe}</h2>
          <p className={styles.docSubtitle}>{reportMeta.phuDe}</p>
          <p className={styles.docTimepoint}>(Từ {reportMeta.thoiDiemBaoCao})</p>
        </div>

        {/* ===== MỤC I: DIỄN BIẾN BÃO SỐ 11 ===== */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>I. DIỄN BIẾN BÃO SỐ 11</h3>
          <p className={styles.paragraph}>{stormData.viTri}</p>
          <p className={styles.paragraph}>{stormData.anhHuong}</p>
        </div>

        {/* ===== MỤC II: TÌNH HÌNH MỰC NƯỚC, LƯỢNG MƯA ===== */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>II. TÌNH HÌNH MỰC NƯỚC, LƯỢNG MƯA</h3>

          <h4 className={styles.subTitle}>1. Lượng mưa</h4>
          <p className={styles.paragraph}>{rainfallData.tongQuat}</p>

          <h4 className={styles.subTitle}>2. Mực nước các sông, hồ</h4>

          <p className={styles.paragraph}>
            <em>2.1. Mực nước sông:</em> {waterLevelData.moTa}
          </p>

          <table className={styles.docTable}>
            <thead>
              <tr>
                <th rowSpan={2}>TT</th>
                <th rowSpan={2}>Tên vị trí đo</th>
                <th colSpan={3}>Mực nước báo động (m)</th>
                <th colSpan={2}>Mực nước tại thời điểm (m)</th>
                <th rowSpan={2}>So sánh mực nước (m)</th>
              </tr>
              <tr>
                <th>I</th>
                <th>II</th>
                <th>III</th>
                <th>16h 05/10</th>
                <th>06h 06/10</th>
              </tr>
            </thead>
            <tbody>
              {waterLevelData.rivers.map((river, ri) => (
                river.stations.map((st, si) => (
                  <tr key={`${ri}-${si}`}>
                    {si === 0 && (
                      <td rowSpan={river.stations.length} className={styles.tdCenter}>
                        {river.tt}
                      </td>
                    )}
                    <td>
                      <div><strong>{river.name}</strong></div>
                      <div className={styles.stationLabel}>- Trạm {st.name}</div>
                    </td>
                    <td className={styles.tdCenter}>{st.levels.BD1.toFixed(2)}</td>
                    <td className={styles.tdCenter}>{st.levels.BD2.toFixed(2)}</td>
                    <td className={styles.tdCenter}>{st.levels.BD3.toFixed(2)}</td>
                    <td className={styles.tdCenter}>
                      <div>{st.readings[0].value.toFixed(2)}</div>
                      <div className={styles.compareNote}>({st.readings[0].compare})</div>
                    </td>
                    <td className={styles.tdCenter}>
                      <div>{st.readings[1].value.toFixed(2)}</div>
                      <div className={styles.compareNote}>({st.readings[1].compare})</div>
                    </td>
                    <td className={styles.tdCenter}>{st.delta.toFixed(2)}</td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>

          <div className={styles.forecastParagraph}>
            <strong>Dự báo:</strong> {waterLevelData.duBao}
          </div>

          <p className={styles.paragraph}>
            <em>2.2. Về hồ chứa:</em> {reservoirData.moTa}
          </p>

          <p className={styles.paragraph}>
            <em>2.3. Tình hình hoạt động của các máy bơm tiêu:</em> Số tổ máy bơm tiêu đang
            hoạt động <strong>{pumpData.total} máy</strong>{' '}
            ({pumpData.areas.map(a => `${a.name} ${a.value} máy`).join(', ')}).
          </p>
        </div>

        {/* ===== MỤC III: CÔNG TÁC CHỈ ĐẠO ỨNG PHÓ ===== */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>III. CÔNG TÁC CHỈ ĐẠO ỨNG PHÓ</h3>
          <ul className={styles.actionList}>
            {responseActions.map((act, i) => (
              <li key={i} className={styles.actionItem}>
                {act.date && <span className={styles.actionDate}>Ngày {act.date}</span>}{' '}
                {act.text}
              </li>
            ))}
          </ul>
        </div>

        {/* ===== MỤC IV: TÌNH HÌNH CÔNG TRÌNH ĐÊ ĐIỀU, THỦY LỢI ===== */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>IV. TÌNH HÌNH CÔNG TRÌNH ĐÊ ĐIỀU, THỦY LỢI</h3>

          <p className={styles.paragraph}>{infrastructureData.deDieu.moTa}</p>

          <p className={styles.paragraph}>
            <em>Về công trình thủy lợi:</em> {infrastructureData.thuyLoi.moTa}
          </p>

          <table className={styles.docTable}>
            <thead>
              <tr>
                <th>STT</th>
                <th>Vị trí</th>
                <th>Chiều dài</th>
                <th>Ăn sâu</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {infrastructureData.thuyLoi.satTruot.map((item, i) => (
                <tr key={i}>
                  <td className={styles.tdCenter}>{i + 1}</td>
                  <td>{item.viTri}</td>
                  <td className={styles.tdCenter}>{item.dai}</td>
                  <td className={styles.tdCenter}>{item.anSau}</td>
                  <td className={`${styles.tdCenter} ${
                    item.trangThai === 'Đã xử lý xong' ? styles.cellSafe : styles.cellWarning
                  }`}>{item.trangThai}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ===== MỤC V: TÌNH HÌNH THIỆT HẠI ===== */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>V. TÌNH HÌNH THIỆT HẠI</h3>
          <p className={styles.paragraph}>{damageData.phatSinh}</p>
          <p className={styles.paragraph}>{damageData.tinhHinh}</p>
        </div>

        {/* ===== MỤC VI: ĐỀ NGHỊ ===== */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>VI. ĐỀ NGHỊ</h3>
          <p className={styles.paragraph}>{proposalData.noiDung}</p>
        </div>

        {/* ===== FOOTER KÝ ===== */}
        <div className={styles.docFooter}>
          <div className={styles.footerLeft}>
            <div className={styles.footerLabel}>Nơi nhận:</div>
            <div className={styles.footerRecipients}>
              - TT Tỉnh ủy, HĐND tỉnh (b/c);<br />
              - Chủ tịch, các PCT UBND tỉnh (b/c);<br />
              - Ban CHQS PCTT&TKCN tỉnh (b/c);<br />
              - Các Sở, ngành liên quan;<br />
              - UBND các huyện, thị xã, thành phố;<br />
              - Các Công ty TNHH MTV KTCTTL;<br />
              - Lưu: VT, CCTL.
            </div>
          </div>
          <div className={styles.footerRight}>
            <div className={styles.footerPosition}>KT. GIÁM ĐỐC</div>
            <div className={styles.footerSubPosition}>{reportMeta.chucVu}</div>
            <div className={styles.footerSignature}>(Đã ký)</div>
            <div className={styles.footerName}>{reportMeta.nguoiKy}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
