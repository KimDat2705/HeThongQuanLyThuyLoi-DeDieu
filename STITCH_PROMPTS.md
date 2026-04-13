# STITCH_PROMPTS.md — Bộ Prompt Dành Cho Google Stitch

**Hướng dẫn sử dụng:**
1. Mở https://stitch.withgoogle.com (đăng nhập Google)
2. Copy từng Prompt bên dưới (theo đúng thứ tự Sprint)
3. Paste vào ô nhập của Stitch
4. Chờ Stitch sinh giao diện + code
5. Kiểm tra giao diện → nếu ưng ý, bấm **Export Code** (chọn React)
6. Gửi code lại cho Antigravity để tích hợp

> ⚠️ **QUAN TRỌNG:** Mỗi lần paste prompt, hãy thêm dòng này ở cuối:
> `Tech Stack constraints: Use React with Vanilla CSS Modules. Do NOT use Tailwind CSS. Use HTML5 Semantic elements.`

---

## PROMPT 1: Layout Tổng Quan Dashboard (Sprint 1) — ĐÃ CẬP NHẬT

> Paste prompt này vào Stitch trước tiên — đây là khung xương của toàn bộ Dashboard.
> Cân bằng 2 chủ đề: (1) Thủy lợi & Phòng chống thiên tai + (2) Trạm bơm & Đê điều.

