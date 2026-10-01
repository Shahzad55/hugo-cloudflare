# BMxBike — Project Roadmap

This roadmap defines the planned evolution of **BMxBike**, a multilingual Hugo website deployed through GitHub and Cloudflare.

## Architecture

```
PowerShell / Local Development
        ↓
GitHub — Shahzad55/hugo-cloudflare
        ↓
Cloudflare Workers Builds
        ↓
Hugo
        ↓
Cloudflare Workers Static Assets / CDN
        ↓
bmxbike.ir
```

## Roadmap

| Phase | Area | Status | GitHub |
|---|---|---|---|
| 1 | Multilingual foundation & navigation | ⬜ Planned | [#8](https://github.com/Shahzad55/hugo-cloudflare/issues/8) |
| 2 | Search, archives & core UX | ⬜ Planned | [#1](https://github.com/Shahzad55/hugo-cloudflare/issues/1) |
| 3 | SEO, metadata & discoverability | ⬜ Planned | [#2](https://github.com/Shahzad55/hugo-cloudflare/issues/2) |
| 4 | Content architecture & taxonomy | ⬜ Planned | [#3](https://github.com/Shahzad55/hugo-cloudflare/issues/3) |
| 5 | Performance & Cloudflare hardening | ⬜ Planned | [#4](https://github.com/Shahzad55/hugo-cloudflare/issues/4) |
| 6 | Admin, security & access control | ⬜ Planned | [#9](https://github.com/Shahzad55/hugo-cloudflare/issues/9) |
| 7 | CI/CD, testing & release quality | ⬜ Planned | [#10](https://github.com/Shahzad55/hugo-cloudflare/issues/10) |
| 8 | Observability, scale & future capabilities | ⬜ Planned | [#11](https://github.com/Shahzad55/hugo-cloudflare/issues/11) |

## Phase 1 — Multilingual Foundation

- Modernize Hugo language configuration.
- Verify all 7 languages.
- Fix RTL configuration for Persian and Arabic.
- Add localized descriptions.
- Make menus language-aware.
- Verify translation keys and language switching.

**Exit condition:** all languages have correct URLs, navigation and metadata.

## Phase 2 — Core UX

- Add Search page.
- Add Archives page.
- Verify multilingual search and archives.
- Verify 404 behavior.
- Verify RSS, breadcrumbs, post navigation and mobile navigation.

**Exit condition:** every core navigation item works correctly.

## Phase 3 — SEO

- Canonical URLs.
- hreflang/alternate language links.
- Sitemap and robots.txt.
- Open Graph.
- Twitter/X Cards.
- JSON-LD.
- Image SEO.
- Metadata rules for pages, posts, categories and tags.

**Exit condition:** production pages have coherent multilingual SEO metadata.

## Phase 4 — Content Architecture

Planned content areas:

- `posts/`
- `news/`
- `guides/`
- `reviews/`
- `bikes/`
- `brands/`

Define:

- URL policy
- taxonomy
- front matter
- translations
- authorship
- dates/updates
- images
- related content
- templates

**Exit condition:** content can scale without repeatedly changing the information architecture.

## Phase 5 — Performance & Cloudflare

- Hugo build optimization.
- Module caching.
- Static asset caching.
- HTML/CSS/JS/image optimization.
- Responsive images.
- Cache headers.
- Performance budgets.
- Core Web Vitals/Lighthouse checks.
- Keep Worker runtime logic minimal.
- Use KV only when a real runtime requirement exists.

**Exit condition:** performance is measurable and the Cloudflare architecture remains simple.

## Phase 6 — Admin & Security

- Isolate `/admin/`.
- Review `admin.bmxbike.ir` routing.
- Fix admin asset routing.
- Add Cloudflare Access before sensitive functionality.
- Define authentication and authorization.
- Review CSP and security headers.
- Define audit/logging requirements.
- Decide whether the admin is read-only, editorial or a full CMS.

**Exit condition:** admin functionality is safely isolated and authenticated before sensitive operations.

## Phase 7 — CI/CD & Quality

- GitHub Actions Hugo build.
- Dependency verification.
- Content validation.
- Multilingual validation.
- Link/route checks.
- Generated-output checks.
- Deployment verification.
- Preview/staging workflow.
- Release/version strategy.
- Rollback procedure.

**Exit condition:** pull requests and production releases are repeatable and verifiable.

## Phase 8 — Observability & Scale

- Traffic monitoring.
- Error monitoring.
- Cloudflare runtime monitoring.
- Build-time and output-size tracking.
- Growth thresholds.
- Backup/recovery strategy.
- Search scalability evaluation.
- API/integration evaluation when justified.
- Architecture decision records.
- CMS evaluation only when editorial requirements justify it.

**Exit condition:** BMxBike has clear scaling triggers without unnecessary infrastructure.

## Current Priorities

The recommended implementation order is:

1. **Phase 1 — Multilingual foundation**
2. **Phase 2 — Search and archives**
3. **Phase 3 — SEO**
4. **Phase 4 — Content architecture**
5. **Phase 5 — Performance**
6. **Phase 6 — Admin/security**
7. **Phase 7 — CI/CD**
8. **Phase 8 — Observability and scale**

The project should avoid adding a database, external CMS or other runtime infrastructure until the actual content and editorial requirements justify it.
