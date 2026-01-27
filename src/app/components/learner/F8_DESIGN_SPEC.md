# F8 - KẾT NỐI CỘNG ĐỒNG (COMMUNITY MATCH)

**Version**: 1.0 (27/01/2025)
**Design by**: Bạn
**3 layers**: Intent → UI/Animation → Logic

---

## I. TRIẾT LÝ THIẾT KẾ (Intent)

### Mục tiêu chính
Đây không phải màn tìm địa điểm → **Mà là màn "bạn không học một mình"**

Người học phải cảm thấy:
> "À, ngoài kia có người thật, nghệ nhân thật, cộng đồng thật đang chờ mình."

### Giá trị mang lại
- 🔥 AI không còn trừu tượng → kết nối người thật
- ❤️ Đánh vào cảm xúc cộng đồng
- 🌱 Cầu nối: học online → học trực tiếp
- 🧠 Đúng AI recommendation + đúng di sản

---

## II. UI FLOW & ANIMATION

### 1️⃣ TRẠNG THÁI BẤM NÚT: "Tìm CLB gần bạn"

**Nút CTA**
```
🔍 Tìm CLB gần bạn
- Màu: xanh ngọc / xanh lá (#48C9B0)
- Hover: nền sáng hơn + icon scale 1.05 + rung nhẹ
- Click: lõm xuống 1-2px + ripple wave lan ra
- Duration: 100-150ms
```

**Action khi click**
- Xin quyền vị trí (geolocation)
- Request tới AI Engine
- Chuyển sang Loading Screen

---

### 2️⃣ LOADING SCREEN (2-3 giây)