```
Design a professional government dashboard web application for "Sở Nông nghiệp và Môi trường tỉnh Bắc Ninh" (Bac Ninh Department of Agriculture & Environment, Vietnam). This system monitors TWO major domains: (1) Water/Irrigation & Disaster Prevention, and (2) Pump Stations & Dike Infrastructure.

TARGET USERS: Government officials aged 40-60. They need large fonts (16px+ body), high contrast, clear labeled buttons (always show text with icons, never icon-only). Keep it simple and professional.

OVERALL STYLE:
- Light background (#F5F5F5), white cards (#FFFFFF), dark text (#212121)
- Professional, trustworthy, Premium Modern aesthetic
- DO NOT use neon colors, brutalist design, or overly dark themes
- Subtle shadow and soft rounded corners on cards
- Gentle micro-animations (suitable for older users, nothing flashy)
- Font: Inter or Roboto (must support Vietnamese diacritics)

COLOR SYSTEM:
- Primary: Forest Green (#2E7D32) — agriculture
- Secondary: Navy/Slate (#37474F) — environment
- Accent: Gold (#F9A825) — highlights
- Danger: Red (#E53935) — flood/exceeds threshold
- Warning: Orange (#FB8C00) — approaching threshold
- Success: Green (#43A047) — safe/normal

HEADER (top bar, full width):
- Left: Green agriculture logo + title "HỆ THỐNG GIÁM SÁT THỦY LỢI & ĐÊ ĐIỀU"
- Center: Search bar with placeholder "Tìm kiếm trạm bơm, đê điều..."
- Right: Notification bell with red badge, help icon, user avatar + "Giám đốc Sở" role badge

SIDEBAR (left, fixed):
- Navigation with icons AND text labels, grouped into sections:

  Section "TỔNG QUAN":
  - "Tổng quan" (Dashboard icon) — active/highlighted green

  Section "THỦY LỢI & PCTT" (with a storm cloud icon):
  - "Dự báo thời tiết" (weather icon)
  - "Tình hình ngập lụt" (flood wave icon)
  - "Thiệt hại & Báo cáo" (document icon)

  Section "TRẠM BƠM & ĐÊ ĐIỀU" (with a dam icon):
  - "Bản đồ trạm bơm" (map pin icon)
  - "Quản lý đê điều" (shield icon)
  - "Biểu đồ mực nước" (chart icon)

  Bottom: "Cài đặt" (gear icon)

- Active item has green left border + green background
- Collapsible sidebar for smaller screens

MAIN CONTENT AREA - Scrollable, Bento Grid layout, 3 zones:

=== ROW 1: THỦY LỢI & PHÒNG CHỐNG THIÊN TAI ===
A section header text: "⛈️ Thủy lợi & Phòng chống thiên tai" in secondary color.

Left half of Row 1 - 4 KPI cards in a horizontal row:
- Card 1: "Dự Báo Thời Tiết" — icon: cloud with rain — value: "Mưa to 🌧️" — subtext: "Bắc Ninh, hôm nay" — blue accent border
- Card 2: "Cảnh Báo Lũ" — icon: warning wave — value: "3" — subtext: "khu vực đang ngập" — RED background with white text (urgent)
- Card 3: "Thiệt Hại Ước Tính" — icon: money — value: "12.5 tỷ VNĐ" — subtext: "Mùa mưa 2025" — orange accent border
- Card 4: "Báo Cáo PCTT" — icon: document check — value: "5/8" — subtext: "huyện đã nộp" — green if >50%, orange if <50%

Right half of Row 1:
- A small map card titled "Bản đồ ngập lụt" showing a simplified flood map with colored zones (green=safe, yellow=risk, red=flooded)

=== ROW 2: TRẠM BƠM & ĐÊ ĐIỀU ===
A section header text: "🏗️ Trạm bơm & Đê điều" in secondary color.

Left half of Row 2 - 4 KPI cards in a horizontal row:
- Card 1: "Tổng Trạm Bơm" — icon: water pump — value: "562" — subtext: "đang hoạt động" — green accent
- Card 2: "Cảnh Báo Mực Nước" — icon: water drop alert — value: "12" — subtext: "trạm vượt ngưỡng" — red accent
- Card 3: "Mực Nước Cao Nhất" — icon: water level — value: "4.2m" — subtext: "Trạm Gia Bình 3" — blue accent
- Card 4: "Đê Điều An Toàn" — icon: shield check — value: "98%" — subtext: "156/159 tuyến đê" — green accent

Right half of Row 2:
- A map card titled "Bản đồ trạm bơm tỉnh Bắc Ninh" showing the province with colored pin markers

=== ROW 3: BIỂU ĐỒ TỔNG HỢP ===
Two chart cards side by side:
- Left chart: "So sánh mực nước qua các năm" — grouped bar chart, 4 years (2022-2025), monthly data, with a red dashed line at 4.0m threshold
- Right chart: "Phân bổ trạm bơm theo huyện" — donut chart showing 8 districts

=== RIGHT PANEL (fixed, ~28% width): AI CHAT ===
- Header: "Trợ lý AI" with robot icon, green accent stripe
- Chat conversation:
  - User: "Tình hình ngập lụt huyện Gia Bình hôm nay?"
  - AI: "Huyện Gia Bình hiện có 2 khu vực ngập nhẹ tại xã Đại Bái và xã Nhân Thắng. Mực nước sông Đuống đang ở mức 3.8m (cảnh báo mức 1). Dự báo sẽ giảm trong 6 giờ tới." with action buttons: [📍 Xem bản đồ] [📊 Xem biểu đồ]
- Suggested questions section at bottom:
  - "Dự báo lượng mưa đêm nay?"
  - "Trạm bơm nào đang cảnh báo?"
- Input box: placeholder "Hỏi về thời tiết, ngập lụt, trạm bơm, đê điều..."
- Send button labeled "Gửi" in green

Tech Stack constraints: Use React with Vanilla CSS Modules. Do NOT use Tailwind CSS. Use HTML5 Semantic elements.
```

---

## PROMPT 2: Trang Login & Phân Quyền (Sprint 1)

```
Design a login page for the same government dashboard system "Sở Nông nghiệp và Môi trường tỉnh Bắc Ninh".

STYLE: Same color system as before - light background, green primary (#2E7D32), professional government aesthetic. Large fonts for users aged 40-60.

LAYOUT - centered card:
- Top: Government logo (green agriculture emblem) + text "HỆ THỐNG GIÁM SÁT THỦY LỢI & ĐÊ ĐIỀU" + "Tỉnh Bắc Ninh"
- Username field labeled "Tên đăng nhập" with a person icon
- Password field labeled "Mật khẩu" with a lock icon
- A dropdown select labeled "Vai trò" with 3 options:
  - "Giám đốc Sở"
  - "Trưởng phòng"  
  - "Cán bộ xã"
- Large green login button "ĐĂNG NHẬP" with arrow icon
- Footer text: "© 2026 Sở Nông nghiệp và Môi trường tỉnh Bắc Ninh"

The card should have subtle shadow, rounded corners, white background on light gray page.

Tech Stack constraints: Use React with Vanilla CSS Modules. Do NOT use Tailwind CSS. Use HTML5 Semantic elements.
```

