# SPEC.md — Dashboard Giám Sát Thủy Lợi & Đê Điều Tỉnh Bắc Ninh

**Phiên bản:** 1.1  
**Ngày tạo:** 2026-04-11  
**Người phụ trách:** Đạt (Dashboard & Frontend)  
**Deadline Demo (PoC):** 20/04/2026  
**Tài liệu tham chiếu:** `bao_cao_giai_phap_thuy_loi.md`

---

## 1. MỤC TIÊU (Objective)

Xây dựng **Dashboard Web** trực quan, cao cấp dành cho Ban Giám đốc Sở Nông nghiệp & PTNT tỉnh Bắc Ninh. Dashboard phục vụ 2 mục đích chính:

1. **Giám sát biến động:** Theo dõi tình hình thủy lợi, đê điều, mực nước, trạm bơm trên toàn tỉnh thông qua biểu đồ và bản đồ GIS trực quan.
2. **Hỗ trợ ra quyết định:** Tích hợp AI Chat cho phép Lãnh đạo hỏi đáp bằng tiếng Việt tự nhiên, hệ thống phản hồi dữ liệu và cập nhật giao diện tương tác theo câu hỏi.

---

## 2. ĐỐI TƯỢNG SỬ DỤNG (Users & Roles)

| Role | Quyền hạn | Giao diện |
|------|-----------|-----------|
| **Giám đốc Sở** | Xem toàn bộ hệ thống, tất cả phòng ban, tất cả địa phương | Dashboard đầy đủ 3 cột: Biểu đồ + Chỉ số + Chat AI |
| **Trưởng phòng** | Xem dữ liệu thuộc phạm vi phòng ban mình phụ trách | Dashboard lọc theo phòng ban |
| **Cán bộ xã** | Xem/nhập dữ liệu của xã mình | Giao diện **tối giản nhất có thể** (trình độ CNTT hạn chế) |

---

## 3. TÍNH NĂNG CỐT LÕI (Top 3 — Phạm vi Dashboard)

### 3.1. Dashboard Tổng Quan (Main Layout)
- **Layout 3 cột:** Biểu đồ (trái) — Chỉ số nổi bật (giữa) — Khung Chat AI (phải)
- Phân quyền hiển thị theo Role (Giám đốc thấy tất cả, Trưởng phòng thấy phòng mình, Cán bộ xã thấy xã mình)
- Thiết kế premium: Dark mode, glassmorphism, animation mượt mà
- Responsive trên màn hình lớn (ưu tiên desktop/TV giám sát)

### 3.2. Khung Chat AI Tương Tác
- Giao diện chat nằm bên phải Dashboard
- Lãnh đạo nhập câu hỏi tiếng Việt (VD: "Tình hình trạm bơm Tam Đảo thế nào?")
- AI trả lời + biểu đồ/bản đồ bên trái tự động cập nhật theo ngữ cảnh câu hỏi
- *(Backend AI do sếp lớn phụ trách, Dashboard chỉ cần xây sẵn khung giao tiếp API)*

### 3.3. Bản Đồ GIS & Biểu Đồ So Sánh Mực Nước
- Tích hợp Google Maps API hiển thị vị trí ~500-600 trạm bơm, đê điều trên địa bàn tỉnh
- Click vào trạm bơm → popup hiện: tên, năm đầu tư, công suất, lịch sử nâng cấp
- Biểu đồ cột so sánh mực nước qua các năm (các cột đứng cạnh nhau)
- Cảnh báo trực quan (đổi màu đỏ) khi mực nước vượt ngưỡng an toàn

---

## 4. YÊU CẦU THIẾT KẾ (Design Requirements)

### Đối tượng người dùng (Persona)
- Lãnh đạo và nhân viên cơ quan Nhà nước, **độ tuổi trung bình 40-60**
- **UX:** Font chữ to, độ tương phản cao, nút CTA rõ ràng có text kèm icon, hạn chế icon đứng một mình
- **Sắc thái:** Nghiêm túc, uy tín, minh bạch nhưng vẫn hiện đại (Premium Modern)
- **KHÔNG** dùng màu dạ quang (neon), thiết kế brutalist, hay bóng tối quá ú ám

