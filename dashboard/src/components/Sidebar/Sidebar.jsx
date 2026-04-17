import styles from './Sidebar.module.css';
import { NavLink } from 'react-router-dom';
import { GiWheat } from 'react-icons/gi';
import {
  FiGrid, FiCloud, FiDroplet, FiFileText,
  FiMapPin, FiShield, FiBarChart2, FiSettings, FiEdit
} from 'react-icons/fi';

const navItems = [
  {
    section: null,
    items: [
      { icon: <FiGrid />, label: 'Tổng quan', path: '/' },
    ]
  },
  {
    section: 'THỦY LỢI & PCTT',
    items: [
      { icon: <FiCloud />, label: 'Dự báo thời tiết' },
      { icon: <FiDroplet />, label: 'Tình hình ngập lụt' },
      { icon: <FiFileText />, label: 'Thiệt hại & Báo cáo', path: '/bao-cao' },
      { icon: <FiEdit />, label: 'Nhập liệu', path: '/nhap-lieu' },
    ]
  },
  {
    section: 'TRẠM BƠM & ĐÊ ĐIỀU',
    items: [
      { icon: <FiMapPin />, label: 'Bản đồ trạm bơm' },
      { icon: <FiShield />, label: 'Quản lý đê điều' },
      { icon: <FiBarChart2 />, label: 'Biểu đồ mực nước' },
    ]
  }
];

export default function Sidebar({ hidden = false }) {
  return (
    <aside
      className={`${styles.sidebar} ${hidden ? styles.sidebarHidden : ''}`}
      id="main-sidebar"
    >
      {/* Navigation */}
      {navItems.map((group, gi) => (
        <nav className={styles.navSection} key={gi}>
          {group.section && (
            <div className={styles.navLabel}>{group.section}</div>
          )}
          {group.items.map((item, ii) => {
            const id = `nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`;

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
      ))}

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

