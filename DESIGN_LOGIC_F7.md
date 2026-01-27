# 📊 SƠ ĐỒ LOGIC TRANG F7 (MY PROGRESS) - HỆ TIẾN TRÌNH KHOA HỌC

## I. TRIẾT LÝ THIẾT KẾ (Vì sao F7 quan trọng)

### ❌ Vấn đề của các app học tập hiện tại
- Người học không thấy được "mình có tiến bộ không"
- Chỉ báo điểm rời rạc → không tạo cảm giác hành trình
- Không có động lực tiếp tục
- Không biết "nên học cái gì tiếp"

### ✅ Giải pháp: Tiến trình = Hành trình, không phải điểm

**Người học không quan tâm mình giỏi cỡ nào**
**→ Họ quan tâm mình có TỐT LÊN không**

Vậy **F7 phải trả lời được 4 câu**:

```
❓ Tôi đang ở đâu? → PHẦN 1 (Tổng quan)
❓ Tôi đã đi được bao xa? → PHẦN 3 (Timeline)
❓ Tôi mạnh – yếu chỗ nào? → PHẦN 2 (Skill Map)
❓ Tiếp theo nên làm gì? → PHẦN 6 (AI Suggestion)
```

---

## II. SƠ ĐỒ LOGIC TỔNG THỂ – F7

```
[1] 🟢 Tổng quan hành trình
    (Hero card: quân bài học, tiến độ %)
        ↓ (Người học thấy mình trên hành trình dài hạn)
[2] 🔵 Bản đồ kỹ năng
    (Radar: 4 trục chính)
        ↓ (Người học thấy "mình mạnh – yếu chỗ nào")
[3] 🟡 Tiến trình theo thời gian
    (Line chart: 4 tuần gần nhất)
        ↓ (Não rất thích đường đi lên ↗️)
[4] 🟣 Danh sách làn điệu đã học
    (Card list: quân bài, trạng thái, điểm)
        ↓ (Cảm giác "đã chinh phục" được gì)
[5] 🏅 Huy hiệu & động lực
    (Badge: 3-4 cái, nhẹ nhưng có)
        ↓ (Gamification nhẹ, không lố)
[6] 🔴 Gợi ý học tiếp (AI)
    (Smart next step: "Bạn nên học cái này tiếp")
        ↓ (Không để bị đứng hình)
[END] ⚠️ AI Ethics Notice
```

**❌ KHÔNG ĐẢO THỨ TỰ**
Đây là learning flow chuẩn của tâm lý học.

---

## III. THIẾT KẾ UI CHI TIẾT – F7

### 🟢 PHẦN 1: TỔNG QUAN HÀNH TRÌNH (Journey Overview)

**Mục tiêu**: Thấy mình đang trên một hành trình dài hạn

**UI**:
```
┌─────────────────────────────────────┐
│                                      │
│      🎶 Hành trình Bài Chòi         │
│         của bạn đi được             │
│                                      │
│    ██████████░░░░░░░░░░░░░░░░░░    │
│                35%                   │
│                                      │
│  Quân bài: 7 / 20                   │
│  "Bạn đã hoàn thành 35% chặng       │
│   đường cơ bản. Tiếp tục thôi!"     │
│                                      │
│  [Tiêu chí tiếp theo]               │
│  ◎ 10 quân bài → Huy hiệu "Tây"   │
│                                      │
└─────────────────────────────────────┘
```

**Màu sắc** (theo Bài Chòi theme):
- Background: `var(--baichoi-yellow)`
- Progress bar fill: `var(--baichoi-earth)` or `var(--baichoi-earth-dark)`
- Text: `var(--baichoi-earth-dark)`

**Animation**:
- Progress bar: `animate-pulse` khi load
- Số đếm: Counter animation (1 → 7 trong 0.8s)

---

### 🔵 PHẦN 2: BẢN ĐỒ KỸ NĂNG (Skill Map – Radar Chart)

**Mục tiêu**: Biết mình mạnh – yếu chỗ nào

**4 Trục chính**:
```
         🎭 Cảm xúc
         /        \
        /          \
  🌬️ Hơi      🎵 Cao độ
        \          /
         \        /
         🥁 Nhịp
```

**UI** (ASCII radar):
```
         ★ 55%
        /  \
       /    \
      /      \
     ★        ★
    62%      78%
     \      /
      \    /
       \  /
        ★ 85%
```

**Tiêu chí hiển thị**:

| Kỹ năng | % | Mô tả | Tooltip |
|--------|---|-------|---------|
| 🎵 Cao độ | 78% | 🟢 Tốt | "Bạn đã khá chuẩn xác với cao độ. Tập trung vào các bài cao hơn nhé!" |
| 🥁 Nhịp | 85% | 🟢 Xuất sắc | "Nhịp của bạn rất đều. Đó là nền tảng tốt!" |
| 🌬️ Hơi & ngân | 62% | 🟡 Đang luyện | "Cần tập kiểm soát hơi tốt hơn. Hãy luyện bài Nhì Nghèo chậm." |
| 🎭 Cảm xúc | 55% | 🟡 Đang luyện | "Luyến láy của bạn còn cứng. Nghe thêm các bà hát để bắt cảm." |

