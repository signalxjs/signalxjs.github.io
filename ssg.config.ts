import { defineSSGConfig } from '@sigx/ssg';
// NOTE: explicit .ts extension — @sigx/ssg ≥0.7.1 bundles this config with
// esbuild, so the relative .ts registry import works on every supported Node.
// (scripts/generate-module-docs.mjs imports the registry directly and still
// needs Node ≥22.18 — dev-only.)
import { ACTORS_RELEASED, DEVTOOLS_RELEASED, MODULES, moduleDocsCollection, moduleRoutePrefix, type ModuleParent } from './src/lib/modules.ts';
import { qualifiedTitle, decodeTitleEntities, escapeTitle } from './src/lib/seo-title.ts';

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
        // Renders the ```mermaid fences claimed by rehypeMermaid below. The
        // package lazy-loads mermaid itself, so pages without a diagram pay
        // nothing.
        '@sigx/mermaid/styles',
        '@sigx/mermaid/client',
    ],
    
    // Site metadata
    site: {
        title: 'SignalX',
        // The canonical product one-liner (#516) — keep in sync with the
        // homepage meta and the JSON-LD in index.html. Keyword-bearing on
        // purpose: "SignalX"/"sigx" collides with unrelated projects, so the
        // fallback description must say what this actually is.
        description:
            'SignalX (sigx) — a fine-grained reactive TypeScript framework: signals, TSX components, no virtual DOM, server functions and actors. Web, native and terminal.',
        // origin only — the SSG appends Vite's `base` for sitemap and
        // canonical URLs, so site.url must NOT include it.
        url: 'https://sigx.dev',
        favicon: '/sigx.png',
        themeColor: '#000000',
        fonts: [
            'Geist:wght@400..800',
            'Geist+Mono:wght@400;500',
        ],
        // OG/Twitter support — a real 1200×630 card (#516); the 150×119 logo
        // was invalid for the summary_large_image Twitter card.
        ogImage: 'https://sigx.dev/og-card.png',
        ogImageAlt: 'SignalX — a fine-grained reactive TypeScript framework for web, native and terminal',
        twitter: 'signalxjs',
    },
    
    // Markdown configuration
    markdown: {
        remarkPlugins: [],
        rehypePlugins: [],
        // Shiki syntax highlighting
        // Using dracula for vibrant colors on dark background
        //
        // NOTE: this block only feeds the runtime. The markdown pipeline —
        // including the `remarkMermaid` plugin that renders ```mermaid fences —
        // is configured on ssgPlugin() in vite.config.ts, whose `markdown` arg
        // REPLACES this whole block. Adding a plugin here has no effect.
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
        'use-docs': {
            path: '/use/docs',
            showDrafts: 'dev',
            sectionOrder: [
                'Getting Started',
                'State',
                'Debounce & throttle',
                'Timing',
                'Shared state',
                'Utilities',
                'Elements',
                'Viewport',
                'Sensors',
                'Storage',
                'Clipboard & title',
            ],
        },
        'i18n-docs': {
            path: '/i18n/docs',
            showDrafts: 'dev',
            sectionOrder: ['Getting Started', 'Guides', 'Reference'],
        },
        'mermaid-docs': {
            path: '/mermaid/docs',
            showDrafts: 'dev',
            sectionOrder: ['Getting Started', 'Guides', 'Reference'],
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
        // `actors` is a collection — its satellite packages (redis, pg, k8s,
        // tcp, ws, cloudflare, cli, otel) are documented via the `actors-pkg-*`
        // collections injected by `...moduleCollections` below. This collection
        // holds everything about `@sigx/actors` itself, which is the bulk of the
        // area: the model, the API, clustering, jobs and operations.
        'actors-docs': {
            path: '/actors/docs',
            showDrafts: 'dev',
            sectionOrder: [
                'Getting Started',
                'Core concepts',
                'Calling actors',
                'Actor features',
                'Running a host',
                'Clustering',
                'Operations',
                'Deploying',
                'Reference',
            ],
        },
        // `zero` is a collection — zero-kit and the two shipped design systems
        // are documented via the `zero-pkg-*` collections injected by
        // `...moduleCollections` below. This collection holds everything about
        // `@sigx/zero` itself: the contract, the behaviors, theming and variant
        // axes, the design-system authoring guides, and one page per component.
        'zero-docs': {
            path: '/zero/docs',
            showDrafts: 'dev',
            sectionOrder: [
                'Getting Started',
                'Concepts',
                'Styling',
                'Authoring design systems',
                'Platforms',
                'Components',
                // The component tiers — sub-groups under Components, in the order
                // the library tiers them rather than alphabetically.
                'Actions & disclosure',
                'Overlays',
                'Form controls',
                'Navigation',
                'Content',
                'Rich behavior',
                'Reference',
            ],
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
                'Reactivity',
                'Server rendering',
                'Cache',
            ],
        },
        // Sub-package collections (32 lynx modules + core repo packages)
        ...moduleCollections,
    },

    // Qualify repeated page titles with the package they belong to, so the ~500
    // pages named "Overview" / "Installation" / "API reference" stop looking
    // like duplicates of each other. Done here rather than in 500 frontmatter
    // blocks, so a page added later gets it for free. See src/lib/seo-title.ts.
    hooks: {
        transformHtml(html, page) {
            const current = html.match(/<title>([^<]*)<\/title>/)?.[1];
            if (!current) return html;
            const next = qualifiedTitle(decodeTitleEntities(current), page.path);
            if (!next) return html;
            return html.replace(
                /<title>[^<]*<\/title>/,
                `<title>${escapeTitle(next)}</title>`,
            );
        },
    },

    // Sitemap. `lastmod: 'git'` dates each URL from its source file's last
    // commit — one repo-wide `git log` walk, not a process per page (there are
    // ~700 of them). It NEEDS full history: the deploy workflow checks out with
    // `fetch-depth: 0` for this reason, and under a shallow clone files absent
    // from the log simply get no `<lastmod>` rather than a wrong one.
    //
    // Redirect shells are excluded: each is a meta-refresh page that already
    // carries `noindex` and a canonical pointing elsewhere, so listing it in the
    // sitemap invites a crawl of a URL we are asking not to be indexed.
    sitemap: {
        lastmod: 'git',
        exclude: [
            '/server/docs',
            '/server/docs/**',
            '/lynx/modules/device-info',
            '/lynx/modules/device-info/**',
        ],
    },

    // Structured data, and where each kind lives (#516, needs @sigx/ssg 0.20):
    //
    // - SITE-wide schema (Organization / WebSite / SoftwareSourceCode) is the
    //   static @graph block in index.html. That template is shared by every
    //   route, so nothing page-specific may ever go there.
    // - PER-page schema (BreadcrumbList + TechArticle from each page's meta)
    //   is emitted by this flag. The homepage opts out via meta.autoJsonLd —
    //   the site graph already describes it.
    // - WebSite.potentialAction/SearchAction is deliberately ABSENT from the
    //   site graph: there is no on-site search endpoint yet, and claiming one
    //   Google cannot use is worse than omitting it. If on-site search ever
    //   ships, add the SearchAction to the index.html graph at that point.
    //
    // Page meta is injected FIRST in <head> (the <!--head-tags--> marker in
    // index.html sits right after charset/viewport/theme-color): the tab
    // title isn't blocked behind the font CSS, and scrapers that read only
    // the head's first chunk still see the OG tags.
    autoJsonLd: true,

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
            { title: 'Use', collections: ['use-docs'] },
            { title: 'Internationalization', collections: ['i18n-docs'] },
            { title: 'Mermaid Diagrams', collections: ['mermaid-docs'] },
            { title: 'daisyUI Components', collections: ['daisyui-docs', 'daisyui-api'] },
            { title: 'Zero (unstyled components + design systems)', collections: ['zero-docs'] },
            { title: 'Zero Packages (authoring kit & design systems)', links: moduleLlmsLinks('zero') },
            { title: 'Static Site Generation', collections: ['ssg-docs'] },
            { title: 'Server (SSR, server functions, resume & serialize)', links: moduleLlmsLinks('server') },
            { title: 'Vite Plugin', collections: ['vite-docs'] },
            { title: 'Deploying (Node, Cloudflare, Deno, Bun, Vercel, Netlify)', collections: ['deploy-docs'] },
            { title: 'Deploy Adapters', links: moduleLlmsLinks('deploy') },
            // Gated: the actors pages are `draft: true` until the packages ship,
            // so listing them here would publish links the build never emitted.
            ...(ACTORS_RELEASED
                ? [
                    { title: 'Actors (virtual actors, jobs & clustering)', collections: ['actors-docs'] },
                    { title: 'Actor Backends & Transports', links: moduleLlmsLinks('actors') },
                ]
                : []),
            { title: 'CLI', collections: ['cli-docs'] },
            { title: 'Terminal UIs', collections: ['terminal-docs'] },
            { title: 'Terminal Packages', links: moduleLlmsLinks('terminal') },
            // Gated the same way: `@sigx/devtools` is unpublished and its pages are drafts.
            ...(DEVTOOLS_RELEASED ? [{ title: 'DevTools', collections: ['devtools-docs'] }] : []),
            { title: 'Monaco Editor', collections: ['monaco-docs'] },
            { title: 'Lynx (native iOS & Android)', collections: ['lynx-docs'] },
            // ~45 one-liners instead of ~310 page links; each overview.md links
            // the module's api/usage/installation renditions.
            { title: 'Lynx Modules', links: moduleLlmsLinks('lynx') },
        ],
        // Keep llms-full.txt ingestible in one context window — the lynx module
        // bodies are indexed above and individually fetchable as .md instead.
        full: { exclude: ['/lynx/modules/**', '/zero/docs/components/**'] },
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
