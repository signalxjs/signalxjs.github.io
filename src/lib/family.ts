/**
 * SignalX family registry
 *
 * Single source of truth for the package family: identity, target,
 * category, release status, and the per-package accent HUE that drives
 * the `--pkg-h` design token across the site. Sub-packages of the
 * collection packages (core, lynx) live in lib/modules.ts.
 */

import { moduleById, type SigxModule } from '@/lib/modules';
import { VERSIONS } from '@/lib/versions.generated';

export type PackageStatus = 'stable' | 'beta' | 'experimental';
export type PackageCategory = 'core' | 'render' | 'platform' | 'ui' | 'tooling';
export type TargetId = 'foundation' | 'web' | 'lynx' | 'terminal';
/**
 * leaf — a single documented package.
 * collection — a meta-package/repo containing sub-packages with their own docs
 *   (core, lynx — see lib/modules.ts).
 * component-library — exposes a categorized component catalog in its docs.
 */
export type PackageKind = 'leaf' | 'collection' | 'component-library';

export interface SigxPackage {
    /** Stable id, also used as the collection prefix (e.g. `core` → `core-docs`). */
    id: string;
    /** npm package name. */
    npm: string;
    /** Display title. */
    title: string;
    /** Category bucket — the capability sub-group INSIDE a target column. */
    cat: PackageCategory;
    /** Target the package belongs to — the primary navigation axis. */
    target: TargetId;
    /** Structural kind; defaults to 'leaf'. */
    kind?: PackageKind;
    /** Accent hue (OKLCH hue angle) — drives `--pkg-h`. */
    hue: number;
    /** Monochrome unicode glyph (rendered in the accent colour). */
    glyph: string;
    status: PackageStatus;
    version: string;
    /** One-line tagline for the menu. */
    tag: string;
    /** Longer blurb for cards / landings. */
    blurb: string;
}

/**
 * Literal registry. Each `version` is the offline fallback; the live npm
 * `latest` is overlaid below from versions.generated.ts (refreshed at build
 * time by scripts/fetch-versions.mjs).
 */
const RAW_PACKAGES: SigxPackage[] = [
    // ---- Foundation: reactivity & state ----
    { id: 'core', npm: 'sigx', title: 'Core', cat: 'core', target: 'foundation', kind: 'collection',
      hue: 285, glyph: '◇', status: 'stable', version: '0.4.9',
      tag: 'Signals, effects & the component model',
      blurb: 'Fine-grained reactivity with signals and effects, plus a tiny TSX component runtime.' },
    { id: 'router', npm: '@sigx/router', title: 'Router', cat: 'core', target: 'foundation',
      hue: 232, glyph: '⌖', status: 'stable', version: '0.4.5',
      tag: 'Type-safe routing with SSR',
      blurb: 'Nested routes, navigation guards and reactive params — isomorphic by default.' },
    { id: 'store', npm: '@sigx/store', title: 'Store', cat: 'core', target: 'foundation',
      hue: 78, glyph: '▦', status: 'stable', version: '0.4.4',
      tag: 'Centralized state on signals',
      blurb: 'Predictable, derived state for larger apps — built on the same reactive core.' },

    // ---- Web: rendering ----
    { id: 'ssg', npm: '@sigx/ssg', title: 'SSG', cat: 'render', target: 'web',
      hue: 158, glyph: '❏', status: 'beta', version: '0.4.8',
      tag: 'Static site generation + MDX',
      blurb: 'File-based routing, MDX content collections and island hydration for content sites.' },
    { id: 'server', npm: '@sigx/server-renderer', title: 'Server', cat: 'render', target: 'web',
      hue: 210, glyph: '⊟', status: 'stable', version: '0.4.9',
      tag: 'Streaming SSR & island hydration',
      blurb: 'Render to a stream on the server and hydrate selectively with client:* directives.' },

    // ---- Targets with their own framework package ----
    { id: 'lynx', npm: '@sigx/lynx', title: 'Lynx', cat: 'platform', target: 'lynx', kind: 'collection',
      hue: 350, glyph: '◑', status: 'experimental', version: '0.2.1',
      tag: 'Native iOS & Android with Lynx',
      blurb: 'Write one SignalX component tree, render it to real native views on iOS and Android.' },
    { id: 'terminal', npm: '@sigx/terminal', title: 'Terminal', cat: 'platform', target: 'terminal',
      hue: 138, glyph: '▸', status: 'experimental', version: '0.3.0',
      tag: 'Build TUIs with TSX',
      blurb: 'The reactive model, rendered to the terminal — flexbox layout, input and a cell renderer.' },

    // ---- Web: UI ----
    { id: 'daisyui', npm: '@sigx/daisyui', title: 'DaisyUI', cat: 'ui', target: 'web', kind: 'component-library',
      hue: 24, glyph: '❂', status: 'stable', version: '0.4.3',
      tag: 'Themed component library',
      blurb: 'Accessible buttons, forms, modals and more with full DaisyUI theme support.' },
    { id: 'monaco', npm: '@sigx/monaco-editor', title: 'Monaco', cat: 'ui', target: 'web',
      hue: 46, glyph: '⌗', status: 'beta', version: '0.1.2',
      tag: 'Editor + live-code playground',
      blurb: 'A pluggable Monaco wrapper powering the live, runnable code samples in these docs.' },

    // ---- Tooling (foundation unless target-specific) ----
    { id: 'cli', npm: '@sigx/cli', title: 'CLI', cat: 'tooling', target: 'foundation',
      hue: 264, glyph: '›', status: 'stable', version: '0.2.8',
      tag: 'Scaffold & manage projects',
      blurb: 'npm create @sigx@latest — project scaffolding, plugin discovery and platform commands.' },
    { id: 'vite', npm: '@sigx/vite', title: 'Vite', cat: 'tooling', target: 'web',
      hue: 318, glyph: '◮', status: 'stable', version: '0.4.9',
      tag: 'Vite plugin & HMR',
      blurb: 'First-class Vite integration — HMR for components, optimized production builds.' },
    { id: 'devtools', npm: '@sigx/devtools', title: 'DevTools', cat: 'tooling', target: 'foundation',
      hue: 196, glyph: '⊙', status: 'beta', version: '0.1.0',
      tag: 'Inspect signals at runtime',
      blurb: 'A browser panel to trace the reactive graph, time-travel effects and inspect components.' },
];

