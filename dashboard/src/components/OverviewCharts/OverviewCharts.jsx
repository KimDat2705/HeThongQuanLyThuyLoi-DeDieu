import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine, PieChart, Pie, Cell } from 'recharts';
import styles from './OverviewCharts.module.css';

const waterLevelData = [
  { day: '08/04', level: 3.2 },
  { day: '09/04', level: 3.5 },
  { day: '10/04', level: 3.8 },
  { day: '11/04', level: 3.9 },
  { day: '12/04', level: 4.1 }, // Alert!
];

const pumpData = [
  { name: 'Bình thường', value: 521, color: '#4CAF50' },
  { name: 'Cần theo dõi', value: 33, color: '#FF9800' },
  { name: 'Sự cố / Cảnh báo', value: 8, color: '#D32F2F' },
];

const COLORS = ['#4CAF50', '#FF9800', '#D32F2F'];

const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        border: '1px solid #E0E0E0',
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        padding: '10px 14px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        zIndex: 1000
      }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: data.color }}></div>
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#333' }}>{data.name}</span>
        <span style={{ fontSize: '15px', fontWeight: 800, color: data.color, marginLeft: '6px' }}>{data.value}</span>
      </div>
    );
  }
  return null;
};

export default function OverviewCharts() {
  return (
    <div className={styles.chartsRow}>
      {/* Chart 1: Bar Chart */}
      <div className={`${styles.chartCard} ${styles.barCard}`}>
        <div className={styles.chartHeader}>
          <div className={styles.chartTitle}>Biến động mực nước 5 ngày qua</div>
          <div className={styles.chartLegend}>
            <div className={styles.legendItem}>
              <span className={styles.legendBox} style={{ background: '#388E3C' }}></span>
              Thực tế
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendLine} style={{ borderColor: '#D32F2F' }}></span>
              Ngưỡng báo động (4.0M)
            </div>
          </div>
        </div>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={waterLevelData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
              <XAxis dataKey="day" axisLine={true} tickLine={false} tick={{ fontSize: 12, fill: '#666' }} />
              <YAxis domain={[0, 5]} axisLine={true} tickLine={false} tick={{ fontSize: 12, fill: '#666' }} tickFormatter={(val) => `${val}m`} />
              <RechartsTooltip 
                cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                contentStyle={{ borderRadius: '8px', border: '1px solid #ddd', fontSize: '13px' }}
              />
              <ReferenceLine y={4.0} stroke="#D32F2F" strokeDasharray="5 5" strokeWidth={1.5} />
              <Bar dataKey="level" fill="#388E3C" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Donut Chart */}
      <div className={`${styles.chartCard} ${styles.pieCard}`}>
        <div className={styles.chartHeader}>
          <div className={styles.chartTitle}>Tình trạng hoạt động trạm bơm</div>
        </div>
        <div className={styles.chartContainer} style={{ position: 'relative' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pumpData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {pumpData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip content={<CustomPieTooltip />} wrapperStyle={{ zIndex: 1000, pointerEvents: 'none' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className={styles.donutCenter}>
            <div className={styles.donutVal}>562</div>
            <div className={styles.donutLabel}>TỔNG TRẠM</div>
          </div>
        </div>
        
        {/* Custom Static Legend below the Pie */}
        <div className={styles.pumpLegend}>
          {pumpData.map((item, index) => (
            <div key={index} className={styles.pumpLegendItem}>
              <span className={styles.pumpDot} style={{ background: item.color }}></span>
              <span className={styles.pumpName}>{item.name}</span>
              <span className={styles.pumpVal} style={{ color: item.color }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
