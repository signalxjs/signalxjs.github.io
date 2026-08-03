import { defineConfig, type Plugin } from 'vite';
import { sigxPlugin } from '@sigx/vite';
import { ssgPlugin } from '@sigx/ssg/vite';
import { monacoPrebundledPlugin } from '@sigx/monaco-editor/vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

// 'prebundled' uses the static bundle shipped by @sigx/monaco-editor;
// 'cdn' loads Monaco from unpkg.
const MONACO_STRATEGY = (process.env.MONACO_STRATEGY as 'prebundled' | 'cdn') || 'prebundled';

// Asset path prefix. Defaults to `/` for the GitHub Pages deployment at
// the domain root (https://sigx.dev/); override with BASE_PATH if
// serving from a subpath.
const BASE_PATH = process.env.BASE_PATH ?? '/';

// Local-development bridge for @sigx/daisyui.
//
// Point SIGX_DAISYUI_SRC at a local checkout of the library's `src` dir, e.g.
//   SIGX_DAISYUI_SRC=C:/Dev/sigx/daisyui/main/packages/daisyui/src pnpm dev
// and the docs Vite dev server compiles the component source directly into its
// own module graph — giving full granular HMR, just like the old monorepo.
// Unset (CI, prod, normal use) → the published @sigx/daisyui package is used.
const daisyuiSrc = process.env.SIGX_DAISYUI_SRC?.replace(/\\/g, '/');

// Map every published subpath export to its source entry. Most-specific keys
// must precede the bare '@sigx/daisyui' so Vite matches them first.
const daisyuiAlias = daisyuiSrc
    ? {
          '@sigx/daisyui/theme': resolve(daisyuiSrc, 'theme/index.ts'),
          '@sigx/daisyui/buttons': resolve(daisyuiSrc, 'buttons/index.ts'),
          '@sigx/daisyui/forms': resolve(daisyuiSrc, 'forms/index.ts'),
          '@sigx/daisyui/layout': resolve(daisyuiSrc, 'layout/index.ts'),
          '@sigx/daisyui/feedback': resolve(daisyuiSrc, 'feedback/index.ts'),
          '@sigx/daisyui/navigation': resolve(daisyuiSrc, 'navigation/index.ts'),
          '@sigx/daisyui/data': resolve(daisyuiSrc, 'data/index.ts'),
          '@sigx/daisyui/typography': resolve(daisyuiSrc, 'typography/index.ts'),
          '@sigx/daisyui': resolve(daisyuiSrc, 'index.ts'),
      }
    : {};

// When developing against local source, the committed `@source` in global.css
// points at node_modules/.../dist — which is stale. Inject an extra @source for
// the live source tree so Tailwind scans it for component classes. Done via a
// transform (not committed CSS) so no machine-specific path ends up in git.
const daisyuiDevTailwindSource = (): Plugin | null =>
    daisyuiSrc
        ? {
              name: 'sigx-daisyui-dev-tailwind-source',
              enforce: 'pre',
              transform(code, id) {
                  if (id.replace(/\\/g, '/').endsWith('src/styles/global.css')) {
                      return {
                          code: code.replace(
                              /@import\s+['"]tailwindcss['"];/,
                              (m) => `${m}\n@source "${daisyuiSrc}";`
                          ),
                          map: null,
                      };
                  }
              },
          }
        : null;

export default defineConfig({
    base: BASE_PATH,
    build: {
        // LightningCSS (the default CSS minifier) doesn't support @scope yet
        // and silently DROPS the whole rule — which would strip the prose
        // preview-isolation donut in global.css from production builds.
        // esbuild preserves at-rules it doesn't recognize.
        cssMinify: 'esbuild',
    },
    plugins: [
        daisyuiDevTailwindSource(),
        tailwindcss(),
        sigxPlugin(),
        // The Shiki transformer's options come from ssgPlugin() args (not
        // ssg.config.ts's markdown.shiki, which only feeds the runtime).
        // triggerLabel sets the live-code "Try Live" button to the v2 "⚡ Run".
        ssgPlugin({ markdown: { shiki: { triggerLabel: '⚡ Run' } } }),
        monacoPrebundledPlugin({
            strategy: MONACO_STRATEGY,
            publicPath: `${BASE_PATH}monaco-bundle`,
        }),
    ].filter(Boolean),
    oxc: {
        jsx: {
            runtime: 'automatic',
            importSource: 'sigx',
        },
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            ...daisyuiAlias,
        },
        // When aliased to local source, the library dir carries its own nested
        // sigx copy. Without deduping, two sigx instances load — the renderer
        // sets "current component" on one while defineProvide/inject reads the
        // other, breaking provide/inject components (e.g. Radio groups). Force a
        // single instance from the docs node_modules.
        dedupe: daisyuiSrc
            ? ['sigx', '@sigx/reactivity', '@sigx/runtime-core', '@sigx/runtime-dom']
            : [],
    },
    // Source files change on every edit; excluding from prebundle lets Vite
    // watch them directly and fire HMR instead of serving a cached optimized dep.
    optimizeDeps: {
        exclude: daisyuiSrc ? ['@sigx/daisyui'] : [],
        // `@sigx/live-code/client` is in ssg.config.ts `clientImports`, so it
        // loads on every page, and it pulls sucrase → @jridgewell/gen-mapping
        // → trace-mapping → resolve-uri. resolve-uri's "browser" export
        // condition points at a UMD build with no ESM `default`, so serving it
        // unbundled throws before any page renders. Forcing it through
        // prebundling converts it to real ESM.
        // pnpm does not hoist, so the nested "parent > child" form is required.
        include: ['@sigx/live-code > sucrase'],
    },
});
