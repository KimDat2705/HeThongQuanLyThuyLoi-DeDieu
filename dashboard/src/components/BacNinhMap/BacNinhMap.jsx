import { MapContainer, TileLayer, Marker, Popup, Tooltip, Circle, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './BacNinhMap.module.css';
import bacninhBoundary from '../../data/bacninh-simple.json';
import communesData from '../../data/bacninh-communes.json';

/* Fix default marker icons */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

/* Custom circle markers */
const createIcon = (color, size = 12) => L.divIcon({
  className: styles.customMarker,
  html: `<div style="
    width: ${size}px; height: ${size}px; border-radius: 50%;
    background: ${color}; border: 2px solid white;
    box-shadow: 0 1px 4px rgba(0,0,0,0.35);
  "></div>`,
  iconSize: [size, size],
  iconAnchor: [size / 2, size / 2],
  popupAnchor: [0, -size / 2 - 2],
});

const iconGreen  = createIcon('#2E7D32');
const iconYellow = createIcon('#F9A825');
const iconRed    = createIcon('#E53935', 14);
const iconMap    = { good: iconGreen, warning: iconYellow, danger: iconRed };

const CENTER = [21.12, 106.08];

/* GeoJSON tỉnh */
const boundaryFeature = {
  type: 'Feature',
  properties: { name: 'Tỉnh Bắc Ninh' },
  geometry: bacninhBoundary,
};

/* Style ranh giới TỈNH — xanh đậm, dày */
const provinceBorderStyle = {
  color: '#1B5E20',
  weight: 3.5,
  fillColor: '#A5D6A7',
  fillOpacity: 0.2,
};

/* Style ranh giới XÃ — xanh dương, nét đứt */
const communeBorderStyle = () => ({
  color: '#1565C0',
  weight: 2,
  fillColor: 'transparent',
  fillOpacity: 0,
  dashArray: '8,4',
  opacity: 0.7,
});

/* Trạm bơm */
const pumpStations = [
  { id: 1,  name: 'TB Yên Phong 1',    pos: [21.235, 105.970], status: 'good',    note: 'Hoạt động bình thường' },
  { id: 2,  name: 'TB Yên Phong 2',    pos: [21.220, 105.955], status: 'good',    note: 'Hoạt động bình thường' },
  { id: 3,  name: 'TB Từ Sơn',         pos: [21.130, 105.970], status: 'good',    note: 'Hoạt động bình thường' },
  { id: 4,  name: 'TB Tiên Du 1',      pos: [21.135, 106.050], status: 'warning', note: 'Mực nước tăng — theo dõi' },
  { id: 5,  name: 'TB Tiên Du 2',      pos: [21.150, 106.070], status: 'good',    note: 'Hoạt động bình thường' },
  { id: 6,  name: 'TB TP Bắc Ninh',    pos: [21.185, 106.075], status: 'good',    note: 'Hoạt động bình thường' },
  { id: 7,  name: 'TB Quế Võ 1',       pos: [21.210, 106.160], status: 'good',    note: 'Hoạt động bình thường' },
  { id: 8,  name: 'TB Quế Võ 2',       pos: [21.190, 106.180], status: 'warning', note: 'Kiểm tra định kỳ' },
  { id: 9,  name: 'TB Thuận Thành 1',  pos: [21.070, 106.020], status: 'good',    note: 'Hoạt động bình thường' },
  { id: 10, name: 'TB Vạn Ninh 1',     pos: [21.050, 106.060], status: 'danger',  note: '⚠ Mực nước vượt BĐ I' },
  { id: 11, name: 'TB Vạn Ninh 2',     pos: [21.055, 106.080], status: 'danger',  note: '⚠ Mực nước vượt BĐ I' },
  { id: 12, name: 'TB Gia Bình 1',     pos: [21.085, 106.170], status: 'good',    note: 'Hoạt động bình thường' },
  { id: 13, name: 'TB Gia Bình 2',     pos: [21.060, 106.200], status: 'good',    note: 'Hoạt động bình thường' },
  { id: 14, name: 'TB Lương Tài',      pos: [21.020, 106.150], status: 'warning', note: 'Mực nước sông Đuống tăng' },
  { id: 15, name: 'TB Lương Tài 2',    pos: [21.000, 106.120], status: 'good',    note: 'Hoạt động bình thường' },
];

/* Vùng ngập */
const floodZones = [
  { id: 1, pos: [21.050, 106.065], radius: 1800, label: 'Ngập lụt — Thuận Thành' },
  { id: 2, pos: [21.140, 106.055], radius: 1200, label: 'Ngập lụt — Tiên Du' },
  { id: 3, pos: [21.015, 106.140], radius: 900,  label: 'Ngập lụt — Lương Tài' },
];

const statusColor = { good: '#2E7D32', warning: '#E65100', danger: '#E53935' };

export default function BacNinhMapLeaflet() {
  return (
    <div className={styles.mapWrapper}>
      <MapContainer
        center={CENTER}
        zoom={11}
        className={styles.mapContainer}
        zoomControl={true}
        scrollWheelZoom={true}
      >
        {/* Nền sạch */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
        />

        {/* Ranh giới tỉnh — xanh đậm */}
        <GeoJSON
          data={boundaryFeature}
          style={() => provinceBorderStyle}
        />

        {/* Ranh giới 99 xã — xanh dương nét đứt */}
        <GeoJSON
          data={communesData}
          style={communeBorderStyle}
          onEachFeature={(feature, layer) => {
            layer.bindPopup(`<strong>${feature.properties.name}</strong>`);
          }}
        />



        {/* Vùng ngập */}
        {floodZones.map(z => (
          <Circle
            key={z.id}
            center={z.pos}
            radius={z.radius}
            pathOptions={{
              color: '#E53935', fillColor: '#E53935',
              fillOpacity: 0.2, weight: 2, dashArray: '6,4',
            }}
          >
            <Popup><strong style={{ color: '#E53935' }}>{z.label}</strong></Popup>
          </Circle>
        ))}

        {/* Trạm bơm (vị trí mô phỏng — cần thay bằng tọa độ thật từ Sở) */}
        {pumpStations.map(s => (
          <Marker key={s.id} position={s.pos} icon={iconMap[s.status]}>
            <Tooltip
              direction="top"
              offset={[0, -8]}
              className={styles.stationTooltip}
            >
              {s.name}
            </Tooltip>
            <Popup>
              <div style={{ minWidth: 180 }}>
                <strong style={{ fontSize: 14 }}>{s.name}</strong>
                <div style={{ marginTop: 6, fontSize: 12, color: '#666' }}>📍 Tọa độ (mô phỏng)</div>
                <div style={{
                  marginTop: 4, fontSize: 13, fontWeight: 700,
                  color: statusColor[s.status],
                  padding: '4px 8px', borderRadius: 4,
                  background: s.status === 'danger' ? '#FFEBEE' : s.status === 'warning' ? '#FFF3E0' : '#E8F5E9',
                }}>
                  {s.note}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Chú giải */}
      <div className={styles.legend}>
        <div className={styles.legendTitle}>Chú giải</div>
        <div className={styles.legendSection}>Trạm bơm</div>
        <div className={styles.legendItem}><span className={styles.legDot} style={{ background: '#2E7D32' }}></span> Bình thường</div>
        <div className={styles.legendItem}><span className={styles.legDot} style={{ background: '#F9A825' }}></span> Cần theo dõi</div>
        <div className={styles.legendItem}><span className={styles.legDot} style={{ background: '#E53935' }}></span> Sự cố / Cảnh báo</div>
        <div className={styles.legendSection}>Khu vực</div>
        <div className={styles.legendItem}><span className={styles.legFlood}></span> Vùng ngập lụt</div>
        <div className={styles.legendSection}>Ranh giới</div>
        <div className={styles.legendItem}><span className={styles.legBoundary}></span> Ranh giới tỉnh</div>
        <div className={styles.legendItem}><span className={styles.legDistrict}></span> Ranh giới huyện</div>
      </div>
    </div>
  );
}
