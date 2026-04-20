export const exportReportToWord = (report) => {
  if (!report) return;

  const {
    meta,
    storm,
    rainfall,
    waterLevel,
    reservoir,
    pump,
    infrastructure,
    damage,
    congTacUngPho,
    kienNghi
  } = report;

  const soHieu = meta?.soHieu || '';
  const ngayParts = meta?.ngay ? meta.ngay.split('/') : ['...', '...', '...'];
  const ngay = ngayParts.length === 3 ? ngayParts : ['...', '...', '...'];

  let htmlContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>${meta?.tieuDe || 'Báo cáo'}</title>
      <style>
        body { font-family: "Times New Roman", serif; font-size: 14pt; line-height: 1.5; }
        .header-table { width: 100%; text-align: center; margin-bottom: 20px; border: none; }
        .header-table td { border: none; padding: 0; }
        .org-name { font-weight: bold; }
        .doc-title { text-align: center; font-weight: bold; font-size: 16pt; text-transform: uppercase; margin-top: 20px; margin-bottom: 5px; }
        .doc-subtitle { text-align: center; font-style: italic; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 10px; }
        th, td { border: 1px solid black; padding: 5px; vertical-align: top; }
        th { font-weight: bold; text-align: center; }
        .section-title { font-weight: bold; margin-top: 15px; margin-bottom: 5px; font-size: 14pt; }
        .sub-title { font-weight: bold; font-style: italic; margin-top: 10px; margin-bottom: 5px; }
        .signature-table { width: 100%; margin-top: 30px; border: none; }
        .signature-table td { border: none; padding: 0; }
        .text-center { text-align: center; }
      </style>
    </head>
    <body>
      <table class="header-table">
        <tr>
          <td style="width: 40%;">
            <div>${meta?.coQuanCap || 'UBND TỈNH BẮC NINH'}</div>
            <div class="org-name">${meta?.coQuan || 'SỞ NÔNG NGHIỆP VÀ PTNT'}</div>
            <div style="border-top: 1px solid black; width: 50%; margin: 5px auto;"></div>
            <div>Số: ${soHieu}</div>
          </td>
          <td style="width: 60%;">
            <div class="org-name">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
            <div class="org-name">Độc lập - Tự do - Hạnh phúc</div>
            <div style="border-top: 1px solid black; width: 50%; margin: 5px auto;"></div>
            <div><i style="font-size: 12pt;">Bắc Ninh, ngày ${ngay[0] || '...'} tháng ${ngay[1] || '...'} năm ${ngay[2] || '...'}</i></div>
          </td>
        </tr>
      </table>

      <div class="doc-title">${(meta?.tieuDe || 'BÁO CÁO').replace(/\n/g, '<br/>')}</div>
      <div class="doc-subtitle">${meta?.phuDe || ''}</div>
      ${meta?.thoiDiemBaoCao ? `<div style="text-align: center; font-style: italic;">(Từ ${meta.thoiDiemBaoCao})</div>` : ''}

  `;

  // Mục 1
  if (storm) {
    htmlContent += `
      <div class="section-title">I. DIỄN BIẾN BÃO</div>
      <p>${storm.viTri || ''}</p>
      <p>${storm.anhHuong || ''}</p>
    `;
  }

  // Mục 2
  if (rainfall || waterLevel || reservoir || pump) {
    htmlContent += `<div class="section-title">${storm ? 'II' : 'I'}. TÌNH HÌNH MỰC NƯỚC, LƯỢNG MƯA</div>`;
    
    if (rainfall) {
      htmlContent += `
        <div class="sub-title">1. Lượng mưa</div>
        <p>${rainfall.tongQuat || ''}</p>
      `;
    }

    if (waterLevel || reservoir || pump) {
      htmlContent += `<div class="sub-title">2. Mực nước các sông, hồ</div>`;
      
      if (waterLevel) {
        htmlContent += `<p><i>2.1. Mực nước sông:</i> ${waterLevel.moTa || ''}</p>`;
        
        if (waterLevel.rivers && waterLevel.rivers.length > 0) {
          htmlContent += `
            <table>
              <tr>
                <th rowspan="2">TT</th>
                <th rowspan="2">Tên vị trí đo</th>
                <th colspan="3">Mực nước báo động (m)</th>
                <th colspan="2">Mực nước tại thời điểm (m)</th>
                <th rowspan="2">So sánh (m)</th>
              </tr>
              <tr>
                <th>I</th>
                <th>II</th>
                <th>III</th>
                <th>Báo cáo</th>
                <th>Lần trước</th>
              </tr>
          `;
          waterLevel.rivers.forEach((river, ri) => {
            river.stations?.forEach((st, si) => {
              htmlContent += `<tr>`;
              if (si === 0) {
                htmlContent += `<td rowspan="${river.stations.length}" class="text-center">${river.tt || ri + 1}</td>`;
              }
              htmlContent += `
                <td><b>${river.name}</b><br/>- Trạm ${st.name}</td>
                <td class="text-center">${st.levels?.BD1?.toFixed(2) || ''}</td>
                <td class="text-center">${st.levels?.BD2?.toFixed(2) || ''}</td>
                <td class="text-center">${st.levels?.BD3?.toFixed(2) || ''}</td>
                <td class="text-center">${st.readings && st.readings[0] ? st.readings[0].value.toFixed(2) : ''}</td>
                <td class="text-center">${st.readings && st.readings[1] ? st.readings[1].value.toFixed(2) : ''}</td>
                <td class="text-center">${st.delta != null ? st.delta.toFixed(2) : ''}</td>
              </tr>`;
            });
          });
          htmlContent += `</table>`;
        }
        
        if (waterLevel.duBao) {
          htmlContent += `<p><b>Dự báo:</b> ${waterLevel.duBao}</p>`;
        }
      }

      if (reservoir) {
        htmlContent += `<p><i>2.2. Về hồ chứa:</i> ${reservoir.moTa || ''}</p>`;
      }

      if (pump) {
        htmlContent += `<p><i>2.3. Tình hình máy bơm tiêu:</i> Số tổ máy đang hoạt động <b>${pump.total || 0} máy</b>. </p>`;
      }
    }
  }

  // Mục 3
  if (infrastructure) {
    htmlContent += `<div class="section-title">${storm ? 'III' : 'II'}. TÌNH HÌNH CÔNG TRÌNH ĐÊ ĐIỀU, THỦY LỢI</div>`;
    if (infrastructure.deDieu) {
      htmlContent += `<p>${infrastructure.deDieu.moTa || ''}</p>`;
    }
    if (infrastructure.thuyLoi) {
      htmlContent += `<p><i>Về công trình thủy lợi:</i> ${infrastructure.thuyLoi.moTa || ''}</p>`;
      if (infrastructure.thuyLoi.satTruot && infrastructure.thuyLoi.satTruot.length > 0) {
        htmlContent += `
          <table>
            <tr>
              <th>STT</th>
              <th>Vị trí</th>
              <th>Chiều dài</th>
              <th>Ăn sâu</th>
              <th>Trạng thái</th>
            </tr>
        `;
        infrastructure.thuyLoi.satTruot.forEach((item, i) => {
          htmlContent += `
            <tr>
              <td class="text-center">${i + 1}</td>
              <td>${item.viTri || ''}</td>
              <td class="text-center">${item.dai || ''}</td>
              <td class="text-center">${item.anSau || ''}</td>
              <td class="text-center">${item.trangThai || ''}</td>
            </tr>
          `;
        });
        htmlContent += `</table>`;
      }
    }
  }

  // Mục 4
  if (damage && damage.phatSinh) {
    let index = storm ? (infrastructure ? 'IV' : 'III') : (infrastructure ? 'III' : 'II');
    htmlContent += `<div class="section-title">${index}. TÌNH HÌNH THIỆT HẠI</div>`;
    htmlContent += damage.phatSinh.split('\n').map(line => `<p>${line}</p>`).join('');
  }

  // Mục 5
  if (congTacUngPho) {
    htmlContent += `<div class="section-title">V. CÔNG TÁC CHỈ ĐẠO ỨNG PHÓ</div>`;
    htmlContent += congTacUngPho.split('\n').map(line => `<p>${line}</p>`).join('');
  }

  // Mục 6
  if (kienNghi) {
    htmlContent += `<div class="section-title">VI. ĐỀ NGHỊ</div>`;
    htmlContent += kienNghi.split('\n').map(line => `<p>${line}</p>`).join('');
  }

  // Chữ ký
  htmlContent += `
      <table class="signature-table">
        <tr>
          <td style="width: 50%; font-size: 12pt;">
            <b><i>Nơi nhận:</i></b><br/>
            - TT Tỉnh ủy, HĐND tỉnh (b/c);<br />
            - Chủ tịch, các PCT UBND (b/c);<br />
            - Ban CHQS PCTT&TKCN (b/c);<br />
            - Các Sở, ngành liên quan;<br />
            - Lưu: VT.
          </td>
          <td style="width: 50%;" class="text-center">
            <b>${meta?.chucVu || 'GIÁM ĐỐC'}<br/><br/><br/><br/><br/>${meta?.nguoiKy || '(Đã ký)'}</b>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', htmlContent], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `BaoCao_${report.id || 'PCTT'}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
