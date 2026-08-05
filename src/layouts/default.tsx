/**
 * Default Layout
 * 
 * Standard content layout with navigation and footer.
 * Overrides the theme's default layout with SignalX branding.
 * Includes Table of Contents when headings are available.
 */

import { component, onMounted } from 'sigx';
import type { LayoutProps, LayoutSlots } from '@sigx/ssg';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TableOfContents } from '@/components/TableOfContents';
import { CommandPalette } from '@/components/CommandPalette';
import { useCommandPalette } from '@/lib/useCommandPalette';
import { initializeTheme } from '@sigx/daisyui';

export default component<LayoutProps, unknown, LayoutSlots>(({ slots, props }) => {
    const cmd = useCommandPalette();

    onMounted(() => {
        initializeTheme({ defaultTheme: 'dark' });
    });

    return () => {
        const headings = (props.meta?.headings || []) as { id: string; text: string; level: number }[];
        const hasToc = headings.length > 0;

        return (
            <div class="min-h-screen flex flex-col bg-base-100">
                <Navbar onOpenCmd={() => (cmd.open = true)} />
                {cmd.open && <CommandPalette onClose={() => (cmd.open = false)} />}
                
                <div class="flex-1 w-full max-w-[90rem] mx-auto">
                    <div class="flex justify-center">
                        {/* Main content */}
                        <main class={`flex-1 min-w-0 px-6 py-12 ${hasToc ? 'max-w-4xl' : 'max-w-4xl mx-auto'}`}>
                            <article class="prose prose-lg max-w-none">
                                {slots.default?.()}
                            </article>
                        </main>
                        
                        {/* Table of Contents - desktop only, only if headings exist */}
                        {hasToc && (
                            <aside class="hidden xl:block w-64 shrink-0 py-12 pr-8">
                                <div class="sticky top-24">
                                    <TableOfContents headings={headings} />
                                </div>
                            </aside>
                        )}
                    </div>
                </div>
                
                <Footer />
            </div>
        );
    };
});
