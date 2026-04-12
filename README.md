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
