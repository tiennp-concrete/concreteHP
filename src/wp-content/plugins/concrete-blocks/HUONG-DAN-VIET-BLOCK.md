# Hướng dẫn viết Block có thể Edit được (Gutenberg Dynamic Block)

Tài liệu này hướng dẫn cách tạo một block Gutenberg tuỳ biến trong plugin `concrete-blocks`, cho phép người dùng chỉnh sửa nội dung trực tiếp trong trình biên tập WordPress — giống hệt cách các block đang chạy trên trang chủ (`marketing-hero`, `services-grid`, `blog-grid`…).

Ví dụ xuyên suốt tài liệu là block [marketing-hero](src/marketing-hero/) — block hero nằm ngay đầu trang chủ, có tiêu đề 2 dòng, nút CTA, nút xem video, ảnh nhân vật và các hình trang trí nổi.

---

## 1. Tổng quan kiến trúc

Mỗi block là một folder nằm trong [src/](src/). Một block gồm 3 file bắt buộc + 1 file tùy chọn:

| File | Vai trò |
|---|---|
| `block.json` | Khai báo metadata: tên, tiêu đề, danh sách thuộc tính (attributes), điểm vào script, điểm vào render |
| `index.js` | Component React `Edit` — giao diện chỉnh sửa trong Gutenberg editor |
| `render.php` | Output phía server — HTML thực tế hiển thị ở frontend |
| `view.js` *(tuỳ chọn)* | JS chạy ở frontend nếu block cần tương tác (slider, tab, modal…) |

Plugin [concrete-blocks.php](concrete-blocks.php) tự động quét folder `build/` và đăng ký tất cả block.json có trong đó — **không cần khai báo thủ công**.

Chỉ cần chạy `npm run build` (hoặc `npm run start` để watch), webpack sẽ đẩy source từ `src/` sang `build/`, và block mới tự động xuất hiện trong trình chèn block của WordPress.

---

## 2. Luồng dữ liệu của 1 Block có thể Edit

```
  ┌──────────────┐     setAttributes       ┌──────────────┐
  │  block.json  │ ◄───────────────────── │  index.js    │
  │  (attributes │                         │  Edit (React)│
  │   defaults)  │ ───── attributes ────► │              │
  └──────┬───────┘                         └──────────────┘
         │
         │ (khi lưu post, WP serialize attributes vào DB)
         ▼
  ┌──────────────┐
  │  render.php  │ ◄── $attributes ── (nhận từ WP khi render frontend)
  │  (server)    │
  └──────────────┘
```

3 điểm then chốt:

1. **`block.json` định nghĩa schema**: mỗi attribute có `type` và `default`. Đây là "contract" chung giữa editor và server.
2. **`index.js` sửa attributes**: dùng `setAttributes({ field: value })` — WordPress tự lưu vào DB.
3. **`render.php` đọc `$attributes`**: PHP nhận array này và render HTML cuối cùng.

Vì `save` trong `index.js` trả về `null` (dynamic block), HTML frontend **luôn** do `render.php` sinh ra → thay đổi SCSS/HTML không cần migrate DB.

---

## 3. Ví dụ trực tiếp: phân tích block `marketing-hero`

### 3.1. `block.json` — khai báo thuộc tính

File: [src/marketing-hero/block.json](src/marketing-hero/block.json)

```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 3,
  "name": "concrete/marketing-hero",
  "title": "Marketing Hero",
  "category": "theme",
  "attributes": {
    "eyebrow":    { "type": "string", "default": "DIGITAL AGENCY" },
    "title":      { "type": "string", "default": "Let's Be Better" },
    "titleSub":   { "type": "string", "default": "Every Day" },
    "subtitle":   { "type": "string", "default": "We're a creative..." },
    "primaryCta": { "type": "string", "default": "Get started" },
    "videoUrl":   { "type": "string", "default": "https://..." },
    "heroImage":  { "type": "string", "default": "/wp-content/..." },
    "shapes": {
      "type": "array",
      "default": [
        { "image": "/path/shape1.png", "variant": "zh-s-1 zh-float-ud" },
        ...
      ]
    }
  },
  "supports": { "html": false, "align": ["full"] },
  "editorScript": "file:./index.js",
  "render":       "file:./render.php"
}
```

Các điểm quan trọng:

