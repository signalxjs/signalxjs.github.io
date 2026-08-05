/**
 * Docs Layout
 * 
 * Documentation layout with sidebar navigation.
 */

import { component, onMounted } from 'sigx';
import type { LayoutProps, LayoutSlots } from '@sigx/ssg';
import { useRoute } from '@sigx/router';
import { detectCollection } from 'virtual:ssg-navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { DocsSidebar } from '@/components/DocsSidebar';
import { TableOfContents } from '@/components/TableOfContents';
import { hueForCollection } from '@/lib/family';
import { CommandPalette } from '@/components/CommandPalette';
import { useCommandPalette } from '@/lib/useCommandPalette';
import { initializeTheme } from '@sigx/daisyui';

export default component<LayoutProps, unknown, LayoutSlots>(({ slots, props, signal }) => {
    const state = signal({ sidebarOpen: false });
    const route = useRoute();
    const cmd = useCommandPalette();

    onMounted(() => {
        initializeTheme({ defaultTheme: 'dark' });
    });

    return () => (
        <div
            class="min-h-screen flex flex-col bg-base-100"
            style={`--pkg-h:${hueForCollection(detectCollection(route.path))}`}
        >
            <Navbar
                showMenu
                onMenuClick={() => { state.sidebarOpen = !state.sidebarOpen; }}
                onOpenCmd={() => (cmd.open = true)}
            />
            {cmd.open && <CommandPalette onClose={() => (cmd.open = false)} />}
            
            <div class="docs-shell flex-1">
                {/* Sidebar (sticky desktop; drawer ≤880px) */}
                <DocsSidebar
                    isOpen={state.sidebarOpen}
                    onClose={() => state.sidebarOpen = false}
                />

                {/* Main content */}
                <main class="content">
                    <div class="content-narrow">
                        <article class="prose max-w-none">
                            {slots.default?.()}
                        </article>
                    </div>
                </main>

                {/* Table of Contents rail (hidden ≤1180px via CSS) */}
                <aside class="toc">
                    <div class="toc-inner">
                        <TableOfContents headings={(props.meta?.headings || []) as { id: string; text: string; level: number }[]} />
                    </div>
                </aside>
            </div>
            
            <Footer />
        </div>
    );
});
