# AGENTS.md — manoelneto.dev

Personal blog built with Astro. Static site — no server, no database. Every page is pre-rendered at build time. Deployed to Cloudflare Workers Assets automatically on push to `main`.

The visual identity is documented in [`DESIGN.md`](DESIGN.md) — read that first if you are touching UI, colors, or components.

---

## What this is

A bilingual (EN/PT) blog with a terminal/editor aesthetic. The EN version lives at `/`, the PT version at `/pt`. Posts are MDX files in `src/content/posts/`. The site has a command palette, a full-text search index (Pagefind), and a statusbar footer that mimics a Neovim/Helix statusline.

There are no users, no auth, no API routes, no dynamic rendering. The entire surface is `src/`.

---

## Commands

| Task | Command |
|---|---|
| Start dev server | `pnpm dev` |
| Production build | `pnpm build` |
| Type-check + lint | `pnpm check` |
| Preview built site | `pnpm preview` |
| Lint design system | `npx --registry https://registry.npmjs.org @google/design.md lint DESIGN.md` |

> `pnpm check` runs Biome (lint/format), Prettier (Astro files), and `astro check` (TS types). Run before committing.

> `pnpm build` runs `astro build` then `pagefind --site dist`. Pagefind must run after Astro — it indexes the HTML output.

---

## Project map

```
src/
  content/
    posts/            EN posts (.mdx)
    posts/pt/         PT posts (.mdx)
    config.ts         Content collection schema — source of truth for post fields
  components/         Astro UI components (no framework, no hydration)
  layouts/
    BaseLayout        HTML shell: SEO tags, theme + lang detection scripts, fonts
    BlogPost          Post page: prompt-line header, content, back link, lightbox
  pages/
    index.astro       EN home — fetches and sorts EN posts, renders PostCard list
    pt/index.astro    PT home — same, for PT posts
    blog/[...slug]    Post page — slug routes both EN and PT posts
  i18n/
    ui.ts             All UI strings keyed by locale. Single source of truth for copy.
  styles/
    global.css        CSS custom properties (Catppuccin tokens), Tailwind @layer components

diagrams/             D2 source files (.d2) — version-controlled diagram definitions
public/
  diagrams/           Rendered SVGs — committed alongside their .d2 source
  og-default.svg      Default OG image
  favicon.svg

DESIGN.md             Visual design system spec — colors, typography, components, do's/don'ts
wrangler.toml         Cloudflare Workers Assets config — name, compatibility date, assets dir
.github/workflows/
  deploy.yml          CI: validate job (check + build) on every push/PR
```

---

## Content model

Defined in `src/content/config.ts`. All fields are validated at build time — a missing required field is a build error.

| Field | Required | Purpose |
|---|---|---|
| `title` | ✓ | Displayed in post header h1, page title, OG tags, search results |
| `description` | ✓ | Post card body, meta description, OG description |
| `pubDate` | ✓ | Sort order, displayed in prompt-line header |
| `lang` | ✓ | `en` or `pt` — used to filter posts per locale |
| `translationKey` | — | Same value in EN + PT counterparts — wires the language toggle on post pages |
| `updatedDate` | — | Shown as `~YYYY-MM-DD` in the prompt-line meta when set |
| `tags` | — | First tag becomes the "branch" segment in the prompt line; extras become dirty markers |
| `draft` | — | `true` excludes from listing on all envs |
| `series` | — | Slug of the series this post belongs to |
| `seriesTitle` | — | Display name of the series |
| `seriesOrder` | — | Position within the series (1-indexed) |

---

## i18n

All UI copy lives in `src/i18n/ui.ts`, keyed by locale (`en` / `pt`). Components never contain hardcoded strings — they receive the `pageLang` prop and look up via the `ui` map.

The `lang` prop flows: `page → BaseLayout → Header/Footer/SearchPalette`. Adding a new visible string means adding it to both `en` and `pt` keys in `ui.ts` before using it in a component.