- **`name`** phải có namespace `concrete/<slug>` — đây là định danh duy nhất trong toàn WordPress.
- **`attributes`** là tất cả dữ liệu có thể chỉnh sửa. Hero có:
  - Các chuỗi đơn (`eyebrow`, `title`, `subtitle`, `primaryCta`…): chỉnh bằng RichText ngay trên canvas.
  - URL (`heroImage`, `videoUrl`): chỉnh trong sidebar (InspectorControls).
  - Mảng `shapes`: mỗi item là 1 object — chỉnh bằng cách map và update từng item.
- **`editorScript`** trỏ tới `index.js` (sau build).
- **`render`** trỏ tới `render.php` → đây là lý do frontend luôn render từ server.

### 3.2. `index.js` — component Edit

File: [src/marketing-hero/index.js](src/marketing-hero/index.js)

Khung cơ bản mọi block đều lặp lại:

```js
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import metadata from './block.json';

function Edit({ attributes, setAttributes }) {
  // 1. Helper rút gọn: tạo onChange cho 1 field
  const set = (field) => (v) => setAttributes({ [field]: v });

  // 2. Helper cho mảng: cập nhật 1 item trong mảng theo index
  const updateShape = (i, field, value) => {
    const next = attributes.shapes.map((s, idx) =>
      idx === i ? { ...s, [field]: value } : s
    );
    setAttributes({ shapes: next });
  };

  return (
    <>
      {/* 3. Sidebar bên phải editor */}
      <InspectorControls>
        <PanelBody title="Hero image & video" initialOpen>
          <TextControl label="Hero image URL"
            value={attributes.heroImage} onChange={set('heroImage')} />
          <TextControl label="Video URL"
            value={attributes.videoUrl}  onChange={set('videoUrl')} />
        </PanelBody>
      </InspectorControls>

      {/* 4. Vùng hiển thị + chỉnh sửa inline trên canvas */}
      <section {...useBlockProps({ className: 'zh-hero' })}>
        <RichText
          tagName="h1"
          className="zh-hero-title"
          value={attributes.title}
          onChange={set('title')}
          placeholder="Title line 1"
        />
        {/* ...các RichText khác... */}
      </section>
    </>
  );
}

registerBlockType(metadata.name, {
  edit: Edit,
  save: () => null,   // dynamic block: luôn render từ PHP
});
```

**4 khối bạn sẽ luôn làm việc với:**

1. **`useBlockProps(...)`** — gắn attributes cần thiết của Gutenberg (ID, class, `data-*`). **Bắt buộc** gắn vào thẻ ngoài cùng, nếu không block không được chọn/di chuyển được.

2. **`RichText`** — cho phép gõ text trực tiếp trên canvas, hỗ trợ format (bold, italic, link). Dùng cho mọi nội dung hiển thị: heading, paragraph, button label…
   - `tagName` quyết định thẻ HTML (`h1`, `p`, `span`…).
   - `value` + `onChange` — y như `<input>` trong React.

3. **`InspectorControls`** — sidebar bên phải. Dùng cho các field **không phải text hiển thị**: URL ảnh, video, toggle, số liệu, chọn biến thể…
   - `PanelBody` chia sidebar thành nhóm có thể gập/mở.
   - `TextControl`, `SelectControl`, `ToggleControl`, `RangeControl` — các input phổ biến của Gutenberg (từ `@wordpress/components`).

4. **`BlockControls`** *(có trong `blog-grid`)* — thanh toolbar nổi phía trên block khi được chọn. Hay dùng cho: chuyển slide, chọn layout, chèn/xoá item.

### 3.3. `render.php` — HTML phía server

File: [src/marketing-hero/render.php](src/marketing-hero/render.php)

```php
<?php
$shapes = is_array($attributes['shapes'] ?? null) ? $attributes['shapes'] : [];
?>
<section <?php echo get_block_wrapper_attributes(['class' => 'zh-hero']); ?>>
  <?php foreach ($shapes as $shape) : ?>
    <div class="zh-shape-float <?php echo esc_attr($shape['variant'] ?? ''); ?>">
      <img src="<?php echo esc_url($shape['image'] ?? ''); ?>" alt="" />
    </div>
  <?php endforeach; ?>

  <h1 class="zh-hero-title">
    <?php echo wp_kses_post($attributes['title'] ?? ''); ?>
  </h1>
  <!-- ... -->
</section>
```

**Quy tắc bất di bất dịch:**

- **`$attributes`** là biến có sẵn, đã decode từ DB thành mảng PHP — không cần import gì.
- **Luôn escape** trước khi echo:
  - `esc_attr()` cho attributes HTML (class, data-*, style).
  - `esc_url()` cho href/src.
  - `wp_kses_post()` cho nội dung RichText (giữ được `<strong>`, `<em>`, `<a>` mà vẫn an toàn).
  - `esc_html()` cho chuỗi thuần.
