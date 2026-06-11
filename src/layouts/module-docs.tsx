/**
 * Module Docs Layout
 *
 * Sub-package docs (lynx modules, core repo packages) in the EXACT
 * same 3-column docs shell as any top-level package — sidebar (module
 * switcher + the module's own collection nav), prose content, scroll-spy
 * TOC. Adds a breadcrumb: Lynx / Modules / <name> / <page>.
 * Selected via frontmatter `layout: module-docs`.
 */

import { component, onMounted } from 'sigx';
import type { LayoutProps, LayoutSlots } from '@sigx/ssg';
import { useRoute, useRouter } from '@sigx/router';
import { detectCollection } from 'virtual:ssg-navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { DocsSidebar } from '@/components/DocsSidebar';
import { TableOfContents } from '@/components/TableOfContents';
import { STATUS, hueForCollection, moduleForCollection } from '@/lib/family';
import { COMPONENT_CATALOGS } from '@/lib/modules';
import { CommandPalette } from '@/components/CommandPalette';
import { useCommandPalette } from '@/lib/useCommandPalette';
import { SxLink } from '@/components/ui/SxLink';
import { SiblingTargetPill } from '@/components/SiblingTargetPill';
import { initializeTheme } from '@sigx/daisyui';

export default component<LayoutProps, unknown, LayoutSlots>(({ slots, props, signal }) => {
    const state = signal({ sidebarOpen: false });
    const route = useRoute();
    const router = useRouter();
    const cmd = useCommandPalette();

    onMounted(() => {
        initializeTheme({ defaultTheme: 'dark' });
    });

    return () => {
        const collection = detectCollection(route.path);
        const mod = moduleForCollection(collection);
        const parentHref = `/${mod?.parent}`;
        const parentLabel = mod?.parent === 'core' ? 'Core' : mod?.parent === 'server' ? 'Server' : 'Lynx';
        const groupHref = mod?.parent === 'lynx' ? '/lynx/modules' : `/${mod?.parent}/packages`;
        const groupLabel = mod?.parent === 'lynx' ? 'Modules' : 'Packages';
        const pageTitle = (props.meta?.title as string | undefined) ?? '';

        return (
            <div
                class="min-h-screen flex flex-col bg-base-100"
                style={`--pkg-h:${hueForCollection(collection)}`}
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
                            {mod && (
                                <div class="crumbs">
                                    <SxLink to={parentHref} class="cr-pkg">{parentLabel}</SxLink>
                                    <span class="cr-sep">/</span>
                                    <SxLink to={groupHref}>{groupLabel}</SxLink>
                                    <span class="cr-sep">/</span>
                                    <span class="cr-cur">{mod.name}</span>
                                    {pageTitle && pageTitle !== 'Overview' && (
                                        <>
                                            <span class="cr-sep">/</span>
                                            <span class="cr-cur">{pageTitle}</span>
                                        </>
                                    )}
                                    {/* DaisyUI exists on two targets — link the web sibling (local, never a global mode) */}
                                    {mod.parent === 'lynx' && mod.id === 'daisyui' && (
                                        <>
                                            <span class="cr-spacer" />
                                            <SiblingTargetPill current="native" />
                                        </>
                                    )}
                                </div>
                            )}
                            <article class="prose max-w-none">
                                {mod && (
                                    <span class="eyebrow">
                                        {mod.npm} · {STATUS[mod.status].label}
                                        {(COMPONENT_CATALOGS[mod.id] || COMPONENT_CATALOGS[`${mod.parent}-${mod.id}`]) ? ' · Component library' : ''}
                                    </span>
                                )}
                                {slots.default()}
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
    };
});
