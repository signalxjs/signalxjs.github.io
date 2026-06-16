/**
 * Theme Generator - Interactive DaisyUI Theme Configurator
 *
 * Presented as a full-screen modal: it renders as a `fixed inset-0` overlay on
 * top of the regular docs layout (so navigations to/from it are clean
 * same-layout swaps) and provides its own header with a Close button + Esc
 * shortcut that returns to the docs.
 *
 * @layout docs
 */

import { component, signal, onMounted, onUnmounted } from 'sigx';
import { useRouter } from '@sigx/router';
import {
    ThemeConfigurator,
    DEFAULT_THEME_CONFIG,
    cloneThemeConfig,
} from '@sigx/daisyui';
import type { ThemeConfigData } from '@sigx/daisyui';
import { canonicalPath } from '@/lib/url';

const ThemeGeneratorPage = component(() => {
    const config = signal<ThemeConfigData>(cloneThemeConfig(DEFAULT_THEME_CONFIG));
    const router = useRouter();

    const close = () => {
        // Go back only when there's an in-app history entry to return to. The
        // router stamps an incrementing `position` into history.state, so a
        // fresh deep-link is position 0/absent — in that case land on the docs
        // rather than risk `back()` navigating the user off-site.
        const position = (typeof window !== 'undefined' && window.history.state?.position) || 0;
        if (position > 0) {
            router.back();
        } else {
            router.push(canonicalPath('/daisyui/docs/getting-started'));
        }
    };

    let removeKey: (() => void) | undefined;
    onMounted(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
        };
        window.addEventListener('keydown', onKey);
        removeKey = () => window.removeEventListener('keydown', onKey);
    });
    onUnmounted(() => removeKey?.());

    return () => (
        <div class="not-prose fixed inset-0 z-[60] flex flex-col bg-base-100">
            {/* Modal-style header */}
            <header class="shrink-0 h-14 flex items-center justify-between px-4 border-b border-base-300">
                <div class="flex items-center gap-2">
                    <svg class="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" />
                    </svg>
                    <span class="font-semibold">Theme Generator</span>
                    <span class="hidden sm:inline text-xs text-base-content/50">DaisyUI</span>
                </div>
                <button
                    type="button"
                    class="btn btn-ghost btn-sm gap-1.5"
                    onClick={close}
                    aria-label="Close theme generator"
                    title="Close (Esc)"
                >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                    <span>Close</span>
                </button>
            </header>

            {/* Configurator fills the remaining height */}
            <div class="flex-1 min-h-0">
                <ThemeConfigurator
                    config={config}
                    onChange={(next) => config.$set(next)}
                    persistKey="sigx-docs-theme-config"
                />
            </div>
        </div>
    );
});

export default ThemeGeneratorPage;

export const meta = {
    title: 'Theme Generator - DaisyUI',
    description: 'Interactive theme generator for DaisyUI. Customize colors, radius, effects, sizes, and more with live preview.',
    layout: 'docs',
    category: 'Core Concepts',
    order: 35,
};
