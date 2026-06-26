# src/layouts/AGENTS.md

Two layouts. Every page uses `BaseLayout`. Post pages use `BlogPost` on top of `BaseLayout`.

---

## BaseLayout

The HTML shell. Renders `<html>`, `<head>`, `<body>`, `Header`, `Footer`, `SearchPalette`, and `CommandPalette`.

**Key responsibilities:**
- SEO tags (title, description, canonical URL, OG/Twitter cards)
- Two inline scripts in `<head>` that run before paint: theme detection (reads `localStorage` + `prefers-color-scheme`) and language detection (redirects `/` → `/pt` on first visit if browser lang is PT)
- `data-page-lang`, `data-home-href`, `data-locale-switch-href` on `<body>` — read by client-side scripts that need routing context without a JS framework
- RSS `<link rel="alternate">` keyed to the current locale

**Props:**

| Prop | Required | Notes |
|---|---|---|
| `title` | ✓ | Raw string, used verbatim in `<title>` |
| `description` | — | Defaults to `ui.en.siteDescription` |
| `ogImage` | — | Defaults to `/og-default.svg` |
| `pageLang` | — | `"en"` (default) or `"pt"` |
| `translationSlug` | — | Full slug of the counterpart post, e.g. `pt/hello-world` |
| `localeSwitchHref` | — | Href rendered in `LangToggle`; when absent, toggle is hidden |

The `<main>` slot has `data-pagefind-body` — Pagefind indexes everything inside it. Do not put content outside `<main>` that should appear in search results.

---

## BlogPost

Post page wrapper. Renders the terminal-prompt header, then the MDX content via `<slot />`, then the series navigator (when applicable), then the back link. Also owns the diagram lightbox.

**Header structure (top to bottom):**
1. Prompt context line — `~/blog` · `on  {tag}` · `[+extras]` · `{readingTime}  {date}` (same pattern as PostCard)
2. Cursor line — `❯ 󰈙 cat {filename}.mdx` (muted, showing the "command" that opened the file)
3. `<h1>` — post title, large monospace
4. Editor ruler — `─── post ───`

**Props:**

| Prop | Required | Notes |
|---|---|---|
| `title` | ✓ | |
| `description` | ✓ | |
| `pubDate` | ✓ | |
| `slug` | ✓ | Used to derive `filename.mdx` shown in the cursor line |
| `readingMinutes` | ✓ | Computed in `[...slug].astro` from word count ÷ 200 |
| `lang` | — | `"en"` (default) or `"pt"` |
| `updatedDate` | — | Shown as `~YYYY-MM-DD` in the prompt meta |
| `tags` | — | First tag → branch segment; rest → dirty markers |
| `translationSlug` | — | Full slug of PT/EN counterpart |
| `series` | — | Object with `title`, `position`, `total`, `items[]`; renders series navigator when set |

**Diagram lightbox:** Any `<img>` inside `.prose` whose `src` contains `/diagrams/` gets a click-to-zoom lightbox automatically. The lightbox logic is an inline script at the bottom of `BlogPost` — it wraps matching images in `<a class="diagram-link">` and manages the `#diagram-lightbox` modal.
