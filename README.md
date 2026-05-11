# manoelneto.dev

Personal blog built with Astro, MDX, Tailwind CSS, and Catppuccin.

## Stack

- Astro
- MDX content collections
- Tailwind CSS
- Pagefind for static search
- D2 for static diagrams

## Development

Requirements:

- Node.js
- pnpm

Install dependencies:

```bash
pnpm install
```

Start the dev server:

```bash
pnpm dev
```

Build the site:

```bash
pnpm build
```

This runs the Astro build and then generates the Pagefind search index inside `dist/pagefind`.

Validate formatting, linting, and Astro diagnostics:

```bash
pnpm check
```

## Writing posts

Posts live in:

- `src/content/posts/*.mdx`
- `src/content/posts/pt/*.mdx`

The content collection schema for posts is:

```yaml
title: string
description: string
pubDate: date
updatedDate?: date
tags?: string[]
draft?: boolean
lang?: en | pt
translationKey?: string
series?: string
seriesTitle?: string
seriesOrder?: number
```

Minimal example:

```mdx
---
title: "Hello, world"
description: "Why I started writing here."
pubDate: 2026-03-23
tags: ["meta", "personal"]
lang: en
translationKey: hello-world
---

Post content goes here.
```

### Translations

Translations are file-based.

- English posts live in `src/content/posts/`
- Portuguese posts live in `src/content/posts/pt/`
- Translated variants are linked with the same `translationKey`

Example:

```text
src/content/posts/hello-world.mdx
src/content/posts/pt/hello-world.mdx
```

Both files should share the same `translationKey`, but each one can have its own:

- `title`
- `description`
- body content
- tags

The site behavior is:

- `/` shows English posts
- `/pt` shows Portuguese posts
- post pages expose a language switch when a translated variant exists
- RSS is also split by language:
  - `/rss.xml`
  - `/pt/rss.xml`

### Series

Posts can belong to a series.

Use these frontmatter fields:

```yaml
series: testing-at-scale
seriesTitle: Testing at Scale
seriesOrder: 2
```

Rules:

- `series` is the internal key shared by all posts in the series
- `seriesTitle` is the human-readable title shown in the UI
- `seriesOrder` controls ordering inside the series
- series navigation is resolved per language, so EN posts only link to EN posts and PT posts only link to PT posts

If you want a bilingual series, keep the same:

- `series`
- `seriesTitle`
- `seriesOrder`

across both language variants.

### Drafts

Use `draft: true` to keep a post out of the generated site.

### Notes

- Commands and terminal-like labels in the UI are intentionally not localized.
- Diagrams should be committed as rendered SVG assets, not generated in the browser.

## Diagrams

Source diagrams live in `diagrams/`.

Rendered SVG files live in `public/diagrams/`.

This project expects the D2 CLI to be installed locally. Render all diagrams with:

```bash
pnpm diagrams:render
```

By default, diagrams are rendered with:

- light theme: `1` (`Neutral Grey`)
- dark theme: `200` (`Dark Mauve`)

You can override them when rendering:

```bash
D2_THEME=0 D2_DARK_THEME=200 pnpm diagrams:render
```

Render a single file manually:

```bash
pnpm diagram --theme 1 --dark-theme 200 diagrams/example.d2 public/diagrams/example.svg
```

In posts, reference diagrams like any other static asset:

```mdx
![Diagram](/diagrams/example.svg)
```

## Site features

- bilingual home and posts (`en` / `pt`)
- static search with Pagefind
- RSS feeds per language
- sitemap generation
- Open Graph fallback image
- D2 diagrams rendered to static SVG
