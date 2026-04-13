/* ============================================
   REPORT VIEWER PAGE — Trang xem báo cáo PCTT
   Layout 3 cột: Data | Document | Chat
   ============================================ */
import { useState, useEffect } from 'react';
import styles from './ReportViewerPage.module.css';
import ReportDataPanel from '../../components/ReportDataPanel/ReportDataPanel';
import ReportDocument from '../../components/ReportDocument/ReportDocument';
import ReportChatPanel from '../../components/ReportChatPanel/ReportChatPanel';

export default function ReportViewerPage({ onDataPanelToggle }) {
  const [dataPanelOpen, setDataPanelOpen] = useState(true);

  /* Thông báo lên App khi panel mở/đóng để ẩn/hiện sidebar */
  useEffect(() => {
    onDataPanelToggle?.(dataPanelOpen);
    return () => onDataPanelToggle?.(false);   // reset khi rời khỏi trang
  }, [dataPanelOpen]);

  const handleCloseDataPanel = () => setDataPanelOpen(false);
  const handleOpenDataPanel = () => setDataPanelOpen(true);

  return (
    <div
      className={`${styles.reportPage} ${dataPanelOpen ? styles.dataPanelExpanded : ''}`}
      id="report-viewer-page"
    >
      {/* Cột Số liệu trích xuất — chiếm vị trí sidebar khi mở */}
      {dataPanelOpen && (
        <ReportDataPanel onClose={handleCloseDataPanel} />
      )}

      {/* Nút mở lại khi panel đã đóng */}
      {!dataPanelOpen && (
        <button
          className={styles.reopenBtn}
          onClick={handleOpenDataPanel}
          title="Mở số liệu trích xuất"
        >
          <span className={styles.reopenIcon}>📊</span>
          <span className={styles.reopenLabel}>Số liệu</span>
        </button>
      )}

      <ReportDocument />
      <ReportChatPanel />
    </div>
  );
}