**Color logic**:
- ≥ 80%: 🟢 Xanh (Tốt)
- 60-79%: 🟡 Vàng (Đang luyện)
- < 60%: 🟠 Cam (Cần tập)

---

### 🟡 PHẦN 3: TIẾN TRÌNH THEO THỜI GIAN (Growth Timeline)

**Mục tiêu**: Chứng minh "bạn đang tốt lên thật"

**UI** (Line chart – 4 tuần):
```
100│                    ╱
   │                  ╱
 75│      ╱───────╱
   │    ╱
 50│──╱
   │
  0│────┬────┬────┬────
    Tuần1 Tuần2 Tuần3 Tuần4
```

**Data points**:
```
Tuần 1: 58 (Bắt đầu)
Tuần 2: 65 (Tăng +7)
Tuần 3: 76 (Tăng +11)
Tuần 4: 82 (Tăng +6)
```

**Caption**:
```
📈 "Bạn đã cải thiện +24% trong 4 tuần gần nhất"

📊 Toggle filter:
  ☐ Tổng thể
  ☐ Cao độ
  ☐ Nhịp
  ☐ Hơi & Cảm xúc
```

**Animation**:
- Line vẽ dần từ trái sang phải (draw animation)
- Dots appear + bounce (spring animation)

---

### 🟣 PHẦN 4: DANH SÁCH LÀN ĐIỆU ĐÃ HỌC

**Mục tiêu**: Cảm giác "đã chinh phục" được gì

**UI** (Card list):

```
┌─ Sáu Ghe ────────────────────────┐
│                                   │
│ Status: 🟢 Thành thạo (82%)      │
│                                   │
│ Lần cuối: 2 ngày trước           │
│                                   │
│ Tiến trình:                       │
│ ████████░░░░░░░░░░░ 82%          │
│                                   │
│ [🔁 Luyện lại]  [🎧 Nghe mẫu]  │
│                                   │
└───────────────────────────────────┘

┌─ Mười Phách ──────────────────────┐
│ Status: 🟡 Đang luyện (65%)      │
│ [🔁 Luyện lại]  [🎧 Nghe mẫu]  │
└───────────────────────────────────┘

┌─ Chín Cung ──────────────────────┐
│ Status: 🟡 Đang luyện (58%)      │
│ [🔁 Luyện lại]  [🎧 Nghe mẫu]  │
└───────────────────────────────────┘
```

**Sort by**:
- Mới nhất
- Cao điểm nhất
- Cần cải thiện

---

### 🏅 PHẦN 5: HUY HIỆU & ĐỘNG LỰC (Gamification)

**Mục tiêu**: Giữ người trẻ ở lại app

**UI** (Badge section):

```
🥉 Hoàn thành 5 quân bài đầu tiên
   ✅ Mở khóa (20 ngày trước)
   
🎧 Nghe nghệ nhân 10 lần
   ✅ Mở khóa
   
🌱 Tiến bộ liên tục 7 ngày
   🔒 Cần: 7 ngày (Còn: 3 ngày)
   
🔥 Hoàn thành 100 lần hát
   🔒 Cần: 100 lần (Có: 47 lần)
```

**Logic**:
- ✅ Mở khóa: Hiển thị màu sáng
- 🔒 Chưa: Hiển thị mờ + progress bar

---

### 🔴 PHẦN 6: GỢIY Ý HỌC TIẾP (AI Suggestion)

**Mục tiêu**: Không để người học đứng hình

**UI**:

```
┌─────────────────────────────────────┐
│                                      │
│  🎯 Bước tiếp theo được AI đề xuất  │
│                                      │
│  Luyện: Nhì Nghèo – đoạn kết        │
│                                      │
│  Lý do:                              │
│  "Phù hợp với mức hơi hiện tại.      │
│   Bạn đã sẵn sàng cho bài này."      │
│                                      │
│  [▶ Bắt đầu luyện]  [📅 Nhắc mai]  │
│                                      │
└─────────────────────────────────────┘
```

**AI Logic**:
```
IF (Hơi_score < 70) AND (Cao_độ_score >= 75)
  → Recommend bài chậm để luyện hơi
ELSE IF (Nhịp_score >= 80) AND (Cảm_xúc < 60)
  → Recommend bài có luyến láy rõ
ELSE
  → Next quân bài theo sequence
```

---

### ⚠️ PHẦN 7: AI ETHICS NOTICE (NHỎ NHƯNG PHẢI CÓ)

```
ℹ️ AI chỉ hỗ trợ theo dõi tiến trình. Sự cảm nhận,
   nỗ lực và hướng dẫn của thầy cô vẫn là yếu tố quyết định.
```

---

