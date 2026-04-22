# Concrete HP — Project Instructions

## Design Reference

The Zahar marketing theme has been cloned locally at:
```
src/wp-content/themes/zahar.jwsuperthemes.com/
```

**Khi làm bất kỳ việc gì liên quan đến giao diện, layout, style:**
- Luôn đọc file `marketing.html` (và CSS trong thư mục `css/`) trong folder clone trên trước
- Không cần fetch live website `https://zahar.jwsuperthemes.com/marketing/`
- Tìm đúng element ID trong HTML → tra CSS tương ứng (thường trong `css/post-7.css` hoặc `css/post-2242.css`) để lấy giá trị chính xác

## Project Structure

| Thư mục | Mục đích |
|---|---|
| `src/wp-content/themes/concrete-child/` | Theme đang phát triển |
| `src/wp-content/themes/concrete-child/blocks/src/` | Block source (edit tại đây) |
| `src/wp-content/themes/concrete-child/blocks/build/` | Block compiled output |
| `src/wp-content/themes/concrete-child/assets/scss/` | SCSS source |
| `src/wp-content/themes/concrete-child/assets/css/` | CSS compiled |
| `src/wp-content/themes/concrete-child/templates/index.html` | Template FSE chính — thêm block vào đây |
| `src/wp-content/themes/concrete-child/patterns/homepage.php` | Pattern (không phải template render trực tiếp) |

## Build Commands

Chạy từ `src/wp-content/themes/concrete-child/`:
- `npm run build` — compile blocks JS
- SCSS cần compile riêng (xem task runner của project)

Sau khi sửa `render.php` src → copy sang `blocks/build/` hoặc chạy `npm run build`.

## Color Palette

Primary color hiện tại: `#8bce54` (xanh lá — đã đổi từ teal `#17cfbd` của Zahar gốc).
Biến SCSS: `$color-primary` trong `assets/scss/_variables.scss`.
