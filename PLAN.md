# PLAN.md — Kế Hoạch Triển Khai Dashboard

**Dựa trên:** `SPEC.md v1.0`  
**Phạm vi:** Frontend Dashboard (phần Đạt phụ trách)  
**Bắt đầu:** 11/04/2026  
**Deadline hoàn thành:** 18/04/2026 (7 ngày)  
**Ngày Demo với Giám đốc Sở:** 20/04/2026

---

## Tổng Quan Phân Công

| Người | Phụ trách | Ghi chú |
|-------|-----------|---------|
| **Đạt** | Dashboard Frontend (Web UI) | File PLAN.md này |
| **Sếp lớn** | AI Backend (AgentScope + FastAPI) + Task Manager | Ghép nối qua API |

> Mục tiêu: Đạt hoàn thành Dashboard ngày 18/04 → 2 ngày còn lại (19-20/04) dành cho ghép nối Backend AI của sếp lớn + chạy thử tổng thể trước Demo.

---

## Sprint Breakdown (7 ngày)

### Sprint 1: Nền Tảng (11/04 - 12/04)
> Mục tiêu: Dự án chạy được, có layout khung, có auth giả lập

| # | Task | Phụ thuộc | Output |
|---|------|-----------|--------|
| 1.1 | Khởi tạo dự án (Vite + React) | — | `npm run dev` chạy OK |
| 1.2 | Design System: CSS Variables theo bảng màu logo Sở | — | File `index.css` |
| 1.3 | Layout Master: Header + Sidebar + Body 3 cột | 1.1, 1.2 | Khung Dashboard |
| 1.4 | Auth giả lập: Login 3 Role khác nhau | 1.1 | Chuyển giao diện theo role |

**Đầu ra Sprint 1:** Mở trình duyệt → thấy layout Dashboard dark mode theo màu logo, login được 3 role.

---

### Sprint 2: Bản Đồ GIS (13/04 - 14/04)
> Mục tiêu: Bản đồ Google Maps hiển thị trạm bơm Bắc Ninh

| # | Task | Phụ thuộc | Output |
|---|------|-----------|--------|
| 2.1 | Tạo Mock Data trạm bơm (JSON: tên, tọa độ, công suất, năm) | — | `mock-data/stations.json` |
| 2.2 | Tích hợp Google Maps vào cột trái | Sprint 1 | Bản đồ tỉnh Bắc Ninh |
| 2.3 | Markers trạm bơm + Popup thông tin | 2.1, 2.2 | Click marker → popup |
| 2.4 | Cảnh báo: marker đổi màu đỏ khi vượt ngưỡng | 2.3 | Marker đỏ nổi bật |

**Đầu ra Sprint 2:** Bản đồ tỉnh Bắc Ninh có ~10-15 trạm bơm giả lập, click vào thấy thông tin.

---

### Sprint 3: Biểu Đồ & Chỉ Số KPI (14/04 - 15/04)
> Mục tiêu: Cột giữa + cột trái có dữ liệu trực quan
> *(Chạy song song với Sprint 2)*

| # | Task | Phụ thuộc | Output |
|---|------|-----------|--------|
| 3.1 | Mock Data mực nước qua các năm (JSON) | — | `mock-data/water-levels.json` |
| 3.2 | Biểu đồ cột so sánh mực nước các năm | Sprint 1, 3.1 | Chart cột trực quan |
| 3.3 | Card KPI nổi bật (tổng trạm, cảnh báo, mực nước max) | Sprint 1 | Card số liệu cột giữa |
| 3.4 | Biểu đồ tròn phân bổ trạm bơm theo huyện | 3.1 | Pie chart |
| 3.5 | Phân quyền hiển thị data theo Role | Sprint 1 | Filter đúng role |

**Đầu ra Sprint 3:** Dashboard có đầy đủ biểu đồ + card chỉ số, mỗi role nhìn thấy dữ liệu khác nhau.

---

### Sprint 4: Khung Chat AI (16/04 - 17/04)
> Mục tiêu: Giao diện chat hoạt động, kết nối mock, tương tác bản đồ

| # | Task | Phụ thuộc | Output |
|---|------|-----------|--------|
| 4.1 | UI Khung Chat (cột phải): input, bubble tin nhắn, scroll | Sprint 1 | Chat UI đẹp |
| 4.2 | Mock AI Response khi hỏi về trạm bơm | 4.1 | Chat trả lời dữ liệu giả |
| 4.3 | Tương tác liên kết: chat hỏi trạm X → bản đồ zoom vào X | 4.2, Sprint 2 | Chat điều khiển bản đồ |
| 4.4 | API Contract: định nghĩa interface để sếp lớn ghép Backend | 4.1 | File `API_CONTRACT.md` |

**Đầu ra Sprint 4:** Chat hoạt động, gõ "trạm bơm Gia Bình" → bản đồ tự zoom. Sẵn sàng cắm API thật.

---

### Sprint 5: Polish & Hoàn Thiện (18/04)
> Mục tiêu: Fix bug, đánh bóng, deploy

| # | Task | Phụ thuộc | Output |
|---|------|-----------|--------|
| 5.1 | Responsive: kiểm tra các kích thước màn hình | All | Không vỡ layout |
| 5.2 | Animation & micro-interaction (hover, transition) | All | Mượt mà |
| 5.3 | Giao diện tối giản cho Cán bộ xã | Sprint 1 | UI riêng đơn giản |
| 5.4 | Deploy lên Google Cloud (Firebase Hosting) | All | URL demo online |
| 5.5 | Test cuối + fix bugs | All | ✅ Sẵn sàng giao |

**Đầu ra Sprint 5:** Dashboard hoàn chỉnh, chạy online, sẵn sàng ghép Backend AI.

---

## Timeline Tổng Quan

```
11/04  12/04  13/04  14/04  15/04  16/04  17/04  18/04    19-20/04
  |---Sprint 1---|---Sprint 2---|                          |
                 |---Sprint 3---|                          |
                                |---Sprint 4---|           |
                                               |--S5--|    |
                                                       Ghép Backend
                                                       + Demo (20/04)
```

---

## Câu Hỏi Cần Sếp Chốt

1. **Tech Stack:** Em đề xuất **Vite + React** (nhẹ, nhanh, đơn giản, phù hợp Dashboard SPA). Sếp đồng ý không?
2. **Google Maps API Key:** Sếp có API Key Google Maps chưa? Hay em dùng bản free (có giới hạn) cho Demo trước?
3. **Lịch ghép Backend:** Sếp lớn dự kiến xong API Backend ngày nào? Em cần biết để thiết kế API Contract phù hợp.
