# Hugo Cloudflare

یک وب‌سایت مبتنی بر **Hugo** و آماده برای محیط Production که روی **Cloudflare Workers** میزبانی می‌شود و به‌صورت خودکار از **GitHub** Build و Deploy می‌شود. معماری پروژه از ابتدا برای رشد و بزرگ‌شدن سایت طراحی شده است.

## زبان‌ها

| زبان | کد | جهت |
|---|---|---|
| 🇬🇧 English | `en` | LTR |
| 🇫🇷 Français | `fr` | LTR |
| 🇨🇳 中文 | `zh` | LTR |
| 🇷🇺 Русский | `ru` | LTR |
| 🇸🇦 العربية | `ar` | RTL |
| 🇮🇷 فارسی | `fa` | RTL |

زبان پیش‌فرض English است. زبان‌های Arabic و Persian با چیدمان RTL از راست به چپ تنظیم شده‌اند. نسخه‌های مختلف یک محتوا با سیستم `translationKey` در Hugo به یکدیگر متصل می‌شوند.

## معماری

```text
Local Development
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

کامپیوتر محلی فقط برای Development استفاده می‌شود و سایت Production به آن وابسته نیست.

## Cloudflare

نام Worker برابر است با `hugo-cloudflare` و سایت تولیدشده توسط Hugo را از طریق زیرساخت Edge کلودفلر ارائه می‌کند.

Hugo سایت را داخل `./public` تولید می‌کند و Cloudflare Workers Static Assets این فایل‌ها را در Edge ارائه می‌دهد.

Repository اصلی پروژه:

`Shahzad55/hugo-cloudflare`

Branch اصلی Production:

`main`

فرآیند معمول:

```text
ویرایش → Git commit → Git push → Workers Builds → Hugo build → Deploy خودکار
```

برای Update معمول سایت نیازی به اجرای دستی `wrangler deploy` نیست.

### Workers Builds

Build command:

```bash
chmod +x build.sh && ./build.sh
```

Deploy command:

```bash
npx wrangler deploy
```

### دامنه‌ها

دامنه اصلی سایت:

`bmxbike.ir`

آدرس workers.dev:

`hugo-cloudflare.sh-h.workers.dev`

### پنل مدیریت

پنل مدیریت روی:

`admin.bmxbike.ir`

آماده شده است. درخواست‌های `/admin` روی دامنه عمومی سایت رد می‌شوند. فعال‌سازی Cloudflare Access برای مرحله بعدی پروژه در نظر گرفته شده است.

### امنیت Admin

پاسخ‌های Admin شامل Headerهای امنیتی مانند `Cache-Control`، `X-Content-Type-Options`، `X-Frame-Options`، `Referrer-Policy` و Content Security Policy هستند.

### Cloudflare KV

Worker به KV با Binding زیر متصل است:

`SITE_KV`

KV در آینده می‌تواند برای Configuration سبک، Counter، Cached Metadata و Feature Flags استفاده شود. تحویل صفحات معمول Hugo در حال حاضر به KV وابسته نیست.

## Hugo و Go

این پروژه از **Hugo** استفاده می‌کند که با **Go** نوشته شده است.

Go باعث می‌شود ابزار Build سریع، کم‌مصرف و ساده باشد و Hugo نیز محتوا را قبل از Deploy به فایل‌های استاتیک تبدیل می‌کند.

در نتیجه Cloudflare می‌تواند HTML، CSS، JavaScript، تصاویر و سایر فایل‌ها را مستقیماً از Edge ارائه کند، بدون نیاز به یک Web Server سنتی.

## تنظیمات Hugo

Theme پروژه **PaperMod** است که به‌صورت Hugo Module استفاده می‌شود.

زبان‌های پشتیبانی‌شده:

- English
- Français
- 中文
- Русский
- العربية
- فارسی

برای Arabic و Persian حالت RTL فعال است.

ویژگی‌های فعال شامل robots.txt، Git information، RSS، JSON، Reading Time، Word Count، Breadcrumbs، Post Navigation، Social Sharing، Code Copy، Table of Contents و Minification است.

## Build

```bash
#!/usr/bin/env bash
set -euo pipefail
hugo mod get
hugo build --gc --minify
```

خروجی نهایی سایت در:

`public/`

قرار می‌گیرد.

## ساختار محتوا

```text
content/
├── posts/
├── fr/
├── zh/
├── ru/
├── ar/
└── fa/
```

برای اینکه Hugo نسخه‌های مختلف یک مقاله را به‌عنوان Translation یک محتوا بشناسد، از `translationKey` مشترک استفاده می‌شود.

## ساختار پروژه

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

## فلسفه Deployment

پروژه از یک Workflow مشابه **GitOps** استفاده می‌کند.

GitHub وضعیت موردنظر سایت را نگهداری می‌کند و Cloudflare آن را Build و Deploy می‌کند.

مزایا:

- Version Control
- تاریخچه کامل تغییرات
- Deployment خودکار
- امکان Recovery
- Scalability
- عدم وابستگی Production به PC محلی

## Roadmap

- Full Admin CMS
- Cloudflare Access
- مدیریت Posts
- مدیریت Pages
- Categories
- Tags
- Media Management
- Site Settings
- Search
- Image Optimization
- قابلیت‌های بیشتر Cloudflare Edge
- Performance Monitoring
- Backup و Recovery
- گسترش محتوای چندزبانه

هدف این است که پروژه بتواند از یک سایت کوچک Hugo به یک پلتفرم بزرگ Multilingual Content تبدیل شود، بدون اینکه معماری اصلی نیاز به تعویض داشته باشد.

## License

این Repository توسط **Shahzad55** نگهداری می‌شود. برای License و Contribution Policy فعلی، تنظیمات Repository را بررسی کنید.
