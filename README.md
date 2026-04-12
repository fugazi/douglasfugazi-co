# Douglas Fugazi Portfolio

Personal portfolio built with Astro for a Senior QA Automation Engineer profile.

## Stack

- Astro 5
- Tailwind CSS + daisyUI
- pnpm

## Local development

1. Install dependencies:

```bash
pnpm install
```

2. Start dev server:

```bash
pnpm dev
```

3. Build production:

```bash
pnpm build
```

4. Preview production build:

```bash
pnpm preview
```

## Project structure

- `src/pages`: public routes (`/`, `/about`, `/projects`, `/talks`, `/music`, `/contact`)
- `src/components/ui`: reusable UI components
- `src/data`: content datasets used by route pages
- `src/settings.ts`: profile, social links, template config and SEO defaults

## Notes

- Keep `template.base` in `src/settings.ts` empty for root deployments, or set it for subpath deployments.

## Accessibility and testability standards

- WCAG baseline implemented in the UI layer:
	- Semantic landmarks (`header`, `main`, `footer`) and a skip link to main content.
	- Interactive controls with accessible names (`aria-label`) where needed (e.g. icon-only controls).
	- Keyboard support for custom tab interfaces (`ArrowLeft`, `ArrowRight`, `Home`, `End`).
	- Motion fallback with `prefers-reduced-motion` on animated sections.

- Playwright locator convention:
	- Use `data-ui` as the primary stable selector for E2E/UI tests.
	- Naming format: `area-element-purpose` in kebab-case.
	- Examples: `data-ui="projects-tab-ai-powered-testing"`, `data-ui="contact-email-cta"`, `data-ui="music-spotify-embed"`.
	- Keep `data-ui` values stable over time; avoid coupling tests to visual class names.
