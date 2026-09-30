# Hugo Cloudflare

Un site web Hugo orienté production, déployé sur **Cloudflare Workers**, construit automatiquement depuis **GitHub** et conçu pour évoluer avec le site.

## Langues

| Langue | Code | Direction |
|---|---|---|
| 🇬🇧 English | `en` | LTR |
| 🇫🇷 Français | `fr` | LTR |
| 🇨🇳 中文 | `zh` | LTR |
| 🇷🇺 Русский | `ru` | LTR |
| 🇸🇦 العربية | `ar` | RTL |
| 🇮🇷 فارسی | `fa` | RTL |

L’anglais est la langue par défaut. L’arabe et le persan utilisent la mise en page RTL. Les versions traduites sont reliées avec le système `translationKey` de Hugo.

## Architecture

```text
Développement local
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

Le poste local sert uniquement au développement. La production ne dépend pas de l’ordinateur local.

## Cloudflare

### Workers
Le Worker s’appelle `hugo-cloudflare` et sert le site généré par Hugo via l’infrastructure edge de Cloudflare.

### Static Assets
Hugo génère le site dans `./public`, puis Cloudflare Workers Static Assets le distribue mondialement.

### GitHub
Le dépôt `Shahzad55/hugo-cloudflare` est la source de vérité. La branche de production est `main`.

Flux normal :

```text
Modification → Git commit → Git push → Workers Builds → Hugo build → déploiement automatique
```

### Workers Builds
Commande de build :

```bash
chmod +x build.sh && ./build.sh
```

Commande de déploiement :

```bash
npx wrangler deploy
```

Pour les mises à jour normales du site, il n’est pas nécessaire d’exécuter manuellement `wrangler deploy`.

### Domaines
Le domaine principal est `bmxbike.ir`. Le Worker dispose également de l’adresse `hugo-cloudflare.sh-h.workers.dev`.

### Administration
L’interface d’administration est disponible sur `admin.bmxbike.ir`. Les requêtes vers `/admin` sur le site public sont rejetées. Cloudflare Access est prévu pour une étape ultérieure.

### Sécurité Admin
L’interface Admin utilise notamment `Cache-Control`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` et une Content Security Policy.

### Cloudflare KV
Le Worker possède le binding `SITE_KV`. KV est réservé aux futures fonctions telles que configuration légère, compteurs, métadonnées mises en cache et feature flags. Le site Hugo de base n’en dépend pas pour servir les pages.

## Hugo et Go

Le site utilise **Hugo**, écrit en **Go**. Cette combinaison offre une génération très rapide, une faible surcharge, de bonnes performances et un déploiement simple.

Go fournit un binaire autonome et Hugo transforme rapidement le contenu Markdown en HTML, CSS, JavaScript et autres ressources prêtes à être servies depuis le edge.

## Configuration Hugo

Le thème **PaperMod** est utilisé comme Hugo Module. La configuration prend en charge English, Français, 中文, Русский, العربية et فارسی, avec RTL pour l’arabe et le persan.

Fonctions activées : robots.txt, Git info, RSS, JSON, temps de lecture, compteur de mots, breadcrumbs, navigation des articles, partage social, boutons de copie, table des matières et minification.

## Build

```bash
#!/usr/bin/env bash
set -euo pipefail
hugo mod get
hugo build --gc --minify
```

Le résultat final est placé dans `public/`.

## Structure du contenu

```text
content/
├── posts/
├── fr/
├── zh/
├── ru/
├── ar/
└── fa/
```

Chaque traduction utilise la même `translationKey` afin de relier les versions linguistiques d’un même contenu.

## Structure du projet

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

## Philosophie de déploiement

Le projet suit un workflow de type **GitOps** : GitHub contient l’état souhaité, Cloudflare construit et déploie cet état. Cela apporte traçabilité, automatisation, récupération par l’historique Git, évolutivité et simplicité.

## Feuille de route

- CMS Admin complet
- Cloudflare Access
- Gestion des articles et pages
- Catégories et tags
- Gestion des médias
- Paramètres du site
- Recherche
- Gestion avancée des images
- Fonctions edge Cloudflare supplémentaires
- Monitoring des performances
- Stratégie de sauvegarde et restauration
- Expansion du contenu multilingue

## Pourquoi cette architecture ?

**Hugo + Go** fournissent une génération rapide et efficace.  
**GitHub** fournit le contrôle de version et la source de vérité.  
**Cloudflare** fournit la distribution mondiale, Workers, Static Assets, les domaines personnalisés et l’automatisation.

L’objectif est de disposer d’une base capable d’évoluer d’un petit site Hugo vers une grande plateforme de contenu multilingue sans remplacer son architecture centrale.

## Licence

Ce dépôt est maintenu par **Shahzad55**. Consultez la configuration du dépôt pour la licence et la politique de contribution actuelles.