- **`get_block_wrapper_attributes()`** thay cho class/id cứng — WordPress cần cái này để inject các class nền như `wp-block-*`, `alignfull`, custom class người dùng thêm từ sidebar.

### 3.4. Đầu ra: editor vs frontend

| | Editor (Gutenberg) | Frontend |
|---|---|---|
| File sinh HTML | `index.js` (React) | `render.php` (PHP) |
| Dữ liệu từ đâu | `attributes` props | `$attributes` array |
| Khi nào chạy | Lúc đang soạn bài | Mỗi lần load trang |

→ Hai file này **phải cùng render một layout**. Nếu sửa HTML ở `index.js`, nhớ sửa tương ứng ở `render.php` (và ngược lại).

---

## 4. Quy trình tạo 1 Block mới (step-by-step)

Ví dụ: thêm block `feature-callout` hiển thị 3 khối lớn có icon + tiêu đề + mô tả.

### Bước 1. Copy folder mẫu

```bash
cd src/wp-content/plugins/concrete-blocks/src
cp -r marketing-hero feature-callout
```

### Bước 2. Sửa `block.json`

```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 3,
  "name": "concrete/feature-callout",
  "title": "Feature Callout",
  "category": "theme",
  "attributes": {
    "heading": { "type": "string", "default": "Why us" },
    "items": {
      "type": "array",
      "default": [
        { "icon": "/wp-content/themes/concrete-child/assets/images/ic1.svg",
          "title": "Fast",     "desc": "Lorem ipsum." },
        { "icon": "/wp-content/themes/concrete-child/assets/images/ic2.svg",
          "title": "Reliable", "desc": "Lorem ipsum." },
        { "icon": "/wp-content/themes/concrete-child/assets/images/ic3.svg",
          "title": "Friendly", "desc": "Lorem ipsum." }
      ]
    }
  },
  "supports": { "html": false },
  "editorScript": "file:./index.js",
  "render":       "file:./render.php"
}
```

### Bước 3. Viết `index.js`

```js
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import metadata from './block.json';

function Edit({ attributes, setAttributes }) {
  const { heading, items } = attributes;

  const updateItem = (i, field, v) => {
    const next = items.map((it, idx) => (idx === i ? { ...it, [field]: v } : it));
    setAttributes({ items: next });
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title="Icons" initialOpen>
          {items.map((it, i) => (
            <TextControl
              key={i}
              label={`Item ${i + 1} icon URL`}
              value={it.icon}
              onChange={(v) => updateItem(i, 'icon', v)}
            />
          ))}
        </PanelBody>
      </InspectorControls>

      <section {...useBlockProps({ className: 'zh-feature' })}>
        <RichText
          tagName="h2"
          value={heading}
          onChange={(v) => setAttributes({ heading: v })}
          placeholder="Section heading"
        />
        <div className="zh-feature-grid">
          {items.map((it, i) => (
            <article key={i} className="zh-feature-card">
              <img src={it.icon} alt="" />
              <RichText
                tagName="h3"
                value={it.title}
                onChange={(v) => updateItem(i, 'title', v)}
                placeholder="Title"
              />
              <RichText
                tagName="p"
                value={it.desc}
                onChange={(v) => updateItem(i, 'desc', v)}
                placeholder="Description"
              />
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

registerBlockType(metadata.name, { edit: Edit, save: () => null });
```

### Bước 4. Viết `render.php`

```php
<?php
$heading = $attributes['heading'] ?? '';
$items   = is_array($attributes['items'] ?? null) ? $attributes['items'] : [];
?>
<section <?php echo get_block_wrapper_attributes(['class' => 'zh-feature']); ?>>
  <h2><?php echo wp_kses_post($heading); ?></h2>
  <div class="zh-feature-grid">
    <?php foreach ($items as $it) : ?>
      <article class="zh-feature-card">
        <img src="<?php echo esc_url($it['icon'] ?? ''); ?>" alt="" />
        <h3><?php echo wp_kses_post($it['title'] ?? ''); ?></h3>
        <p><?php echo wp_kses_post($it['desc'] ?? ''); ?></p>
      </article>
    <?php endforeach; ?>
  </div>
</section>
```

### Bước 5. Build & kiểm tra

```bash
cd src/wp-content/plugins/concrete-blocks
npm run start          # watch mode, tự rebuild khi sửa file
```

