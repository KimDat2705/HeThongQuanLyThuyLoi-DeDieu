import React from 'react';
import styles from './MockPage.module.css';
import { FiDollarSign, FiPieChart, FiArrowUpCircle, FiCreditCard } from 'react-icons/fi';

export default function DisbursementPage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <div className={styles.headerIconWrapper} style={{ background: '#DCFCE7', color: '#16A34A' }}>
          <FiDollarSign />
        </div>
        <div>
          <h1 className={styles.pageTitle}>Tiến độ Giải Ngân </h1>
          <p className={styles.pageSubtitle}>Giám sát phân bổ và giải ngân vốn đầu tư công năm 2026</p>
        </div>
      </div>

      <div className={styles.dashboardGrid}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>TỔNG KẾ HOẠCH VỐN 2026</span>
            <div className={styles.statIcon} style={{ background: '#E0F2FE', color: '#0284C7' }}><FiPieChart /></div>
          </div>
          <h2 className={styles.statValue}>1,200 <span style={{fontSize: 16}}>Tỷ VNĐ</span></h2>
          <span className={styles.statChange}>Đã giao 100% kế hoạch</span>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>ĐÃ GIẢI NGÂN (LŨY KẾ CẢ NĂM)</span>
            <div className={styles.statIcon} style={{ background: '#DCFCE7', color: '#16A34A' }}><FiArrowUpCircle /></div>
          </div>
          <h2 className={styles.statValue}>452 <span style={{fontSize: 16}}>Tỷ VNĐ</span></h2>
          <span className={styles.statChange}><span className={styles.changePos}>Đạt 37.6% KH</span> (Cao hơn cùng kỳ 5%)</span>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>VƯỚNG MẮC THỦ TỤC THANH TOÁN</span>
            <div className={styles.statIcon} style={{ background: '#FEE2E2', color: '#DC2626' }}><FiCreditCard /></div>
          </div>
          <h2 className={styles.statValue}>215 <span style={{fontSize: 16}}>Tỷ VNĐ</span></h2>
          <span className={styles.statChange}><span className={styles.changeNeg}>Từ 5 Dự án dở dang</span></span>
        </div>
      </div>

      <div className={styles.mainContent}>
        <h3 className={styles.contentTitle}><FiPieChart /> Tỉ lệ giải ngân theo Phân cấp ngân sách</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <table className={styles.glassmorphismTable}>
            <thead>
                <tr>
                <th>Nguồn Vốn</th>
                <th>Kế hoạch (Tỷ)</th>
                <th>Giải ngân (Tỷ)</th>
                <th>Tỉ lệ</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>NS Trung ương</td>
                <td>800</td>
                <td>320</td>
                <td><span className={styles.changePos} style={{fontWeight: 'bold'}}>40%</span></td>
                </tr>
                <tr>
                <td>NS Tỉnh Bắc Ninh</td>
                <td>400</td>
                <td>132</td>
                <td><span className={styles.changeNeg} style={{fontWeight: 'bold'}}>33%</span></td>
                </tr>
            </tbody>
            </table>
            
            <div className={styles.mockupImage} style={{ height: '220px', borderRadius: '8px' }}>
                <FiPieChart size={32} style={{ opacity: 0.5 }} />
                <span>Biểu đồ Tròn Thống Kê (Mô phỏng)</span>
            </div>
        </div>
      </div>
    </div>
  );
}
