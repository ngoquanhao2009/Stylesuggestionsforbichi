# 🏗️ B6 ARCHITECTURE & COMPONENT TREE

---

## 📦 Project Structure

```
src/
├── app/
│   ├── components/
│   │   └── learner/
│   │       ├── B6_MapDistribution.tsx      ← MAIN (State manager)
│   │       │   │
│   │       │   ├─→ B6_MapHeader.tsx        ← Header (UI)
│   │       │   │
│   │       │   ├─→ B6_MapCanvas.tsx        ← Map SVG (Rendering)
│   │       │   │   ├─→ Markers (6)
│   │       │   │   ├─→ Legend
│   │       │   │   └─→ Zoom controls
│   │       │   │
│   │       │   ├─→ B6_InfoPanel.tsx        ← Side panel (Stats)
│   │       │   │   ├─→ Header
│   │       │   │   ├─→ Statistics
│   │       │   │   ├─→ Risk meter
│   │       │   │   ├─→ AI Insight
│   │       │   │   └─→ Buttons
│   │       │   │
│   │       │   ├─→ B6_TimeSlider.tsx       ← Timeline (2015-2025)
│   │       │   │
│   │       │   └─→ B6_StoryMode.tsx        ← Story modal (Narrative)
│   │       │
│   │       └─ [Other components...]
│   │
│   └── App.tsx
│
├── data/
│   ├── danangAreas.ts                      ← Mock data (6 areas)
│   └── [Other data files...]
│
└── styles/
    ├── B6_Animations.css                   ← Animations (40+)
    ├── index.css
    └── [Other styles...]
```

---

## 🔄 Component Flow

```
┌─────────────────────────────────────┐
│  B6_MapDistribution (Main)          │
│  ├─ State:                          │
│  │  ├─ showMap (boolean)            │
│  │  ├─ selectedArea (Area | null)   │
│  │  ├─ currentYear (2015-2025)      │
│  │  ├─ storyMode (boolean)          │
│  │  ├─ mapZoom (0.8-3)              │
│  │  └─ mapPan (x, y)                │
│  │                                 │
│  └─ Handlers:                       │
│     ├─ handleViewMap()              │
│     ├─ handleMouseDown/Move/Up()    │
│     ├─ handleWheel()                │
│     └─ useEffect (story auto-play)  │
│                                     │
├─ showMap = false                    │
│  └─→ Entry UI                       │
│      ├─ Title animation             │
│      ├─ CTA button                  │
│      └─ Decorative icons            │
│                                     │
└─ showMap = true                     │
   ├─→ B6_MapHeader                   │
   │   └─ Back button                 │
   │   └─ Story mode toggle           │
   │                                 │
   ├─→ B6_MapCanvas                   │
   │   ├─ SVG rendering               │
   │   ├─ 6 markers                   │
   │   ├─ Drag/pan handler            │
   │   └─ Props:                      │
   │       ├─ areas[]                 │
   │       ├─ selectedArea            │
   │       ├─ currentYear             │
   │       ├─ mapZoom                 │
   │       ├─ mapPan                  │
   │       └─ storyMode               │
   │                                 │
   ├─→ B6_InfoPanel (if selected)     │
   │   └─ Props:                      │
   │       ├─ area                    │
   │       ├─ currentYear             │
   │       └─ onClose()               │
   │                                 │
   ├─→ B6_TimeSlider                  │
   │   └─ Props:                      │
   │       ├─ currentYear             │
   │       ├─ onYearChange()          │
   │       └─ disabled (story mode)   │
   │                                 │
   └─ storyMode = true                │
      └─→ B6_StoryMode (Modal)        │
          ├─ 4-slide carousel         │
          ├─ Typewriter animation     │
          └─ Auto-play 3s/slide       │
```

---

## 📊 Data Flow

```
┌───────────────────┐
│  getDaNangAreas() │ (6 areas mock data)
└────────┬──────────┘
         │
         ▼
┌────────────────────────────────┐
│  B6_MapDistribution            │
│  const areas = getDaNangAreas()│
└────────┬───────────────────────┘
         │
         ├─→ B6_MapCanvas
         │   └─ Render 6 markers
         │       ├─ currentYear filtering
         │       └─ Status animation
         │
         ├─→ B6_TimeSlider
         │   └─ onYearChange() updates
         │
         └─→ B6_InfoPanel
             └─ Selected area data
                 ├─ Statistics
                 ├─ Historical data
                 └─ AI insight
```

---

## 🎬 Animation Flow

