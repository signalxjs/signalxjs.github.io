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
import { byId, packageForCollection } from '@/lib/family';
import { PackageSwitcher } from '@/components/PackageSwitcher';
import { SxLink } from '@/components/ui/SxLink';

type DocsSidebarProps =
    & Define.Prop<'isOpen', boolean, false>
    & Define.Prop<'collection', string, false>
    & Define.Event<'close', void>;

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
        const currentPkg = packageForCollection(getCollection()) ?? byId.core;
        return (
            <>
                {/* Drawer scrim (visible ≤880px only, via CSS) */}
                {props.isOpen && (
                    <div class="sidebar-scrim" onClick={() => emit('close')} />
                )}

                {/* Sidebar */}
                <aside class={`sidebar${props.isOpen ? ' is-open' : ''}`}>
                    <div class="sidebar-inner">
                        <PackageSwitcher currentPkg={currentPkg} />
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
