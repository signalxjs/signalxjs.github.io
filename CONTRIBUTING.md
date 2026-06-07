# Contributing to the SignalX docs

Thanks for your interest! This repo holds the source for <https://sigx.dev/> — the documentation site for [SignalX](https://github.com/signalxjs/core). Other SignalX packages (router, store, UI kit, SSG, live-code, monaco-editor) live in their own repositories under [`signalxjs`](https://github.com/signalxjs).

This is **not** a published npm package — it's a static site built with [`@sigx/ssg`](https://www.npmjs.com/package/@sigx/ssg) and deployed to GitHub Pages on every push to `main`.

## Prerequisites

- **Node.js** `^20.19.0` or `>=22.12.0`
- **pnpm** `>=10` (`npm` and `yarn` are not supported)

## Getting started

```bash
git clone https://github.com/signalxjs/docs.git
cd docs
pnpm install
pnpm dev
```

`pnpm dev` starts the Vite dev server at <http://localhost:5173>. Markdown / MDX content under `src/content/` and pages under `src/pages/` reload on save.

## Common tasks

| Task | Command |
|---|---|
| Run dev server | `pnpm dev` |
| Build static site | `pnpm build` |
| Preview built site | `pnpm preview` |
| Typecheck | `pnpm typecheck` |

`pnpm build` runs `ssg build` and writes the static site to `dist/`.

## Where things live

```
src/
  components/   reusable sigx components used in pages and layouts
  content/      MDX content (collections — see ssg.config.ts)
  layouts/      page layouts (default, docs, home, package)
  pages/        file-based routes
  styles/       global CSS / Tailwind entry
  live-code-config.ts   registers @sigx/router, @sigx/daisyui, etc. with
                        the live-code playground
public/         static assets (favicon, OG images, etc.)
ssg.config.ts   site metadata + collection paths
vite.config.ts  Vite plugins (sigx, ssg, monaco, tailwind)
```

## Pre-push checklist

```bash
pnpm typecheck
pnpm build
```

If `pnpm build` succeeds, the GitHub Pages deploy on `main` will succeed too — the deploy workflow runs the same command.

## Pull request guidelines

- **Keep PRs small and focused.** One topic per PR (e.g. one new docs page, one design tweak).
- **Reference an issue** if one exists.
- **Avoid mixing content and infrastructure changes** in the same PR — separate "add the auth tutorial" from "upgrade Tailwind to v5".
- **Don't bump dep versions** in your PR unless that's the point of the PR.

## Writing docs

- Pages live under `src/pages/`. The directory structure is the URL structure.
- Long-form content goes under `src/content/<collection>/` as `.mdx` and is referenced from pages via the SSG content APIs.
- Live code blocks use the `<LiveCodeBlock>` and `<LivePreview>` components from `@sigx/live-code`. Imports inside a snippet are resolved against the modules registered in `src/live-code-config.ts`.
- Internal links should be relative (e.g. `/router/docs/install`) so they survive base-path changes.

## Reporting bugs

- **Docs typo or broken link?** Open an issue with the [bug report template](https://github.com/signalxjs/docs/issues/new?template=bug_report.yml), or just open a PR — typo fixes don't need an issue.
- **Bug in the SignalX framework itself?** File it in the relevant package repo under [`signalxjs`](https://github.com/signalxjs), not here.

## Code of conduct

This project follows the [Contributor Covenant](./CODE_OF_CONDUCT.md). Be kind.

## License

By contributing, you agree that your contributions will be licensed under the MIT License (see [LICENSE](./LICENSE)).
