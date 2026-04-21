import styles from './Sidebar.module.css';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { GiWheat } from 'react-icons/gi';
import {
  FiGrid, FiCloud, FiDroplet, FiFileText,
  FiMapPin, FiShield, FiBarChart2, FiSettings, FiEdit, FiCheckSquare,
  FiChevronDown, FiChevronRight, FiBriefcase, FiDollarSign, FiUsers, FiArchive
} from 'react-icons/fi';

const navItems = [
  {
    section: null,
    items: [
      { icon: <FiGrid />, label: 'Tổng quan', path: '/' },
      { icon: <FiCheckSquare />, label: 'Công việc', path: '/cong-viec' },
      { icon: <FiEdit />, label: 'Nhập liệu', path: '/nhap-lieu' },
      { icon: <FiFileText />, label: 'Thiệt hại & Báo cáo', path: '/bao-cao' },
    ]
  },
  {
    section: 'THỦY LỢI & PCTT',
    items: [
      { icon: <FiCloud />, label: 'Dự báo thời tiết', path: '/thoi-tiet' },
      { icon: <FiDroplet />, label: 'Tình hình ngập lụt', path: '/tinh-hinh-ngap-lut' },
    ]
  },
  {
    section: 'TRẠM BƠM & ĐÊ ĐIỀU',
    items: [
      { icon: <FiMapPin />, label: 'Bản đồ trạm bơm', path: '/ban-do-tram-bom' },
      { icon: <FiShield />, label: 'Quản lý đê điều', path: '/quan-ly-de-dieu' },
      { icon: <FiBarChart2 />, label: 'Biểu đồ mực nước', path: '/bieu-do-muc-nuoc' },
    ]
  },
  {
    section: 'QUẢN LÝ ĐẦU TƯ XÂY DỰNG',
    items: [
      { icon: <FiArchive />, label: 'Danh mục dự án', path: '/du-an-xay-dung' },
      { icon: <FiDollarSign />, label: 'Tiến độ & Giải ngân', path: '/giai-ngan' },
      { icon: <FiUsers />, label: 'Hồ sơ & Nhà thầu', path: '/nha-thau' },
    ]
  }
];

export default function Sidebar({ hidden = false, userRole, userTitle }) {
  const [expandedKeys, setExpandedKeys] = useState({});
  const toggleExpand = (key) => setExpandedKeys(p => ({ ...p, [key]: !p[key] }));
  
  const userPermissions = JSON.parse(localStorage.getItem('permissions') || '[]');

  const permissionMap = {
    'Tổng quan': 'OVERVIEW',
    'Công việc': 'TASKS',
    'Nhập liệu': 'DATA_ENTRY',
    'Thiệt hại & Báo cáo': 'REPORT',
    'Dự báo thời tiết': 'WEATHER',
    'Tình hình ngập lụt': 'FLOOD',
    'Bản đồ trạm bơm': 'PUMP_MAP',
    'Quản lý đê điều': 'DIKE',
    'Biểu đồ mực nước': 'WATER_LEVEL',
    'Danh mục dự án': 'PROJECTS',
    'Tiến độ & Giải ngân': 'DISBURSEMENT',
    'Hồ sơ & Nhà thầu': 'CONTRACTORS',
  };

  const dynamicNavItems = navItems.map((group, index) => {
    if (index === 0) {
      return {
        ...group,
        items: [
          { icon: <FiGrid />, label: 'Tổng quan', path: '/' },
          { 
             icon: <FiCheckSquare />, 
             label: 'Công việc', 
             subItems: [
               { label: 'Đang thực hiện', path: '/cong-viec/dang-thuc-hien' },
               { label: 'Đã hoàn thiện', path: '/cong-viec/da-hoan-thanh' },
             ]
          },
          { icon: <FiEdit />, label: 'Nhập liệu', path: '/nhap-lieu' },
          { icon: <FiFileText />, label: 'Thiệt hại & Báo cáo', path: '/bao-cao' },
        ]
      }
    }
    return group;
  });

  return (
    <aside
      className={`${styles.sidebar} ${hidden ? styles.sidebarHidden : ''}`}
      id="main-sidebar"
    >
      {/* Navigation */}
      {dynamicNavItems.map((group, gi) => {
        const filteredItems = group.items.filter(item => {
          if (userRole === 'admin') {
            if (item.label === 'Nhập liệu') return false; // Thường admin không cần nhập liệu
            return true;
          }
          if (item.label === 'Nhập liệu') return true;
          const requiredPerm = permissionMap[item.label];
          return userPermissions.includes(requiredPerm);
        });

        if (filteredItems.length === 0) return null;

        return (
          <nav className={styles.navSection} key={gi}>
            {group.section && (
              <div className={styles.navLabel}>{group.section}</div>
            )}
            {filteredItems.map((item, ii) => {
            const id = `nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`;

              if (item.subItems) {
                const isExpanded = expandedKeys[item.label];
                return (
                  <div key={ii} className={styles.navItemWrapper}>
                    <div className={`${styles.navItem} ${isExpanded ? styles.activeGroup : ''}`} onClick={() => toggleExpand(item.label)}>
                        <span className={styles.navIcon}>{item.icon}</span>
                        <span className={styles.navText}>{item.label}</span>
                        <span className={styles.navChevron}>{isExpanded ? <FiChevronDown/> : <FiChevronRight/>}</span>
                    </div>
                     {isExpanded && (
                       <div className={styles.navSubMenu}>
                         {item.subItems.map((sub, si) => (
                            <NavLink to={sub.path} className={({ isActive }) => `${styles.navSubItem} ${isActive ? styles.active : ''}`} key={si}>
                               {sub.icon && <span className={styles.navIcon} style={{ fontSize: '14px' }}>{sub.icon}</span>}
                               <span className={styles.navText}>{sub.label}</span>
                            </NavLink>
                         ))}
                       </div>
                     )}
                  </div>
                );
              }

              if (item.path) {
              return (
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `${styles.navItem} ${isActive ? styles.active : ''}`
                  }
                  key={ii}
                  id={id}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span className={styles.navText}>{item.label}</span>
                </NavLink>
              );
            }

            return (
              <div
                className={styles.navItem}
                key={ii}
                id={id}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <span className={styles.navText}>{item.label}</span>
              </div>
            );
          })}
          </nav>
        );
      })}

      {/* Settings */}
      <div className={styles.sidebarBottom}>
        {userRole === 'admin' && (
           <NavLink to="/phan-quyen" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`} onClick={() => setExpandedKeys({})}>
             <span className={styles.navIcon}><FiUsers /></span>
             <span className={styles.navText}>Phân quyền Hệ thống</span>
           </NavLink>
        )}
        <div className={styles.navItem} id="nav-settings">
          <span className={styles.navIcon}><FiSettings /></span>
          <span className={styles.navText}>Cài đặt</span>
        </div>
      </div>
    </aside>
  );
}

