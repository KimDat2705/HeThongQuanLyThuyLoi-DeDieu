/* ============================================
   REPORT ARCHIVE PAGE — Kho lưu trữ Báo cáo PCTT
   Giao diện thư viện dạng Grid + Bộ lọc thông minh
   ============================================ */
import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ReportArchivePage.module.css';
import { db } from '../../config/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import {
  FiSearch, FiFilter, FiFileText, FiCalendar,
  FiChevronRight, FiAlertTriangle, FiCloudRain,
  FiWind, FiShield, FiMapPin, FiLoader, FiDownload
} from 'react-icons/fi';
import { exportReportToWord } from '../../utils/exportReportToWord';

/* Icon theo mức độ ưu tiên */
function getPriorityStyle(priority) {
  switch (priority) {
    case 'Khẩn cấp': return { color: '#E53935', bg: '#FFEBEE', icon: <FiAlertTriangle /> };
    case 'Cao': return { color: '#FB8C00', bg: '#FFF3E0', icon: <FiWind /> };
    case 'Trung bình': return { color: '#1565C0', bg: '#E3F2FD', icon: <FiCloudRain /> };
    default: return { color: '#43A047', bg: '#E8F5E9', icon: <FiShield /> };
  }
}

/* Icon loại báo cáo */
function getTypeIcon(type) {
  if (type.includes('nhanh')) return '⚡';
  if (type.includes('thiệt hại')) return '📋';
  if (type.includes('tổng hợp')) return '📊';
  return '📄';
}

export default function ReportArchivePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterYear, setFilterYear] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');

  const [allReports, setAllReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Firestore reports ONLY
  useEffect(() => {
    const fetchFirebaseReports = async () => {
      setIsLoading(true);
      try {
        const q = query(collection(db, 'reports_v2'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const fbDocs = snapshot.docs.map(doc => {
          const r = doc.data();
          return {
            id: doc.id,
            tieuDe: r.meta?.tieuDe || 'Báo cáo',
            phuDe: r.meta?.phuDe || '',
            ngay: r.meta?.ngay || new Date().toLocaleDateString('vi-VN'),
            coQuan: r.meta?.coQuan || '',
            loaiBaoCao: r.meta?.loaiBaoCao || 'Báo cáo nhanh',
            capHanhChinh: r.meta?.capHanhChinh || 'Tỉnh',
            trangThai: r.meta?.trangThai || 'Chờ duyệt',
            mucDoUuTien: r.meta?.mucDoUuTien || 'Trung bình',
            tags: r.meta?.tags || ['Mới nhập'],
            stormName: r.storm?.ten || null,
            rainfallAvg: r.rainfall?.trungBinh || 0,
            originalData: r
          };
        });
        
        setAllReports(fbDocs);
      } catch (err) {
        console.error("Lỗi tải kho báo cáo: ", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFirebaseReports();
  }, []);

  /* Filter Setup */
  const years = useMemo(() => {
    return [...new Set(allReports.map(r => r.ngay.split('/').pop()))].sort().reverse();
  }, [allReports]);
  const reportTypes = useMemo(() => {
    return [...new Set(allReports.map(r => r.loaiBaoCao))];
  }, [allReports]);
  const adminLevels = useMemo(() => {
    return [...new Set(allReports.map(r => r.capHanhChinh))];
  }, [allReports]);

  /* Lọc báo cáo */
  const filtered = useMemo(() => {
    return allReports.filter(r => {
      const year = r.ngay.split('/').pop();
      if (filterYear !== 'all' && year !== filterYear) return false;
      if (filterType !== 'all' && r.loaiBaoCao !== filterType) return false;
      if (filterLevel !== 'all' && r.capHanhChinh !== filterLevel) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          r.phuDe.toLowerCase().includes(q) ||
          r.coQuan.toLowerCase().includes(q) ||
          (r.stormName && r.stormName.toLowerCase().includes(q)) ||
          (r.tags && r.tags.some(t => t.toLowerCase().includes(q)))
        );
      }
      return true;
    });
  }, [search, filterYear, filterType, filterLevel, allReports]);

  const handleOpenReport = (id) => {
    navigate(`/bao-cao/${id}`);
  };

  const handleExportDoc = (e, report) => {
    e.stopPropagation();
    exportReportToWord({ id: report.id, ...report.originalData });
  };

  return (
    <div className={styles.archivePage}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerLeft}>
          <h1 className={styles.pageTitle}>
            <FiFileText className={styles.titleIcon} />
            Kho lưu trữ Báo cáo PCTT
          </h1>
          <p className={styles.pageSubtitle}>
            Phòng chống thiên tai — Tỉnh Bắc Ninh • {allReports.length} báo cáo
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Tìm kiếm báo cáo theo từ khóa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filters}>
          <FiFilter className={styles.filterIcon} />

          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">Tất cả năm</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">Tất cả loại</option>
            {reportTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">Tất cả cấp</option>
            {adminLevels.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      </div>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#64748B' }}>
          <FiLoader className={styles.searchIcon} style={{ fontSize: 32, animation: 'spin 1s linear infinite' }} />
          <p style={{ marginTop: 16 }}>Đang đồng bộ dữ liệu từ Đám mây...</p>
        </div>
      ) : (
        <>
          {/* Results count */}
          <div className={styles.resultInfo}>
            Hiển thị <strong>{filtered.length}</strong> / {allReports.length} báo cáo
          </div>

          {/* Report Grid */}
          <div className={styles.reportGrid}>
            {filtered.map((report) => (
                <div
                  className={styles.reportCard}
                  key={report.id}
                  onClick={() => handleOpenReport(report.id)}
                  role="button"
                  tabIndex={0}
                >
                  {/* Card Header */}
                  <div className={styles.cardHeader}>
                    <div className={styles.cardHeaderInfo}>
                      <span style={{display: 'flex', alignItems: 'center', fontSize: '13px', fontWeight: 600, color: '#334155', textTransform: 'uppercase'}}>
                        <FiFileText size={16} style={{ marginRight: '8px', color: '#64748B' }} />
                        {report.loaiBaoCao}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <h3 className={styles.cardTitle}>{report.tieuDe?.replace(/BÁO CÁO NHANH\n?/i, '') || 'Báo cáo khẩn cấp về thiên tai trên địa bàn'}</h3>

                  <div className={styles.cardMeta} style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div className={styles.metaItem}>
                      <FiCalendar style={{color: '#64748B'}} />
                      <span style={{color: '#475569'}}>{report.ngay}</span>
                    </div>
                  </div>



                  {/* Card Footer */}
                  <div className={styles.cardFooter} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                    <button
                      className={styles.exportBtn}
                      style={{ 
                        color: '#475569', display: 'flex', alignItems: 'center', gap: '6px', 
                        padding: '6px 12px', border: '1px solid #CBD5E1', borderRadius: '6px',
                        backgroundColor: '#F8FAFC', cursor: 'pointer', fontSize: '13px', fontWeight: 600
                      }}
                      onClick={(e) => handleExportDoc(e, report)}
                      title="Xuất file báo cáo ra Word"
                    >
                      <FiDownload /> Xuất file
                    </button>
                    <span className={styles.cardAction} style={{ color: '#2563eb', fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                      Xem chi tiết <FiChevronRight style={{marginLeft: '4px'}} />
                    </span>
                  </div>
                </div>
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className={styles.emptyState}>
              <FiSearch className={styles.emptyIcon} />
              <h3>Không tìm thấy báo cáo</h3>
              <p>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