Mở WordPress editor → nhấn "+" → tab "Theme" → chọn "Feature Callout". Block xuất hiện với nội dung default, click vào để sửa inline, hoặc mở sidebar phải để đổi icon URL.

### Bước 6. Thêm SCSS (nếu cần)

Style sống ở theme, không phải plugin. Mở [../../themes/concrete-child/assets/scss/](../../themes/concrete-child/assets/scss/) và viết rule cho `.zh-feature`. `npm run dev` ở root sẽ tự biên dịch.

---

## 5. Bảng tra các Control hay dùng

Import từ `@wordpress/components`:

| Control | Dùng khi | Ví dụ block đang dùng |
|---|---|---|
| `TextControl` | URL, nhãn ngắn | mọi block |
| `TextareaControl` | Mô tả dài | - |
| `SelectControl` | Chọn 1 trong N biến thể | `services-grid` |
| `ToggleControl` | Bật/tắt boolean | - |
| `RangeControl` | Số trong khoảng | - |
| `ColorPicker` / `ColorPalette` | Chọn màu | - |
| `MediaUpload` (wrap trong button) | Chọn ảnh từ Media Library | (mẫu hiện dùng TextControl cho URL) |

Import từ `@wordpress/block-editor`:

| Control | Dùng khi | Ví dụ |
|---|---|---|
| `RichText` | Text có format inline | mọi block |
| `InspectorControls` | Panel sidebar phải | mọi block |
| `BlockControls` + `ToolbarButton` | Nút trên thanh toolbar khi block được chọn | `blog-grid`, `testimonial` |
| `MediaUpload` | Modal chọn/upload ảnh | - |
| `InnerBlocks` | Cho phép nhét block con vào trong | - |

---

## 6. Pattern tham khảo trong codebase

Để học từng pattern cụ thể, mở block tương ứng:

| Pattern | Block tham khảo |
|---|---|
| Danh sách item (thêm/sửa/xoá) | [blog-grid](src/blog-grid/), [portfolio](src/portfolio/), [pricing](src/pricing/) |
| Toolbar button (chuyển slide) | [testimonial](src/testimonial/), [pricing](src/pricing/), [blog-grid](src/blog-grid/) |
| Sidebar panel nhiều controls | mọi block |
| Click vào item để chỉnh riêng | [portfolio](src/portfolio/), [services-grid](src/services-grid/) |
| Tương tác frontend (`view.js`) | [testimonial](src/testimonial/), [brand-slider](src/brand-slider/), [header](src/header/) |

---

## 7. Checklist trước khi merge 1 Block mới

- [ ] `block.json` có `name` dạng `concrete/<slug>` duy nhất.
- [ ] Tất cả attributes có `default` hợp lý — editor không vỡ khi block vừa chèn.
- [ ] `index.js` bọc thẻ ngoài cùng bằng `useBlockProps({ className: '...' })`.
- [ ] `save: () => null` (dynamic block).
- [ ] `render.php` escape mọi output (`esc_url`, `esc_attr`, `wp_kses_post`).
- [ ] `render.php` dùng `get_block_wrapper_attributes()` ở thẻ root.
- [ ] Layout trong `index.js` và `render.php` **khớp nhau** (class, cấu trúc thẻ).
- [ ] Đã `npm run build` và kiểm tra cả editor lẫn frontend.
- [ ] Nếu có SCSS mới → đã viết ở `themes/concrete-child/assets/scss/` và build.

---

## 8. Khắc phục sự cố nhanh

| Triệu chứng | Nguyên nhân hay gặp |
|---|---|
| Block không xuất hiện trong trình chèn | Chưa `npm run build`, hoặc plugin `concrete-blocks` chưa active |
| Sửa file không thấy thay đổi | Đang thiếu `npm run start` — build chỉ chạy 1 lần |
| Editor báo "Block validation failed" | Schema `attributes` đổi nhưng post cũ đã lưu giá trị khác — thử xoá block và chèn lại |
| Frontend hiển thị trống | `render.php` đang in biến sai tên, hoặc thiếu `default` trong `block.json` |
| Class CSS không áp dụng | Quên `useBlockProps(...)` ở editor hoặc `get_block_wrapper_attributes()` ở server |

---

## 9. Tài liệu gốc

- [Block API tham chiếu](https://developer.wordpress.org/block-editor/reference-guides/block-api/)
- [Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [Component Reference (`@wordpress/components`)](https://developer.wordpress.org/block-editor/reference-guides/components/)
