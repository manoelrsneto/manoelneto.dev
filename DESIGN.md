---
version: alpha
name: manoelneto.dev
description: >
  A terminal-aesthetic personal blog. The visual language is rooted in
  Catppuccin Mocha (dark) and Catppuccin Latte (light), with JetBrains Mono
  as the primary UI typeface and Starship prompt patterns as the core
  interaction metaphor.
colors:
  # Catppuccin Mocha — dark theme (primary)
  primary: "#cba6f7"
  background: "#1e1e2e"
  background-alt: "#181825"
  background-deep: "#11111b"
  surface: "#313244"
  border: "#45475a"
  muted: "#6c7086"
  text: "#cdd6f4"
  text-dim: "#a6adc8"
  accent: "#cba6f7"
  blue: "#89b4fa"
  green: "#a6e3a1"
  red: "#f38ba8"
  yellow: "#f9e2af"
  teal: "#94e2d5"
  peach: "#fab387"
typography:
  ui:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: "700"
    lineHeight: 1.5
  ui-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: "700"
    lineHeight: 1
    letterSpacing: 0.04em
  prose:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 1.7
  heading-1:
    fontFamily: JetBrains Mono
    fontSize: 36px
    fontWeight: "700"
    lineHeight: 1.15
  heading-2:
    fontFamily: JetBrains Mono
    fontSize: 24px
    fontWeight: "600"
    lineHeight: 1.3
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  content-max: 672px
components:
  status-segment:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.ui-sm}"
    rounded: "{rounded.full}"
    padding: 4px 10px
  status-segment-mode:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.background}"
    typography: "{typography.ui-sm}"
    rounded: "{rounded.full}"
  status-segment-muted:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
    typography: "{typography.ui-sm}"
  prompt-cursor:
    textColor: "{colors.blue}"
  prompt-cursor-hover:
    textColor: "{colors.accent}"
  prompt-directory:
    textColor: "{colors.teal}"
  prompt-branch:
    textColor: "{colors.accent}"
  prompt-dirty:
    textColor: "{colors.yellow}"
  prompt-date:
    textColor: "{colors.muted}"
  post-card:
    backgroundColor: transparent
    rounded: "{rounded.md}"
    padding: 16px 12px
  post-card-hover:
    backgroundColor: "{colors.surface}"
  editor-ruler:
    textColor: "{colors.blue}"
    backgroundColor: "{colors.background-alt}"
  tag:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
    rounded: "{rounded.full}"
    padding: 4px 10px
  tag-border:
    backgroundColor: "{colors.border}"
  error-state:
    textColor: "{colors.red}"
  success-state:
    textColor: "{colors.green}"
  warning-state:
    textColor: "{colors.peach}"
  nav-brand:
    backgroundColor: "{colors.background-deep}"
    textColor: "{colors.text}"
---

## Overview

The aesthetic is **terminal emulator as reading environment**. Every UI element borrows from the grammar of a modern terminal setup — Starship prompts, Neovim statuslines, Helix buffer bars — but applied to a reading-first blog.

The result feels like opening a file in a well-configured editor: monospace everywhere, line numbers on long content, status bars at the top and bottom, and a prompt that tells you where you are before you start reading.

The site runs two Catppuccin flavors: **Mocha** (dark) as the primary expression and **Latte** (light) as the alternate. Both use identical structural tokens; only the color values change. Theme switches are instant, stored in `localStorage`, and respect `prefers-color-scheme` on first visit.

**Personality:** calm, dense, precise. Not playful, not corporate.

## Colors

Colors come exclusively from the Catppuccin palette — a pastel theme designed for readability and low eye strain over long reading sessions.

### Dark (Catppuccin Mocha)

