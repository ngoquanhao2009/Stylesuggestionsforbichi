# 🎨 F7 PROGRESS - UI SPEC CHI TIẾT (3 LỚP THIẾT KẾ)

## 🎯 TRIẾT LÝ TỔNG THỂ

**Trang này không phải bảng điểm, mà là bản đồ hành trình cá nhân**

Người học mở ra → cảm giác: "À, mình đang tới đâu, mình có thể đi tiếp."

**3 Nguyên tắc**:
1. Cảm xúc → Dữ liệu → Hành động
2. Ít phán xét, nhiều khích lệ
3. Số liệu phải "nhìn thấy" bằng hình ảnh & chuyển động

---

## 📐 KHỐI 1: TỔNG QUAN HÀNH TRÌNH (Hero Progress)

### 🎨 UI HIỂN THỊ

```
┌─────────────────────────────────────┐
│                                      │
│      🎶 Hành trình Bài Chòi         │
│         của bạn                      │
│                                      │
│    [  ███████░░░░░░░░░░  ] 35%      │
│                                      │
│    7 / 20 quân bài đã hoàn thành    │
│                                      │
│    🌿 Bạn đã đi được 1/3 con        │
│       đường. Rất tốt!                │
│                                      │
│    ◎ Tiêu chí tiếp: 10 quân bài     │
│       → Huy hiệu Tây                │
│                                      │
└─────────────────────────────────────┘
```

### 🎬 ANIMATION & THIẾT KẾ

| Element | Animation | Duration | Easing | Purpose |
|---------|-----------|----------|--------|---------|
| **Thanh tiến trình** | Fill từ trái sang phải | 0.8s | ease-out | Tạo cảm giác chảy, phát triển |
| **Progress bar color** | Gradient xanh nhạt → xanh đậm | - | - | Visual metaphor của sự tăng trưởng |
| **Số % (35%)** | Count-up animation | 0.8s (sync với bar) | cubic-bezier | Số tương đồng với visual |
| **Icon 🌿** | Fade-in + scale 1.05x → 1.0x | 0.6s | spring | Cảm giác sống động |
| **Message text** | Fade-in | 0.4s (delay 0.2s) | ease-in | Đọc được sau khi thấy progress |

### 🧮 LOGIC & TÍNH TOÁN

```typescript
// Calculation
percentage = (completedCards / totalCards) * 100  // 7 / 20 = 35%

// Message logic (não người học thích)
if (percentage < 30) message = "🌱 Mới bắt đầu. Cứ tiếp tục thôi!"
if (30 <= percentage < 60) message = "🌿 Đã đi được 1/3. Rất tốt!"
if (60 <= percentage < 85) message = "🌳 Sắp hoàn thành. Một chút nữa!"
if (percentage >= 85) message = "🎉 Nắm vững cơ bản. Sẵn sàng cao hơn!"

// Milestone logic
nextMilestone = {
  target: Math.ceil(completedCards / 5) * 5,  // Làm tròn đến 5
  reward: MILESTONE_REWARDS[Math.ceil(completedCards / 5)]
}
// VD: 7 completed → tiêu chí tiếp = 10 → Huy hiệu Tây
```

### 🎨 COLOR SCHEME

```css
/* Xanh dần theo phần trăm */
0-25%: #90EE90 (Light green)
25-50%: #7FD87F
50-75%: #6EC26E (Medium green)
75-100%: #4CAF50 (Forest green)
```

---

## 📊 KHỐI 2: BẢN ĐỒ KỸ NĂNG (Skill Map)

### 🎨 UI HIỂN THỊ

```
┌─ 🎵 Cao độ (Pitch) ────────────────┐
│ ████████░░░░░░░░░░ 78% (🟡)       │
│                                    │
│ "Bạn lên khá chính xác"            │
│                                    │
│ Hover tooltip:                     │
│ "Bạn đã khá chuẩn xác. Tập trung   │
│  vào bài cao hơn nhé!"             │
└────────────────────────────────────┘

┌─ 🥁 Nhịp (Rhythm) ────────────────┐
│ ██████████░░░░░░░░ 85% (🟢)       │
│ "Nhịp hô khá đều"                 │
│ Tooltip: "Nhịp rất đều!"           │
└────────────────────────────────────┘

[Tương tự cho 🌬️ Hơi & 🎭 Cảm xúc]
```

### 🎬 ANIMATION & THIẾT KẾ

