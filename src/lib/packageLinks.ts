/**
 * Data-driven links into a package's documentation.
 *
 * Backed by the live SSG navigation: when a `<id>-docs` / `<id>-api`
 * collection is added to ssg.config.ts, these light up automatically —
 * no component edits (sidebar switcher, landings and menus all consume
 * these helpers).
 */

import { navigation } from 'virtual:ssg-navigation';
import type { NavItem, NavSection } from '@sigx/ssg';

function firstLeaf(items: NavItem[] | undefined): string | undefined {
    for (const item of items ?? []) {
        if (item.href) return item.href;
        const nested = firstLeaf(item.items);
        if (nested) return nested;
    }
    return undefined;
}

export function hasDocs(pkgId: string): boolean {
    return !!navigation[`${pkgId}-docs`];
}

export function hasApi(pkgId: string): boolean {
    return !!navigation[`${pkgId}-api`];
}

/** First docs page of a package, or undefined if it has no docs collection yet. */
export function docsHref(pkgId: string): string | undefined {
    const nav = navigation[`${pkgId}-docs`];
    if (!nav) return undefined;
    for (const section of (nav.sidebar ?? []) as NavSection[]) {
        const href = firstLeaf(section.items);
        if (href) return href;
    }
    return undefined;
}

/** API reference index of a package, or undefined if it has no API collection yet. */
export function apiHref(pkgId: string): string | undefined {
    return hasApi(pkgId) ? `/${pkgId}/api` : undefined;
}
