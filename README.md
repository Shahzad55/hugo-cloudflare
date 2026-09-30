# Hugo Cloudflare

A production-oriented Hugo website deployed on **Cloudflare Workers**, built automatically from **GitHub**, with a lightweight architecture designed to scale as the website grows.

The project combines Hugo's static-site generation with Cloudflare's global edge network, while keeping the source code and content in GitHub.

## Architecture

```text
Local Development
       |
       v
     GitHub
       |
       | push to main
       v
Cloudflare Workers Builds
       |
       | Hugo build
       v
Cloudflare Workers
       |
       v
Cloudflare Static Assets / Global CDN
       |
       +----> bmxbike.ir
       |
       +----> admin.bmxbike.ir
```

The local computer is only a development environment. The production website does **not** depend on the local machine.

---

## What We Have Configured on Cloudflare

### 1. Cloudflare Workers

The project runs as a Cloudflare Worker named:

`hugo-cloudflare`

The Worker serves the generated Hugo website through Cloudflare's edge infrastructure.

Workers provide the runtime layer while Hugo generates the static content.

### 2. Workers Static Assets

Hugo generates the production website into:

```text
./public
```

Cloudflare Workers Static Assets serves this directory at the edge.

The current configuration uses:

- Assets directory: `./public`
- 404 handling: Hugo/Workers `404-page`

This gives the project a simple and efficient deployment model without requiring a traditional web server.

### 3. GitHub Integration

GitHub is the source of truth for the project.

Repository:

`Shahzad55/hugo-cloudflare`

Production branch:

`main`

The website source, Hugo configuration, content, Worker code, and build configuration are stored in the repository.

A normal workflow is:

```text
Edit
  ↓
Git commit
  ↓
Git push
  ↓
Cloudflare Workers Builds
  ↓
Hugo build
  ↓
Automatic deployment
```

There is no need to manually run `wrangler deploy` for normal website updates.

### 4. Cloudflare Workers Builds

Workers Builds is configured to build the project automatically whenever changes are pushed to the `main` branch.

Build command:

```bash
chmod +x build.sh && ./build.sh
```

Deploy command:

```bash
npx wrangler deploy
```

This creates a fully automated GitHub-to-Cloudflare deployment pipeline.

### 5. Custom Domains

The Worker is connected to the production domain:

`bmxbike.ir`

The site is therefore available through the custom domain instead of relying only on the temporary `workers.dev` address.

The Worker also has the `workers.dev` endpoint:

`hugo-cloudflare.sh-h.workers.dev`

### 6. Admin Subdomain

A dedicated administration hostname has been prepared:

`admin.bmxbike.ir`

The Worker contains routing logic that serves the administration interface only when the request hostname is `admin.bmxbike.ir`.

Requests to `/admin` on the public website are intentionally rejected.

The administration area is therefore separated at the hostname level:

```text
Public website
https://bmxbike.ir/

Administration
https://admin.bmxbike.ir/
```

The Admin interface is currently a foundation for the future CMS.

Cloudflare Access authentication is intentionally planned as a later step.

### 7. Security Headers for Admin

The Admin response currently includes security-oriented HTTP headers such as:

- `Cache-Control: no-store, no-cache, must-revalidate`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: no-referrer`
- Content Security Policy
- `frame-ancestors 'none'`

The administration interface is therefore treated differently from normal public static content.

### 8. Cloudflare KV

A Cloudflare KV namespace has been created and connected to the Worker.

Binding:

`SITE_KV`

Namespace ID:

`3b22efc867474dd78e1a325b210c3197`

KV is available for future application features such as lightweight configuration, counters, cached metadata, feature flags, or other edge-accessible data.

The current Hugo website does not depend on KV for basic page delivery.

---

# Hugo

The site uses **Hugo**, one of the fastest static site generators available.

Hugo is written in **Go**, and that is one of the reasons this project can keep the build system simple and extremely fast.

Go's philosophy fits this project particularly well:

- Fast compilation
- Low runtime overhead
- Excellent concurrency support
- Small, portable binaries
- Simple deployment
- Strong standard library
- Predictable performance

Instead of building a large server-side application just to render ordinary pages, Hugo can generate the complete website before deployment.

That means Cloudflare can serve already-generated HTML, CSS, JavaScript, images, and other assets directly from the edge.

## Why Go Is a Great Fit

Hugo demonstrates one of Go's strongest characteristics: **doing a lot of work with a relatively small and simple toolchain**.

For a large content website, build performance matters.

As the number of:

- posts
- pages
- images
- categories
- tags
- templates
- translations

increases, the build system needs to remain predictable.

Hugo's Go-based architecture is particularly well suited to this model.

Go also produces standalone binaries, making Hugo easy to use in CI/CD environments without requiring a heavy application runtime.

In other words:

> Go keeps the engine fast and Hugo turns that speed into a very efficient publishing workflow.

---

# Hugo Configuration

The project uses **PaperMod** as the Hugo theme.

PaperMod is imported as a Hugo Module rather than being manually copied into the repository.

The project uses Hugo modules through:

```text
go.mod
hugo.toml
```

The Go module is:

```text
github.com/Shahzad55/hugo-cloudflare
```

The Hugo build also enables production-oriented features such as:

- Robots.txt generation
- Git information
- RSS
- JSON output
- Reading time
- Word count
- Breadcrumbs
- Post navigation
- Social sharing
- Code copy buttons
- Hugo Table of Contents
- Minification

---

# Build Script

The production build is intentionally simple:

```bash
#!/usr/bin/env bash

