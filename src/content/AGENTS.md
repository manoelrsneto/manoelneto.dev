# src/content/AGENTS.md

Content collection for blog posts. Astro validates every MDX file against the schema in `config.ts` at build time — a missing required field or a wrong type is a build error, not a runtime error.

---

## Schema

Defined in `config.ts`. All fields:

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | ✓ | |
| `description` | string | ✓ | |
| `pubDate` | date | ✓ | `YYYY-MM-DD`; coerced from string |
| `lang` | `"en"` \| `"pt"` | ✓ | Defaults to `"en"` if omitted |
| `updatedDate` | date | — | Shown in post header when set |
| `tags` | string[] | — | Displayed as prompt-line branch + dirty markers |
| `draft` | boolean | — | Defaults to `false`; drafts are excluded from all listings |
| `translationKey` | string | — | Same value in EN + PT counterparts links them for the language toggle |
| `series` | string | — | Slug of the series |
| `seriesTitle` | string | — | Display name shown in the series navigator |
| `seriesOrder` | number (int, ≥1) | — | Position within the series |

---

## File layout

```
src/content/posts/
  my-post.mdx          → /blog/my-post
  pt/my-post.mdx       → /blog/pt/my-post
```

The `lang` field in the frontmatter is the authoritative language marker — Astro uses it to filter posts per locale. The `pt/` directory is convention, not enforcement. A post in `posts/` with `lang: pt` would appear in the PT listing, and vice versa. Keep the directory structure consistent with the `lang` value.

---

## Bilingual posts

To link an EN post and its PT counterpart so the language toggle on the post page works:

1. Both files must have the same `translationKey` value
2. Both must have `lang` set correctly
3. The slug route is derived from the file path — `pt/hello-world.mdx` → slug `pt/hello-world`

If `translationKey` is missing or mismatched, the language toggle on the post page is hidden (no broken link).

---

## Series

A series groups posts for sequential reading. The series navigator (previous/next + full list) renders on the post page when `series` is set.

- `series`: arbitrary slug, shared by all posts in the group and same `lang`
- `seriesTitle`: display name — only needs to be set on one post per series (the page reads it from the first entry if absent)
- `seriesOrder`: sort key; posts without it fall after all ordered posts

---

## Reading time

Computed in `src/pages/blog/[...slug].astro` from the raw MDX body — word count ÷ 200, minimum 1 minute. It is not a frontmatter field.