| Element | Animation | Duration | Effect |
|---------|-----------|----------|--------|
| **Progress ring** | Fill từ 0% → target% | 0.6s | Stroke animation (SVG) |
| **Color change** | Transition smooth | 0.3s | Dựa theo % |
| **Số %** | Count-up | 0.6s (sync ring) | cubic-bezier(0.34, 1.56, 0.64, 1) |
| **Tooltip** | Slide up + fade-in | 0.3s | On hover/tap |
| **Card hover** | Scale 1.02 + shadow ↑ | 0.2s | Responsive feedback |

### 🎨 COLOR LOGIC

```typescript
const getSkillColor = (percentage: number) => {
  if (percentage >= 80) return { bg: "green-50", border: "green-500", emoji: "🟢", label: "Tốt" }
  if (percentage >= 60) return { bg: "yellow-50", border: "yellow-500", emoji: "🟡", label: "Đang luyện" }
  return { bg: "orange-50", border: "orange-500", emoji: "🟠", label: "Cần tập" }
}
```

### 🧮 LOGIC & CÔNG THỨC

```typescript
// Skill score = trung bình có trọng số
skillScore = {
  pitch: weightedAverage(pitch_scores, weights=recent_heavier),
  rhythm: weightedAverage(rhythm_scores, ...),
  breathing: weightedAverage(breathing_scores, ...),
  emotion: weightedAverage(emotion_scores, ...)
}

// Tránh phán xét cứng
// Chỉ dùng ngưỡng an toàn cho học tập
```

### 📌 Tooltip nội dung

```typescript
const tooltips = {
  pitch_78: "Bạn đã khá chuẩn xác với cao độ. Tập trung vào các bài cao hơn nhé!",
  rhythm_85: "Nhịp của bạn rất đều. Đó là nền tảng tốt!",
  breathing_62: "Cần tập kiểm soát hơi tốt hơn. Hãy luyện bài Nhì Nghèo chậm.",
  emotion_55: "Luyến láy của bạn còn cứng. Nghe thêm các bà hát để bắt cảm.",
}
```

---

## 📈 KHỐI 3: TIẾN TRÌNH THEO THỜI GIAN (Growth Chart)

### 🎨 UI HIỂN THỊ

```
📈 Tiến trình theo thời gian
✅ +24% trong 4 tuần gần nhất

┌─────────────────────────────────┐
│100│                          ╱  │
│   │                        ╱    │
│ 75│      ╱───────╱             │
│   │    ╱                        │
│ 50│──╱                          │
│   │                            │
│  0└──┬─────┬─────┬─────┬──────┘
│    W1    W2    W3    W4
│   58    65    76    82
└─────────────────────────────────┘

Toggle filter:
☐ Tổng thể  ☐ 🎵 Cao độ  ☐ 🥁 Nhịp  ☐ 🎭 Cảm xúc
```

### 🎬 ANIMATION & THIẾT KẾ

| Element | Animation | Duration | Effect |
|---------|-----------|----------|--------|
| **Line chart** | Draw từ trái sang phải | 1.0s | SVG stroke-dasharray animation |
| **Data points** | Appear + scale 0.8 → 1.0 | 0.3s (stagger 0.1s) | Spring animation |
| **Point hover** | Tooltip fade-in + scale | 0.2s | Interactive feedback |
| **Filter toggle** | Crossfade chart | 0.4s | Smooth transition khi đổi filter |
| **Caption** | Fade-in | 0.3s | Sau khi chart drawn |

### 🧮 LOGIC & CÔNG THỨC

```typescript
// Moving Average (NOT raw scores)
// Tránh tâm lý "1 lần luyện kém = tụt mood"

const calculateMovingAverage = (scores: number[], window = 4) => {
  const ma = []
  for (let i = 0; i < scores.length; i++) {
    const start = Math.max(0, i - window + 1)
    const slice = scores.slice(start, i + 1)
    ma.push(Math.round(slice.reduce((a, b) => a + b) / slice.length))
  }
  return ma
}

// Example
rawScores = [55, 58, 60, 65, 68, 76, 75, 82]
movingAverage = [55, 56, 57, 61, 65, 70, 76, 79]  // Smooth curve

// Timeline display
weeks = [1, 2, 3, 4]  // Last 4 weeks
scores = movingAverage.slice(-4)  // [70, 76, 79, 82]
improvement = scores[3] - scores[0]  // +12%
```

### 📊 DATA STRUCTURE

```typescript
interface TimelineData {
  week: number
  score: number
  category?: "total" | "pitch" | "rhythm" | "emotion"
  rawScore?: number  // hidden
  movingAvg: number
}
```

---

## 📚 KHỐI 4: DANH SÁCH LÀN ĐIỆU ĐÃ HỌC