---

## PROMPT 3: Bản Đồ GIS Trạm Bơm (Sprint 2)

> Sau khi có layout tổng quan, paste prompt này để Stitch sinh riêng phần bản đồ.

```
Design a map view component for the government water monitoring dashboard.

This replaces the map placeholder from the main dashboard. Show a full interactive map view of Bac Ninh province, Vietnam.

FEATURES:
- Large map taking up the left 60% of the screen
- Right panel (40%) showing a list of pump stations with search/filter
- Map has colored markers:
  - Green markers: stations with normal water level
  - Orange markers: stations approaching warning threshold  
  - Red markers: stations exceeding danger threshold
- When clicking a marker, show a popup card with:
  - Station name (Vietnamese): e.g. "Trạm bơm Gia Bình 1"
  - Year of investment: "Năm đầu tư: 2018"
  - Capacity: "Công suất: 2,500 m³/h"
  - Current water level: "Mực nước: 3.8m" with color-coded badge
  - Status: "Trạng thái: ⚠️ Cảnh báo" in orange
- Right panel list shows all stations sortable by: Name, District, Status
- Search box at top: "Tìm trạm bơm..."
- Filter buttons: "Tất cả", "Bình thường", "Cảnh báo", "Nguy hiểm"

COLORS: Same system - Green primary (#2E7D32), Red danger (#E53935), Orange warning (#FB8C00), light background.

Tech Stack constraints: Use React with Vanilla CSS Modules. Do NOT use Tailwind CSS. Use HTML5 Semantic elements.
```

---

## PROMPT 4: Biểu Đồ So Sánh Mực Nước (Sprint 3)

```
Design a charts and analytics page for the water monitoring dashboard.

LAYOUT - Full page with Bento Grid of chart cards:

CARD 1 (large, top): "So sánh mực nước qua các năm"
- Grouped bar chart comparing water levels for 4 years (2022, 2023, 2024, 2025)
- X-axis: Months (Tháng 1 through Tháng 12)
- Y-axis: Water level in meters (0m to 5m)
- Each year is a different color bar side by side
- A red dashed horizontal line at 4.0m labeled "Ngưỡng cảnh báo"
- Legend showing each year's color

CARD 2 (medium, bottom-left): "Phân bổ trạm bơm theo huyện"
- Pie/donut chart showing distribution across 8 districts:
  - Gia Bình: 45, Lương Tài: 52, Quế Võ: 68, Thuận Thành: 73, Tiên Du: 61, Từ Sơn: 55, Yên Phong: 89, TP Bắc Ninh: 119
- Each segment in a shade of green/blue
- Show labels with count and percentage

CARD 3 (medium, bottom-right): "Xu hướng mực nước 30 ngày"
- Line chart showing daily water level trend for last 30 days
- Single line in blue
- Red zone shading above 4.0m threshold
- Orange zone shading between 3.5m and 4.0m

All cards have white background, subtle shadow, rounded corners. Header with title and icon.

COLORS: Green primary (#2E7D32), Red danger (#E53935), Orange warning (#FB8C00), light background (#F5F5F5).

Tech Stack constraints: Use React with Vanilla CSS Modules. Do NOT use Tailwind CSS. Use Recharts library for charts.
```

---

## PROMPT 5: Khung Chat AI (Sprint 4)