```
USER ACTION → EVENT HANDLER → STATE UPDATE → RE-RENDER → CSS ANIMATION

Example 1: Click "Xem Bản Đồ"
  User click
  ↓
  handleViewMap()
  ↓
  setShowMap(true)
  ↓
  Re-render with showMap=true
  ↓
  Entry → Map transition animation (600ms)
  └─ CSS: transform + opacity


Example 2: Click Marker
  User click marker
  ↓
  onSelectArea(area)
  ↓
  setSelectedArea(area) + setMapZoom(1.5)
  ↓
  Re-render with selectedArea
  ↓
  Marker scale animation (400ms)
  Panel slide-in animation (400ms)
  ↓
  User sees result


Example 3: Drag Map
  User mouseDown + move
  ↓
  handleMouseMove()
  ↓
  setMapPan({ x, y })
  ↓
  SVG transform update (real-time)
  ↓
  Map pans smoothly
  └─ transform: translate(x, y)


Example 4: Kéo Time Slider
  User change year
  ↓
  onYearChange(year)
  ↓
  setCurrentYear(year)
  ↓
  B6_MapCanvas re-render
  ├─ getAreaStatusByYear() → new colors
  ├─ Markers fade to new color
  ├─ B6_InfoPanel re-render
  └─ Statistics count-up animation (1s)
```

---

## 🧩 Component Relationship Matrix

```
┌──────────────┬─────┬──────┬──────┬──────┬──────┐
│ Component    │ Main│Header│Canvas│Panel│Slider│
├──────────────┼─────┼──────┼──────┼──────┼──────┤
│ Main         │  -  │ Pass │ Pass │ Show │ Pass │
│              │     │ State│State │State │State │
├──────────────┼─────┼──────┼──────┼──────┼──────┤
│ Header       │ ←   │  -   │  -   │  -   │  -   │
│ (onBack)     │     │      │      │      │      │
├──────────────┼─────┼──────┼──────┼──────┼──────┤
│ Canvas       │ ←   │  -   │  -   │Send  │ ←    │
│ (click mark) │Call │      │      │Area  │Zoom  │
├──────────────┼─────┼──────┼──────┼──────┼──────┤
│ Panel        │ ←   │  -   │  -   │  -   │  ←   │
│ (data)       │Recv │      │      │      │Year  │
├──────────────┼─────┼──────┼──────┼──────┼──────┤
│ Slider       │ ←   │  -   │ ←    │  ←   │  -   │
│ (year)       │Call │      │Color │Stats │      │
└──────────────┴─────┴──────┴──────┴──────┴──────┘

Legend:
  -    : No direct connection
  ←    : Receives data/state
  Pass : Passes state as props
  Call : Calls parent function
  Send : Sends data up
```

---

## 🎨 Animation System

```
┌────────────────────────────────────┐
│  CSS Animations (B6_Animations.css) │
└────────────────────────────────────┘
           ↓
    ┌──────┴──────┬──────────┐
    ↓             ↓          ↓
┌───────────┐ ┌────────┐ ┌─────────┐
│CONTINUOUS │ │ ENTRY  │ │ INTERACTION │
│ANIMATIONS │ │EXIT    │ │           │
├───────────┤ ├────────┤ ├─────────┤
│pulse-slow │ │fade-in │ │ripple   │
│wave       │ │fade-out│ │bounce   │
│breathe    │ │zoom-in │ │scale    │
│float      │ │slide   │ │shake    │
│spin-slow  │ │expand  │ │flip     │
│blink      │ │morph   │ │hover-*  │
│gradient   │ │        │ │         │
└───────────┘ └────────┘ └─────────┘
     ↓             ↓          ↓
Applied to:   Applied to:  Applied to:
• Markers     • Map entry  • Buttons
• Halo        • Panel open • Markers
• Icons       • Header     • Text
• Text        • Slider     • Cards
```

---

## 📈 State Management

```
B6_MapDistribution (Parent State)
│
├─ showMap: boolean
│   └─ Controls: Entry UI vs Map View
│   └─ Effect: AnimatePresence wrapper
│
├─ selectedArea: Area | null
│   └─ Triggers: Panel show/hide
│   └─ Updates: Canvas highlight
│   └─ Listener: onSelectArea()
│
├─ currentYear: number (2015-2025)
│   └─ Triggers: Marker color change
│   └─ Updates: Statistics re-render
│   └─ Listener: onYearChange()
│   └─ Effect: Auto-increment if storyMode
│
├─ storyMode: boolean
│   └─ Controls: Story modal show/hide
│   └─ Disables: Time slider
│   └─ Triggers: Auto-play 3s/slide
│
├─ mapZoom: number (0.8-3)
│   └─ Triggers: Canvas transform
│   └─ Listeners: zoom buttons, wheel
│   └─ Reset: Reset button
│
└─ mapPan: { x: number, y: number }
    └─ Triggers: Canvas transform
    └─ Listeners: mouse drag
    └─ Reset: Reset button
```

