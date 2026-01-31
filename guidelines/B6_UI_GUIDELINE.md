# UI Guideline: Bản Đồ Bảo Tồn (B6)

## 1. Bố cục Desktop
- [Header]
- [Map + Timeline overlay góc trái dưới map]
- [Info Panel to, chiếm 30–35% chiều ngang, font lớn, nền trắng/xám nhạt, gradient chỉ làm viền/header]

## 2. Bố cục Mobile
- [Map full width]
- [Timeline nhỏ overlay góc trái dưới map]
- [Info Panel dạng bottom sheet, kéo lên/xuống, font to, không che map khi không cần]

## 3. Timeline (Năm)
- Overlay góc trái dưới map, glassmorphism nhẹ
- Thanh kéo dày, nút năm tròn to (16–18px), text năm in đậm
- Không kéo dài toàn màn hình
- Animation: kéo timeline → map fade nhẹ, icon re-render, label nổi bật

## 4. Info Panel
- Desktop: rộng 30–35%, min-width 320px, max-width 480px
- Mobile: full width, bottom sheet, min-height 40% viewport
- Font:
  - Tên khu vực: 22–26px, bold
  - Trạng thái: chip to, màu rõ
  - Mô tả: 16–18px, line-height ≥ 1.6
- Nền trắng/xám nhạt, gradient chỉ làm viền/header
- Text đen đậm hoặc xanh đậm, không dùng gradient nền cho text
- Nút hành động: min-height 48px, font 16–18px, icon + chữ rõ, chạm là ăn

## 5. Contrast & Readability
- Đảm bảo WCAG AA: text ≥ 4.5:1 với nền
- Không dùng text màu nhạt trên nền gradient
- Ưu tiên text đậm, nền sáng

## 6. Animation & UX
- Timeline kéo → map/icon update mượt
- Info panel mở/đóng mượt, không che map khi không cần
- Mobile: panel kéo lên/xuống, scroll mượt

## 7. Responsive
- Sử dụng media query cho layout, font, spacing
- Ưu tiên mobile-first, kiểm tra trên thiết bị thật

---

## Checklist Dev
- [ ] Timeline overlay góc trái dưới map
- [ ] Info panel to, font ≥16px, contrast cao
- [ ] Mobile: info panel dạng bottom sheet
- [ ] Nút hành động to, rõ, dễ bấm
- [ ] Không để map + text tranh nhau sự chú ý
- [ ] Đảm bảo mọi text đều dễ đọc trên mọi thiết bị
