# SignalX docs

Source for the SignalX documentation site at <https://sigx.dev/>.

Built with [`@sigx/ssg`](https://www.npmjs.com/package/@sigx/ssg) and deployed to GitHub Pages on every push to `main`.

## Quick start

```bash
pnpm install
pnpm dev      # http://localhost:5173
pnpm build    # static site → dist/
pnpm preview  # serve the built site locally
```

Requires Node.js `^20.19.0 || >=22.12.0` and pnpm `>=10`.

## Layout

```
src/
  components/   sigx components used in pages and layouts
  content/      long-form MDX content
  layouts/      page layouts (default, docs, home, package)
  pages/        file-based routes
  styles/       global CSS / Tailwind entry
public/         static assets
ssg.config.ts   site metadata + content collections
vite.config.ts  sigx + ssg + monaco + tailwind plugins
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). Typo fixes and content additions are welcome. Bugs in the SignalX framework itself should be filed in the relevant repo under [`signalxjs`](https://github.com/signalxjs), not here.

## License

[MIT](./LICENSE) © Andreas Ekdahl
