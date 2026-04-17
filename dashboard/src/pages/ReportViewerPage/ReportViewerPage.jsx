/* ============================================
   REPORT VIEWER PAGE — Xem chi tiết 1 báo cáo
   Layout 2 cột: Data | Document
   Nhận reportId từ URL → load dữ liệu tương ứng
   ============================================ */
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ReportViewerPage.module.css';
import ReportDataPanel from '../../components/ReportDataPanel/ReportDataPanel';
import ReportDocument from '../../components/ReportDocument/ReportDocument';
import { db } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function ReportViewerPage({ onDataPanelToggle }) {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const [dataPanelOpen, setDataPanelOpen] = useState(true);
  
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  /* Lấy dữ liệu báo cáo (Chỉ từ Firebase) */
  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, 'reports', reportId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setReport({ id: docSnap.id, ...docSnap.data() });
        } else {
          navigate('/bao-cao', { replace: true });
        }
      } catch (err) {
        console.error('Lỗi khi tải báo cáo Firebase:', err);
        navigate('/bao-cao', { replace: true });
      } finally {
        setLoading(false);
      }
    };
    
    fetchReport();
  }, [reportId, navigate]);

  /* Thông báo lên App khi panel mở/đóng để ẩn/hiện sidebar */
  useEffect(() => {
    onDataPanelToggle?.(dataPanelOpen);
    return () => onDataPanelToggle?.(false);
  }, [dataPanelOpen, onDataPanelToggle]);

  if (loading) return <div style={{padding: 40, textAlign: 'center'}}>Đang tải dữ liệu hồ sơ...</div>;
  if (!report) return null;

  const handleCloseDataPanel = () => setDataPanelOpen(false);
  const handleOpenDataPanel = () => setDataPanelOpen(true);

  return (
    <div
      className={`${styles.reportPage} ${dataPanelOpen ? styles.dataPanelExpanded : ''}`}
      id="report-viewer-page"
    >
      {/* Cột Số liệu trích xuất */}
      {dataPanelOpen && (
        <ReportDataPanel report={report} onClose={handleCloseDataPanel} />
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

      <ReportDocument report={report} />
    </div>
  );
}
