import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import { FiUser, FiLock, FiEye, FiEyeOff, FiShield, FiDroplet } from 'react-icons/fi';

export default function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Mock Authentication Logic
    // In production, this would call Firebase Auth
    if (username === 'admin' && password === 'admin@123') {
      localStorage.setItem('isAuthenticated', 'true');
      onLogin(true); // Callback to App.jsx to update global state
      navigate('/'); // Redirect to dashboard
    } else {
      setError('Tên đăng nhập hoặc mật khẩu không chính xác.');
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Cột trái: Hình ảnh đập nước (Bỏ text rườm rà) */}
      <div className={styles.heroSection}>
      </div>

      {/* Cột phải: Form Đăng Nhập */}
      <div className={styles.loginSection}>
        <div className={styles.logoContainer}>
          <FiShield className={styles.logoIcon} />
          <FiDroplet className={styles.logoIconInside} />
        </div>

        <div className={styles.formHeader}>
          <h2 className={styles.formTitle}>
            HỆ THỐNG QUẢN LÝ THỦY LỢI VÀ<br />
            PHÒNG, CHỐNG THIÊN TAI
          </h2>
          <p className={styles.formSubtitle}>
            TỈNH BẮC NINH
          </p>
        </div>

        <form className={styles.formBox} onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>TÊN ĐĂNG NHẬP</label>
            <div className={styles.inputWrapper}>
              <FiUser className={styles.inputIcon} />
              <input 
                type="text" 
                className={styles.inputField} 
                placeholder="Nhập tài khoản..." 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>MẬT KHẨU</label>
            <div className={styles.inputWrapper}>
              <FiLock className={styles.inputIcon} />
              <input 
                type={showPassword ? "text" : "password"}
                className={styles.inputField} 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                className={styles.eyeIcon}
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                {showPassword ? <FiEye /> : <FiEyeOff />}
              </button>
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>
            ĐĂNG NHẬP
          </button>

          {error && <div className={styles.errorMsg}>{error}</div>}
        </form>

        <p className={styles.disclaimer}>
          Hệ thống dành riêng cho Lãnh đạo và Cán bộ trực ban. Vui lòng tuân thủ quy định bảo mật.
        </p>
      </div>
    </div>
  );
}
