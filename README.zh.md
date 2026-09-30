# Hugo Cloudflare

一个面向生产环境的 Hugo 网站，部署在 **Cloudflare Workers** 上，并通过 **GitHub** 自动构建和发布，架构从一开始就考虑了网站规模增长。

## 语言

| 语言 | 代码 | 方向 |
|---|---|---|
| 🇬🇧 English | `en` | LTR |
| 🇫🇷 Français | `fr` | LTR |
| 🇨🇳 中文 | `zh` | LTR |
| 🇷🇺 Русский | `ru` | LTR |
| 🇸🇦 العربية | `ar` | RTL |
| 🇮🇷 فارسی | `fa` | RTL |

English 是默认语言。Arabic 和 Persian 使用 RTL 从右到左布局。不同语言的内容通过 Hugo 的 `translationKey` 关联。

## 架构

```text
本地开发
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

本地电脑只用于开发，生产网站不依赖本地电脑。

## Cloudflare 配置

### Workers
Worker 名称为 `hugo-cloudflare`，通过 Cloudflare 全球 Edge 基础设施提供 Hugo 生成的网站。

### Static Assets
Hugo 将生产网站生成到 `./public`，Cloudflare Workers Static Assets 在全球 Edge 提供这些文件。

### GitHub
仓库 `Shahzad55/hugo-cloudflare` 是项目的唯一事实来源，生产分支为 `main`。

正常流程：

```text
修改 → Git commit → Git push → Workers Builds → Hugo build → 自动部署
```

普通网站更新不需要手动执行 `wrangler deploy`。

### Workers Builds
构建命令：

```bash
chmod +x build.sh && ./build.sh
```

部署命令：

```bash
npx wrangler deploy
```

### 自定义域名
主域名为 `bmxbike.ir`，Worker 同时提供 `hugo-cloudflare.sh-h.workers.dev`。

### 管理后台
管理界面使用 `admin.bmxbike.ir`。公共网站上的 `/admin` 请求会被拒绝。Cloudflare Access 计划在后续阶段加入。

### Admin 安全
Admin 响应包含 Cache-Control、X-Content-Type-Options、X-Frame-Options、Referrer-Policy 和 Content Security Policy 等安全 Header。

### Cloudflare KV
Worker 已连接 `SITE_KV`。KV 可用于未来的轻量配置、计数器、缓存元数据和 feature flags。当前 Hugo 页面交付不依赖 KV。

## Hugo 与 Go

网站使用 **Hugo**，Hugo 使用 **Go** 编写。Go 的高性能和简单工具链使 Hugo 可以快速生成大量静态内容。

生成后的 HTML、CSS、JavaScript、图片等资源可以直接从 Cloudflare Edge 提供，不需要传统服务器端应用。

## Hugo 配置

项目使用 **PaperMod** 作为 Hugo Module，并支持 English、Français、中文、Русский、العربية 和 فارسی。Arabic 与 Persian 配置为 RTL。

启用的能力包括 robots.txt、Git 信息、RSS、JSON、阅读时间、字数统计、面包屑、文章导航、社交分享、代码复制、目录和压缩。

## 构建

```bash
#!/usr/bin/env bash
set -euo pipefail
hugo mod get
hugo build --gc --minify
```

最终网站生成到 `public/`。

## 内容结构

```text
content/
├── posts/
├── fr/
├── zh/
├── ru/
├── ar/
└── fa/
```

每个翻译版本使用相同的 `translationKey`，因此 Hugo 可以识别它们属于同一篇内容的不同语言版本。

## 项目结构

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

## 部署理念

项目采用 **GitOps 风格**：GitHub 保存网站的期望状态，Cloudflare 自动构建并部署。这样可以获得可追踪的 Git 历史、自动化部署、快速恢复和良好的扩展能力。

## 路线图

- 完整 Admin CMS
- Cloudflare Access
- 文章和页面管理
- Categories 和 Tags
- Media 管理
- 网站设置
- Search
- 更完善的图片处理
- 更多 Cloudflare Edge 功能
- 性能监控
- 备份与恢复
- 扩展多语言内容

目标是让项目从小型 Hugo 网站平稳发展为大型多语言内容平台，同时保持核心架构稳定。

## License

本仓库由 **Shahzad55** 维护。当前 License 和贡献政策请查看仓库配置。
