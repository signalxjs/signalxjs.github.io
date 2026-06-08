import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

// Standalone test config — the app build uses vite.config.ts (SSG plugin,
// tailwind, monaco). Tests only need the sigx JSX transform, the `@` alias,
// and a DOM. Virtual SSG modules (virtual:ssg-navigation) are mocked per-test.
export default defineConfig({
    // Vite 8 uses Oxc for JSX transforms — match vite.config.ts / the app.
    oxc: {
        jsx: {
            runtime: 'automatic',
            importSource: 'sigx',
        },
    },
    test: {
        environment: 'happy-dom',
        include: ['src/**/__tests__/**/*.test.{ts,tsx}'],
        globals: true,
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            // The SSG Vite plugin provides this virtual module at build time;
            // under vitest we point it at a fixture stub.
            'virtual:ssg-navigation': resolve(
                __dirname,
                'src/components/__tests__/stubs/ssg-navigation.ts',
            ),
        },
    },
});
