import './index.css';
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import ChatPanel from './components/ChatPanel/ChatPanel';

import DashboardPage from './pages/DashboardPage/DashboardPage';
import ReportArchivePage from './pages/ReportArchivePage/ReportArchivePage';
import ReportViewerPage from './pages/ReportViewerPage/ReportViewerPage';
import DataEntryPage from './pages/DataEntryPage/DataEntryPage';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {
  /* Kiểm tra trạng thái đăng nhập */
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const navigate = useNavigate();
  const location = useLocation();

  /* Khi cột "Số liệu trích xuất" mở ra → ẩn sidebar */
  const [sidebarHidden, setSidebarHidden] = useState(false);

  // Lắng nghe thay đổi trạng thái xác thực
  useEffect(() => {
    if (!isAuthenticated && location.pathname !== '/login') {
      navigate('/login');
    }
  }, [isAuthenticated, location, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  return (
    <>
      {!isAuthenticated ? (
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={setIsAuthenticated} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        <>
          <Header onLogout={handleLogout} />
          <Sidebar hidden={sidebarHidden} onLogout={handleLogout} />

          <main className={`main-content-wrapper ${sidebarHidden ? 'sidebar-hidden' : ''}`}>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/bao-cao" element={<ReportArchivePage />} />
              <Route path="/nhap-lieu" element={<DataEntryPage />} />
              <Route
                path="/bao-cao/:reportId"
                element={
                  <ReportViewerPage
                    onDataPanelToggle={(open) => setSidebarHidden(open)}
                  />
                }
              />
              {/* Nhấn vào các đường link không tồn tại khi đã đăng nhập */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* ChatPanel toàn cục — hiển thị trên MỌI trang */}
          <ChatPanel />
        </>
      )}
    </>
  );
}

export default App;
