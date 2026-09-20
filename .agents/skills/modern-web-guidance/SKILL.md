---
name: modern-web-guidance
description: Inject web platform expertise, best practices, and modern API patterns (View Transitions, Popover API, CSS Anchor Positioning, container queries, @starting-style, text-wrap: balance/pretty, inert, dialog, field-sizing). Use when implementing modern, high-performance, accessible web UI components without unnecessary JS bloat.
---

# Modern Web Guidance

Curated guidance from the Google Chrome and Microsoft Edge teams for building modern, high-performance, and accessible web interfaces using native web platform features.

## Core Directives

1. **Native Over Bloat**: Favor native browser capabilities over external JavaScript libraries for common UI patterns (dialogs, popovers, tooltips, view transitions, form sizing).
2. **Smooth Visual States**:
   - **View Transitions**: Use `document.startViewTransition()` or cross-document View Transitions for state changes, navigation, and item reordering instead of heavy JS layout animation libraries.
   - **Entry & Exit Animations**: Use `@starting-style` and `transition-behavior: allow-discrete` to animate elements transitioning to/from `display: none` or top-layer dialogs.
   - **Modern Sizing**: Use `interpolate-size: allow-keywords` to enable smooth CSS transitions between `height: 0` and `height: auto`.
3. **Layout & Typography**:
   - **Container Queries**: Use `@container` (size and style queries) instead of `@media` when building modular, responsive components that adapt to their container width.
   - **Modern Color Spaces**: Use `oklch()` and `color-mix()` for perceptually uniform palettes, tinting, and dark/light themes.
   - **Typographic Polish**: Apply `text-wrap: balance` on headlines to prevent single-word orphans; apply `text-wrap: pretty` on body copy. Use `text-box-trim` where supported.
   - **Subgrid**: Use `grid-template-columns: subgrid` to align card items across irregular grid rows without breaking semantic markup.
4. **Native UI & Positioning**:
   - **Popovers & Menus**: Use the native `popover` attribute and `popovertarget` for light-dismiss dropdowns, tooltips, and flyouts without third-party libraries.
   - **Anchor Positioning**: Use CSS Anchor Positioning (`position-anchor`, `anchor()`, `position-try-fallbacks`) for anchoring tooltips, popovers, and context menus.
   - **Dialogs**: Use `<dialog>` with `.showModal()` for accessible modals with built-in backdrop styling (`::backdrop`) and focus-trapping.
5. **Forms & Accessibility**:
   - **Auto-sizing Inputs**: Use `field-sizing: content` on `<textarea>` and `<input>` to auto-expand inputs with user content.
   - **Validation Feedback**: Use `:user-invalid` and `:user-valid` so validation feedback only appears *after* the user interacts with the input, avoiding jarring initial error states.
   - **Accent Color**: Use `accent-color` to brand native checkboxes, radio buttons, and sliders.
   - **Inert**: Use `inert` to cleanly disable interaction and hide background sections from assistive tech when overlays are open.