## IV. LOGIC AI ĐẰNG SAU (CHO SLIDE KỸ THUẬT)

| Thành phần UI | AI xử lý | Dữ liệu |
|---|---|---|
| **Journey (%) ** | `(quân_bài_hoàn_thành / 20) * 100` | Counter |
| **Skill Map** | Aggregation từ 20 lần ghi âm gần nhất | Pitch, Rhythm, Energy |
| **Timeline** | Moving average (MA-4) | History scores |
| **Badge** | Rule-based (hardcoded triggers) | Conditions |
| **Next Step** | Recommendation (Rule + heuristics) | Skill gaps |

**Formula Skill Score**:
```
Skill_Score = (Pitch_Accuracy × 0.3) 
            + (Rhythm_Accuracy × 0.3) 
            + (Energy_Control × 0.2) 
            + (Emotion × 0.2)
```

---

## V. ANIMATION & UX DETAILS

### Transitions
- **Page load**: Fade-in từ trên xuống (0.6s)
- **Progress bar**: Slide từ trái sang phải (1s, ease-out)
- **Counter**: Number troll từ 0 → final (0.8s, cubic-bezier)
- **Radar points**: Appear + scale (stagger 0.2s)
- **Timeline line**: Draw animation (SVG stroke-dasharray)

### Hover effects
- Card: Scale 1.02 + shadow tăng
- Badge: Glow effect
- Chart point: Tooltip appear

### Micro-interactions
- Reload button (F7 → F7): Refresh animation
- Badge unlock notification: Toast + confetti (nhẹ)

---

## VI. VÌ SAO TIẾN TRÌNH NÀY "ĐÚNG"

### ✅ **Cognitive Science**
- **Spacing effect**: Tiến trình theo tuần → Giúp bộ nhớ dài hạn
- **Feedback loops**: Real-time skill map → Self-awareness

### ✅ **Motivation Psychology**
- **Progress principle**: Con người thích thấy progress
- **Autonomy**: Lựa chọn badge, bài tiếp theo
- **Competence**: Skill map chứng minh mình giỏi

### ✅ **Education Science**
- **Formative assessment**: Không phán xử, chỉ theo dõi
- **Growth mindset**: "Đang tốt lên" vs "sai/fail"
- **Mastery learning**: Luyện từng bài đến thành thạo

### ✅ **Cultural fit**
- Phù hợp người trẻ Việt (game-like + respect)
- Không áp lực điểm số
- Liên hệ với nghệ nhân thật (mentor model)

---

## VII. COMPONENT STRUCTURE

```
F7Progress.tsx
├── F7Header_JourneyOverview.tsx (Phần 1)
│   ├── ProgressHero
│   ├── CounterAnimation
│   └── NextMilestone
│
├── F7SkillMap_Radar.tsx (Phần 2)
│   ├── RadarChart (Canvas or SVG)
│   ├── SkillBars (4 items)
│   └── Tooltips
│
├── F7Timeline_Growth.tsx (Phần 3)
│   ├── LineChart
│   ├── FilterToggle
│   └── CaptionText
│
├── F7CardList_Lessons.tsx (Phần 4)
│   ├── LessonCard × N
│   ├── SortFilter
│   └── RetryButton
│
├── F7Badges_Gamification.tsx (Phần 5)
│   ├── BadgeGrid
│   ├── UnlockedBadge
│   └── LockedBadge
│
├── F7Suggestion_Next.tsx (Phần 6)
│   ├── RecommendationCard
│   ├── AIReason
│   └── CTAButtons
│
└── F7Ethics_Notice.tsx (Phần 7)
```

---

## VIII. DATA MOCK (Cho MVP)

```typescript
const progressData = {
  totalCards: 20,
  completedCards: 7,
  lastUpdated: "2025-01-27",
  skillMap: {
    pitch: 78,
    rhythm: 85,
    breathing: 62,
    emotion: 55,
  },
  timeline: [
    { week: 1, score: 58 },
    { week: 2, score: 65 },
    { week: 3, score: 76 },
    { week: 4, score: 82 },
  ],
  lessons: [
    {
      id: 1,
      name: "Sáu Ghe",
      status: "mastered",
      score: 82,
      lastPlayed: "2025-01-25",
    },
    // ...
  ],
  badges: [
    {
      id: 1,
      name: "Hoàn thành 5 bài đầu",
      icon: "🥉",
      unlocked: true,
      unlockedAt: "2025-01-10",
    },
    // ...
  ],
};
```

---

## IX. NEXT STEPS

- [x] Design logic
- [ ] Implement F7_Stages.tsx
- [ ] Refactor F7Progress.tsx
- [ ] Integration dengan F6 (nút Lưu)
- [ ] Animation polish
- [ ] Test + Deploy
- [ ] Slide presentation (30s overview)

---

**Authored**: 27 Jan 2025
**Version**: 1.0 (Design Logic)
**Target**: F7 Progress - Core 4 stages priority (1, 2, 3, 6)
