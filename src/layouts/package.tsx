/**
 * Package Layout
 *
 * Landing page layout for individual packages (Core, Router, DaisyUI, etc.)
 * Full-width; the page content (PackageLanding) brings its own
 * per-package HeroBackdrop and accent hue.
 */

import { component, onMounted } from 'sigx';
import type { LayoutProps, LayoutSlots } from '@sigx/ssg';
import { useRoute } from '@sigx/router';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CommandPalette } from '@/components/CommandPalette';
import { HeroBackdrop } from '@/components/HeroBackdrop';
import { byId, DEFAULT_HUE } from '@/lib/family';
import { useCommandPalette } from '@/lib/useCommandPalette';
import { initializeTheme } from '@sigx/daisyui';

export default component<LayoutProps, unknown, LayoutSlots>(({ slots, props }) => {
    const cmd = useCommandPalette();
    const route = useRoute();

    onMounted(() => {
        initializeTheme({ defaultTheme: 'dark' });
    });

    return () => (
        <div
            class="relative min-h-screen bg-base-100 overflow-x-hidden"
            style={`--pkg-h:${byId[route.path.split('/')[1]]?.hue ?? DEFAULT_HUE}`}
        >
            {/* Full-bleed single-hue signal field behind the hero */}
            <HeroBackdrop variant="signal" />

            {/* Navigation */}
            <Navbar onOpenCmd={() => (cmd.open = true)} />
            {cmd.open && <CommandPalette onClose={() => (cmd.open = false)} />}

            {/* Main content - full width for package landing */}
            <main class="relative">
                {slots.default?.()}
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
});
