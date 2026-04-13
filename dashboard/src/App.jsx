import './index.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import ReportViewerPage from './pages/ReportViewerPage/ReportViewerPage';

function App() {
  /* Khi cột "Số liệu trích xuất" mở ra → ẩn sidebar */
  const [sidebarHidden, setSidebarHidden] = useState(false);

  return (
    <>
      <Header />
      <Sidebar hidden={sidebarHidden} />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route
          path="/bao-cao"
          element={
            <ReportViewerPage
              onDataPanelToggle={(open) => setSidebarHidden(open)}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
