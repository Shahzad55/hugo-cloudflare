# راهنمای تنظیمات و استقرار Cloudflare

## پروژه
**BMxBike** یک وب‌سایت Hugo است که کد آن در GitHub قرار دارد و از طریق Cloudflare Workers Static Assets منتشر می‌شود.

## تنظیمات Cloudflare
- Worker: `hugo-cloudflare`
- دامنه Production: `https://bmxbike.ir/`
- دامنه Workers: `https://hugo-cloudflare.sh-h.workers.dev/`
- Branch: `main`
- Account ID: `ff423f0a3b506d3334f3781510869e39`

هرگز API Token، رمز عبور، کلید خصوصی یا Secretهای Cloudflare Access را در Git قرار ندهید.

## Workers Builds
Repository: `Shahzad55/hugo-cloudflare`

Build:
```bash
chmod +x build.sh && ./build.sh
```

Deploy:
```bash
npx wrangler deploy
```

Push به `main` در صورت اتصال Workers Builds باعث Deployment جدید می‌شود.

## Hugo
در `hugo.toml`:
```toml
baseURL = 'https://bmxbike.ir/'
```

## Wrangler
فایل اصلی تنظیمات `wrangler.jsonc` است:
```json
{
  "name": "hugo-cloudflare",
  "main": "worker.js",
  "compatibility_date": "2026-09-09",
  "assets": {
    "directory": "./public",
    "not_found_handling": "404-page"
  },
  "kv_namespaces": [
    {
      "binding": "SITE_KV",
      "id": "3b22efc867474dd78e1a325b210c3197"
    }
  ]
}
```

## Build
`build.sh` اجرا می‌کند:
```bash
set -euo pipefail
hugo mod get
hugo build --gc --minify
```
خروجی در `./public` ساخته و توسط Cloudflare Workers Static Assets ارائه می‌شود.

## Worker و Admin
`admin.bmxbike.ir` به `/admin/index.html` هدایت می‌شود. مسیر `/admin/` در دامنه اصلی 404 می‌دهد.
Admin فعلاً یک زیرساخت اولیه است و CMS کامل نیست.

## KV
`SITE_KV` تعریف شده، اما سایت عمومی فعلاً برای نمایش عادی صفحات به KV وابسته نیست.

## Production
معماری سایت تا حد امکان Static بماند: Workers Static Assets، Cloudflare CDN، HTTPS، Cache مناسب و Security Headers.
قبل از قابلیت‌های حساس Admin، Cloudflare Access استفاده شود.

## روند Deployment
1. تغییر Hugo
2. تست Build
3. Commit
4. Push به `main`
5. اجرای Workers Builds
6. ساخت `public/`
7. Deployment توسط Wrangler
8. ارائه سایت توسط Cloudflare

## هفت زبان
| Code | Language |
|---|---|
| en | English |
| fr | Français |
| zh | 中文 |
| ru | Русский |
| ar | العربية |
| fa | فارسی |
| es | Español |

## امنیت
این موارد را Commit نکنید:
- Cloudflare API Token
- API Key
- Access Service Token
- Private Key
- Password
- Database Credentials

## فایل‌های اصلی
- `wrangler.jsonc`
- `worker.js`
- `build.sh`
- `hugo.toml`

Repository گیت‌هاب منبع اصلی تنظیمات Deployment است.
