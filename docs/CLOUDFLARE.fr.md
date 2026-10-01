# Guide de configuration et de déploiement Cloudflare

**BMxBike** est un site Hugo hébergé dans GitHub et distribué via Cloudflare Workers Static Assets.

## Configuration
- Worker : `hugo-cloudflare`
- Production : `https://bmxbike.ir/`
- Workers : `https://hugo-cloudflare.sh-h.workers.dev/`
- Branche : `main`
- Account ID : `ff423f0a3b506d3334f3781510869e39`

Ne publiez jamais de tokens API, mots de passe, clés privées ou secrets Cloudflare Access.

## Workers Builds
Repository : `Shahzad55/hugo-cloudflare`

```bash
chmod +x build.sh && ./build.sh
npx wrangler deploy
```

Un Push sur `main` peut déclencher un nouveau déploiement.

## Hugo
```toml
baseURL = 'https://bmxbike.ir/'
```

## Wrangler
La configuration principale est dans `wrangler.jsonc` et utilise `./public` comme répertoire des assets.

## Build
```bash
hugo mod get
hugo build --gc --minify
```

## Worker et Admin
`admin.bmxbike.ir` est routé vers `/admin/index.html`. Le chemin public `/admin/` retourne 404. Admin est actuellement une base, pas un CMS complet.

## KV
`SITE_KV` est configuré mais n'est pas requis pour la diffusion normale du site.

## Production
Privilégier une architecture statique avec Workers Static Assets, CDN Cloudflare, HTTPS, cache et Security Headers. Utiliser Cloudflare Access avant toute fonction Admin sensible.

## Langues
en — English  
fr — Français  
zh — 中文  
ru — Русский  
ar — العربية  
fa — فارسی  
es — Español

## Sécurité
Ne commitez jamais les tokens Cloudflare, clés API, secrets Access, clés privées, mots de passe ou identifiants de base de données.

## Source de configuration
`wrangler.jsonc`, `worker.js`, `build.sh` et `hugo.toml` sont les fichiers principaux. Le repository GitHub est la source de vérité.