### Bảng màu (Color Palette) — Hòa quyện theo logo Sở NN&MT Bắc Ninh
| Vai trò | Màu | Hex (tham khảo) | Nguồn gốc |
|---------|-----|-----------------|------------|
| **Primary** | Xanh Rêu/Xanh Ngọc | `#2E7D32` | Nông nghiệp — Bông lúa trên logo |
| **Secondary** | Xanh Navi/Xám | `#37474F` | Môi trường — bầu trời trên logo |
| **Accent** | Vàng Gold | `#F9A825` | Bánh răng trên logo |
| **Danger** | Đỏ | `#E53935` | Cảnh báo mực nước vượt ngưỡng |
| **Warning** | Cam | `#FB8C00` | Mực nước sắp đến ngưỡng |
| **Success** | Xanh lá | `#43A047` | An toàn / Bình thường |
| **Background** | Sáng trung tính | `#F5F5F5` | Sạch sẽ, dễ đọc |
| **Surface** | Trắng | `#FFFFFF` | Card/Panel nền |
| **Text** | Đen/Xám đậm | `#212121` | Dễ đọc, contrast cao |

### Hệ thống cảnh báo (Visual Cues)
- 🔴 **Đỏ** — Vượt ngưỡng / Nguy hiểm
- 🟠 **Cam** — Sắp đến ngưỡng / Cảnh báo
- 🟢 **Xanh lá** — An toàn / Bình thường

### Phong cách
- Nền sáng, tông chuyên nghiệp (KHÔNG dark mode quá tối)
- Glassmorphism nhẹ cho các card chỉ số
- Micro-animation mượt mà nhưng tiết chế (phù hợp persona 40-60 tuổi)
- Font: **Inter** hoặc **Roboto** (hỗ trợ tiếng Việt tốt, dễ đọc)
- Tên hiển thị: **Sở Nông nghiệp và Môi trường tỉnh Bắc Ninh**
- Layout: **Bento Grid** cho Dashboard tổng quan

---

## 5. TECH STACK (Đã chốt)

| Lớp | Công nghệ | Ghi chú |
|-----|-----------|---------|
| **Frontend** | **Vite + React** | SPA, nhanh, nhẹ |
| **Styling** | **Vanilla CSS Modules** | KHÔNG Tailwind. Premium, tự custom |
| **Bản đồ** | Google Maps JavaScript API | Free tier cho Demo |
| **Biểu đồ** | Recharts | Biểu đồ cột, tròn, đường |
| **Hosting** | Google Cloud (Firebase Hosting) | Region `asia-southeast1` |
| **Dữ liệu Demo** | Mock Data (JSON) | Dữ liệu thật sẽ bổ sung sau |

---

## 6. RANH GIỚI — KHÔNG ĐƯỢC LÀM (Boundaries)

### ✅ Luôn làm (Always Do)
- Phân quyền nghiêm ngặt theo Role trước khi hiển thị bất kỳ dữ liệu nào
- Thiết kế giao diện cán bộ xã đơn giản, dễ dùng nhất có thể
- Validate mọi input từ người dùng

### ⚠️ Hỏi trước khi làm (Ask First)
- Thay đổi layout/cấu trúc Dashboard
- Thêm tính năng mới ngoài 3 tính năng cốt lõi
- Thay đổi tech stack

### ❌ Tuyệt đối không làm (Never Do)
- Không để lộ dữ liệu nội bộ ra Internet công cộng (bắt buộc authentication)
- Không cho cấp dưới xem/sửa dữ liệu ngoài phạm vi quyền hạn
- AI chỉ **gợi ý**, không tự ra quyết định thay Lãnh đạo
- Không lưu server ngoài khu vực Châu Á (Google Cloud asia-southeast1)

---

## 7. TIÊU CHÍ THÀNH CÔNG BẢN DEMO (20/04)

- [ ] Giao diện Dashboard hoàn chỉnh, chạy được trên trình duyệt
- [ ] Layout 3 cột hoạt động mượt mà với dữ liệu mock
- [ ] Bản đồ GIS hiển thị được các trạm bơm giả lập
- [ ] Biểu đồ so sánh mực nước hiển thị đúng
- [ ] Khung Chat AI có giao diện, gửi/nhận message (kết nối API Backend sau)
- [ ] Phân quyền: Login 3 role khác nhau thấy giao diện khác nhau

---

## 8. QUY TRÌNH PHÁT TRIỂN

```
/spec (✅ v1.1) → /plan (✅) → /build (Stitch + Antigravity) → /test → /review → /code-simplify → /ship
```

### Quy trình `/build`:
1. **Antigravity** viết prompt chi tiết (dựa trên SPEC + RESEARCH) → lưu vào `STITCH_PROMPTS.md`
2. **Sếp** paste prompt vào Google Stitch (https://stitch.withgoogle.com)
3. **Stitch** sinh giao diện + code React + Vanilla CSS
4. **Sếp** gửi code từ Stitch lại cho Antigravity
5. **Antigravity** tích hợp, chỉnh sửa, thêm logic, kết nối dữ liệu

*File này là hợp đồng kỹ thuật. Mọi thay đổi phạm vi phải cập nhật SPEC.md trước khi code.*
