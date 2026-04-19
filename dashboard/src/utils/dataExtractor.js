/**
 * DATA EXTRACTOR UTILS
 * Bóc tách chuỗi văn bản báo cáo (Từ QuickReportForm) thành mảng (Array/JSON)
 * để UI Component (ReportDataPanel) có thể lên biểu đồ đẹp mắt.
 */

/**
 * 1. Mực Nước Các Sông
 * Input Text VD: "Sông Cầu: Trạm Phúc Lộc Phương 5,14m; Trạm Đáp Cầu 4,37m. Sông Thương: Trạm Cầu Sơn 13,98m; Trạm Phủ Lạng Thương 4,00m."
 * Output Schema: [ { name: "Sông Cầu", stations: [ { name, readings: [{value}]} ] } ]
 */
export function parseWaterLevel(text) {
  if (!text) return [];
  const rivers = [];
  
  // Clean text and split by "."
  const sentences = text.replace(/\n/g, ' ').split(/(?:\.\s*Sông|\.\s*$)/).filter(Boolean);

  const riverRegex = /(?:Sông\s)?([^:]+):\s([^.]+)/g;
  let match;
  
  // To handle the first sentence lacking 'Sông' if it starts directly, we can just run regex on the whole block:
  // "Sông Cầu: Trạm Phúc Lộc Phương 5,14m; Trạm Đáp Cầu 4,37m. Sông Thương: Trạm Cầu Sơn..."
  
  // We'll normalize it to ensure 'Sông' is there for regex
  let normalizedText = text.replace(/Mực nước các sông.*?:(?!\s*Trạm)/, ''); // Remove prefix completely
  
  // Use a different approach: Split by 'Sông '
  const riverParts = normalizedText.split(/Sông\s+/).filter(Boolean);
  
  riverParts.forEach(part => {
    const colonIndex = part.indexOf(':');
    if (colonIndex > -1) {
      const riverName = "Sông " + part.substring(0, colonIndex).trim();
      const stationsText = part.substring(colonIndex + 1);
      
      const stParts = stationsText.split(';');
      const stations = []; // MISSING ARRAY INSTANTIATION FIXED
      
      stParts.forEach(sp => {
        const stationRegex = /(?:Trạm\s+)?([^\d(]+)/i;
        const sMatch = sp.match(stationRegex);
        
        if (sMatch) {
          let stName = sMatch[1].replace(/Trạm/i, '').trim();
          
          // Extract all numbers inside the string that end with m
          const valMatches = [...sp.matchAll(/(\d+[,.]\d+)\s*m/g)];
          let readings = [];
          
          if (valMatches.length > 0) {
             // For each matched value, push it
             valMatches.forEach(v => {
                readings.push({ value: parseFloat(v[1].replace(',', '.')) });
             });
             // We know the current value is the first one in the mock text
             // But wait, the text is: "5,14m (16h là 5,63m)"
             // So 5.14 is the 0th match. 5.63 is the 1st match.
             // We need to reverse it so the latest time is LAST in the readings array, 
             // which is what ReportDocument expects (reading[1] is later than reading[0])
             readings.reverse();
          } else {
             // fallback parsing if the "m" is missing
             const numMatch = sp.match(/(\d+[,.]\d+)/);
             if (numMatch) readings.push({ value: parseFloat(numMatch[1].replace(',', '.')) });
          }
          
          // Look for delta -> "giảm 0,49m"
          let delta = 0;
          const reduceMatch = sp.match(/giảm\s*(\d+[,.]\d+)/i);
          if (reduceMatch) delta = -parseFloat(reduceMatch[1].replace(',', '.'));
          const incMatch = sp.match(/tăng\s*(\d+[,.]\d+)/i);
          if (incMatch) delta = parseFloat(incMatch[1].replace(',', '.'));
        
          // Cung cấp mức báo động giả lập cố định để biểu đồ có thể tô màu
          let bd1 = 4.0, bd2 = 5.5, bd3 = 6.5; 
          if (stName.toLowerCase().includes('cầu sơn')) { bd1 = 14.0; bd2 = 15.0; bd3 = 16.0; }
          if (stName.toLowerCase().includes('phúc lộc')) { bd1 = 6.0; }

        stations.push({
          name: stName,
          readings: readings,
          levels: { BD1: bd1, BD2: bd2, BD3: bd3 },
          delta: delta
        });
      }
      });
      
      if (stations.length > 0) {
        rivers.push({ name: riverName, stations });
      }
    }
  });

  return rivers;
}

/**
 * 2. Mực Nước Hồ Chứa
 * VD: "Tổng dung tích các hồ chứa trên địa bàn tỉnh đang ở mức 80-98% dung tích thiết kế."
 */
export function parseReservoir(text) {
  if (!text) return null;
  const match = text.match(/ở mức (?:từ )?(\d+)-(\d+)%/i);
  if (match) {
    return {
      minPercent: parseInt(match[1], 10),
      maxPercent: parseInt(match[2], 10)
    };
  }
  return null;
}

/**
 * 3. Máy Bơm
 * VD: "Số tổ máy bơm tiêu đang hoạt động 112 máy (Bắc Đuống 57 máy, Nam Đuống 14 máy, Nam Sông Thương 41 máy)."
 */
export function parsePump(text) {
  if (!text) return { total: 0, areas: [] };
  const areas = [];
  const colors = ['#2E7D32', '#1565C0', '#F9A825', '#C62828', '#8E24AA'];
  
  // Lấy tổng số từ "(112 máy)"
  let total = 0;
  const totalMatch = text.match(/(\d+)\s*máy[^)]*\(/i);
  if (totalMatch) {
    total = parseInt(totalMatch[1], 10);
  } else {
    // Dự phòng tìm số lẻ
    const t = text.match(/động\s*(\d+)\s*máy/i);
    if (t) total = parseInt(t[1], 10);
  }

  // Bóc tách tổ máy trong ngoặc
  const match = text.match(/\(([^)]+)\)/);
  if (match) {
    const parts = match[1].split(/[;,]/);
    parts.forEach((p, i) => {
       const m = p.match(/(.*?)\s+(\d+)\s*máy/i);
       if (m) {
          areas.push({
            name: m[1].trim(),
            value: parseInt(m[2], 10),
            color: colors[i % colors.length]
          });
       }
    });
  }

  // Nếu không vào ngoặc được nhưng tổng thì lớn hơn 0
  return { total, areas };
}

