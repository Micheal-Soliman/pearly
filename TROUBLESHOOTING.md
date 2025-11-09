# Troubleshooting Guide

## مشكلة: Total: 0 EGP في صفحة Checkout

### السبب:
الـ localStorage فيه cart قديم من قبل التحديثات، والمنتجات فيه مش فيها `price` صحيح.

### الحل:

#### الطريقة 1: من المتصفح
1. افتح Developer Tools (F12)
2. اذهب لـ **Console**
3. اكتب:
```javascript
localStorage.clear()
```
4. اعمل Refresh للصفحة (F5)

#### الطريقة 2: من Application Tab
1. افتح Developer Tools (F12)
2. اذهب لـ **Application** tab
3. في الجانب الأيسر، اختار **Local Storage**
4. اختار `http://localhost:3000`
5. احذف `pearly-cart`
6. اعمل Refresh للصفحة

#### الطريقة 3: أضف منتجات جديدة
1. امسح الـ cart الحالي
2. اذهب لصفحة المنتجات
3. أضف منتجات جديدة للـ cart
4. الأسعار هتظهر صح

### التأكد من الحل:
- ✅ افتح صفحة المنتج
- ✅ اختار النوع (Big Brush أو Squeez)
- ✅ اضغط Add to Cart
- ✅ اذهب للـ Cart
- ✅ السعر لازم يظهر صح (180 أو 250)

## مشكلة أخرى: Email Service مش شغال

### الحل:
1. تأكد إن `nodemailer` مثبت:
```bash
npm install nodemailer
```

2. أضف SMTP credentials في `.env.local`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

3. أعد تشغيل الـ server:
```bash
npm run dev
```

## مشكلة: Favorites مش شغالة

### الحل:
تأكد إن `FavoritesProvider` موجود في `app/layout.tsx` حوالين الـ children.
