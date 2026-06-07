/**
 * Component catalog — the categorized component menu rendered by
 * component-library packages (web @sigx/daisyui and native
 * @sigx/lynx-daisyui expose the same ~61-component surface).
 *
 * Filter input + chip groups; category headings are real h2s with
 * anchor ids so the right-rail TOC scroll-spy lists them. Chip links
 * are data-driven: pass the collection whose pages document the
 * components and each chip links to its page when one exists (it
 * lights up automatically as pages are added).
 */

import { component, type Define } from 'sigx';
import { navigation } from 'virtual:ssg-navigation';
import type { NavItem, NavSection } from '@sigx/ssg';
import { COMPONENT_CATALOGS } from '@/lib/modules';
import { Icon } from '@/components/ui/Icon';
import { SxLink } from '@/components/ui/SxLink';

type ComponentCatalogProps =
    & Define.Prop<'catalogId', string, true>
    /** Collection whose pages document these components (e.g. 'daisyui-docs'). */
    & Define.Prop<'collection', string, false>;

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const ComponentCatalog = component<ComponentCatalogProps>(({ props, signal }) => {
    const state = signal({ q: '' });

    // All leaf hrefs of the documenting collection, keyed by trailing segment.
    const hrefByTail = (): Record<string, string> => {
        const map: Record<string, string> = {};
        const walk = (items: NavItem[] | undefined) => {
            for (const item of items ?? []) {
                if (item.href) map[item.href.split('/').pop() ?? ''] = item.href;
                walk(item.items);
            }
        };
        const nav = props.collection ? navigation[props.collection] : undefined;
        for (const section of (nav?.sidebar ?? []) as NavSection[]) walk(section.items);
        return map;
    };

    return () => {
        const catalog = COMPONENT_CATALOGS[props.catalogId] ?? [];
        const links = hrefByTail();
        const hrefFor = (name: string): string | undefined => {
            // "Chat bubble" → chat-bubble, then chat; "Text input" → text-input, then text
            const full = slug(name);
            return links[full] ?? links[full.split('-')[0]];
        };

        const t = state.q.trim().toLowerCase();
        const groups = catalog
            .map((sec) => ({ ...sec, items: sec.items.filter((m) => !t || m.toLowerCase().includes(t)) }))
            .filter((sec) => sec.items.length > 0);

        return (
            <div class="comp-catalog not-prose">
                <div class="comp-search">
                    <Icon name="search" size={15} />
                    <input
                        placeholder="Filter components…"
                        value={state.q}
                        onInput={(e: Event) => (state.q = (e.target as HTMLInputElement).value)}
                    />
                </div>
                {groups.length === 0 && <div class="comp-empty">No components match “{state.q}”.</div>}
                {groups.map((sec) => (
                    <div class="comp-group" key={sec.cat}>
                        <h2 class="comp-cat mono" id={`comp-${slug(sec.cat)}`}>
                            {sec.cat} <span class="comp-cat-n" data-toc-ignore>{sec.items.length}</span>
                        </h2>
                        <div class="comp-chips">
                            {sec.items.map((name) => {
                                const href = hrefFor(name);
                                return href ? (
                                    <SxLink key={name} to={href} class="comp-chip">
                                        <span class="comp-chip-dot" />{name}
                                    </SxLink>
                                ) : (
                                    <span key={name} class="comp-chip" data-soon="true">
                                        <span class="comp-chip-dot" />{name}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        );
    };
});