/** Registry with live npm versions overlaid (falls back to the literal). */
export const PACKAGES: SigxPackage[] =
    RAW_PACKAGES.map((p) => ({ ...p, version: VERSIONS[p.npm] ?? p.version }));

export const CATEGORIES: { id: PackageCategory; label: string; hint: string }[] = [
    { id: 'core', label: 'Core', hint: 'Reactivity, routing & state' },
    { id: 'render', label: 'Rendering', hint: 'SSG, SSR & islands' },
    { id: 'platform', label: 'Platforms', hint: 'Native, terminal & beyond' },
    { id: 'ui', label: 'UI', hint: 'Components & editors' },
    { id: 'tooling', label: 'Tooling', hint: 'CLI, bundler & devtools' },
];

/**
 * Target axis — where a package runs. The PRIMARY navigation axis:
 * the mega-menu renders one column per target and the home grid one
 * row per target; capability (cat) sub-groups INSIDE each target, so
 * web UI (daisyui, monaco) and native UI (lynx modules) sit in parallel.
 * Web is not a platform you switch to — it's the default DOM renderer
 * living inside Core, so foundation packages work on every target.
 */
export const TARGETS: { id: TargetId; label: string; hint: string }[] = [
    { id: 'foundation', label: 'Foundation', hint: 'Works on every target' },
    { id: 'web', label: 'Web', hint: 'The default DOM renderer' },
    { id: 'lynx', label: 'Lynx', hint: 'Native iOS & Android' },
    { id: 'terminal', label: 'Terminal', hint: 'Terminal UIs' },
];

/** Short capability labels for the sub-group heads inside a target column. */
export const CAT_SHORT: Record<PackageCategory, string> = {
    core: 'Reactivity & state',
    render: 'Rendering',
    ui: 'UI',
    tooling: 'Tooling',
    platform: 'Framework',
};

/** package id → target id (derived from the registry). */
export const TARGET_OF: Record<string, TargetId> =
    Object.fromEntries(PACKAGES.map((p) => [p.id, p.target]));

export const inTarget = (target: TargetId): SigxPackage[] =>
    PACKAGES.filter((p) => p.target === target);

export const STATUS: Record<PackageStatus, { label: string; hue: number }> = {
    stable:       { label: 'Stable',  hue: 150 },
    beta:         { label: 'Beta',    hue: 70 },
    experimental: { label: 'Preview', hue: 26 },
};

export const byId: Record<string, SigxPackage> =
    Object.fromEntries(PACKAGES.map((p) => [p.id, p]));

export const inCategory = (cat: PackageCategory): SigxPackage[] =>
    PACKAGES.filter((p) => p.cat === cat);

/** Default hue when no package context is known (core / violet). */
export const DEFAULT_HUE = byId.core.hue;

/**
 * Resolve a package from an SSG collection name or route path.
 * Collections are named `<id>-docs` / `<id>-api` (see ssg.config.ts),
 * so the prefix before the first `-` is the package id.
 */
export function packageForCollection(collection?: string | null): SigxPackage | undefined {
    if (!collection) return undefined;
    const id = collection.split('-')[0];
    return byId[id];
}

/**
 * Resolve a sub-package/module from a module collection name
 * (`lynx-mod-<id>-docs` / `core-pkg-<id>-docs` — see lib/modules.ts).
 * The `-mod-`/`-pkg-` infix keeps these unambiguous against top-level
 * collections (`core-api` vs a core sub-package named `api`), while
 * `packageForCollection`'s prefix split still yields the parent package.
 */
export function moduleForCollection(collection?: string | null): SigxModule | undefined {
    if (!collection) return undefined;
    const m = collection.match(/^(?:lynx-mod|core-pkg)-(.+?)-(?:docs|api)$/);
    return m ? moduleById[m[1]] : undefined;
}

/** Hue for the current collection: module hue → package hue → core/violet default. */
export function hueForCollection(collection?: string | null): number {
    return (
        moduleForCollection(collection)?.hue ??
        packageForCollection(collection)?.hue ??
        DEFAULT_HUE
    );
}