```
Design an AI chat panel component for the government water monitoring dashboard.

This panel sits on the right side of the main dashboard (about 30% width).

LAYOUT:
- Header: "Trợ lý AI" with a robot icon, green accent bar on top
- Chat area with message bubbles:
  - User messages: aligned right, green background (#2E7D32), white text
  - AI messages: aligned left, white background, dark text, subtle border
  - AI messages can include:
    - Plain text responses
    - Small data tables (station name, water level, status)
    - Mini bar charts embedded in response
    - Action buttons like "Xem trên bản đồ" (View on map) in outlined green style
- Timestamp under each message ("14:30 hôm nay")
- Typing indicator when AI is "thinking": 3 animated dots
- Input area at bottom:
  - Text input placeholder: "Hỏi về trạm bơm, mực nước, đê điều..."
  - Send button with arrow icon, green background
  - Microphone icon button (for future voice input)

SAMPLE CONVERSATION:
1. User: "Tình hình trạm bơm huyện Gia Bình?"
2. AI: "Huyện Gia Bình hiện có 45 trạm bơm hoạt động.

| Chỉ số | Giá trị |
|--------|---------|
| Tổng trạm | 45 |
| Bình thường | 41 |
| Cảnh báo | 3 |
| Nguy hiểm | 1 |

Trạm bơm Gia Bình 3 đang ở mức nguy hiểm với mực nước 4.3m.
[Xem trên bản đồ]"

3. User: "So sánh với cùng kỳ năm ngoái"
4. AI: Shows a small comparison chart

STYLE: Professional, clean. Large readable font. High contrast. Same color system.

Tech Stack constraints: Use React with Vanilla CSS Modules. Do NOT use Tailwind CSS. Use HTML5 Semantic elements.
```

---

## PROMPT 6: Giao Diện Cán Bộ Xã — Tối Giản (Sprint 5)

```
Design a simplified dashboard view for commune-level officers ("Cán bộ xã") in the water monitoring system. These users have limited IT skills and are aged 40-60.

REQUIREMENTS:
- EXTREMELY simple layout. Minimal options. Large text. Big buttons.
- NO sidebar navigation. Use a simple top tab bar instead.
- Maximum 3 tabs: "Tổng quan" (Overview), "Nhập dữ liệu" (Data Entry), "Báo cáo" (Reports)

TAB 1 - Tổng quan:
- Show ONLY stations in their commune (e.g., "Xã Đại Bái, Huyện Gia Bình")
- 2-3 large KPI cards: "Trạm bơm: 5", "Cảnh báo: 1", "Mực nước TB: 2.3m"
- Simple status list of stations with color badges (green=OK, orange=warning, red=danger)
- Each station row shows: Name, Current water level, Status badge

TAB 2 - Nhập dữ liệu:
- Simple form to input daily water level readings
- Select station from dropdown
- Input field: "Mực nước (m)" with number input
- Date picker: "Ngày đo"
- Text area: "Ghi chú" (Notes)
- Large green submit button: "GỬI BÁO CÁO"
- Success message after submit: "✅ Đã gửi thành công!"

TAB 3 - Báo cáo:
- Table of submitted reports with columns: Ngày, Trạm bơm, Mực nước, Trạng thái
- Simple, no fancy charts

STYLE: White background, very large fonts (16-18px body), high contrast, green primary (#2E7D32). No glassmorphism, no animations. Pure simplicity.

Tech Stack constraints: Use React with Vanilla CSS Modules. Do NOT use Tailwind CSS. Use HTML5 Semantic elements.
```

---

## THỨ TỰ PASTE VÀO STITCH

| Thứ tự | Prompt | Sprint | Kết quả mong đợi |
|--------|--------|--------|-------------------|
| 1️⃣ | Prompt 1: Layout Tổng Quan | Sprint 1 | Khung Dashboard chính |
| 2️⃣ | Prompt 2: Trang Login | Sprint 1 | Trang đăng nhập |
| 3️⃣ | Prompt 3: Bản Đồ GIS | Sprint 2 | Component bản đồ |
| 4️⃣ | Prompt 4: Biểu Đồ | Sprint 3 | Trang biểu đồ |
| 5️⃣ | Prompt 5: Chat AI | Sprint 4 | Panel chat |
| 6️⃣ | Prompt 6: Giao diện Cán bộ xã | Sprint 5 | Dashboard tối giản |

---

## SAU KHI STITCH SINH CODE

Mỗi lần Stitch hoàn thành, sếp làm theo các bước:
1. Xem giao diện trên preview — chỉnh sửa nếu cần bằng cách gõ thêm yêu cầu bằng tiếng Việt
2. Khi ưng ý → bấm **Export** hoặc **Copy Code**
3. Paste toàn bộ code vào chat với Antigravity kèm ghi chú "Đây là code từ Stitch Prompt X"
4. Antigravity sẽ tích hợp, chỉnh sửa, thêm logic và kết nối dữ liệu