- **Background (#1e1e2e):** Deep navy base for the page canvas.
- **Background-alt (#181825):** Slightly darker mantle used for the header/footer chrome.
- **Surface (#313244):** Elevated surface for interactive cards and hover states.
- **Border (#45475a):** Subtle separator between regions.
- **Muted (#6c7086):** Overlay text — timestamps, line numbers, secondary labels.
- **Text (#cdd6f4):** Main body text, lavender-tinted white.
- **Text-dim (#a6adc8):** Descriptions, captions, supporting copy.
- **Accent (#cba6f7):** Mauve — used for interactive elements, links, and the post title on hover.
- **Blue (#89b4fa):** The `❯` prompt cursor, dates, and active highlights.
- **Teal (#94e2d5):** Directory segment in prompt lines (`~/blog`).
- **Accent/Branch (#cba6f7):** Git-branch segment in prompt lines (`on  tag`).
- **Yellow (#f9e2af):** Dirty-state markers in prompt lines (`[+extra-tag]`).
- **Red (#f38ba8):** File icons and error states.
- **Green (#a6e3a1):** Success states.

### Light (Catppuccin Latte)

Structurally identical to Mocha. All roles map 1:1. Applied via the `.dark` class toggling on `<html>` — the CSS custom properties are redeclared inside `.dark { }`. Latte values:

- background: `#eff1f5` · background-alt: `#e6e9ef` · surface: `#ccd0da`
- border: `#bcc0cc` · muted: `#8c8fa1` · text: `#4c4f69` · text-dim: `#5c5f77`
- accent: `#8839ef` · blue: `#1e66f5` · green: `#40a02b` · red: `#d20f39` · teal: `#179299`

## Typography

Two typefaces only. No exceptions.

- **JetBrains Mono** — used for every piece of UI chrome: headings, navigation, prompts, labels, status bars, tags, dates, post titles, filenames. This is the default font for the site.
- **Inter** — used exclusively for prose inside blog posts. It provides a reading experience that contrasts with the mono chrome, signaling a shift from "interface" to "content".

The `ui-sm` scale (`12px / 700 / 0.04em tracking`) is the workhorse: status bar segments, tags, prompt metadata, the editor ruler. Uppercase tracking on labels where it aids scannability (e.g., `POSTS`, `POST`, `NORMAL`).

Code blocks use JetBrains Mono at `14px / 400` with Catppuccin syntax highlighting (Mocha in dark mode, Latte in light mode via Shiki dual themes).

## Layout & Spacing

Single-column layout. The content container is capped at `672px` (`max-w-2xl`) and centered with `24px` horizontal padding. No sidebars, no grids, no distractions.

The 8px grid governs all spacing. Common increments: `4px` (tight gaps inside components), `8px` (component padding), `16px` (between elements), `24px` (section breathing room), `40px` (major section separation).

Posts are separated by a single `1px` hairline border at 55% opacity — just enough to distinguish entries without drawing the eye.

## Components

### Status Segment

The fundamental UI atom. A pill-shaped badge built from `status-group` (the outer border wrapper) containing one or more `status-segment` spans. Segments share borders between them, creating a segmented pill look identical to a terminal statusline.

Used in: the footer statusbar (NORMAL mode, language, filename, progress, encoding, year), post tags, and the header breadcrumb.

Variants: `status-mode` (blue background, inverted text — for the mode indicator), `status-muted` (overlay-colored text — for secondary info).

### Prompt Line

The signature component, inspired by Starship. A single line of context that tells the reader where they are before showing them what's there. Structure:

```
[directory]  on  [branch]  [dirty]                [meta]  [date]
```

- **Directory**: `~/blog` in teal, with a folder Nerd Font glyph prefix.
- **Branch**: `on  {first-tag}` in accent/mauve, with a git-branch Nerd Font glyph. Only rendered when the post has tags.
- **Dirty markers**: `[+tag2 +tag3]` in yellow when a post has more than one tag.
- **Meta + Date**: pushed to the right with `ml-auto`, in muted color.

Used in: `PostCard.astro` (index page listing) and `BlogPost.astro` (post header).

### Cursor Line

The line immediately below the prompt line. Starts with `❯` in blue (accent on hover) followed by the filename or command:

- In `PostCard`: `❯ 󰈙 hello-world.mdx`
- In `BlogPost` header: `❯ 󰈙 cat hello-world.mdx`

The file icon glyph (`󰈙`, `nf-md-file`) is rendered via the Nerd Fonts webfont.

### Editor Ruler

A full-width horizontal divider with centered label text. Used to delimit sections:

```
──────── POSTS  1 entry · sorted desc ────────
──────── POST  2 min read ────────
```

The label uses `ui-sm` typography in blue, small-caps tracked. Flanking lines are `1px solid border-color`.

### Footer Statusbar

A fixed-bottom bar mimicking a Neovim/Helix statusline. Left side: mode segment + language + buffer name. Right side: filetype/location + reading progress + rss + encoding + year. Fully non-interactive except for the buffer name (jumps to top) and rss link.

## Do's and Don'ts

**Do:**
- Use JetBrains Mono for all UI chrome, labels, and interactive text.
- Keep the prompt-line pattern (directory → branch → meta → date) consistent across all list and detail views.
- Use Catppuccin token names (teal, accent/mauve, blue, yellow) semantically — teal for location, mauve for branch/tags, blue for actions/cursor, yellow for warnings/extras.
- Add Nerd Font glyphs via the `status-icon` CSS class, which sets the correct font stack.
- Respect the 8px grid.

**Intentional WCAG exceptions:**
- `muted` (`#6c7086`) on `surface` (`#313244`) has contrast ratio ~2.6:1, below WCAG AA. This is deliberate: muted text (timestamps, line numbers, tags, secondary labels) signals low information hierarchy. It is never used for actionable or critical content.

**Don't:**
- Introduce new typefaces. The Inter/JetBrains Mono pairing is intentional and complete.
- Use colors outside the Catppuccin palette. If a new semantic color is needed, map it to an existing Catppuccin role.
- Add decorative elements (gradients, shadows, illustrations). The aesthetic is brutally flat and monospace-first.
- Break the single-column layout. No sidebars, no floating elements outside the content container.
- Use `status-mode` (blue background pill) for anything other than the mode indicator in the footer. It's a reserved visual affordance.
