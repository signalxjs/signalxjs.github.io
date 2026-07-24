import { defineSSGConfig } from '@sigx/ssg';
// NOTE: explicit .ts extension — @sigx/ssg ≥0.7.1 bundles this config with
// esbuild, so the relative .ts registry import works on every supported Node.
// (scripts/generate-module-docs.mjs imports the registry directly and still
// needs Node ≥22.18 — dev-only.)
import { MODULES, moduleDocsCollection, moduleRoutePrefix, type ModuleParent } from './src/lib/modules.ts';

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

/**
 * One curated llms.txt line per module/package — links its overview page
 * (each overview links the module's own api/usage/installation pages, which
 * stay individually fetchable as `.md`), with the registry `tag` as the note.
 * Alias entries are documented by their top-level package and skipped.
 */
const moduleLlmsLinks = (parent: ModuleParent) =>
    MODULES.filter((m) => m.parent === parent && !m.aliasFor).map((m) => ({
        title: m.name,
        href: `${moduleRoutePrefix(m)}/overview/`,
        note: m.tag,
    }));

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
        // `server` is a collection — its packages (server-renderer,
        // ssr-islands, server, resume, serialize) are documented via the
        // `server-pkg-*` collections injected by `...moduleCollections` below.
        'vite-docs': {
            path: '/vite/docs',
            showDrafts: 'dev',
        },
        // `deploy` is a collection — its adapters (cloudflare, vercel,
        // netlify) are documented via the `deploy-pkg-*` collections injected
        // by `...moduleCollections` below. This collection holds the
        // cross-platform guides (the Deploying matrix + Node/Deno/Bun).
        'deploy-docs': {
            path: '/deploy/docs',
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
        // Error-code reference. Standalone (not a family package) — the
        // production runtime links every code here (sigx.dev/errors/SIGX###/),
        // so this section MUST exist for those links to resolve. Sidebar groups
        // are ordered by SIGX### range rather than the built-in category names.
        'errors-docs': {
            path: '/errors',
            showDrafts: 'dev',
            sectionOrder: [
                'Overview',
                'App lifecycle',
                'Rendering & mounting',
                'Dependency injection',
                'Hooks & async',
                'Messaging',
            ],
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
        // @sigx/server functions moved from a /server/docs guide to a proper
        // collection package at /server/packages/server/*.
        '/server/docs': '/server/packages/server/overview/',
        '/server/docs/': '/server/packages/server/overview/',
        '/server/docs/overview': '/server/packages/server/overview/',
        '/server/docs/overview/': '/server/packages/server/overview/',
        '/server/docs/authoring': '/server/packages/server/usage/',
        '/server/docs/authoring/': '/server/packages/server/usage/',
        '/server/docs/deployment': '/server/packages/server/deployment/',
        '/server/docs/deployment/': '/server/packages/server/deployment/',
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
        // The deploy adapters' npm `homepage` fields point at
        // /deploy/<platform>/ — keep those short URLs alive on the
        // canonical per-adapter pages.
        '/deploy/cloudflare': '/deploy/packages/cloudflare/overview/',
        '/deploy/cloudflare/': '/deploy/packages/cloudflare/overview/',
        '/deploy/vercel': '/deploy/packages/vercel/overview/',
        '/deploy/vercel/': '/deploy/packages/vercel/overview/',
        '/deploy/netlify': '/deploy/packages/netlify/overview/',
        '/deploy/netlify/': '/deploy/packages/netlify/overview/',
    },

    // Navigation configuration
    navigation: {
        // Show draft pages in development
        showDrafts: 'dev',
    },

    // LLM-friendly output — llms.txt, llms-full.txt, per-page .md renditions,
    // and per-area sub-indexes (@sigx/ssg ≥0.15).
    llms: {
        intro: [
            'Start with [SignalX for LLMs](https://sigx.dev/llms.md) — a condensed cheatsheet of',
            'the API and the semantics that differ from React/Vue/Solid (notably:',
            '`signal(primitive)` returns `{ value }`; `signal(object)` returns a reactive proxy;',
            '`$set()` exists only on object/array signals). The full docs corpus is at',
            'https://sigx.dev/llms-full.txt, and every docs page has a markdown rendition at its',
            'URL with the trailing slash replaced by `.md` (e.g. `/core/docs/signals.md`).',
        ].join('\n'),
        sections: [
            {
                title: 'Start Here',
                links: [{
                    title: 'SignalX for LLMs (cheatsheet)',
                    href: '/llms',
                    note: 'condensed API + the gotchas code generators get wrong',
                }],
                // Getting Started already leads the Core Guides section below.
            },
            { title: 'Core Guides', collections: ['core-docs'] },
            { title: 'Core API', collections: ['core-api'] },
            { title: 'Error Codes', collections: ['errors-docs'] },
            { title: 'Core Packages', links: moduleLlmsLinks('core') },
            { title: 'Router', collections: ['router-docs', 'router-api'] },
            { title: 'Store', collections: ['store-docs'] },
            { title: 'daisyUI Components', collections: ['daisyui-docs', 'daisyui-api'] },
            { title: 'Static Site Generation', collections: ['ssg-docs'] },
            { title: 'Server (SSR, server functions, resume & serialize)', links: moduleLlmsLinks('server') },
            { title: 'Vite Plugin', collections: ['vite-docs'] },
            { title: 'Deploying (Node, Cloudflare, Deno, Bun, Vercel, Netlify)', collections: ['deploy-docs'] },
            { title: 'Deploy Adapters', links: moduleLlmsLinks('deploy') },
            { title: 'CLI', collections: ['cli-docs'] },
            { title: 'Terminal UIs', collections: ['terminal-docs'] },
            { title: 'Terminal Packages', links: moduleLlmsLinks('terminal') },
            { title: 'DevTools', collections: ['devtools-docs'] },
            { title: 'Monaco Editor', collections: ['monaco-docs'] },
            { title: 'Lynx (native iOS & Android)', collections: ['lynx-docs'] },
            // ~45 one-liners instead of ~310 page links; each overview.md links
            // the module's api/usage/installation renditions.
            { title: 'Lynx Modules', links: moduleLlmsLinks('lynx') },
        ],
        // Keep llms-full.txt ingestible in one context window — the lynx module
        // bodies are indexed above and individually fetchable as .md instead.
        full: { exclude: ['/lynx/modules/**'] },
        // Per-area sub-indexes for consumers that only need one area.
        areas: {
            '/core': {
                title: 'SignalX Core',
                description: 'The sigx reactive component framework — signals, computed, effects, components.',
            },
            '/lynx': {
                title: 'SignalX Lynx',
                description: 'Native iOS & Android from one SignalX component tree, plus its native modules.',
            },
        },
    },
});
