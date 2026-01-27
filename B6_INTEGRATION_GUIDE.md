# B6 Phân Phối & Giáo Dục - Hướng Dẫn Tích Hợp

## 📁 File Structure

```
src/
├── app/components/learner/
│   ├── B6_MapDistribution.tsx      (Main component - 280 lines)
│   ├── B6_MapHeader.tsx            (Header với back/story toggle - 50 lines)
│   ├── B6_MapCanvas.tsx            (SVG map + markers - 200 lines)
│   ├── B6_InfoPanel.tsx            (Side panel thông tin - 180 lines)
│   ├── B6_TimeSlider.tsx           (Timeline 2015-2025 - 120 lines)
│   └── B6_StoryMode.tsx            (Modal story mode - 150 lines)
│
├── data/
│   └── danangAreas.ts              (Mock data 6 khu vực - 120 lines)
│
└── styles/
    └── B6_Animations.css           (40+ animations - 450 lines)
```

**Tổng:** ~1500 lines code (production-ready)

---

## 🚀 Cách Sử Dụng

### **1. Import vào App:**

```tsx
// src/app/App.tsx
import B6_MapDistribution from './components/learner/B6_MapDistribution';

export function App() {
  return (
    <div>
      <B6_MapDistribution />
    </div>
  );
}
```

