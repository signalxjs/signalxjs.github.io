/**
 * Command palette entries — generated from the real SSG navigation
 * (every docs/API page across all collections) plus the package
 * landing pages from the family registry and the sub-package modules.
 * Stays in sync with content: adding a new `<id>-docs` / `<id>-api`
 * (or `lynx-mod-*` / `core-pkg-*`) collection lights it up here
 * automatically.
 */

import { navigation } from 'virtual:ssg-navigation';
import type { NavItem, NavSection } from '@sigx/ssg';
import { PACKAGES, byId, moduleForCollection, packageForCollection } from '@/lib/family';
import { MODULES, modulesByParent } from '@/lib/modules';
import { moduleHref } from '@/lib/packageLinks';

export interface Command {
    /** Display label (page or package title). */
    label: string;
    /** Route to push. */
    href: string;
    /**
     * Package id — drives the row's glyph tile + hue fallback. MUST be a
     * valid family id (byId key); module rows keep their PARENT package
     * here and tint via the hue/glyph overrides instead.
     */
    pkgId: string;
    /** "Pkg · Section" subpath shown under the label. */
    path: string;
    /** Tint overrides for module rows (fall back to the package's). */
    hue?: number;
    glyph?: string;
}

let cache: Command[] | null = null;

export function buildCommands(): Command[] {
    if (cache) return cache;

    const out: Command[] = [];
    const seen = new Set<string>();
    const add = (cmd: Command) => {
        if (seen.has(cmd.href)) return;
        seen.add(cmd.href);
        out.push(cmd);
    };

    // Lead with the module catalog action — the v2 browse entry point.
    out.push({
        label: 'Browse Lynx modules',
        href: '/lynx/modules',
        pkgId: 'lynx',
        path: `Lynx · Module catalog · ${modulesByParent('lynx').length} modules`,
    });
    seen.add('/lynx/modules');
    out.push({
        label: 'Browse Terminal packages',
        href: '/terminal/packages',
        pkgId: 'terminal',
        path: `Terminal · Package catalog · ${modulesByParent('terminal').length} packages`,
    });
    seen.add('/terminal/packages');

    // Package landing pages — the most prominent jump targets.
    for (const pkg of PACKAGES) {
        add({ label: pkg.title, href: `/${pkg.id}`, pkgId: pkg.id, path: `${pkg.npm} · Overview` });
    }

    // One entry per sub-package module, straight to its docs.
    for (const m of MODULES) {
        if (m.aliasFor) continue; // documented by its top-level package, already listed
        add({
            label: m.name,
            href: moduleHref(m),
            pkgId: m.parent,
            path: `${byId[m.parent].title} module · ${m.npm}`,
            hue: m.hue,
            glyph: m.glyph,
        });
    }

    // Every page of every collection, flattened from the sidebar tree.
    for (const [collection, config] of Object.entries(navigation)) {
        const pkg = packageForCollection(collection);
        if (!pkg) continue;
        const mod = moduleForCollection(collection);

        const walk = (items: NavItem[] | undefined, section: string) => {
            for (const item of items ?? []) {
                if (item.href) {
                    add({
                        label: item.title,
                        href: item.href,
                        pkgId: pkg.id,
                        path: mod
                            ? `${pkg.title} · ${mod.name} · ${section}`
                            : `${pkg.title} · ${section}`,
                        hue: mod?.hue,
                        glyph: mod?.glyph,
                    });
                }
                if (item.items) walk(item.items, section);
            }
        };

        const fallback = collection.endsWith('-api') ? 'API' : 'Docs';
        for (const section of (config.sidebar ?? []) as NavSection[]) {
            walk(section.items, section.title || fallback);
        }
    }

    cache = out;
    return out;
}