**Background**
- Gradient: xanh lá (#6BCF9B) → vàng nhạt (#FFF9E6)
- Các icon bài chòi trôi chậm theo chiều ngang (z-axis)
- Opacity: 0.2 - 0.3 (background mờ)

**Trung tâm: Radar Animation**
```
Vòng tròn loading dạng bản đồ radar
- Circle 1: opacity 1, scale 1
- Circle 2: opacity 0.6, scale 1.3, delay 0.4s
- Circle 3: opacity 0.3, scale 1.6, delay 0.8s
- Loop vô hạn, ease-out
```

**Text động (Center)**
```
🤖 Đang phân tích vị trí…              [0s - 0.8s]
🎶 Đang đối chiếu trình độ học tập…   [0.9s - 1.7s]
🌱 Đang tìm cộng đồng phù hợp…        [1.8s - 2.6s]
```

- Animation: fade-in (200ms) → show (400ms) → fade-out (200ms)
- Font size: 16px, weight 500
- Color: xanh đậm (#2E7D32)
- Có thể skip: "Bỏ qua >>" (bottom)

---

### 3️⃣ TRANSITION: Loading → Result

**Animation**
- Loading card: zoom-out + blur
- Background: fade-out
- Result card: slide-up từ dưới (translate-y: 100% → 0)
- Duration: 300ms, ease-out

**Result header**
```
✨ Ghép cặp thành công!
Animation: bounce nhẹ 1 lần (scale 0.95 → 1.05 → 1)
Duration: 500ms, bounce easing
```

---

### 4️⃣ CARD CLB CHÍNH (Primary Match)

**Header badge**
```
✨ Ghép cặp thành công!
- Gradient bg: xanh lá → xanh dương nhạt
- Bounce animation khi appear
- Text: "Chúng tôi đã tìm thấy câu lạc bộ phù hợp với bạn"
```

**Card chính: "CLB Bài Chòi Hội An"**
```
Layout:
┌─────────────────────────────────────┐
│ CLB Bài Chòi Hội An                │
│ 📍 Hội An, Quảng Nam                │
│                                     │
│ 📏 Khoảng cách: 2.5 km              │
│ 👥 15 thành viên    🎤 3 nghệ nhân  │
│                                     │
│ 🤖 Vì sao gợi ý?                   │
│ • Gần vị trí của bạn               │
│ • Có nghệ nhân phù hợp trình độ    │
│ • CLB có lịch sinh hoạt đều        │
└─────────────────────────────────────┘
```

**Design**
- Kích thước: max-width 100%, tablet 80%
- Bo góc: 16px
- Shadow: 0 8px 24px rgba(0,0,0,0.12)
- Border: trái 4px highlight xanh lá
- Background: #fff

**Animation**
- Card: slide-up từ y: 50px, opacity 0 → opacity 1
- Duration: 400ms
- Số liệu (15, 3): count-up animation (0 → target, 0.8s)
- Icon 📏: pulse nhẹ (scale 1 → 1.15, 1.5s loop)
- Icon 🎤: pulse offset 0.5s

**Thông tin AI (expandable)**
```
Header: 🤖 Vì sao gợi ý?
State: mặc định MỞ
Animation: expand/collapse 300ms
Content: bullet list
```

---

### 5️⃣ NÚT HÀNH ĐỘNG (CTA)

**Layout**
```
[📞 Liên hệ CLB]  [📅 Xem lịch]
```

**Nút 1: 📞 Liên hệ câu lạc bộ**
- Color: xanh đậm (#1565C0)
- Hover: scale 1.02 + shadow
- Click: bottom sheet trượt lên

**Bottom Sheet Content**
```
📞 Liên hệ câu lạc bộ
─────────────────────
📞 0901 234 567
💬 Zalo / Messenger
📧 hoian@baichoi.vn

Animation:
- Sheet slide-up từ bottom (300ms)
- Blur nền
- Tap item → highlight + copy
```

**Nút 2: 📅 Xem lịch sinh hoạt**
- Color: cam nhạt (#F08A5D)
- Hover: scale 1.02
- Click: flip transition sang Calendar View

**Calendar View**
```
Tuần / Tháng toggle
Ngày có hoạt động: chấm tròn xanh lá
Tooltip khi hover: "Tập luyện mở – chào đón người mới"
Animation: flip 300ms, ngày selected scale + glow
```

---

### 6️⃣ DANH SÁCH "CLB KHÁC GẦN BẠN"

**Header**
```
Câu lạc bộ khác gần bạn
```

**Card phụ (Horizontal scroll / carousel)**
```
┌────────────────────────┐
│ CLB Di sản Bình Định   │
│ 📍 Quy Nhơn            │
│ 📏 45 km  🎤 5 nghệ nhân│
│                        │
│    [ Xem ]             │
└────────────────────────┘
```

**Design**
- Kích thước: compact
- Màu: trung tính (xanh xám #B0BEC5)
- Border: 1px light gray

**Animation**
- Scroll: card fade-in tuần tự (stagger 100ms)
- Hover card: nâng lên 4px + shadow
- Nút Xem: ripple

**Preview Modal (khi bấm "Xem")**
```
CLB Di sản Bình Định
📍 Quy Nhơn, Bình Định
📏 45 km (khoảng 1 giờ di chuyển)

[Ảnh sinh hoạt]

CLB hoạt động mạnh vào mùa lễ hội.
Có các bài Chòi cổ điển + sáng tạo.

CTA:
[🔁 Đổi sang CLB này] [❌ Đóng]
```

---

### 7️⃣ AI TRANSPARENCY FOOTER

**Position**: Bottom của màn hình

**Content**
```
🤖 Gợi ý được tạo bởi AI

Dựa trên:
• Vị trí hiện tại
• Mức độ học tập
• Nhu cầu luyện trực tiếp
```

**Design**
- Font size: 12px
- Color: xám #666
- Icon 🤖: nhỏ
- Có nút ℹ️ → expand details
- Background: very light gray #f5f5f5

---

## III. ANIMATION LANGUAGE (Motion Specs)

| Component | Animation | Duration | Easing | Trigger |
|-----------|-----------|----------|--------|---------|
| Loading radar | Pulse rings | 1.5s loop | ease-out | appear |
| Loading text | Fade in/out | 0.8s each | ease-in-out | appear |
| Result card | Slide-up | 400ms | ease-out | load done |
| Badge | Bounce | 500ms | cubic-bezier(0.34, 1.56, 0.64, 1) | appear |
| Count-up numbers | Count | 0.8s | ease-out | appear |
| Icon pulse | Scale 1→1.15 | 1.5s loop | ease-in-out | appear |
| CTA hover | Scale 1→1.02 | 100ms | ease-out | hover |
| Bottom sheet | Slide-up | 300ms | ease-out | click |
| Modal expand | Blur + scale | 300ms | ease-out | click |
| Card stagger | Fade-in | 300ms | ease-out | scroll |

---

## IV. LOGIC & DATA FLOW

### AI Recommendation Algorithm

**Rule-based layer**
```
distance_score = (maxDist - actualDist) / maxDist * 0.4
skill_match = similarity(learnerLevel, clubLevel) * 0.4
frequency_score = clubActivityFrequency / 7 * 0.2

totalScore = distance_score + skill_match + frequency_score
```

**Ranking**
1. Sort by totalScore DESC
2. Primary = top 1
3. Secondary = top 2-5

**Data structure**
```typescript
interface Club {
  id: string;
  name: string;
  location: { lat, lng };
  distance: number;
  memberCount: number;
  artisanCount: number;
  schedule: string[];
  contact: { phone, zalo, email };
  why: string[]; // Lý do gợi ý
  matchScore: number;
  imageUrl?: string;
}
```

### Geolocation flow
1. Xin permission (nếu chưa có)
2. Get user position
3. Query nearby clubs API
4. Run AI recommendation
5. Return top 5 clubs

---

## V. RESPONSIVE BREAKPOINTS

| Device | Layout |
|--------|--------|
| Mobile < 480px | 1 col, full width, stacked buttons |
| Tablet 480-768px | 1 col, 85% width, buttons side-by-side |
| Desktop ≥768px | 1 col, 70% width, buttons side-by-side |

---

## VI. COLOR PALETTE

| Element | Color | Hex |
|---------|-------|-----|
| Primary CTA | Xanh lá | #6BCF9B |
| Loading gradient | Xanh lá → Vàng | #6BCF9B → #FFF9E6 |
| Card border | Xanh lá | #6BCF9B |
| Contact button | Xanh dương | #1565C0 |
| Calendar button | Cam nhạt | #F08A5D |
| Secondary card | Xanh xám | #B0BEC5 |
| Badge text | Xanh đậm | #2E7D32 |
| AI footer | Xám nhạt | #666 |

---

## VII. ACCESSIBILITY & INCLUSIVE DESIGN

- ✅ All icons có label text
- ✅ Bottom sheet có focus management
- ✅ Color không phải info duy nhất
- ✅ Loading có skip button
- ✅ AI transparency rõ ràng
- ✅ Motion có `prefers-reduced-motion` support

---

## VIII. MEASUREMENT METRICS

**Success criteria**
- ✅ Loading time < 3s
- ✅ User clicks "Contact" > 40%
- ✅ User checks calendar > 35%
- ✅ User switches club < 15%
- ✅ Engagement: return to F8 weekly > 25%

---

## IX. DEV NOTES

**Tech stack**
- React hooks (useState, useEffect)
- Geolocation API
- CSS keyframe animations
- Optional: Framer Motion for complex transitions
- localStorage: save last matched club

**Files to create**
- `F8Community.tsx` - Main component
- `F8_COMPONENTS.tsx` - Subcomponents (Loading, ClubCard, etc)
- `F8_DESIGN_TOKENS.ts` - Colors, animations, utilities
- `F8_DATA.ts` - Mock data + AI logic

**Performance**
- Lazy load secondary club images
- Memoize AI calculation
- Cache geolocation result (5 min)

---

## X. TÓM TẮT 1 CÂU

**"Bài Chòi Echo AI không dừng ở việc học với máy, mà đưa người học trở lại với cộng đồng, nghệ nhân và không gian văn hóa sống."**

---
