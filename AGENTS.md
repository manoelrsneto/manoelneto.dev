# AGENTS.md — manoelneto.dev

Personal blog. Astro static site, Catppuccin/terminal aesthetic, bilingual (EN + PT).
Deployed automatically to Cloudflare Workers on every push to `main`.

---

## Common Tasks

| Task | Command |
|---|---|
| Start dev server | `pnpm dev` |
| Production build | `pnpm build` |
| Type-check + lint | `pnpm check` |
| Preview built site | `pnpm preview` |
| Lint DESIGN.md | `npx --registry https://registry.npmjs.org @google/design.md lint DESIGN.md` |

> `pnpm check` runs Biome (lint/format), Prettier (Astro files), and `astro check` (types). Run before committing.

---

## Project Map

```
src/
  content/
    posts/          EN posts (.mdx)
    posts/pt/       PT posts (.mdx)
    config.ts       Content collection schema
  components/       Astro UI components
  layouts/
    BaseLayout      HTML shell, theme/lang scripts, SEO
    BlogPost        Post page wrapper (header, content, back link)
  pages/
    index.astro     EN home
    pt/index.astro  PT home
    blog/[...slug]  Post pages (both languages)
  i18n/ui.ts        All UI strings for EN and PT
  styles/global.css CSS variables, Tailwind components, design tokens

diagrams/           D2 source files → rendered to public/diagrams/
public/diagrams/    SVG output (committed, not gitignored)
DESIGN.md           Visual design system spec (colors, typography, components)
wrangler.toml       Cloudflare Workers Assets config
```

---

## Content Authoring

### Frontmatter fields

| Field | Required | Notes |
|---|---|---|
| `title` | ✓ | |
| `description` | ✓ | Used in meta tags and post card |
| `pubDate` | ✓ | `YYYY-MM-DD` |
| `lang` | ✓ | `en` or `pt` |
| `translationKey` | — | Same value in EN and PT versions links them for the language toggle |
| `updatedDate` | — | Shows "updated" label in post header |
| `tags` | — | First tag becomes the "branch" in the prompt line |
| `draft` | — | `true` excludes from listing |
| `series` | — | Slug of the series |
| `seriesTitle` | — | Display name of the series |
| `seriesOrder` | — | Position within the series |

### Adding a bilingual post

1. Create `src/content/posts/my-post.mdx` with `lang: en`
2. Create `src/content/posts/pt/my-post.mdx` with `lang: pt`
3. Set the same `translationKey` in both — this wires up the EN/PT toggle on the post page

### Adding a diagram

1. Write the D2 source in `diagrams/my-diagram.d2`
2. Render: `d2 diagrams/my-diagram.d2 public/diagrams/my-diagram.svg`
3. Embed in MDX: `![Alt text](/diagrams/my-diagram.svg)`
4. Commit both the `.d2` source and the `.svg` output

---

## i18n

All UI strings live in `src/i18n/ui.ts`. If you add a new string visible to the user, add it to both `en` and `pt` keys there. The `lang` prop flows from page → layout → component — never hardcode strings in components.

---

## Deployment

Push to `main` → Cloudflare CI builds and deploys automatically.
GitHub Actions runs `pnpm check` + `pnpm build` on every push and PR (validate only, no deploy).
No manual deploy step needed.

---

## Commit Convention

```
type(scope): short description

Co-authored-by: Claude <noreply@anthropic.com>
```

Common types: `feat`, `fix`, `chore`, `docs`, `content`, `style`, `refactor`.
