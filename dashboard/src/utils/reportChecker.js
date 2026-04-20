import { reportArchive } from '../data/reportArchiveData';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

/**
 * AI Engine check trùng lặp (Báo cáo Láo)
 * @param {Object} currentReport - Dữ liệu báo cáo hiện tại format đã parse
 * @returns {Object} - Kết quả phát hiện { isFake: boolean, percent: number, matchedTitle: string }
 */
export async function scanFakeReportAI(currentReport) {
  let highestScore = 0;
  let matchedReport = null;

  let combinedArchive = [...reportArchive];

  try {
     const snapshot = await getDocs(collection(db, 'reports_v2'));
     snapshot.forEach(doc => {
       combinedArchive.push({ id: doc.id, ...doc.data() });
     });
  } catch (error) {
     console.error('Lỗi khi tải kho báo cáo trực tuyến để quét AI: ', error);
  }

  combinedArchive.forEach(oldReport => {
    let score = 0;
    let maxScorable = 0;

    // Check 1: Lượng mưa trung bình
    if (currentReport.rainfall?.trungBinh && oldReport.rainfall?.trungBinh && currentReport.rainfall.trungBinh !== '--') {
      maxScorable += 30;
      const r1 = currentReport.rainfall.trungBinh.toString().replace(',', '.');
      const r2 = oldReport.rainfall.trungBinh.toString().replace(',', '.');
      if (Number(r1) === Number(r2) && !isNaN(Number(r1))) {
        score += 30; // Trùng lượng mưa lẻ thập phân là nghi vấn cực lớn
      }
    }

    // Check 2: Thiệt hại phát sinh
    if (currentReport.damage?.phatSinh && oldReport.damage?.phatSinh) {
      maxScorable += 40;
      const text1 = currentReport.damage.phatSinh.toLowerCase().trim();
      const text2 = oldReport.damage.phatSinh.toLowerCase().trim();
      
      if (text1 === text2) {
        score += 40;
      } else if (text1.length > 20 && text2.includes(text1.substring(0, 20))) {
        score += 20; // Copy 1 đoạn
      }
    }

    // Check 3: Diễn biến bão
    if (currentReport.storm?.viTri && oldReport.storm?.viTri) {
      maxScorable += 30;
      const text1 = currentReport.storm.viTri.toLowerCase().trim();
      const text2 = oldReport.storm.viTri.toLowerCase().trim();
      if (text1 === text2) {
        score += 30;
      }
    }

    // Check 4: Tiêu đề và Phụ đề (Dành cho trường hợp lười không thèm nhập nội dung)
    if (currentReport.meta?.tieuDe && oldReport.meta?.tieuDe) {
      maxScorable += 20;
      if (currentReport.meta.tieuDe.trim().toLowerCase() === oldReport.meta.tieuDe.trim().toLowerCase()) {
        score += 20;
      }
    }
    if (currentReport.meta?.phuDe && oldReport.meta?.phuDe) {
      maxScorable += 20;
      if (currentReport.meta.phuDe.trim().toLowerCase() === oldReport.meta.phuDe.trim().toLowerCase()) {
        score += 20;
      }
    }

    // Tính phần trăm
    if (maxScorable > 0) {
      const matchPercent = Math.round((score / maxScorable) * 100);
      if (matchPercent > highestScore) {
        highestScore = matchPercent;
        matchedReport = oldReport;
      }
    }
  });

  if (highestScore >= 75) { // Nếu giống > 75% thì bắt bài
    return {
      isFake: true,
      percent: highestScore,
      matchedTitle: matchedReport.meta.tieuDe + ' - ' + matchedReport.meta.phuDe + ` (Ngày ${matchedReport.meta.ngay})`
    };
  }

  return { isFake: false };
}
