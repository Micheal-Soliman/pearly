# إعداد Email Service

## الخطوات:

### 1. إنشاء App Password لـ Gmail
1. اذهب إلى [Google Account Security](https://myaccount.google.com/security)
2. فعّل **2-Step Verification** إذا لم يكن مفعّل
3. اذهب إلى **App passwords**
4. اختر **Mail** و **Other (Custom name)**
5. اكتب "Pearly Website"
6. اضغط **Generate**
7. **انسخ الـ Password** (16 حرف)

### 2. إضافة المتغيرات للمشروع
في ملف `.env.local`، أضف:

```env
# SMTP Configuration for Gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-digit-app-password
SMTP_FROM=your-email@gmail.com
COMPANY_EMAIL=the-admin-email-that-receives-orders@gmail.com
```

> مهم: أضف نفس المتغيرات في إعدادات الاستضافة (Production وPreview)، وليس في `.env.local` فقط.
> الطلب لا يُعتبر مؤكدًا ولا تُمسح سلة العميل إذا فشل إرسال إشعار الأدمن.

### 3. تثبيت nodemailer
```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

### 4. إعادة تشغيل المشروع
```bash
npm run dev
```

## كيف يعمل:
- لما العميل يعمل Order، هيوصله إيميل تلقائياً
- الإيميل فيه:
  - ✅ رقم الطلب
  - ✅ بيانات العميل (الاسم، التليفون، العنوان)
  - ✅ تفاصيل المنتجات
  - ✅ الإجمالي
  - ✅ طريقة الدفع (Cash on Delivery)
  - ✅ معلومات التواصل

## ملاحظات:
- الإيميل بيتبعت تلقائياً بعد تأكيد الطلب
- لو فشل إرسال الإيميل، الطلب هيتسجل عادي في Google Sheets
- التصميم responsive ويشتغل على الموبايل
- الألوان وردية متناسقة مع Pearly branding 💖
