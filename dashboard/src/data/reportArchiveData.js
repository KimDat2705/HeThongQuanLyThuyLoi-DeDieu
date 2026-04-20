/* ============================================
   KHO LƯU TRỮ BÁO CÁO PCTT — Tỉnh Bắc Ninh
   Chứa nhiều báo cáo từ nhiều nguồn & thời điểm
   ============================================ */

export const reportArchive = [];

/* ============================================
   HELPER: Tìm báo cáo theo ID
   ============================================ */
export function getReportById(id) {
  return reportArchive.find(r => r.id === id) || null;
}

/* ============================================
   HELPER: Lấy danh sách tóm tắt cho Archive Page
   ============================================ */
export function getArchiveSummary() {
  return reportArchive.map(r => ({
    id: r.id,
    tieuDe: r.meta.tieuDe,
    phuDe: r.meta.phuDe,
    ngay: r.meta.ngay,
    coQuan: r.meta.coQuan,
    loaiBaoCao: r.meta.loaiBaoCao,
    capHanhChinh: r.meta.capHanhChinh,
    trangThai: r.meta.trangThai,
    mucDoUuTien: r.meta.mucDoUuTien,
    tags: r.meta.tags,
    stormName: r.storm?.ten || null,
    rainfallAvg: r.rainfall?.trungBinh || 0,
  }));
}
