# src/i18n/AGENTS.md

All user-visible UI strings live in `ui.ts`. There is no external i18n library — just a typed object keyed by locale.

---

## Structure

`ui.ts` exports a single `ui` constant with two keys: `en` and `pt`. Every component that renders copy receives `pageLang: "en" | "pt"` as a prop and reads from `ui[pageLang]`.

The `Locale` type is exported and used throughout for prop typing.

---

## Adding a string

1. Add the key and EN value under `ui.en`
2. Add the same key and PT value under `ui.pt`
3. Use it in the component via `uiText.myKey` (where `uiText = ui[pageLang]`)

Never add a key to only one locale — TypeScript will catch it at `pnpm check` since both objects must satisfy the same inferred shape, but it's easier to do it right immediately.

---

## String inventory (by concern)

| Key group | Used in |
|---|---|
| `siteDescription`, `homeDescription` | `BaseLayout` meta, `index.astro` |
| `whoami`, `focus` | `index.astro` hero section |
| `entry`, `entries`, `emptyPosts` | `index.astro` post list ruler |
| `updated`, `minRead` | `BlogPost` prompt-line meta |
| `search*` | `SearchPalette` |
| `toggleTheme`, `switchLanguage`, `pageLanguage`, `copyPageUrl`, `readingProgress` | `ThemeToggle`, `LangToggle`, `Footer` |
| `rssTitle`, `rssHref` | `BaseLayout` RSS link tag |
| `notFound*` | `404.astro` |
| `series`, `previous`, `next` | `BlogPost` series navigator |
