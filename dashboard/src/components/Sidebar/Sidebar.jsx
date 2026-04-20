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
            if (item.label === 'Nhập liệu') return false;
            return true;
          }
          return !!item.path || !!item.subItems; // Users only see functional pages or submenus
        });

        if (userRole !== 'admin') {
          const title = (userTitle || '').toLowerCase();
          
          if (group.section === 'TRẠM BƠM & ĐÊ ĐIỀU') {
            if (!title.includes('đê điều') && !title.includes('trạm bơm') && !title.includes('thủy lợi')) return null;
          }
          if (group.section === 'QUẢN LÝ ĐẦU TƯ XÂY DỰNG') {
             if (!title.includes('đầu tư') && !title.includes('xây dựng')) return null;
          }
        }

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
        <div className={styles.navItem} id="nav-settings">
          <span className={styles.navIcon}><FiSettings /></span>
          <span className={styles.navText}>Cài đặt</span>
        </div>
      </div>
    </aside>
  );
}

