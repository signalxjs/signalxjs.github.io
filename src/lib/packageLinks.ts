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
import { moduleDocsCollection, moduleRoutePrefix, type SigxModule } from '@/lib/modules';

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

export function hasExamples(pkgId: string): boolean {
    return !!navigation[`${pkgId}-examples`];
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

/** First examples page of a package, or undefined if it has no examples collection yet. */
export function examplesHref(pkgId: string): string | undefined {
    const nav = navigation[`${pkgId}-examples`];
    if (!nav) return undefined;
    for (const section of (nav.sidebar ?? []) as NavSection[]) {
        const href = firstLeaf(section.items);
        if (href) return href;
    }
    return undefined;
}

// ---- Sub-package / module links (lib/modules.ts collections) ----

/** Whether a module's own docs collection has pages. */
export function moduleHasDocs(m: SigxModule): boolean {
    const collection = moduleDocsCollection(m);
    return !!collection && !!navigation[collection];
}

/** First docs page of a module's collection, or undefined if none yet. */
export function firstModuleDocHref(m: SigxModule): string | undefined {
    const collection = moduleDocsCollection(m);
    const nav = collection ? navigation[collection] : undefined;
    if (!nav) return undefined;
    for (const section of (nav.sidebar ?? []) as NavSection[]) {
        const href = firstLeaf(section.items);
        if (href) return href;
    }
    return undefined;
}

/**
 * Canonical link for a module: alias entries route to their top-level
 * package's docs (ownership rule — documented by the repo it ships
 * from), everything else to its own collection's first page.
 */
export function moduleHref(m: SigxModule): string {
    if (m.aliasFor) return docsHref(m.aliasFor) ?? `/${m.aliasFor}`;
    return firstModuleDocHref(m) ?? moduleRoutePrefix(m);
}
