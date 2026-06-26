# src/components/AGENTS.md

UI components. All are Astro components — no client-side framework, no hydration by default. Inline `<script>` blocks are used only when absolutely necessary (theme toggle, language toggle preference, footer interactions).

See [`DESIGN.md`](../../DESIGN.md) §Components for the visual spec of each component's appearance.

---

## Component inventory

| Component | Purpose | Used in |
|---|---|---|
| `Header` | Top navigation bar — site logo, search trigger, language toggle, theme toggle | `BaseLayout` |
| `Footer` | Fixed statusbar — mode pill, buffer name, filetype, reading progress, encoding, year | `BaseLayout` |
| `PostCard` | Single post entry in the listing — prompt-line header, cursor+filename, title comment, description | `index.astro`, `pt/index.astro` |
| `LangToggle` | EN/PT switch link — saves chosen lang to `localStorage` on click | `Header` |
| `ThemeToggle` | Light/dark toggle — saves chosen theme to `localStorage` | `Header` |
| `SearchPalette` | Full-text search modal (Pagefind) — keyboard-driven, opens on `/` or search button | `BaseLayout` |
| `CommandPalette` | Quick-action palette — opens on `⌘K` | `BaseLayout` |

---

## Props conventions

Every component that renders locale-aware copy receives `pageLang: "en" | "pt"` and looks up strings via `ui[pageLang]` from `src/i18n/ui.ts`. Never hardcode user-visible strings in component markup.

Components that need to know if a translation exists receive `localeSwitchHref?: string`. When it's `undefined`, the language toggle is hidden (Header) or rendered as a non-link (Footer).

---

## Footer

The most complex component. It has four independent inline scripts that each own one concern:

| Script | What it does |
|---|---|
| Mode pill | Watches `command-open` class on `<body>`, switches between NORMAL and COMMAND |
| Lang pill | Reads `lang` attribute from `<html>` at page load and displays it |
| Buffer pill | Copies current URL to clipboard on click; shows "yanked" briefly |
| Progress pill | Tracks scroll position of `#post-root` or `<main>`, updates percentage |

The footer reads two optional build-time env vars injected by CI: `PUBLIC_SITE_SHA` (shows short hash) and `PUBLIC_SITE_BRANCH` (shows branch name). Both are absent in local dev and hidden when undefined.

---

## PostCard

Implements the Starship prompt pattern for post listings. Layout (top to bottom):

1. **Prompt context line** — `~/blog` (teal) · `on  {tag}` (mauve, first tag only) · `[+extras]` (yellow, remaining tags) · date (muted, right-aligned)
2. **Cursor line** — `❯` (blue→accent on hover) · file icon · `filename.mdx`
3. **Title comment** — `# {title}` in muted overlay
4. **Description** — prose text in subtext color

The entire card is a single `<a>` — no nested interactive elements. Hover state adds a surface background and border.

---

## Adding a new component

1. Create `src/components/MyComponent.astro`
2. If it renders copy, add `pageLang` prop and source strings from `src/i18n/ui.ts`
3. If it introduces new visual patterns, check `DESIGN.md` §Do's and Don'ts first
4. Register any new CSS primitives in `src/styles/global.css` under `@layer components`
