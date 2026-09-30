# Hugo Cloudflare

موقع ويب يعتمد على **Hugo** ومجهز للإنتاج، ويتم نشره على **Cloudflare Workers** وبناؤه تلقائياً من **GitHub**، مع بنية مصممة للتوسع مع نمو الموقع.

## اللغات

| اللغة | الرمز | الاتجاه |
|---|---|---|
| 🇬🇧 English | `en` | LTR |
| 🇫🇷 Français | `fr` | LTR |
| 🇨🇳 中文 | `zh` | LTR |
| 🇷🇺 Русский | `ru` | LTR |
| 🇸🇦 العربية | `ar` | RTL |
| 🇮🇷 فارسی | `fa` | RTL |

اللغة الافتراضية هي English. وتستخدم العربية والفارسية تخطيط RTL من اليمين إلى اليسار. يتم ربط الترجمات باستخدام `translationKey` في Hugo.

## البنية

```text
التطوير المحلي
      ↓
GitHub
      ↓
Cloudflare Workers Builds
      ↓
Hugo / Go
      ↓
Cloudflare Workers + Static Assets
      ↓
bmxbike.ir
      └── admin.bmxbike.ir
```

الكمبيوتر المحلي مخصص للتطوير فقط، ولا يعتمد موقع الإنتاج عليه.

## Cloudflare

اسم الـ Worker هو `hugo-cloudflare`، ويقدم الموقع الذي يولده Hugo عبر شبكة Cloudflare العالمية.

يقوم Hugo بإنشاء الموقع داخل `./public`، ثم تقوم Workers Static Assets بتقديمه عبر Edge.

المستودع `Shahzad55/hugo-cloudflare` هو المصدر الأساسي للمشروع، وفرع الإنتاج هو `main`.

سير العمل المعتاد:

```text
تعديل → Git commit → Git push → Workers Builds → Hugo build → نشر تلقائي
```

لا حاجة إلى تشغيل `wrangler deploy` يدوياً عند تحديث الموقع بشكل طبيعي.

### Workers Builds

```bash
chmod +x build.sh && ./build.sh
```

وأمر النشر:

```bash
npx wrangler deploy
```

### النطاقات

النطاق الرئيسي هو `bmxbike.ir`. ويتوفر أيضاً عنوان `hugo-cloudflare.sh-h.workers.dev`.

### لوحة الإدارة

تم تجهيز لوحة الإدارة على `admin.bmxbike.ir`. ويتم رفض طلبات `/admin` على النطاق العام. سيتم إضافة Cloudflare Access في مرحلة لاحقة.

### الأمان

تستخدم واجهة الإدارة Headers أمنية مثل Cache-Control و X-Content-Type-Options و X-Frame-Options و Referrer-Policy و Content Security Policy.

### Cloudflare KV

تم ربط Worker بـ `SITE_KV`. ويمكن استخدام KV مستقبلاً للإعدادات الخفيفة، العدادات، البيانات الوصفية المخزنة مؤقتاً وfeature flags. الموقع الأساسي لا يعتمد على KV لتقديم الصفحات.

## Hugo وGo

يستخدم المشروع **Hugo** المكتوب بلغة **Go**. توفر Go أداءً سريعاً وأداة بناء بسيطة وملفات تنفيذية مستقلة، بينما يحول Hugo المحتوى إلى ملفات ثابتة جاهزة للنشر.

وبذلك يمكن لـ Cloudflare تقديم HTML وCSS وJavaScript والصور مباشرة من Edge.

## إعداد Hugo

يستخدم المشروع **PaperMod** كـ Hugo Module، ويدعم English وFrançais و中文 وРусский والعربية وفارسی. تم إعداد العربية والفارسية باستخدام RTL.

تشمل الميزات robots.txt وGit information وRSS وJSON ووقت القراءة وعدد الكلمات وbreadcrumbs والتنقل بين المقالات والمشاركة الاجتماعية وأزرار نسخ الأكواد وTable of Contents وminification.

## البناء

```bash
#!/usr/bin/env bash
set -euo pipefail
hugo mod get
hugo build --gc --minify
```

الناتج النهائي موجود في `public/`.

## بنية المحتوى

```text
content/
├── posts/
├── fr/
├── zh/
├── ru/
├── ar/
└── fa/
```

يتم استخدام نفس `translationKey` لربط الإصدارات المترجمة للمحتوى نفسه.

## بنية المشروع

```text
.
├── content/
├── static/admin/index.html
├── build.sh
├── go.mod
├── hugo.toml
├── wrangler.jsonc
└── worker.js
```

## فلسفة النشر

يعتمد المشروع أسلوباً قريباً من **GitOps**: GitHub يحتفظ بالحالة المطلوبة للموقع، وCloudflare تقوم بالبناء والنشر. هذا يوفر التتبع والأتمتة وسهولة الاستعادة وقابلية التوسع.

## خارطة الطريق

- Admin CMS كامل
- Cloudflare Access
- إدارة المقالات والصفحات
- Categories وTags
- إدارة Media
- إعدادات الموقع
- Search
- تحسين معالجة الصور
- مزيد من وظائف Cloudflare Edge
- مراقبة الأداء
- النسخ الاحتياطي والاستعادة
- توسيع المحتوى متعدد اللغات

الهدف هو بناء أساس يمكنه النمو من موقع Hugo صغير إلى منصة محتوى كبيرة متعددة اللغات دون استبدال البنية الأساسية.

## License

يتم الحفاظ على هذا المستودع بواسطة **Shahzad55**. راجع إعدادات المستودع لمعرفة License وسياسة المساهمة الحالية.
