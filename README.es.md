# Hugo Cloudflare

Un sitio web Hugo orientado a producción, desplegado en **Cloudflare Workers**, construido automáticamente desde **GitHub** y diseñado para crecer junto con el proyecto.

## Idiomas

| Idioma | Código | Dirección |
|---|---|---|
| 🇬🇧 English | `en` | LTR |
| 🇫🇷 Français | `fr` | LTR |
| 🇨🇳 中文 | `zh` | LTR |
| 🇷🇺 Русский | `ru` | LTR |
| 🇸🇦 العربية | `ar` | RTL |
| 🇮🇷 فارسی | `fa` | RTL |
| 🇪🇸 Español | `es` | LTR |

English es el idioma predeterminado. Árabe y persa utilizan diseño RTL. Las versiones traducidas se vinculan mediante `translationKey` de Hugo.

## Arquitectura

```text
Desarrollo local
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

El ordenador local solo se utiliza para desarrollo. El entorno de producción no depende del equipo local.

## Cloudflare

El Worker se llama `hugo-cloudflare` y entrega el sitio generado por Hugo mediante la infraestructura Edge global de Cloudflare.

Hugo genera el sitio en `./public` y Cloudflare Workers Static Assets lo distribuye desde Edge.

El repositorio `Shahzad55/hugo-cloudflare` es la fuente de verdad y la rama de producción es `main`.

Flujo normal:

```text
Cambio → Git commit → Git push → Workers Builds → Hugo build → despliegue automático
```

Para las actualizaciones normales no es necesario ejecutar manualmente `wrangler deploy`.

### Workers Builds

```bash
chmod +x build.sh && ./build.sh
```

### Dominios

Dominio principal: `bmxbike.ir`

Dirección workers.dev: `hugo-cloudflare.sh-h.workers.dev`

### Administración

La interfaz de administración está preparada en `admin.bmxbike.ir`. Las solicitudes a `/admin` desde el sitio público son rechazadas. Cloudflare Access está previsto para una etapa posterior.

### Cloudflare KV

El Worker utiliza el binding `SITE_KV`. KV queda disponible para futuras funciones como configuración ligera, contadores, metadatos en caché y feature flags. La entrega básica de páginas Hugo no depende de KV.

## Hugo y Go

El proyecto utiliza **Hugo**, escrito en **Go**. Go proporciona un sistema de compilación rápido, bajo consumo y sencillo, mientras Hugo convierte el contenido en archivos estáticos preparados para producción.

Esto permite que Cloudflare entregue HTML, CSS, JavaScript, imágenes y otros recursos directamente desde Edge, sin necesidad de un servidor web tradicional.

## Configuración de Hugo

El tema **PaperMod** se utiliza como Hugo Module.

El proyecto admite:

- English
- Français
- 中文
- Русский
- العربية
- فارسی
- Español

Arabic y Persian están configurados con RTL.

Entre las funciones activadas se encuentran robots.txt, Git information, RSS, JSON, Reading Time, Word Count, Breadcrumbs, navegación de publicaciones, Social Sharing, Code Copy, Table of Contents y Minification.

## Build

```bash
#!/usr/bin/env bash
set -euo pipefail
hugo mod get
hugo build --gc --minify
```

El resultado final se genera en `public/`.

## Estructura del contenido

```text
content/
├── posts/
├── fr/
├── zh/
├── ru/
├── ar/
├── fa/
└── es/
```

Cada traducción utiliza el mismo `translationKey` para que Hugo las reconozca como versiones lingüísticas del mismo contenido.

## Estructura del proyecto

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

## Filosofía de despliegue

El proyecto sigue un flujo similar a **GitOps**: GitHub mantiene el estado deseado del sitio y Cloudflare se encarga de construirlo y desplegarlo.

Esto proporciona control de versiones, historial de cambios, despliegue automático, recuperación y escalabilidad.

## Roadmap

- CMS Admin completo
- Cloudflare Access
- Gestión de publicaciones y páginas
- Categories y Tags
- Media Management
- Site Settings
- Search
- Optimización de imágenes
- Más funciones Cloudflare Edge
- Performance Monitoring
- Backup y Recovery
- Expansión del contenido multilingüe

El objetivo es que el proyecto pueda crecer desde un pequeño sitio Hugo hasta una gran plataforma de contenido multilingüe sin reemplazar su arquitectura principal.

## License

Este repositorio es mantenido por **Shahzad55**. Consulta la configuración del repositorio para conocer la licencia y la política de contribuciones actuales.
