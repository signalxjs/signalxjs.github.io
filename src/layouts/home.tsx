/**
 * Home Layout
 *
 * A full-width, immersive layout for landing pages.
 * No container constraints - perfect for hero sections and edge-to-edge designs.
 */

import { component, onMounted } from 'sigx';
import type { LayoutProps, LayoutSlots } from '@sigx/ssg';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CommandPalette } from '@/components/CommandPalette';
import { HeroBackdrop } from '@/components/HeroBackdrop';
import { useCommandPalette } from '@/lib/useCommandPalette';
import { initializeTheme } from '@sigx/daisyui';

export default component<LayoutProps, unknown, LayoutSlots>(({ slots, props }) => {
    const cmd = useCommandPalette();

    // Initialize theme from localStorage or system preference on mount
    onMounted(() => {
        initializeTheme({ defaultTheme: 'dark' });
    });

    return () => (
        <div class="relative min-h-screen bg-base-100 overflow-x-hidden">
            {/* Full-bleed multi-hue signal field behind the hero */}
            <HeroBackdrop variant="signal" family />

            {/* Navigation */}
            <Navbar onOpenCmd={() => (cmd.open = true)} />
            {cmd.open && <CommandPalette onClose={() => (cmd.open = false)} />}

            {/* Main content - full width, no container */}
            <main class="relative">
                {slots.default?.()}
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
});