---

## 🔐 Props Passing

```
Main Component Props:
├─ → B6_MapHeader
│   └─ onBack: () => void
│   └─ onStoryMode: () => void
│   └─ storyMode: boolean
│
├─ → B6_MapCanvas
│   ├─ areas: Area[]
│   ├─ selectedArea: Area | null
│   ├─ onSelectArea: (area) => void
│   ├─ currentYear: number
│   ├─ mapZoom: number
│   ├─ mapPan: { x, y }
│   └─ storyMode: boolean
│
├─ → B6_InfoPanel
│   ├─ area: Area
│   ├─ currentYear: number
│   └─ onClose: () => void
│
├─ → B6_TimeSlider
│   ├─ currentYear: number
│   ├─ onYearChange: (year) => void
│   └─ disabled: boolean
│
└─ → B6_StoryMode (Conditional render)
    └─ isActive: boolean
    └─ onComplete: () => void
```

---

## ⚡ Performance Optimization

```
┌─────────────────────────────────┐
│ Rendering Optimization          │
└─────────────────────────────────┘
  │
  ├─ SVG for map (not Canvas)
  │  └─ Reason: Small dataset, CSS animatable
  │
  ├─ CSS animations for continuous
  │  └─ GPU accelerated, efficient
  │
  ├─ Framer Motion for entry/exit
  │  └─ Efficient mount/unmount
  │
  ├─ Memoization (React.memo)
  │  └─ For static sub-components
  │
  ├─ useRef for drag tracking
  │  └─ No re-render during pan
  │
  └─ will-change CSS property
     └─ Hint browser for GPU acceleration
```

---

## 🧪 Testing Points

```
Unit Tests:
├─ getDaNangAreas() returns 6 areas
├─ Area interface validation
└─ Coordinate bounds (0-800, 0-600)

Integration Tests:
├─ Entry UI → Map transition
├─ Click marker → Panel shows
├─ Drag map → Pan works
├─ Year change → Markers update
└─ Story mode → Auto-play cycle

Visual Tests:
├─ Animations smooth 60fps
├─ Colors match design
├─ Responsive on resize
└─ Touch events (mobile future)

Performance Tests:
├─ Bundle size < 50KB
├─ First paint < 1s
├─ Interactive < 2s
└─ Animation FPS 60
```

---

## 🔄 Lifecycle

```
1. APP START
   └─ B6_MapDistribution mounts
      ├─ Load danangAreas data
      ├─ Initialize state (showMap=false)
      └─ Render Entry UI

2. USER CLICKS "Xem Bản Đồ"
   └─ showMap = true
      ├─ Transition animation 600ms
      ├─ Mount B6_MapHeader
      ├─ Mount B6_MapCanvas
      ├─ Mount B6_TimeSlider
      └─ Markers fade in (staggered)

3. USER CLICKS MARKER
   └─ selectedArea = area
      ├─ B6_MapCanvas updates (highlight)
      ├─ Mount B6_InfoPanel
      ├─ Panel slide-in 400ms
      └─ Statistics count-up 1s

4. USER DRAGS TIME SLIDER
   └─ currentYear = newYear
      ├─ B6_MapCanvas updates (colors)
      ├─ B6_InfoPanel updates (stats)
      └─ All animations retrigger

5. USER CLICKS STORY MODE
   └─ storyMode = true
      ├─ Time slider disabled
      ├─ Mount B6_StoryMode modal
      ├─ Auto-play 4 slides
      └─ Each slide 3s

6. STORY COMPLETE
   └─ storyMode = false
      ├─ Unmount modal
      ├─ Re-enable time slider
      └─ Back to map normal

7. USER CLICKS BACK
   └─ showMap = false
      ├─ Exit animation 400ms
      ├─ Unmount map components
      └─ Show Entry UI again
```

---

## 📱 Responsive Breakpoints (Future)

```
Desktop (Current):
├─ 1920x1080+
├─ Map 70% | Panel 30%
└─ Full features

Tablet (Planned):
├─ 768-1200px
├─ Map full-width with overlay panel
└─ Touch-optimized

Mobile (Planned):
├─ < 768px
├─ Stack vertical (map full → panel tab)
└─ Touch events for drag/zoom
```

---

**Architecture designed for:**
- ✅ Maintainability (clear separation)
- ✅ Scalability (easy to add features)
- ✅ Performance (optimized rendering)
- ✅ Accessibility (semantic structure)
- ✅ Testability (clear data flow)

**Last Updated:** January 27, 2026
