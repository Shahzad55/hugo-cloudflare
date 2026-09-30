# Hugo Cloudflare

Производственный веб-сайт на **Hugo**, развернутый в **Cloudflare Workers** и автоматически собираемый из **GitHub**. Архитектура рассчитана на рост проекта.

## Языки

| Язык | Код | Направление |
|---|---|---|
| 🇬🇧 English | `en` | LTR |
| 🇫🇷 Français | `fr` | LTR |
| 🇨🇳 中文 | `zh` | LTR |
| 🇷🇺 Русский | `ru` | LTR |
| 🇸🇦 العربية | `ar` | RTL |
| 🇮🇷 فارسی | `fa` | RTL |

English используется по умолчанию. Arabic и Persian используют RTL. Версии одного материала связываются через `translationKey` Hugo.

## Архитектура

```text
Локальная разработка
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

Локальный компьютер используется только для разработки. Production не зависит от него.

## Cloudflare

Worker называется `hugo-cloudflare` и предоставляет сгенерированный Hugo-сайт через глобальную Edge-инфраструктуру Cloudflare.

Hugo создаёт сайт в `./public`, а Workers Static Assets распространяет его через Edge.

Репозиторий `Shahzad55/hugo-cloudflare` является источником истины, production-ветка — `main`.

Обычный процесс:

```text
Изменение → Git commit → Git push → Workers Builds → Hugo build → автоматический deploy
```

Для обычных обновлений вручную запускать `wrangler deploy` не требуется.

Build:

```bash
chmod +x build.sh && ./build.sh
```

Deploy:

```bash
npx wrangler deploy
```

Основной домен — `bmxbike.ir`. Также доступен `hugo-cloudflare.sh-h.workers.dev`.

Административный интерфейс подготовлен на `admin.bmxbike.ir`. Запросы к `/admin` на публичном сайте блокируются. Cloudflare Access запланирован на следующий этап.

## Cloudflare KV

Worker подключает binding `SITE_KV`. KV предназначен для будущих лёгких настроек, счётчиков, кэшированных метаданных и feature flags. Базовая доставка страниц Hugo от KV не зависит.

## Hugo и Go

Проект использует **Hugo**, написанный на **Go**. Go обеспечивает быструю компиляцию, низкие накладные расходы, простой deployment и автономные бинарные файлы.

Hugo заранее генерирует HTML, CSS, JavaScript, изображения и другие ресурсы, после чего Cloudflare может отдавать их напрямую с Edge.

## Конфигурация Hugo

Используется тема **PaperMod** как Hugo Module. Поддерживаются English, Français, 中文, Русский, العربية и فارسی. Arabic и Persian настроены как RTL.

Включены robots.txt, Git information, RSS, JSON, reading time, word count, breadcrumbs, навигация, social sharing, copy buttons, Table of Contents и minification.

## Сборка

```bash
#!/usr/bin/env bash
set -euo pipefail
hugo mod get
hugo build --gc --minify
```

Результат находится в `public/`.

## Структура контента

```text
content/
├── posts/
├── fr/
├── zh/
├── ru/
├── ar/
└── fa/
```

Одинаковый `translationKey` связывает переводы одного материала.

## Структура проекта

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

## Подход к deployment

Проект использует подход в стиле **GitOps**: GitHub хранит желаемое состояние, а Cloudflare выполняет сборку и deployment. Это обеспечивает историю изменений, автоматизацию, восстановление и масштабируемость.

## Roadmap

- Полный Admin CMS
- Cloudflare Access
- Управление постами и страницами
- Categories и Tags
- Media management
- Настройки сайта
- Search
- Улучшенная работа с изображениями
- Дополнительные Cloudflare Edge функции
- Performance monitoring
- Backup и recovery
- Расширение многоязычного контента

Цель — создать основу для перехода от небольшого Hugo-сайта к крупной многоязычной платформе без замены основной архитектуры.

## License

Репозиторий поддерживается **Shahzad55**. Актуальные условия License и contribution policy находятся в настройках репозитория.
