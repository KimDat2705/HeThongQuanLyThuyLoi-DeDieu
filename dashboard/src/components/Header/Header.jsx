import styles from './Header.module.css';
import { FiSearch, FiBell, FiHelpCircle, FiLogOut, FiShield, FiDroplet } from 'react-icons/fi';

export default function Header({ onLogout }) {
  return (
    <header className={styles.header} id="main-header">
      {/* Left - Logo & Title */}
      <div className={styles.headerLeft}>
        <div className={styles.headerLogo}>
          <FiShield className={styles.headerLogoIcon} />
          <FiDroplet className={styles.headerLogoIconInside} />
        </div>
        <h1 className={styles.headerTitle}>HỆ THỐNG QUẢN LÝ THỦY LỢI VÀ PHÒNG, CHỐNG THIÊN TAI</h1>
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
        <button className={styles.headerIconBtn} id="btn-notifications" title="Thông báo">
          <FiBell />
          <span className={styles.headerBadge}></span>
        </button>
        <button className={styles.headerIconBtn} id="btn-help" title="Trợ giúp">
          <FiHelpCircle />
        </button>
        <div className={styles.headerDivider}></div>
        <div className={styles.headerUser}>
          <div className={styles.headerUserInfo}>
            <div className={styles.headerUserName}>Admin</div>
            <div className={styles.headerUserRole}>Bắc Ninh HQ</div>
          </div>
          <div className={styles.headerAvatar} id="user-avatar">
            👤
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
