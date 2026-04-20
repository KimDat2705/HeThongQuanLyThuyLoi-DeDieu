import React from 'react';
import styles from './WeatherPage.module.css';
import { FiCloudRain, FiSun, FiWind, FiDroplet, FiAlertCircle, FiThermometer } from 'react-icons/fi';

export default function WeatherPage() {
  // Dữ liệu mô phỏng dự báo chung (OpenWeatherMap style)
  const generalWeather = {
    temp: 37,
    feelsLike: 40,
    condition: 'Nắng nóng diện rộng',
    humidity: 55,
    wind: 12,
    uv: 9,
    rainChance: 20
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Dự Báo Thời Tiết</h1>
        <p className={styles.subtitle}>Tổng hợp dữ liệu khí tượng chung toàn tỉnh Bắc Ninh</p>
      </div>

      <div className={styles.gridContainer}>
        <div className={styles.mainWeatherCard}>
          <div className={styles.weatherIconLarge}>
            <FiSun />
          </div>
          <div className={styles.weatherInfoMain}>
            <div className={styles.tempLarge}>{generalWeather.temp}°C</div>
            <div className={styles.conditionDesc}>{generalWeather.condition}</div>
            <div className={styles.feelsLike}>Cảm giác như: {generalWeather.feelsLike}°C</div>
          </div>
          {generalWeather.temp >= 35 && (
            <div className={styles.heatAlert}>
              <FiAlertCircle /> Cảnh báo: Nhiệt độ cao nguy hiểm
            </div>
          )}
        </div>

        <div className={styles.subGrid}>
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <FiDroplet className={styles.metricIcon} /> Độ ẩm
            </div>
            <div className={styles.metricValue}>{generalWeather.humidity}%</div>
          </div>
          
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <FiWind className={styles.metricIcon} /> Gió
            </div>
            <div className={styles.metricValue}>{generalWeather.wind} km/h</div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <FiCloudRain className={styles.metricIcon} /> Khả năng mưa
            </div>
            <div className={styles.metricValue}>{generalWeather.rainChance}%</div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <FiThermometer className={styles.metricIcon} /> Chỉ số UV
            </div>
            <div className={styles.metricValue}>{generalWeather.uv}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
