import { defineSSGConfig } from '@sigx/ssg';

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
    },

    // Navigation configuration
    navigation: {
        // Show draft pages in development
        showDrafts: 'dev',
    },
});
