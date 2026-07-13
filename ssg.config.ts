import { defineSSGConfig } from '@sigx/ssg';
// NOTE: explicit .ts extension — @sigx/ssg ≥0.7.1 bundles this config with
// esbuild, so the relative .ts registry import works on every supported Node.
// (scripts/generate-module-docs.mjs imports the registry directly and still
// needs Node ≥22.18 — dev-only.)
import { MODULES, moduleDocsCollection, moduleRoutePrefix } from './src/lib/modules.ts';

/**
 * Sub-package docs collections, generated from the module registry —
 * one `lynx-mod-<id>-docs` / `core-pkg-<id>-docs` collection per module
 * (alias entries are documented by their top-level package and skipped).
 * MDX stubs are scaffolded by `pnpm gen:modules`.
 */
const moduleCollections = Object.fromEntries(
    MODULES.flatMap((m) => {
        const name = moduleDocsCollection(m);
        return name ? [[name, { path: moduleRoutePrefix(m), showDrafts: 'dev' as const }]] : [];
    }),
);

export default defineSSGConfig({
    // Pages directory
    pages: 'src/pages',
    
    // Layouts directory (local overrides)
    layouts: 'src/layouts',
    
    // Output directory
    outDir: 'dist',
    
    // Additional client imports (live code playground support)
    // Note: live-code-config must be imported BEFORE @sigx/live-code/client
    // so that modules are registered before client auto-initializes.
    clientImports: [
        './src/live-code-config',
        '@sigx/live-code/client',
    ],
    
    // Site metadata
    site: {
        title: 'SignalX',
        description: 'A lightweight reactive component framework',
        // origin only — the SSG appends Vite's `base` for sitemap and
        // canonical URLs, so site.url must NOT include it.
        url: 'https://sigx.dev',
        favicon: '/sigx.png',
        themeColor: '#000000',
        fonts: [
            'Geist:wght@400..800',
            'Geist+Mono:wght@400;500',
        ],
        // OG/Twitter support
        ogImage: 'https://sigx.dev/sigx.png',
        twitter: 'signalxjs',
    },
    
    // Markdown configuration
    markdown: {
        remarkPlugins: [],
        rehypePlugins: [],
        // Shiki syntax highlighting
        // Using dracula for vibrant colors on dark background
        shiki: {
            light: 'github-light',
            dark: 'github-dark',
        },
    },

    // Collections configuration for multi-collection navigation
    collections: {
        // Core package (main SignalX framework)
        'core-docs': {
            path: '/core/docs',
            showDrafts: 'dev',
        },
        'core-api': {
            path: '/core/api',
            showDrafts: 'dev',
        },
        // Router package
        'router-docs': {
            path: '/router/docs',
            showDrafts: 'dev',
        },
        'router-api': {
            path: '/router/api',
            showDrafts: 'dev',
        },
        // DaisyUI package
        'daisyui-docs': {
            path: '/daisyui/docs',
            showDrafts: 'dev',
        },
        'daisyui-api': {
            path: '/daisyui/api',
            showDrafts: 'dev',
        },
        // Lynx package (collection meta-package — its modules follow)
        'lynx-docs': {
            path: '/lynx/docs',
            showDrafts: 'dev',
        },
        // Tooling & platform packages (docs sections)
        'monaco-docs': {
            path: '/monaco/docs',
            showDrafts: 'dev',
        },
        'store-docs': {
            path: '/store/docs',
            showDrafts: 'dev',
        },
        'ssg-docs': {
            path: '/ssg/docs',
            showDrafts: 'dev',
        },
        // `server` is a collection — its two packages (server-renderer,
        // ssr-islands) are documented via the `server-pkg-*` collections
        // injected by `...moduleCollections` below.
        'vite-docs': {
            path: '/vite/docs',
            showDrafts: 'dev',
        },
        'cli-docs': {
            path: '/cli/docs',
            showDrafts: 'dev',
        },
        'terminal-docs': {
            path: '/terminal/docs',
            showDrafts: 'dev',
        },
        'devtools-docs': {
            path: '/devtools/docs',
            showDrafts: 'dev',
        },
        // Sub-package collections (32 lynx modules + core repo packages)
        ...moduleCollections,
    },

    // Redirects for routes that have moved. `@sigx/lynx-device-info` folded into
    // `@sigx/lynx-core`, so its former module pages now live under the core module —
    // keep old inbound links alive instead of 404ing. Both the canonical
    // trailing-slash form (the site uses `trailingSlash: 'always'`) and the
    // slash-less form are mapped so neither variant misses.
    redirects: {
        '/lynx/modules/device-info': '/lynx/modules/core/overview/',
        '/lynx/modules/device-info/': '/lynx/modules/core/overview/',
        '/lynx/modules/device-info/overview': '/lynx/modules/core/overview/',
        '/lynx/modules/device-info/overview/': '/lynx/modules/core/overview/',
        '/lynx/modules/device-info/api': '/lynx/modules/core/api/',
        '/lynx/modules/device-info/api/': '/lynx/modules/core/api/',
        '/lynx/modules/device-info/usage': '/lynx/modules/core/usage/',
        '/lynx/modules/device-info/usage/': '/lynx/modules/core/usage/',
        '/lynx/modules/device-info/installation': '/lynx/modules/core/installation/',
        '/lynx/modules/device-info/installation/': '/lynx/modules/core/installation/',
        // The @sigx/args and @sigx/terminal-dev guides moved from the terminal
        // umbrella's docs to their own package pages (terminal is a collection).
        '/terminal/docs/args': '/terminal/packages/args/overview/',
        '/terminal/docs/args/': '/terminal/packages/args/overview/',
        '/terminal/docs/dev-mode': '/terminal/packages/terminal-dev/overview/',
        '/terminal/docs/dev-mode/': '/terminal/packages/terminal-dev/overview/',
    },

    // Navigation configuration
    navigation: {
        // Show draft pages in development
        showDrafts: 'dev',
    },
});
