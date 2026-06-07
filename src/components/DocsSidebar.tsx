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
import { modulesByParent, type ModuleParent } from '@/lib/modules';
import { PackageSwitcher } from '@/components/PackageSwitcher';
import { ModuleSwitcher } from '@/components/ModuleSwitcher';
import { Icon } from '@/components/ui/Icon';
import { SxLink } from '@/components/ui/SxLink';

type DocsSidebarProps =
    & Define.Prop<'isOpen', boolean, false>
    & Define.Prop<'collection', string, false>
    & Define.Event<'close', void>;

/** "All Lynx modules · 32" / "All Core packages · 6" catalog link. */
const CatalogLink = component<Define.Prop<'parent', ModuleParent, true> & Define.Event<'pick', void>>(
    ({ props, emit }) => () => (
        <SxLink
            to={props.parent === 'lynx' ? '/lynx/modules' : '/core/packages'}
            class="side-catalog-link"
            onClick={() => emit('pick')}
        >
            <Icon name="cube" size={15} />
            <span class="scl-label">
                {props.parent === 'lynx' ? 'All Lynx modules' : 'All Core packages'}
            </span>
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
        return navigation[collectionName]?.sidebar || [];
    };

    /**
     * Check if a nav item or any of its children is active
     */
    const isItemActive = (item: NavItem): boolean => {
        if (item.href && route.path === item.href) {
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
        const isActive = item.href ? route.path === item.href : false;
        const hasActiveChild = item.items ? item.items.some(isItemActive) : false;

        if (item.items && item.items.length > 0) {
            // Group with nested items
            return (
                <li>
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
                </li>
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