### 🎨 UI HIỂN THỊ

```
┌─ Sáu Ghe ─────────────────────────┐
│                                    │
│ Status: 🟢 Thành thạo             │
│ Điểm tốt nhất: 82% (không phải 81%) │
│ Lần cuối: 2 ngày trước             │
│                                    │
│ [████████░░░░░░░░░░] 82%          │
│                                    │
│ [🔁 Luyện lại]  [🎧 Nghe]        │
│                                    │
└────────────────────────────────────┘
```

### 🎬 ANIMATION & THIẾT KẾ

| Element | Animation | Effect |
|---------|-----------|--------|
| **Card** | Hover: scale 1.02 + shadow ↑ 4px | 0.2s |
| **Button 🔁** | Ripple effect | On tap |
| **Button 🎧** | Icon spin 180° | On tap |
| **Progress bar** | Fill animation | 0.4s |
| **Card enter** | Fade-in + slide-up | 0.3s (stagger từ trên) |

### 🧮 LOGIC & SẮP XẾP

```typescript
// Sort options
sortBy = "recent" | "score"

if (sortBy === "recent") {
  lessons.sort((a, b) => new Date(b.lastPlayed) - new Date(a.lastPlayed))
} else if (sortBy === "score") {
  lessons.sort((a, b) => b.score - a.score)
}

// Filter options (optional)
filter = "all" | "mastered" | "learning"
```

### 🎬 Button handlers

```typescript
onRetry = (lessonId) => {
  // Ripple animation
  // Navigate → F3 (Scan) → F5 (Practice)
  setScreen("practice")
  setCurrentLesson(lessonId)
}

onListen = (lessonId) => {
  // Mini audio player slide up
  // Play sample audio
}
```

---

## 🏅 KHỐI 5: HUY HIỆU & THÀNH TỰU (Gamification)

### 🎨 UI HIỂN THỊ

```
🏅 Huy hiệu & thành tựu

┌─────────────────────────────────────┐
│ 🥉          🎧          🌱    🔥  │
│ Hoàn thành  Nghe        Tiến   100 │
│ 5 bài       10 lần      bộ 7    lần │
│             đầu         ngày         │
│ ✅ Mở khóa  ✅ Mở khóa  3/7      47/100 │
│             Mở khóa     [███░░░░]   [█░░] │
└─────────────────────────────────────┘
```

### 🎬 ANIMATION & THIẾT KẾ

| Element | Animation | Effect |
|---------|-----------|--------|
| **Badge mở khóa** | Pop + tiny confetti | 0.3s + particles 0.5s |
| **Badge progress** | Ring rotate continuous | 3-4s loop (subtle) |
| **Badge mở khóa → mở** | Glow pulse | 0.5s |
| **Card enter** | Grid stagger | 0.1s delay |

### 🧮 LOGIC & RULE

```typescript
// Rule-based (NOT ML)
const badges = [
  {
    id: 1,
    name: "Hoàn thành 5 bài đầu",
    icon: "🥉",
    rule: completedCards >= 5,
    unlocked: true
  },
  {
    id: 2,
    name: "Nghe nghệ nhân 10 lần",
    icon: "🎧",
    rule: listenCount >= 10,
    unlocked: true
  },
  {
    id: 3,
    name: "Tiến bộ liên tục 7 ngày",
    icon: "🌱",
    rule: consecutiveDays >= 7,
    progress: 3,
    maxProgress: 7,
    unlocked: false
  },
  {
    id: 4,
    name: "Hoàn thành 100 lần hát",
    icon: "🔥",
    rule: totalPracticeCount >= 100,
    progress: 47,
    maxProgress: 100,
    unlocked: false
  }
]

// Check unlock status
badges.forEach(b => {
  b.unlocked = b.rule
})
```

---

## 🎯 KHỐI 6: BƯỚC TIẾP THEO (AI Recommendation)

### 🎨 UI HIỂN THỊ

```
┌────────────────────────────────────┐
│ 🎯 Bước tiếp theo được AI đề xuất  │
│                                    │
│ Luyện: Nhì Nghèo – đoạn kết       │
│                                    │
│ Lý do:                             │
│ "Phù hợp với mức hơi hiện tại.     │
│  Bạn đã sẵn sàng cho bài này."     │
│                                    │
│ [▶ Bắt đầu luyện]  [📅 Nhắc mai] │
│                                    │
└────────────────────────────────────┘
```

### 🎬 ANIMATION & THIẾT KẾ

