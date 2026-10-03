# موقع مدرسة تعليم السياقة 🚗

موقع ثابت (HTML / CSS / JavaScript) بدون أي اعتماديات، يعمل مباشرة على GitHub Pages.

## الملفات
- `index.html` الصفحة الرئيسية
- `assets/style.css` التصميم
- `assets/script.js` المنطق: لوحة التحكم، الأسعار، التسجيل، رابط Google Maps

## النشر على GitHub Pages
1. أنشئ مستودعاً جديداً على github.com (مثلاً `driving-school`).
2. ارفع محتويات هذا المجلد (Add file ← Upload files) ثم Commit.
3. من Settings ← Pages ← Source: Deploy from a branch ← Branch: `main` / `(root)` ← Save.
4. بعد دقيقة يصبح الموقع على: `https://USERNAME.github.io/driving-school/`

## تعديل بيانات المحل
افتح `assets/script.js` وعدّل الكائن `DEF` في أعلى الملف (الاسم، الهاتف، العنوان، الأسعار، رابط الخريطة في `map`).
لوحة التحكم في الموقع: كلمة المرور الافتراضية `admin123`.

## ملاحظة مهمة
لوحة التحكم وطلبات التسجيل تعتمد على `localStorage`، أي أنها تُحفظ في متصفح كل زائر فقط.
لاستلام الطلبات فعلياً اربط النموذج بخدمة مثل Formspree أو واتساب أو خادم خاص.
