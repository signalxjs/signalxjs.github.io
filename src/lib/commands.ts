/**
 * Command palette entries — generated from the real SSG navigation
 * (every docs/API page across all collections) plus the package
 * landing pages from the family registry. Stays in sync with content:
 * adding a new `<id>-docs` / `<id>-api` collection lights it up here
 * automatically.
 */

import { navigation } from 'virtual:ssg-navigation';
import type { NavItem, NavSection } from '@sigx/ssg';
import { PACKAGES, packageForCollection } from '@/lib/family';

export interface Command {
    /** Display label (page or package title). */
    label: string;
    /** Route to push. */
    href: string;
    /** Package id — drives the row's glyph tile + hue. */
    pkgId: string;
    /** "Pkg · Section" subpath shown under the label. */
    path: string;
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

    // Package landing pages first — the most prominent jump targets.
    for (const pkg of PACKAGES) {
        add({ label: pkg.title, href: `/${pkg.id}`, pkgId: pkg.id, path: `${pkg.npm} · Overview` });
    }

    // Every page of every collection, flattened from the sidebar tree.
    for (const [collection, config] of Object.entries(navigation)) {
        const pkg = packageForCollection(collection);
        if (!pkg) continue;

        const walk = (items: NavItem[] | undefined, section: string) => {
            for (const item of items ?? []) {
                if (item.href) {
                    add({ label: item.title, href: item.href, pkgId: pkg.id, path: `${pkg.title} · ${section}` });
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
