import React, { useState, useEffect, useRef } from 'react';
import styles from './Header.module.css';
import { FiSearch, FiBell, FiHelpCircle, FiLogOut, FiShield, FiDroplet, FiAlertCircle } from 'react-icons/fi';

export default function Header({ onLogout }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [lateTasks, setLateTasks] = useState([]);
  const notificationRef = useRef(null);

  const userRole = localStorage.getItem('userRole');
  const userTitle = localStorage.getItem('userTitle');

  // Real-time polling cho Notification
  useEffect(() => {
    const calculateLateTasks = () => {
      const saved = localStorage.getItem('demoProjectsWorkflowV4');
      if (!saved) return;
      
      try {
        const projects = JSON.parse(saved);
        let lateList = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        projects.forEach(project => {
          project.tasks.forEach(task => {
            if (task.progress < 100 && task.status !== 'Đã hoàn thành') {
              const taskEndDate = new Date(task.endDate);
              // Nếu trễ hạn (hạn chót nhỏ hơn hôm nay) hoặc có cờ isDelayed
              if (taskEndDate < today || task.isDelayed) {
                lateList.push({
                  id: task.id,
                  name: task.name,
                  projectName: project.name,
                  assignee: task.assignee,
                  endDate: task.endDate
                });
              }
            }
          });
        });
        setLateTasks(lateList);
      } catch (e) {
         console.error('Error parsing tasks for notifications', e);
      }
    };

    calculateLateTasks(); // Chạy ngay khi mount
    const interval = setInterval(calculateLateTasks, 10000); // Polling mỗi 10s
    return () => clearInterval(interval);
  }, []);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderNotificationMessage = (task) => {
    if (userRole === 'admin') {
      return <span><b>Anh/Chị {task.assignee}</b> trễ tiến độ công việc: <b>{task.name}</b> thuộc dự án <b>{task.projectName}</b></span>;
    } else {
      return <span>Cảnh báo: <b>Bạn</b> đã trễ tiến độ công việc: <b>{task.name}</b> thuộc dự án <b>{task.projectName}</b>!</span>;
    }
  };

  return (
    <header className={styles.header} id="main-header">
      {/* Left - Logo & Title */}
      <div className={styles.headerLeft}>
        <div className={styles.headerLogo}>
          <FiShield className={styles.headerLogoIcon} />
          <FiDroplet className={styles.headerLogoIconInside} />
        </div>
        <h1 className={styles.headerTitle}>QUẢN LÝ HỆ THỐNG THỦY LỢI VÀ PHÒNG, CHỐNG THIÊN TAI</h1>
      </div>

      {/* Center - Search */}
      <div className={styles.headerCenter}>
        <div className={styles.headerSearch}>
          <FiSearch className={styles.headerSearchIcon} />
          <input
            type="text"
            className={styles.headerSearchInput}
            placeholder="Tìm kiếm trạm bơm..."
            id="search-input"
          />
        </div>
      </div>

      {/* Right - User */}
      <div className={styles.headerRight}>
        <div className={styles.notificationWrapper} ref={notificationRef}>
          <button 
            className={styles.headerIconBtn} 
            id="btn-notifications" 
            title="Thông báo"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <FiBell />
            {lateTasks.length > 0 ? (
              <span className={styles.pulseBadge}>{lateTasks.length}</span>
            ) : (
                <span className={styles.headerBadge} style={{display: 'none'}}></span>
            )}
          </button>

          {showNotifications && (
            <div className={styles.dropdownMenu}>
              <div className={styles.dropdownHeader}>
                Thông báo khẩn ({lateTasks.length})
              </div>
              <div className={styles.dropdownList}>
                {lateTasks.length === 0 ? (
                  <div className={styles.emptyNotification}>Tuyệt vời! Không có công việc nào bị trễ tiến độ.</div>
                ) : (
                  lateTasks.map((task, idx) => (
                    <div key={idx} className={styles.notificationItem}>
                      <div className={styles.notificationIcon}>
                        <FiAlertCircle />
                      </div>
                      <div>
                        <div className={styles.notificationContent}>
                          {renderNotificationMessage(task)}
                        </div>
                        <span className={styles.notificationTime}>
                          Hạn chót: {task.endDate}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <button className={styles.headerIconBtn} id="btn-help" title="Trợ giúp">
          <FiHelpCircle />
        </button>
        <div className={styles.headerDivider}></div>
        <div className={styles.headerUser}>
          <div className={styles.headerUserInfo}>
            <div className={styles.headerUserName}>
              {userRole === 'admin' ? 'Lãnh đạo Sở' : (userTitle || 'Cán bộ')}
            </div>
            <div className={styles.headerUserRole}>
               {userRole === 'admin' ? 'Bắc Ninh HQ' : 'Bộ phận chuyên môn'}
            </div>
          </div>
          <div className={styles.headerAvatar} id="user-avatar">
            {userRole === 'admin' ? '👨‍💼' : '🧑‍💻'}
          </div>
          <button 
            className={styles.headerIconBtn} 
            title="Đăng xuất" 
            onClick={onLogout}
            style={{ marginLeft: 6, color: '#EF4444' }}
          >
            <FiLogOut />
          </button>
        </div>
      </div>
    </header>
  );
}