set -euo pipefail

hugo mod get
hugo build --gc --minify
```

The important steps are:

1. Download/update Hugo module dependencies.
2. Run Hugo.
3. Remove unused resources with garbage collection.
4. Minify the generated website.
5. Produce the final site in `public/`.

This keeps the deployment pipeline easy to understand and maintain.

---

# Current Content Structure

Hugo content is organized under:

```text
content/
├── _index.md
└── posts/
    └── welcome-to-bmxbike.md
```

The first published post is:

**Welcome to BMxBike**

The content is Markdown, which makes it easy to maintain through GitHub and easy to migrate or process in the future.

---

# Project Structure

The important project files are organized approximately as follows:

```text
.
├── content/
│   ├── _index.md
│   └── posts/
├── static/
│   └── admin/
│       └── index.html
├── build.sh
├── go.mod
├── hugo.toml
├── wrangler.jsonc
└── worker.js
```

Generated files are placed in:

```text
public/
```

The `public/` directory is the deployment output rather than the primary source of the website.

---

# Wrangler Configuration

The Cloudflare configuration is stored in:

`wrangler.jsonc`

Important settings include:

- Worker name: `hugo-cloudflare`
- Worker entry point: `worker.js`
- Compatibility date: `2026-09-09`
- Static Assets directory: `./public`
- KV binding: `SITE_KV`

This makes the infrastructure configuration version-controlled together with the application.

---

# Deployment Philosophy

The project is designed around a **GitOps-style workflow**.

GitHub contains the desired state of the website.

Cloudflare builds and deploys that state.

This provides several advantages:

### Reproducibility

A deployment can be traced back to a Git commit.

### Automation

A push to `main` can trigger the complete production build.

### Recovery

Previous commits provide a clear history for investigating or reverting changes.

### Scalability

The local development machine is not part of the production serving path.

### Simplicity

There is no traditional VPS, Nginx installation, PHP runtime, or manually maintained web server required for the Hugo website.

---

# Future Roadmap

The current architecture intentionally leaves room for a much larger website.

Planned areas include:

- Full Admin CMS
- Cloudflare Access authentication
- Post management
- Page management
- Categories
- Tags
- Media management
- Site settings
- Search
- Larger content collections
- Better image handling
- Additional Cloudflare edge features
- Automated content workflows
- Performance monitoring
- Advanced caching
- Backup and recovery strategy

The Admin system will eventually provide a friendly interface while GitHub and Hugo remain central to the publishing architecture where appropriate.

---

# Why This Architecture?

The project deliberately combines three technologies with different strengths:

### Hugo + Go

Fast content generation and a simple static publishing model.

### GitHub

Version control, collaboration, history, and the source of truth.

### Cloudflare

Global delivery, Workers, Static Assets, custom domains, edge execution, and infrastructure automation.

Together they provide a modern publishing pipeline:

```text
Content
   ↓
Hugo / Go
   ↓
Static Website
   ↓
GitHub
   ↓
Cloudflare Workers Builds
   ↓
Cloudflare Edge
   ↓
Visitors
```

The goal is not simply to make the website work.

The goal is to build a foundation that can grow from a small Hugo website into a large content platform without replacing the core architecture.

---

## License

This repository is currently maintained by **Shahzad55**.

See the repository configuration for the current license and contribution policy.
