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
import TaskManagementPage from './pages/TaskManagementPage/TaskManagementPage';
import UserTaskPage from './pages/UserTaskPage/UserTaskPage';
import UserManagementPage from './pages/UserManagementPage/UserManagementPage';
import WeatherPage from './pages/WeatherPage/WeatherPage';
import FloodStatusPage from './pages/FloodStatusPage/FloodStatusPage';
import PumpStationMapPage from './pages/MockPages/PumpStationMapPage';
import DikeManagementPage from './pages/MockPages/DikeManagementPage';
import WaterLevelChartPage from './pages/MockPages/WaterLevelChartPage';
import ConstructionProjectsPage from './pages/MockPages/ConstructionProjectsPage';
import DisbursementPage from './pages/MockPages/DisbursementPage';
import ContractorsPage from './pages/MockPages/ContractorsPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const userRole = localStorage.getItem('userRole');
  const userTitle = localStorage.getItem('userTitle');

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
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userTitle');
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
          <Sidebar hidden={sidebarHidden} onLogout={handleLogout} userRole={userRole} userTitle={userTitle} />

          <main className={`main-content-wrapper ${sidebarHidden ? 'sidebar-hidden' : ''}`}>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/thoi-tiet" element={<WeatherPage />} />
              <Route path="/tinh-hinh-ngap-lut" element={<FloodStatusPage />} />
              <Route path="/ban-do-tram-bom" element={<PumpStationMapPage />} />
              <Route path="/quan-ly-de-dieu" element={<DikeManagementPage />} />
              <Route path="/bieu-do-muc-nuoc" element={<WaterLevelChartPage />} />
              <Route path="/du-an-xay-dung" element={<ConstructionProjectsPage />} />
              <Route path="/giai-ngan" element={<DisbursementPage />} />
              <Route path="/nha-thau" element={<ContractorsPage />} />
              <Route path="/bao-cao" element={<ReportArchivePage />} />
              <Route path="/nhap-lieu" element={<DataEntryPage />} />
              <Route path="/cong-viec/*" element={userRole === 'admin' ? <TaskManagementPage /> : <UserTaskPage />} />
              {userRole === 'admin' && <Route path="/phan-quyen" element={<UserManagementPage />} />}
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

          {/* ChatPanel toàn cục */}
          <ChatPanel />
        </>
      )}
    </>
  );
}

export default App;