### **2. Đảm bảo dependencies:**

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^10.16.0",
    "lucide-react": "^0.263.0",
    "tailwindcss": "^3.3.0"
  }
}
```

### **3. Tailwind CSS (cần có trong project):**

Đảm bảo `tailwind.config.ts` hoặc `tailwind.config.js` được setup.

### **4. Chạy project:**

```bash
npm run dev
# hoặc
yarn dev
```

---

## 🎮 Tính Năng & Tương Tác

### **Entry Screen:**
- ✅ Gradient text animation
- ✅ Pulse button với icon rotate
- ✅ Ripple effect khi click
- ✅ Smooth fade-in timing

### **Map Screen:**
- ✅ SVG map với stylized Đà Nẵng
- ✅ 6 marker khu vực với dynamic status
- ✅ Hover tooltip + click select
- ✅ Drag/pan map by mouse
- ✅ Zoom in/out buttons + wheel scroll
- ✅ Legend với interactive categories

### **Info Panel:**
- ✅ Slide-in animation từ phải
- ✅ Statistics dengan count-up animation
- ✅ Risk level progress bar
- ✅ AI Insight box
- ✅ 3 action buttons
- ✅ Close button

### **Time Slider:**
- ✅ 4 year markers (2015/2018/2020/2025)
- ✅ Draggable slider
- ✅ Progress track animation
- ✅ Click year → jump to year
- ✅ Disable khi story mode

### **Story Mode:**
- ✅ 4-slide narrative
- ✅ Typewriter text effect
- ✅ Auto-play 3s per slide
- ✅ Manual navigation
- ✅ Animated title icons

---

## 🎨 Customization

### **1. Thêm khu vực mới:**

Edit `src/data/danangAreas.ts`:

```typescript
{
  id: 'Ngu-Hanh-Son',
  name: 'Ngũ Hành Sơn',
  district: 'Ngũ Hành Sơn',
  status: 'teaching',
  coordinates: { x: 350, y: 250 },
  artisans: 2,
  classes: 1,
  students: 5,
  riskLevel: 'Cao',
  description: '...',
  historicalData: [
    { year: 2015, status: 'critical' },
    // ... thêm years
  ],
  aiInsight: '...',
}
```

**Lưu ý:** x, y = SVG viewport coordinates (0-800, 0-600)

### **2. Thay đổi colors:**

Trong `B6_MapCanvas.tsx`:

```typescript
const statusColors = {
  critical: { bg: 'bg-red-500', border: 'border-red-600', pulse: 'animate-pulse-slow' },
  teaching: { bg: 'bg-yellow-500', border: 'border-yellow-600', pulse: 'animate-wave' },
  thriving: { bg: 'bg-green-500', border: 'border-green-600', pulse: 'animate-breathe' },
};
```

Thay đổi Tailwind classes để thay đổi màu.

### **3. Sửa animation timing:**

File `src/styles/B6_Animations.css`:

```css
@keyframes pulse-slow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse-slow {
  /* Đổi 2.5s thành duration khác */
  animation: pulse-slow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

### **4. Thay đổi story text:**

Trong `B6_MapCanvas.tsx`, function `getStoryText()`:

```typescript
const stories: Record<string, Record<number, string>> = {
  'Hoi-An': {
    2015: 'Text story năm 2015...',
    2018: 'Text story năm 2018...',
    // ...
  },
};
```

---

## 🔌 API Integration (Nếu cần)

Hiện tại là mock data. Để connect API thực:

### **1. Sửa `getDaNangAreas()` function:**

```typescript
// src/data/danangAreas.ts

export const getDaNangAreas = async (): Promise<DaNangArea[]> => {
  try {
    const response = await fetch('/api/areas');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch areas:', error);
    return getDefaultAreas(); // fallback
  }
};
```

### **2. Update component để handle async:**

```typescript
// B6_MapDistribution.tsx
const [areas, setAreas] = useState<Area[]>([]);

useEffect(() => {
  getDaNangAreas().then(setAreas);
}, []);
```

### **3. Expected API format:**

```json
[
  {
    "id": "Hoi-An",
    "name": "Hội An",
    "district": "Quảng Nam",
    "status": "thriving",
    "coordinates": { "x": 200, "y": 300 },
    "artisans": 5,
    "classes": 3,
    "students": 25,
    "riskLevel": "Thấp",
    "description": "...",
    "historicalData": [...],
    "aiInsight": "..."
  }
  // ... more areas
]
```

---

## 🐛 Troubleshooting

### **Marker không hiển thị?**
- Check coordinates (x: 0-800, y: 0-600)
- Check SVG viewBox: `0 0 800 600`
- Console log areas array

### **Animation giật/lag?**
- Check CSS animation names match component
- Verify Framer Motion version >= 10.0
- Reduce number of simultaneous animations (browser dependent)

### **Info panel không slide in?**
- Ensure Framer Motion AnimatePresence wrapped component
- Check z-index stacking context
- Verify tailwind class exists

### **Time slider không responsive?**
- Check input range element pointerEvents
- Verify disabled state when storyMode
- Test on mobile (touch events)

---

## 📱 Responsive Design

Component saat ini optimized untuk **desktop** (1920x1080+).

Untuk mobile, perlu:

```tsx
// Add in B6_MapDistribution.tsx
import { useMediaQuery } from './hooks/use-mobile';

const isMobile = useMediaQuery("(max-width: 768px)");

// Mobile layout: stack vertically
{isMobile && (
  // return mobile layout
)}
```

---

## ⚙️ Performance Metrics

### **Expected Performance:**
```
Lighthouse Scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 90+

First Paint: < 1s
Interactive: < 2s
Map render: < 100ms (6 markers SVG)
Animation FPS: 60fps (GPU accelerated)
```

---

## 📚 Resources

### **Documentation:**
- 📄 [B6_MAP_SCIENTIFIC_DESIGN.md](./B6_MAP_SCIENTIFIC_DESIGN.md) - Full UX/Design analysis
- 🎨 [F8_DESIGN_SPEC.md](./src/app/components/learner/F8_DESIGN_SPEC.md) - Design tokens
- 🎭 [DESIGN_LOGIC_F7.md](./DESIGN_LOGIC_F7.md) - Overall project design

### **Code Examples:**
```tsx
// Use B6 component
<B6_MapDistribution />

// Customize
import { getDaNangAreas } from './data/danangAreas';

// Access individual components
import MapCanvas from './components/learner/B6_MapCanvas';
import InfoPanel from './components/learner/B6_InfoPanel';
```

### **Animation Library:**
- [Framer Motion](https://www.framer.com/motion/) - React animation
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide React](https://lucide.dev/) - Icons

---

## 🎓 Learning Resources

### **UX/Design Theory:**
- [Nielsen Norman Group - Animations](https://www.nngroup.com/articles/)
- [Material Design Motion Guide](https://material.io/design/motion/)
- [A List Apart - Designing Interactions](https://alistapart.com/)

### **React/Performance:**
- [React Documentation](https://react.dev/)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Web Performance APIs](https://developer.mozilla.org/en-US/docs/Web/API/Performance)

---

## 📋 Version History

### **v1.0 (Current)**
- ✅ Entry UI with gradient animation
- ✅ Stylized map of Đà Nẵng
- ✅ 6 areas with dynamic markers
- ✅ Info panel with statistics
- ✅ Time slider (2015-2025)
- ✅ Story mode with typewriter
- ✅ Drag/pan + zoom controls
- ✅ Legend with hover
- ✅ 40+ CSS animations
- ✅ AI insights

### **v1.1 (Planned)**
- API integration for live data
- Mobile responsive layout
- More areas (expand to full Vietnam)
- Speech/audio narration option
- Export map as image/PDF
- Share functionality
- Dark mode toggle

---

## 🤝 Contributing

To contribute improvements:

1. Fork component
2. Test on Chrome/Firefox/Safari
3. Verify accessibility (a11y)
4. Update docs
5. Submit PR

---

## 📞 Support

Issues? Questions?

- 📧 Check component comments
- 🔍 See B6_MAP_SCIENTIFIC_DESIGN.md for deep dive
- 💻 Review source code inline documentation

---

**Happy building! 🚀**

Phát triển giáo dục & bảo tồn Bài Chòi - một animation tại một thời gian.
