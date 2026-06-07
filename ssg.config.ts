import { defineSSGConfig } from '@sigx/ssg';
// NOTE: explicit .ts extension — the SSG loads this config by transpiling it
// to a temp .mjs and resolving imports with plain Node ESM (Node ≥22.18
// type-strips the .ts import; the registry must stay dependency-free).
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
    // so that modules are registered before client auto-initializes
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
        ogImage: 'https://sigx.dev/og-image.png',
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
        // Sub-package collections (32 lynx modules + core repo packages)
        ...moduleCollections,
    },

    // Navigation configuration
    navigation: {
        // Show draft pages in development
        showDrafts: 'dev',
    },
});