| Element | Animation | Effect |
|---------|-----------|--------|
| **Card nền** | Fade-in | 0.4s |
| **CTA nút** | Pulse glow | 1.5s loop (subtle) |
| **▶ Button** | On tap: scale + ripple | 0.2s |
| **📅 Icon** | Gentle shake | 0.1s (when set) |

### 🧮 LOGIC & RECOMMENDATION

```typescript
// Rule-based recommendation (no heavy ML)
const getNextLesson = (skillMap) => {
  // Prioritize gaps
  if (skillMap.breathing < 70 && skillMap.pitch >= 75) {
    return {
      lesson: "Nhì Nghèo – bản chậm (luyện hơi)",
      reason: "Phù hợp với mức hơi hiện tại. Bạn đã sẵn sàng."
    }
  }
  
  if (skillMap.emotion < 60) {
    return {
      lesson: "Mười Phách (bài có luyến láy rõ)",
      reason: "Nên nghe thêm bà hát để bắt cảm xúc."
    }
  }
  
  // Default: next in sequence
  return {
    lesson: LESSON_SEQUENCE[completedCards],
    reason: "Bạn sẵn sàng cho bài tiếp theo."
  }
}

// Button handler
onStartLesson = () => {
  // Ripple
  // Reset F3 (Scan) → F5 (Practice) cho bài mới
}

onRemindTomorrow = () => {
  // Schedule notification (mock: save to localStorage)
  localStorage.setItem("reminder", Date.now() + 86400000)  // +1 day
}
```

---

## ⚠️ KHỐI 7: GHI CHÚ ĐẠO ĐỨC AI (Footer)

### 🎨 UI HIỂN THỊ

```
┌──────────────────────────────────────┐
│ ℹ️ AI chỉ hỗ trợ theo dõi tiến trình.│
│    Sự cảm nhận, nỗ lực và hướng dẫn  │
│    của thầy cô vẫn là yếu tố quyết   │
│    định.                             │
└──────────────────────────────────────┘
```

### 🎨 STYLING

```css
/* Footer notice */
background: #F5F5F5
border: 1px solid #DDD
font-size: 12px
color: #666
padding: 12px
border-radius: 6px
margin-top: 24px
text-align: center
```

---

## 🎯 KHỐI 8: RESPONSIVE & MOBILE

### 📱 Breakpoints

```typescript
// Desktop (≥768px)
- 4 skill items in grid
- 2 columns badge grid
- Full line chart visible

// Tablet (480–768px)
- 2 skill items per row
- 2 columns badge grid
- Chart slightly compressed

// Mobile (<480px)
- 1 skill item per row (full width)
- 2x2 badge grid
- Chart vertical-scrollable
```

---

## 🎨 COLOR PALETTE

```typescript
// Semantic
🟢 Success: #4CAF50
🟡 Warning: #FFC107
🟠 Info: #FF9800
🔴 Error: #F44336

// Bài Chòi theme
primaryYellow: var(--baichoi-yellow)
primaryEarth: var(--baichoi-earth)
darkEarth: var(--baichoi-earth-dark)

// Backgrounds
lightBg: #F5F5F5
cardBg: #FFFFFF
```

---

## 🎬 ANIMATION LIBRARY

```typescript
// Framer Motion presets
const animations = {
  countUp: {
    from: 0,
    to: targetValue,
    duration: 0.8,
    easing: "easeOut"
  },
  
  drawLine: {
    strokeDasharray: pathLength,
    strokeDashoffset: [pathLength, 0],
    duration: 1.0,
    easing: "easeInOut"
  },
  
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    duration: 1.5,
    repeat: Infinity
  },
  
  popIn: {
    scale: [0.8, 1.1, 1],
    opacity: [0, 1, 1],
    duration: 0.3,
    easing: "spring"
  }
}
```

---

## 📋 SUMMARY TABLE

| Khối | Mục tiêu | Key Animation | Logic |
|------|----------|---------------|----|
| 1 | Hero progress | Count-up + fill | % calc, milestone rule |
| 2 | Skill map | Stroke animation + hover tooltip | Weighted average |
| 3 | Growth chart | Line draw + point pulse | Moving average (4-week) |
| 4 | Lesson list | Hover scale + ripple | Sort by recent/score |
| 5 | Badges | Pop + glow | Rule-based unlock |
| 6 | Recommendation | Pulse CTA | Gap-fill algorithm |
| 7 | Ethics footer | Static | Transparency |
| 8 | Responsive | All scale gracefully | Breakpoint logic |

---

**Design by**: Bạn (27/01/2025)
**Implementation**: Code gen
**Status**: Ready for dev implementation
