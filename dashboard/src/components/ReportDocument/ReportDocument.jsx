/* ============================================
   REPORT DOCUMENT — Bản báo cáo dạng HTML
   Bám sát 100% file .doc gốc ngày 06/10/2025
   Đầy đủ 6 mục chính
   ============================================ */
import styles from './ReportDocument.module.css';

export default function ReportDocument({ report }) {
  if (!report) return null;

  const {
    meta,
    storm,
    rainfall,
    waterLevel,
    reservoir,
    pump,
    infrastructure,
    damage,
  } = report;

  // For older data that might not be in the archive structure, fake some data if needed,
  // but archive structure guarantees meta.
  const soHieu = meta?.soHieu || '';
  const ngayParts = meta?.ngay ? meta.ngay.split('/') : ['...', '...', '...'];
  const ngay = ngayParts.length === 3 ? ngayParts : ['...', '...', '...'];

  return (
    <section className={styles.documentArea} id="report-document">
      <div className={styles.paper}>

        {/* ===== HEADER CƠ QUAN ===== */}
        <div className={styles.docHeader}>
          <div className={styles.docHeaderLeft}>
            <div className={styles.orgNameSub}>{meta?.coQuanCap || 'UBND TỈNH BẮC NINH'}</div>
            <div className={styles.orgName}>{meta?.coQuan || 'SỞ NÔNG NGHIỆP VÀ MÔI TRƯỜNG'}</div>
            <div className={styles.orgDivider}></div>
            <div className={styles.docNumber}>Số: {soHieu}</div>
          </div>
          <div className={styles.docHeaderRight}>
            <div className={styles.nationTitle}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
            <div className={styles.nationMotto}>Độc lập — Tự do — Hạnh phúc</div>
            <div className={styles.nationDivider}></div>
            <div className={styles.docDate}>
              Bắc Ninh, ngày {ngay[0]} tháng {ngay[1]} năm {ngay[2]}
            </div>
          </div>
        </div>

        {/* ===== TIÊU ĐỀ ===== */}
        <div className={styles.docTitleBlock}>
          <h2 className={styles.docTitle}>{meta?.tieuDe || 'BÁO CÁO'}</h2>
          <p className={styles.docSubtitle}>{meta?.phuDe || ''}</p>
          {meta?.thoiDiemBaoCao && (
            <p className={styles.docTimepoint}>(Từ {meta.thoiDiemBaoCao})</p>
          )}
        </div>

        {/* ===== MỤC I: DIỄN BIẾN BÃO ===== */}
        {storm && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>I. DIỄN BIẾN BÃO</h3>
            <p className={styles.paragraph}>{storm.viTri}</p>
            <p className={styles.paragraph}>{storm.anhHuong}</p>
          </div>
        )}

        {/* ===== MỤC II: TÌNH HÌNH MỰC NƯỚC, LƯỢNG MƯA ===== */}
        {(rainfall || waterLevel || reservoir || pump) && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>{storm ? 'II' : 'I'}. TÌNH HÌNH MỰC NƯỚC, LƯỢNG MƯA</h3>

            {rainfall && (
              <>
                <h4 className={styles.subTitle}>1. Lượng mưa</h4>
                <p className={styles.paragraph}>{rainfall.tongQuat}</p>
              </>
            )}

            {(waterLevel || reservoir || pump) && (
              <>
                <h4 className={styles.subTitle}>2. Mực nước các sông, hồ</h4>

                {waterLevel && (
                  <>
                    <p className={styles.paragraph}>
                      <em>2.1. Mực nước sông:</em> {waterLevel.moTa}
                    </p>

                    {waterLevel.rivers && waterLevel.rivers.length > 0 && (
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
                            <th>Thời điểm báo cáo</th>
                            <th>Lần trước</th>
                          </tr>
                        </thead>
                        <tbody>
                          {waterLevel.rivers.map((river, ri) => (
                            river.stations?.map((st, si) => (
                              <tr key={`${ri}-${si}`}>
                                {si === 0 && (
                                  <td rowSpan={river.stations.length} className={styles.tdCenter}>
                                    {river.tt || ri + 1}
                                  </td>
                                )}
                                <td>
                                  <div><strong>{river.name}</strong></div>
                                  <div className={styles.stationLabel}>- Trạm {st.name}</div>
                                </td>
                                <td className={styles.tdCenter}>{st.levels?.BD1?.toFixed(2)}</td>
                                <td className={styles.tdCenter}>{st.levels?.BD2?.toFixed(2)}</td>
                                <td className={styles.tdCenter}>{st.levels?.BD3?.toFixed(2)}</td>
                                {st.readings && st.readings.length >= 2 ? (
                                  <>
                                    <td className={styles.tdCenter}>
                                      <div>{st.readings[0].value.toFixed(2)}</div>
                                      <div className={styles.compareNote}>({st.readings[0].compare})</div>
                                    </td>
                                    <td className={styles.tdCenter}>
                                      <div>{st.readings[1].value.toFixed(2)}</div>
                                      <div className={styles.compareNote}>({st.readings[1].compare})</div>
                                    </td>
                                  </>
                                ) : (
                                  <><td></td><td></td></>
                                )}
                                <td className={styles.tdCenter}>{st.delta?.toFixed(2)}</td>
                              </tr>
                            ))
                          ))}
                        </tbody>
                      </table>
                    )}
                    
                    {waterLevel.duBao && (
                      <div className={styles.forecastParagraph}>
                        <strong>Dự báo:</strong> {waterLevel.duBao}
                      </div>
                    )}
                  </>
                )}

                {reservoir && (
                  <p className={styles.paragraph}>
                    <em>2.2. Về hồ chứa:</em> {reservoir.moTa}
                  </p>
                )}

                {pump && (
                  <p className={styles.paragraph}>
                    <em>2.3. Tình hình hoạt động của các máy bơm tiêu:</em> Số tổ máy bơm tiêu đang
                    hoạt động <strong>{pump.total} máy</strong>{' '}
                    ({pump.areas?.map(a => `${a.name} ${a.value} máy`).join(', ')}).
                  </p>
                )}
              </>
            )}
          </div>
        )}

        {/* ===== MỤC CÔNG TRÌNH ĐÊ ĐIỀU, THỦY LỢI ===== */}
        {infrastructure && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>{report.storm ? 'III' : 'II'}. TÌNH HÌNH CÔNG TRÌNH ĐÊ ĐIỀU, THỦY LỢI</h3>

            {infrastructure.deDieu && (
              <p className={styles.paragraph}>{infrastructure.deDieu.moTa}</p>
            )}

            {infrastructure.thuyLoi && (
              <>
                <p className={styles.paragraph}>
                  <em>Về công trình thủy lợi:</em> {infrastructure.thuyLoi.moTa}
                </p>

                {infrastructure.thuyLoi.satTruot && infrastructure.thuyLoi.satTruot.length > 0 && (
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
                      {infrastructure.thuyLoi.satTruot.map((item, i) => (
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
                )}
              </>
            )}
          </div>
        )}

        {/* ===== MỤC TÌNH HÌNH THIỆT HẠI ===== */}
        {damage && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>{report.storm ? (infrastructure ? 'IV' : 'III') : (infrastructure ? 'III' : 'II')}. TÌNH HÌNH THIỆT HẠI</h3>
            <p className={styles.paragraph}>{damage.phatSinh}</p>
            <p className={styles.paragraph}>{damage.tinhHinh}</p>
            {damage.thietHaiUocTinh && (
              <p className={styles.paragraph}><strong>Ước tính thiệt hại:</strong> {damage.thietHaiUocTinh}</p>
            )}
          </div>
        )}

        {/* ===== FOOTER KÝ ===== */}
        <div className={styles.docFooter}>
          <div className={styles.footerLeft}>
            <div className={styles.footerLabel}>Nơi nhận:</div>
            <div className={styles.footerRecipients}>
              - TT Tỉnh ủy, HĐND tỉnh (b/c);<br />
              - Chủ tịch, các PCT UBND (b/c);<br />
              - Ban CHQS PCTT&TKCN (b/c);<br />
              - Các Sở, ngành liên quan;<br />
              - Lãnh đạo các cấp;<br />
              - Lưu: VT.
            </div>
          </div>
          <div className={styles.footerRight}>
            <div className={styles.footerPosition}>
              {meta?.chucVu === 'GIÁM ĐỐC' ? 'GIÁM ĐỐC' : `KT. TRƯỞNG BAN`}
            </div>
            <div className={styles.footerSubPosition}>{meta?.chucVu}</div>
            <div className={styles.footerSignature}>(Đã ký)</div>
            <div className={styles.footerName}>{meta?.nguoiKy}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
