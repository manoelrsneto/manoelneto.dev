# src/pages/AGENTS.md

Astro pages. All routes are statically generated — no SSR. The page structure mirrors the URL structure exactly.

---

## Route map

| File | URL | Notes |
|---|---|---|
| `index.astro` | `/` | EN home — lists EN posts sorted by `pubDate` desc |
| `pt/index.astro` | `/pt` | PT home — same, filtered to `lang: pt` posts |
| `blog/[...slug].astro` | `/blog/{slug}` | Post page — handles both EN (`hello-world`) and PT (`pt/hello-world`) slugs |
| `404.astro` | `/404` | EN not-found page |
| `pt/404.astro` | `/pt/404` | PT not-found page |
| `rss.xml.ts` | `/rss.xml` | EN RSS feed |
| `pt/rss.xml.ts` | `/pt/rss.xml` | PT RSS feed |

---

## `blog/[...slug].astro`

The only dynamic route. `getStaticPaths` runs at build time and generates one path per non-draft post regardless of language. For each post it:

1. Looks up whether a counterpart exists (same `translationKey`, different `lang`)
2. Passes `translationSlug` as a prop so `BlogPost` can wire the language toggle

Reading time is computed here from the raw MDX body (word count ÷ 200) and passed to `BlogPost` as `readingMinutes`.

Series info is also assembled here — all posts with the same `series` slug and same `lang` are sorted by `seriesOrder` and passed as a structured object.

---

## Home pages

Both `index.astro` and `pt/index.astro` are intentionally near-identical. They differ only in the `getCollection` filter (`lang !== "pt"` vs `lang === "pt"`) and the `uiText` locale. They share no logic file — the duplication is small and keeps each page self-contained.

The `localeSwitchHref` passed to `BaseLayout` from home pages is a static string (`"/pt"` or `"/"`), not post-specific. On post pages it comes from `translationSlug`.
