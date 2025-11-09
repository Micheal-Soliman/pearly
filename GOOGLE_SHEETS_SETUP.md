# إعداد Google Sheets للطلبات

## الخطوات:

### 1. إنشاء Google Sheet جديد
- افتح [Google Sheets](https://sheets.google.com)
- اعمل Sheet جديد اسمه "Pearly Orders"
- في الصف الأول، اكتب العناوين التالية:
  ```
  Order Number | Date | Customer Name | Email | Phone | Address | City | Items | Total | Notes
  ```

### 2. إنشاء Google Apps Script
1. في Google Sheet، اضغط على **Extensions** > **Apps Script**
2. امسح الكود الموجود والصق الكود ده:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // تنسيق المنتجات
    const itemsText = data.items.map(item => 
      `${item.name} (${item.type}) x${item.quantity} - ${item.price} EGP`
    ).join('\n');
    
    // إضافة صف جديد
    sheet.appendRow([
      data.orderNumber,
      data.date,
      data.customerName,
      data.email,
      data.phone,
      data.address,
      data.city,
      itemsText,
      data.total + ' EGP',
      data.notes
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      orderNumber: data.orderNumber
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. اضغط **Save** (💾)
4. اضغط **Deploy** > **New deployment**
5. اختار **Web app**
6. في **Execute as**: اختار **Me**
7. في **Who has access**: اختار **Anyone**
8. اضغط **Deploy**
9. **انسخ الـ URL** اللي هيظهر

### 3. إضافة الـ URL للمشروع
1. في مجلد المشروع، اعمل ملف `.env.local`
2. اكتب فيه:
```
NEXT_PUBLIC_GOOGLE_SHEETS_URL=الـ_URL_اللي_نسخته
```

### 4. إعادة تشغيل المشروع
```bash
npm run dev
```

## ملاحظات:
- كل طلب جديد هيتسجل تلقائياً في Google Sheet
- هتقدر تشوف كل تفاصيل الطلب: الاسم، التليفون، العنوان، المنتجات، الإجمالي
- الطلبات مرتبة بالتاريخ والوقت