Post routing uses Astro's `getCollection` filtered by `data.lang`. EN posts live at `/blog/{slug}`, PT posts at `/blog/pt/{slug}`. The `[...slug]` page handles both.

Language auto-detection runs on the first visit to `/`: if `navigator.language` starts with `pt` and no `lang-pref` is stored in `localStorage`, the user is redirected to `/pt`. Manual language switches (via `LangToggle`) write `lang-pref` to `localStorage` to suppress future auto-redirects.

---

## Diagrams (D2)

D2 source files live in `diagrams/`. Rendered SVGs go to `public/diagrams/` and are committed. Both are version-controlled — the `.d2` is the source, the `.svg` is the build artifact committed for simplicity (no D2 CLI on Cloudflare CI).

To update a diagram: edit the `.d2`, re-render locally (`d2 diagrams/foo.d2 public/diagrams/foo.svg`), commit both files.

---

## Deployment

Push to `main` → Cloudflare CI picks it up automatically, runs `pnpm build`, then deploys via `wrangler deploy` (Workers Assets). No manual step needed.

GitHub Actions runs only the `validate` job (check + build) — it does not deploy. Its purpose is to catch type errors and lint failures on PRs before merge.

The build produces a fully static `dist/` with an embedded Pagefind search index. Cloudflare serves the assets directly — no Worker script, no edge functions.

---

## Common tasks

| Task | Files to read |
|---|---|
| **Add a new post** | `src/content/config.ts` (schema) → `src/content/posts/hello-world.mdx` (example) |
| **Add a bilingual post** | Above + `src/content/posts/pt/hello-world.mdx` (PT counterpart + `translationKey`) |
| **Add a diagram** | `diagrams/blog-pipeline.d2` (example) → `src/content/posts/hello-world.mdx` (how to embed) |
| **Change UI copy** | `src/i18n/ui.ts` — both `en` and `pt` keys |
| **Change post card layout** | `src/components/PostCard.astro` → `DESIGN.md` §Components (prompt-line pattern) |
| **Change post page header** | `src/layouts/BlogPost.astro` → `DESIGN.md` §Components |
| **Change status bar footer** | `src/components/Footer.astro` → `DESIGN.md` §Components (status segment) |
| **Add a new UI component** | `src/components/` → `src/styles/global.css` (Tailwind @layer) → `DESIGN.md` §Do's and Don'ts |
| **Change colors or tokens** | `src/styles/global.css` (CSS vars) → `DESIGN.md` §Colors |
| **Debug search** | `pnpm build` first — Pagefind index only exists in `dist/`, not in `pnpm dev` |
| **Debug language toggle** | `src/components/LangToggle.astro` (saves pref) → `src/layouts/BaseLayout.astro` (reads pref + redirects) |
| **Change build or deploy config** | `wrangler.toml` (asset dir, compatibility) → `.github/workflows/deploy.yml` (CI steps) |

---

## AGENTS.md index

| File | What it covers |
|---|---|
| [`src/components/AGENTS.md`](src/components/AGENTS.md) | Component inventory, props conventions, Footer scripts, PostCard layout |
| [`src/layouts/AGENTS.md`](src/layouts/AGENTS.md) | BaseLayout (shell, inline scripts, props) · BlogPost (header structure, series, lightbox) |
| [`src/content/AGENTS.md`](src/content/AGENTS.md) | Schema fields, bilingual linking, series, reading time |
| [`src/i18n/AGENTS.md`](src/i18n/AGENTS.md) | How to add strings, string inventory by concern |
| [`src/pages/AGENTS.md`](src/pages/AGENTS.md) | Route map, slug generation, series/translation assembly |
| [`DESIGN.md`](DESIGN.md) | Colors, typography, components, do's and don'ts |

---

## Commit convention

```
type(scope): short description

Co-authored-by: Claude <noreply@anthropic.com>
```

Common types: `feat`, `fix`, `chore`, `docs`, `content`, `style`, `refactor`.
Scope is optional but useful: `ui`, `ci`, `i18n`, `posts`, `deps`.
