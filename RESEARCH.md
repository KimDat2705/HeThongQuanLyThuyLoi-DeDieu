# RESEARCH.md — Danh sách GitHub Repos Tham Khảo

**Mục đích:** Tham khảo giao diện, cấu trúc code, bố cục Dashboard từ các dự án open-source có nhiều sao nhất trên GitHub. Lấy nền tảng từ đây để chỉnh sửa, không làm từ đầu.

**Ngày research:** 11/04/2026

---

## TOP 10 REPOS — Dashboard & Monitoring

### Nhóm A: Dashboard Admin Template (Nền tảng UI)

| # | Tên Repo | ⭐ Stars | Tech Stack | Tại sao chọn |
|---|----------|---------|------------|---------------|
| 1 | [**shadcn-admin**](https://github.com/satnaing/shadcn-admin) | ~6k+ | Vite + React + TypeScript | Layout sidebar + dark mode rất đẹp, Bento Grid, có sẵn nhiều page mẫu. **Gần nhất với yêu cầu của mình** |
| 2 | [**Ant Design Pro**](https://github.com/ant-design/ant-design-pro) | ~36k | React + Ant Design | Enterprise-grade, rất phù hợp hệ thống Nhà nước, biểu đồ sẵn có |
| 3 | [**React Admin**](https://github.com/marmelab/react-admin) | ~25k | React + Material UI | Framework CRUD mạnh, phân quyền Role sẵn, data provider linh hoạt |
| 4 | [**Horizon UI**](https://github.com/horizon-ui/horizon-ui-chakra) | ~4k+ | React + Chakra UI | Thiết kế premium, dark mode đẹp, KPI card rất ấn tượng |
| 5 | [**Devias Kit (Material)**](https://github.com/devias-io/material-kit-react) | ~5k+ | React + Material UI | Dashboard template gọn gàng, auth flow sẵn, responsive tốt |
| 6 | [**CoreUI React**](https://github.com/coreui/coreui-free-react-admin-template) | ~12k+ | React + Bootstrap 5 | Ổn định, nhiều widget, chart tích hợp sẵn |

### Nhóm B: GIS / Bản đồ & Giám sát (Tham khảo tính năng chuyên biệt)

| # | Tên Repo | ⭐ Stars | Tech Stack | Tại sao chọn |
|---|----------|---------|------------|---------------|
| 7 | [**TNRIS/flood**](https://github.com/TNRIS/flood) | ~100+ | React | Dashboard giám sát lũ lụt thực tế tại Texas (Mỹ), **giống nghiệp vụ mình nhất** |
| 8 | [**React-Dashboard-Water-Level**](https://github.com/kreangsak-dev/react-dashboard-water-level) | ~50+ | React + Firebase | Dashboard mực nước IoT, kết nối Firebase — tham khảo cách hiển thị dữ liệu nước |
| 9 | [**ReEarth Visualizer**](https://github.com/reearth/reearth-visualizer) | ~700+ | React + WebGL | Nền tảng GIS 3D, hiển thị bản đồ phức tạp — tham khảo cách tích hợp Map |

### Nhóm C: Chat AI Interface (Tham khảo khung chat)

| # | Tên Repo | ⭐ Stars | Tech Stack | Tại sao chọn |
|---|----------|---------|------------|---------------|
| 10 | [**Chatbot UI**](https://github.com/mckaywrigley/chatbot-ui) | ~28k+ | Next.js + React | Giao diện chat AI đẹp nhất GitHub, rất giống ChatGPT — **tham khảo cho cột phải Chat** |

---

## CHIẾN LƯỢC SỬ DỤNG

```
Không code từ đầu. Lấy nền tảng → chỉnh sửa → tiết kiệm 60-70% thời gian.
```

| Phần Dashboard | Repo tham khảo chính | Lấy gì |
|----------------|---------------------|--------|
| **Layout + Sidebar + Auth** | shadcn-admin (#1) hoặc Ant Design Pro (#2) | Cấu trúc thư mục, routing, dark mode, phân quyền |
| **Biểu đồ + KPI Cards** | Horizon UI (#4) + Ant Design Pro (#2) | Card glassmorphism, Recharts integration |
| **Bản đồ GIS** | TNRIS/flood (#7) + Water-Level (#8) | Cách hiển thị marker trạm bơm, popup thông tin |
| **Khung Chat AI** | Chatbot UI (#10) | Message bubble UI, scroll, input box |
| **Cảnh báo Visual Cues** | TNRIS/flood (#7) | Hệ thống màu Đỏ/Cam/Xanh theo mức cảnh báo |

---

## ĐỀ XUẤT: REPO NỀN TẢNG CHÍNH

> **shadcn-admin** (https://github.com/satnaing/shadcn-admin) được đề xuất làm nền tảng chính vì:
> - ✅ Vite + React (đúng tech stack đã chốt)
> - ✅ Dark mode sẵn có
> - ✅ Layout sidebar + multi-page
> - ✅ TypeScript (an toàn hơn)
> - ✅ Dễ custom CSS (chuyển từ Tailwind sang Vanilla CSS Modules)
>
> **Tuy nhiên:** shadcn-admin dùng Tailwind CSS. Theo yêu cầu sếp lớn "KHÔNG Tailwind", em sẽ cần chuyển đổi sang Vanilla CSS Modules. Hoặc em có thể lấy cấu trúc + layout của nó làm tham khảo rồi tự code lại bằng Vanilla CSS cho sạch.

---
*File này là kết quả bước Research trước khi Build. Cập nhật thêm nếu phát hiện repo mới phù hợp.*
