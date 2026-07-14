/**
 * Documentation Sidebar Navigation
 *
 * Auto-generated from virtual:ssg-navigation; headed by the package
 * switcher. Sticky on desktop, off-canvas drawer ≤880px (hamburger
 * opens it, scrim closes — see sigx-components.css responsive rules).
 * Active links tint to the current package accent.
 */

import { component, type Define } from 'sigx';
import { useRoute } from '@sigx/router';
import { navigation, detectCollection } from 'virtual:ssg-navigation';
import type { NavSection, NavItem } from '@sigx/ssg';
import { byId, moduleForCollection, packageForCollection } from '@/lib/family';
import { modulesByParent, moduleRoutePrefix, type ModuleParent } from '@/lib/modules';
import { PackageSwitcher } from '@/components/PackageSwitcher';
import { ModuleSwitcher } from '@/components/ModuleSwitcher';
import { Icon } from '@/components/ui/Icon';
import { SxLink } from '@/components/ui/SxLink';

type DocsSidebarProps =
    & Define.Prop<'isOpen', boolean, false>
    & Define.Prop<'collection', string, false>
    & Define.Event<'close', void>;

/**
 * Compare two route paths ignoring a trailing slash. The site canonicalises to
 * `trailingSlash: 'always'`, so `route.path` carries the slash (`/x/`) while the
 * raw nav `item.href`s from the SSG navigation data are slash-less (`/x`). An
 * exact `===` would never match, dropping the active state; compare ignoring the
 * trailing slash so the current page highlights regardless of either side's form.
 */
const samePath = (a: string | undefined, b: string | undefined): boolean => {
    if (!a || !b) return false;
    const norm = (p: string): string => (p.length > 1 ? p.replace(/\/+$/, '') : p);
    return norm(a) === norm(b);
};

/** "All Lynx modules · 32" / "All Core packages · 6" / "All Server packages · 2" catalog link. */
const CATALOG_LABEL: Record<ModuleParent, string> = {
    lynx: 'All Lynx modules',
    core: 'All Core packages',
    server: 'All Server packages',
    terminal: 'All Terminal packages',
};
const CatalogLink = component<Define.Prop<'parent', ModuleParent, true> & Define.Event<'pick', void>>(
    ({ props, emit }) => () => (
        <SxLink
            to={props.parent === 'lynx' ? '/lynx/modules' : `/${props.parent}/packages`}
            class="side-catalog-link"
            onClick={() => emit('pick')}
        >
            <Icon name="cube" size={15} />
            <span class="scl-label">{CATALOG_LABEL[props.parent]}</span>
            <span class="scl-count mono">{modulesByParent(props.parent).length}</span>
        </SxLink>
    ),
);

export const DocsSidebar = component<DocsSidebarProps>(({ props, emit }) => {
    const route = useRoute();

    const getCollection = () => props.collection || detectCollection(route.path);

    /**
     * Get sidebar sections for the current collection
     */
    const getSections = (): NavSection[] => {
        const collectionName = getCollection();
        if (!collectionName) return [];
        const sections = navigation[collectionName]?.sidebar || [];
        // A module's index route (…/<id>/) is a ModuleIndexRedirect to overview,
        // not a real doc page — but @sigx/ssg can't read the .tsx `sidebar: false`
        // meta, so it leaks into the nav as a stray uncategorised ("Other") entry
        // that just redirects back to the page you came from. Drop it, plus any
        // section left empty.
        const mod = moduleForCollection(collectionName);
        if (!mod) return sections;
        const indexHref = moduleRoutePrefix(mod);
        return sections
            .map((s) => ({ ...s, items: s.items.filter((it) => !samePath(it.href, indexHref)) }))
            .filter((s) => s.items.length > 0);
    };

    /**
     * Check if a nav item or any of its children is active
     */
    const isItemActive = (item: NavItem): boolean => {
        if (item.href && samePath(route.path, item.href)) {
            return true;
        }
        if (item.items) {
            return item.items.some(isItemActive);
        }
        return false;
    };

    /**
     * Render a navigation item (handles nested items recursively)
     */
    const renderNavItem = (item: NavItem, depth: number = 0) => {
        const isActive = item.href ? samePath(route.path, item.href) : false;
        const hasActiveChild = item.items ? item.items.some(isItemActive) : false;

        if (item.items && item.items.length > 0) {
            // Group with nested items. Both callers already wrap the result of
            // renderNavItem in an <li>, so this branch must NOT add its own —
            // <li><li> is invalid HTML and the browser reparses the inner <li>
            // into a sibling, breaking hydration (duplicated groups).
            return (
                <details class="side-group" open={depth === 0 || hasActiveChild}>
                    <summary class="side-subhead">{item.title}</summary>
                    <ul class="side-group-list">
                        {item.items.map((child, idx) => (
                            <li key={idx}>
                                {renderNavItem(child, depth + 1)}
                            </li>
                        ))}
                    </ul>
                </details>
            );
        }

        // Leaf item with link
        return (
            <SxLink
                to={item.href || '#'}
                class="side-link"
                active={isActive}
                onClick={() => emit('close')}
            >
                {item.title}
            </SxLink>
        );
    };

    return () => {
        const collection = getCollection();
        const currentModule = moduleForCollection(collection);
        const currentPkg = packageForCollection(collection) ?? byId.core;
        return (
            <>
                {/* Drawer scrim (visible ≤880px only, via CSS) */}
                {props.isOpen && (
                    <div class="sidebar-scrim" onClick={() => emit('close')} />
                )}

                {/* Sidebar */}
                <aside class={`sidebar${props.isOpen ? ' is-open' : ''}`}>
                    <div class="sidebar-inner">
                        {currentModule ? (
                            <>
                                {/* Module docs: switcher across the collection's modules */}
                                <ModuleSwitcher currentModule={currentModule} />
                                <CatalogLink parent={currentModule.parent} onPick={() => emit('close')} />
                            </>
                        ) : (
                            <>
                                <PackageSwitcher currentPkg={currentPkg} />
                                {/* Collection packages keep their module catalog one step away */}
                                {currentPkg.kind === 'collection' && (
                                    <CatalogLink
                                        parent={currentPkg.id as ModuleParent}
                                        onPick={() => emit('close')}
                                    />
                                )}
                            </>
                        )}
                        <nav class="side-nav">
                            {getSections().map((section, idx) => (
                                <div class="side-section" key={idx}>
                                    <div class="side-section-title mono">{section.title}</div>
                                    <ul>
                                        {section.items.map((item, itemIdx) => (
                                            <li key={itemIdx}>
                                                {renderNavItem(item)}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </nav>
                    </div>
                </aside>
            </>
        );
    };
});
