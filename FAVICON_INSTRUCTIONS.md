# Favicon Setup Instructions

## ✅ تم إنشاء:
- `public/favicon.svg` - Favicon بحرف P بألوان وردية

## 📝 لإنشاء باقي الأيقونات:

### 1. استخدم أداة online لتحويل SVG إلى ICO و PNG:
- اذهب إلى: https://favicon.io/favicon-converter/
- ارفع ملف `public/favicon.svg`
- حمّل الملفات الناتجة

### 2. ضع الملفات في مجلد `public`:
- `favicon.ico` (32x32)
- `apple-touch-icon.png` (180x180)
- `favicon-16x16.png`
- `favicon-32x32.png`

### 3. أو استخدم هذا الأمر لإنشاء favicon.ico:
إذا كان عندك ImageMagick مثبت:
```bash
convert public/favicon.svg -resize 32x32 public/favicon.ico
```

## 🎨 التصميم:
- ✅ حرف **P** باللون الأبيض
- ✅ خلفية **gradient وردية** (من #ec4899 إلى #f43f5e)
- ✅ تأثير **sparkle** خفيف
- ✅ متناسق مع ألوان Pearly

## 📱 الأحجام المطلوبة:
- favicon.ico: 32x32
- favicon-16x16.png: 16x16
- favicon-32x32.png: 32x32
- apple-touch-icon.png: 180x180

الـ favicon.svg جاهز للاستخدام! 💖