/**
 * 4. Sự Cố Đê Điều
 * VD: "các sự cố sạt lở mái đê phía đồng tại vị trí K37+600 đê hữu Cầu, xã Yên Trung;"
 */
export function parseDeDieu(text) {
  if (!text) return [];
  const suCo = [];
  
  // Tách câu bởi dấu chấm phẩy
  const parts = text.replace(/\s+và\s+lỗ sủi/g, '; lỗ sủi').split(';');
  parts.forEach(p => {
    const m = p.match(/(.*?)\s+tại\s+(?:vị trí\s+)?(K\d+\+[\d]+)\s+([^,;]+)[\s,]+(.*?)$/i);
    if (m) {
       let loai = m[1].replace(/các sự cố|sự cố/, '').trim();
       if (loai.length > 0) loai = loai.charAt(0).toUpperCase() + loai.slice(1);
       let dDiem = m[4].replace(/\(.*\)/g, '').replace(/\./g, '').split(';')[0].trim();
       suCo.push({
         loai: loai || 'Sự cố đê',
         viTri: m[2].trim(),
         tuyen: m[3].trim(),
         diaDiem: dDiem, 
       });
    }
  });
  return suCo;
}

/**
 * 5. Sạt Trượt Thủy Lợi (Sông)
 * VD: "(1) K20+745 - K20+756 dài 11 m, ăn sâu khoảng 1,0 m; (2) K20+766 - K20+786..."
 */
export function parseThuyLoi(text) {
  if (!text) return [];
  const satTruot = [];
  
  // Match the numbered list (1)... (2)...
  const regex = /\(\d+\)\s+(K[\d+-\sK]+)\s+dài\s+(\d+.*?m)[^\d]+([\d,.]+\s*m)/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    satTruot.push({
      viTri: match[1].trim(),
      dai: match[2].trim(),
      anSau: match[3].trim(),
      trangThai: 'Đang chuẩn bị xử lý' // Hiển thị đồng hồ cát
    });
  }
  
  // Xử lý status nếu trong text có chữ "đã xử lý xong"
  if (text.toLowerCase().includes('đã xử lý xong')) {
    const doneMatch = text.match(/xử lý xong[^0-9]*((?:\d[\s,và]*)+)/i);
    if (doneMatch) {
      if (doneMatch[1].includes('1')) if (satTruot[0]) satTruot[0].trangThai = 'Đã xử lý xong';
      if (doneMatch[1].includes('2')) if (satTruot[1]) satTruot[1].trangThai = 'Đã xử lý xong';
      if (doneMatch[1].includes('3')) if (satTruot[2]) satTruot[2].trangThai = 'Đã xử lý xong';
      if (doneMatch[1].includes('4')) if (satTruot[3]) satTruot[3].trangThai = 'Đã xử lý xong';
    }
  }

  return satTruot;
}

/**
 * 6. Xã Phường Ngập
 * VD: "thuộc các xã Hợp Thịnh, Xuân Cẩm, Tam Giang, Nếnh và phường Vân Hà"
 */
export function parseDaMageArea(text) {
  if (!text) return [];
  const match = text.match(/thuộc các(?: xã| khu vưc| địa bàn)?([^.]+)(?:hết bị ngập|đang ngập|đang dọn|dọn dẹp)/i) 
              || text.match(/thuộc các xã ([^.]+)/i);
  if (match) {
    let rawStr = match[1].replace(/và/g, ',');
    return rawStr.split(',').map(s => s.trim().replace(/^phường /i, '').replace(/hết bị ngập.*/i, '')).filter(Boolean);
  }
  return [];
}
