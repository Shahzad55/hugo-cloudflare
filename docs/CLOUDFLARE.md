# Cloudflare Configuration & Deployment Guide

## Project

**BMxBike** is a Hugo website deployed through GitHub and served by Cloudflare Workers Static Assets.

Architecture:

```
Local development
      ↓
GitHub: Shahzad55/hugo-cloudflare
      ↓
Cloudflare Workers Builds
      ↓
Hugo build
      ↓
Cloudflare Workers Static Assets / CDN
      ↓
bmxbike.ir
```

## Cloudflare configuration

### Worker

- Worker name: `hugo-cloudflare`
- Production domain: `https://bmxbike.ir/`
- Workers hostname: `https://hugo-cloudflare.sh-h.workers.dev/`
- Deployment source: GitHub
- Branch: `main`

### Account

- Account ID: `ff423f0a3b506d3334f3781510869e39`

> Never publish API tokens, passwords, private keys, or Cloudflare Access secrets in this document or in Git.

## Workers Builds

Repository:

`Shahzad55/hugo-cloudflare`

Production branch:

`main`

Build command:

```bash
chmod +x build.sh && ./build.sh
```

Deploy command:

```bash
npx wrangler deploy
```

Every push to `main` can trigger a new Cloudflare deployment when Workers Builds is connected to the repository.

## Hugo configuration

The production URL is defined in `hugo.toml`:

```toml
baseURL = 'https://bmxbike.ir/'
```

Do not change this to a local development URL for production.

## Wrangler configuration

The main Cloudflare configuration is `wrangler.jsonc`:

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

## Build process

`build.sh` currently runs:

```bash
set -euo pipefail
hugo mod get
hugo build --gc --minify
```

The generated website is placed in:

```text
./public
```

Cloudflare Workers Static Assets serves that directory.

## Worker routing

`worker.js` handles the administration hostname separately:

- `admin.bmxbike.ir` → `/admin/index.html`
- Public requests to `/admin/` on the main site return 404.
- Security headers are applied to the administration response.

The admin area is currently a foundation and should not be treated as a complete CMS.

## KV

The project defines a KV namespace named `SITE_KV`.

Current status:

- Binding exists.
- The public site does not currently depend on KV for normal page delivery.
- KV should only be used when a real requirement justifies dynamic or persistent data.

## Custom domain

Production:

```text
https://bmxbike.ir/
```

The DNS/custom-domain configuration should point the production hostname to the Cloudflare Worker according to the current Cloudflare dashboard configuration.

Do not commit DNS API credentials or tokens.

## Recommended Cloudflare production settings

Keep the public website primarily static:

- Workers Static Assets for generated Hugo pages.
- Cloudflare CDN for global delivery.
- HTTPS enabled.
- Automatic HTTPS redirects enabled where appropriate.
- Brotli/compression enabled where available.
- Appropriate browser/CDN caching.
- Security headers from the Worker where needed.
- Cloudflare Access before exposing sensitive administration functionality.
- Avoid adding a database or runtime API until the site actually requires it.

## Deployment workflow

1. Edit the Hugo project locally.
2. Test the Hugo build.
3. Commit changes to Git.
4. Push to `main`.
5. Workers Builds starts the build.
6. `build.sh` generates `public/`.
7. Wrangler deploys the Worker and static assets.
8. Cloudflare serves the production site.

## Useful local commands

Check Wrangler:

```powershell
wrangler --version
```

Build Hugo:

```powershell
hugo build --gc --minify
```

Run local development:

```powershell
hugo server
```

Deploy manually when required:

```powershell
npx wrangler deploy
```

## Verification checklist

After a production deployment, verify:

- [ ] `https://bmxbike.ir/` loads.
- [ ] All seven languages load.
- [ ] HTTPS works correctly.
- [ ] Favicon is available.
- [ ] Search works.
- [ ] Archives work.
- [ ] RSS and sitemap are generated.
- [ ] `robots.txt` is available.
- [ ] The administration hostname is separated from the public site.
- [ ] No secrets are present in GitHub.
- [ ] Cloudflare deployment completed successfully.

## Seven supported languages

| Code | Language |
|---|---|
| en | English |
| fr | Français |
| zh | 中文 |
| ru | Русский |
| ar | العربية |
| fa | فارسی |
| es | Español |

## Security

Never commit:

- Cloudflare API tokens
- API keys
- Access service tokens
- Private keys
- Passwords
- Database credentials

Use Cloudflare environment variables/secrets or the appropriate secure secret-management mechanism instead.

## Source of truth

Cloudflare deployment configuration is primarily defined by:

- `wrangler.jsonc`
- `worker.js`
- `build.sh`
- `hugo.toml`

The GitHub repository is the source of truth for the site's deployment configuration.
