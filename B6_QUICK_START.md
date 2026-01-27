# 🚀 B6 QUICK START GUIDE

**Thời gian setup:** ~2 phút  
**Độ khó:** Dễ (copy-paste)  
**Kết quả:** Bản đồ tương tác hoạt động đầy đủ

---

## ✅ STEP 1: Đảm bảo dependencies (1 phút)

### Kiểm tra `package.json` có những thư viện này:

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "framer-motion": "^10.0.0",
    "lucide-react": "^0.0.0",
    "tailwindcss": "^3.0.0"
  }
}
```

### Nếu chưa có, cài:
```bash
npm install framer-motion lucide-react
# hoặc
yarn add framer-motion lucide-react
```

---

## ✅ STEP 2: Copy files (30 seconds)

Tất cả files đã được tạo sẵn ở:

```
✅ src/app/components/learner/B6_MapDistribution.tsx
✅ src/app/components/learner/B6_MapHeader.tsx
✅ src/app/components/learner/B6_MapCanvas.tsx
✅ src/app/components/learner/B6_InfoPanel.tsx
✅ src/app/components/learner/B6_TimeSlider.tsx
✅ src/app/components/learner/B6_StoryMode.tsx
✅ src/data/danangAreas.ts
✅ src/styles/B6_Animations.css
```

**Không cần tải thêm, tất cả đã có!**

---

## ✅ STEP 3: Import & Use (30 seconds)

### Mở file `src/app/App.tsx` (hoặc nơi bạn muốn hiển thị):

```tsx
import B6_MapDistribution from './components/learner/B6_MapDistribution';

export function App() {
  return (
    <div>
      <B6_MapDistribution />
    </div>
  );
}
```

### Đó là tất cả! 🎉

---

## 🎬 Chạy project:

```bash
npm run dev
```

Mở browser → `http://localhost:5173`

---

## 🎮 Test nó:

1. **Bấm "🗺️ Xem Bản Đồ"** → Mở bản đồ với animation smooth
2. **Click vào 1 marker** → Panel thông tin hiện ra
3. **Kéo chuột trên bản đồ** → Pan (di chuyển)
4. **Cuộn chuột** → Zoom in/out
5. **Kéo thanh thời gian** → Markers thay đổi màu
6. **Bấm "▶ Chế độ kết chuyện"** → Nghe kết chuyện 4 slide

---

## 🎨 Customization (5 phút)

### Thêm khu vực mới:

1. Mở `src/data/danangAreas.ts`
2. Thêm object mới vào array:

```typescript
{
  id: 'New-Area',
  name: 'Tên khu vực',
  district: 'Quận',
  status: 'teaching', // critical, teaching, hoặc thriving
  coordinates: { x: 300, y: 250 }, // Vị trí trên bản đồ
  artisans: 3,
  classes: 2,
  students: 10,
  riskLevel: 'Cao', // Hoặc Trung bình, Thấp, Rất cao
  description: 'Mô tả chi tiết...',
  historicalData: [
    { year: 2015, status: 'critical' },
    { year: 2018, status: 'critical' },
    { year: 2020, status: 'teaching' },
    { year: 2025, status: 'teaching' },
  ],
  aiInsight: 'Sáng kiến AI...',
}
```

3. Save → Reload browser → Marker mới xuất hiện!

### Thay đổi màu:

Mở `B6_MapCanvas.tsx`, tìm:

```typescript
const statusColors = {
  critical: { bg: 'bg-red-500', ... },
  teaching: { bg: 'bg-yellow-500', ... },
  thriving: { bg: 'bg-green-500', ... },
};
```

Thay Tailwind class tùy ý:
- `bg-red-500` → `bg-pink-600`
- `bg-yellow-500` → `bg-amber-400`
- etc.

---

## 📱 Responsive (Nâng cao)

Component hiện tại là **desktop-optimized**.

Để làm mobile-friendly, thêm:

```tsx
import { useMediaQuery } from '../../hooks/use-mobile';

// Trong component
const isMobile = useMediaQuery("(max-width: 768px)");

if (isMobile) {
  // Return mobile layout (stack vertical)
  return <MobileLayout />;
}
```

---

## 🔌 API Integration (Nâng cao)

Thay mock data bằng API:

```typescript
// src/data/danangAreas.ts

export const getDaNangAreas = async () => {
  const response = await fetch('/api/areas');
  return response.json();
};
```

Sau đó update component:

```typescript
// B6_MapDistribution.tsx
useEffect(() => {
  getDaNangAreas().then(setAreas);
}, []);
```

---

## 🐛 Troubleshooting

### Marker không hiển thị?
- Check coordinates: x (0-800), y (0-600)
- Open DevTools Console → Có error không?
- Kiểm tra data array không rỗng

### Animation giật?
- Check browser: Chrome 90+?
- Disable extensions (ad blocker?)
- Reduce other apps (CPU heavy?)

### Style không áp dụng?
- Tailwind CSS setup OK?
- B6_Animations.css imported?
- Check console cho errors

### Info panel không slide in?
- Framer Motion version >= 10?
- AnimatePresence wrapper OK?
- z-index stacking context?

---

## 📚 Docs

Tài liệu chi tiết tại:

- 📄 **B6_FEATURE_SUMMARY.md** - Tóm tắt tính năng
- 📄 **B6_MAP_SCIENTIFIC_DESIGN.md** - Thiết kế chi tiết + UX theory
- 📄 **B6_INTEGRATION_GUIDE.md** - API, mobile, advanced

---

## 🎯 Next Steps

### Ngay bây giờ (5 phút):
- ✅ Chạy và test
- ✅ Thêm 1-2 khu vực mới
- ✅ Thay đổi màu sắc

### Tuần tới (1-2 giờ):
- API integration
- Mobile responsive
- Thêm data cho các tỉnh khác

### Tháng tới (1-2 ngày):
- Speech narration
- Map screenshot/export
- Social sharing
- Analytics tracking

---

## 🎓 Learning

**Muốn hiểu sâu?** Xem:

1. `B6_MapCanvas.tsx` - SVG marker rendering
2. `B6_Animations.css` - 40+ animation definitions
3. `B6_MAP_SCIENTIFIC_DESIGN.md` - UX psychology

---

## ✨ Key Features Recap

```
🧭 Entry UI dengan gradient animation
🗺️ Stylized map của Đà Nẵng
📍 6 markers với 3 status (critical/teaching/thriving)
💫 Smooth transition animation
🎮 Drag/pan + zoom controls
📊 Info panel với thống kê
⏳ Time slider 2015-2025
🎬 Story mode 4-slide
🤖 AI insights
🎨 40+ CSS animations
```

---

## 🚀 You're Ready!

```
npm run dev
↓
Open http://localhost:5173
↓
Bấm "Xem Bản Đồ"
↓
Enjoy! 🎉
```

---

**Questions?** Check the files:
- Component comments explain every major section
- CSS animations well-documented
- Data structure is self-explanatory

**Happy coding! 🧭✨**
