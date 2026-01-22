# Hướng Dẫn Deploy Lên GitHub Pages

## Các Bước Deploy

### 1. Cấu Hình Repository

Trước tiên, bạn cần cập nhật các file sau với thông tin repository của bạn:

#### File `package.json`
Tìm dòng:
```json
"homepage": "https://[YOUR-USERNAME].github.io/[YOUR-REPO-NAME]",
```

Thay thế:
- `[YOUR-USERNAME]` bằng username GitHub của bạn
- `[YOUR-REPO-NAME]` bằng tên repository của bạn

Ví dụ: 
```json
"homepage": "https://johndoe.github.io/bai-choi-echo-ai",
```

#### File `vite.config.ts`
Tìm dòng:
```typescript
base: '/[YOUR-REPO-NAME]/',
```

Thay thế `[YOUR-REPO-NAME]` bằng tên repository của bạn

Ví dụ:
```typescript
base: '/bai-choi-echo-ai/',
```

**LƯU Ý**: Nếu bạn muốn deploy lên `https://[YOUR-USERNAME].github.io` (không có tên repo), hãy đổi `base: '/'`

### 2. Tạo Repository Trên GitHub

1. Đi đến https://github.com/new
2. Tạo repository mới với tên bạn muốn
3. **Không** tick vào "Add a README file"
4. Click "Create repository"

### 3. Đẩy Code Lên GitHub

Trong terminal của bạn, chạy các lệnh sau:

```bash
# Khởi tạo git repository (nếu chưa có)
git init

# Thêm tất cả files
git add .

# Commit
git commit -m "Initial commit"

# Thêm remote repository (thay YOUR-USERNAME và YOUR-REPO-NAME)
git remote add origin https://github.com/[YOUR-USERNAME]/[YOUR-REPO-NAME].git

# Đẩy code lên GitHub
git branch -M main
git push -u origin main
```

### 4. Deploy Lên GitHub Pages

Sau khi đã push code lên GitHub, chạy lệnh:

```bash
npm run deploy
```

Lệnh này sẽ:
1. Build ứng dụng (`npm run build`)
2. Tạo branch `gh-pages` 
3. Deploy folder `dist` lên branch `gh-pages`

### 5. Cấu Hình GitHub Pages

1. Đi đến repository của bạn trên GitHub
2. Click vào tab **Settings**
3. Scroll xuống phần **Pages** (ở menu bên trái)
4. Trong phần **Source**, chọn:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. Click **Save**

### 6. Truy Cập Website

Sau vài phút, website của bạn sẽ có sẵn tại:
```
https://[YOUR-USERNAME].github.io/[YOUR-REPO-NAME]/
```

## Cập Nhật Website

Mỗi khi bạn muốn cập nhật website:

1. Thực hiện thay đổi code
2. Commit và push lên GitHub:
```bash
git add .
git commit -m "Update features"
git push
```

3. Deploy lại:
```bash
npm run deploy
```

## Xử Lý Lỗi Thường Gặp

### Lỗi: "fatal: A branch named 'gh-pages' already exists"
Xóa branch gh-pages cũ:
```bash
git branch -D gh-pages
npm run deploy
```

### Lỗi: 404 Not Found
- Kiểm tra lại cấu hình `base` trong `vite.config.ts`
- Đảm bảo `homepage` trong `package.json` đúng
- Đợi 5-10 phút sau khi deploy lần đầu

### Lỗi: Blank Page
- Kiểm tra Console trong DevTools để xem lỗi
- Thường do `base` path không đúng trong `vite.config.ts`

## Custom Domain (Tùy Chọn)

Nếu bạn muốn sử dụng domain riêng:

1. Tạo file `public/CNAME` với nội dung là domain của bạn:
```
yourdomain.com
```

2. Cấu hình DNS của domain trỏ đến GitHub Pages
3. Trong Settings > Pages, thêm custom domain

## Các Lệnh Hữu Ích

```bash
# Build local để test
npm run build

# Preview build local
npm run preview

# Deploy lên GitHub Pages
npm run deploy
```

## Lưu Ý Quan Trọng

- File `dist/` đã được thêm vào `.gitignore` - đừng commit folder này
- Branch `gh-pages` được tạo tự động bởi `gh-pages` package
- Mỗi lần deploy sẽ overwrite toàn bộ nội dung trên branch `gh-pages`
- GitHub Pages có thể mất 5-10 phút để cập nhật sau lần deploy đầu tiên
