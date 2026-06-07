/**
 * SignalX family registry
 *
 * Single source of truth for the package family: identity, category,
 * release status, and the per-package accent HUE that drives the
 * `--pkg-h` design token across the site.
 */

export type PackageStatus = 'stable' | 'beta' | 'experimental';
export type PackageCategory = 'core' | 'render' | 'platform' | 'ui' | 'tooling';

export interface SigxPackage {
    /** Stable id, also used as the collection prefix (e.g. `core` → `core-docs`). */
    id: string;
    /** npm package name. */
    npm: string;
    /** Display title. */
    title: string;
    /** Category bucket for the family menu. */
    cat: PackageCategory;
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

export const PACKAGES: SigxPackage[] = [
    // ---- Core ----
    { id: 'core', npm: 'sigx', title: 'Core', cat: 'core',
      hue: 285, glyph: '◇', status: 'stable', version: '0.4.9',
      tag: 'Signals, effects & the component model',
      blurb: 'Fine-grained reactivity with signals and effects, plus a tiny TSX component runtime.' },
    { id: 'router', npm: '@sigx/router', title: 'Router', cat: 'core',
      hue: 232, glyph: '⌖', status: 'stable', version: '0.4.5',
      tag: 'Type-safe routing with SSR',
      blurb: 'Nested routes, navigation guards and reactive params — isomorphic by default.' },
    { id: 'store', npm: '@sigx/store', title: 'Store', cat: 'core',
      hue: 78, glyph: '▦', status: 'stable', version: '0.4.4',
      tag: 'Centralized state on signals',
      blurb: 'Predictable, derived state for larger apps — built on the same reactive core.' },

    // ---- Rendering ----
    { id: 'ssg', npm: '@sigx/ssg', title: 'SSG', cat: 'render',
      hue: 158, glyph: '❏', status: 'beta', version: '0.4.8',
      tag: 'Static site generation + MDX',
      blurb: 'File-based routing, MDX content collections and island hydration for content sites.' },
    { id: 'server', npm: '@sigx/server-renderer', title: 'Server', cat: 'render',
      hue: 210, glyph: '⊟', status: 'stable', version: '0.4.9',
      tag: 'Streaming SSR & island hydration',
      blurb: 'Render to a stream on the server and hydrate selectively with client:* directives.' },

    // ---- Platforms ----
    { id: 'lynx', npm: '@sigx/lynx', title: 'Lynx', cat: 'platform',
      hue: 350, glyph: '◑', status: 'experimental', version: '0.2.1',
      tag: 'Native iOS & Android with Lynx',
      blurb: 'Write one SignalX component tree, render it to real native views on iOS and Android.' },
    { id: 'terminal', npm: '@sigx/terminal', title: 'Terminal', cat: 'platform',
      hue: 138, glyph: '▸', status: 'experimental', version: '0.3.0',
      tag: 'Build TUIs with TSX',
      blurb: 'The reactive model, rendered to the terminal — flexbox layout, input and a cell renderer.' },

    // ---- UI ----
    { id: 'daisyui', npm: '@sigx/daisyui', title: 'DaisyUI', cat: 'ui',
      hue: 24, glyph: '❂', status: 'stable', version: '0.4.3',
      tag: 'Themed component library',
      blurb: 'Accessible buttons, forms, modals and more with full DaisyUI theme support.' },
    { id: 'monaco', npm: '@sigx/monaco-editor', title: 'Monaco', cat: 'ui',
      hue: 46, glyph: '⌗', status: 'beta', version: '0.1.2',
      tag: 'Editor + live-code playground',
      blurb: 'A pluggable Monaco wrapper powering the live, runnable code samples in these docs.' },

    // ---- Tooling ----
    { id: 'cli', npm: '@sigx/cli', title: 'CLI', cat: 'tooling',
      hue: 264, glyph: '›', status: 'stable', version: '0.2.8',
      tag: 'Scaffold & manage projects',
      blurb: 'npm create @sigx@latest — project scaffolding, plugin discovery and platform commands.' },
    { id: 'vite', npm: '@sigx/vite', title: 'Vite', cat: 'tooling',
      hue: 318, glyph: '◮', status: 'stable', version: '0.4.9',
      tag: 'Vite plugin & HMR',
      blurb: 'First-class Vite integration — HMR for components, optimized production builds.' },
    { id: 'devtools', npm: '@sigx/devtools', title: 'DevTools', cat: 'tooling',
      hue: 196, glyph: '⊙', status: 'beta', version: '0.1.0',
      tag: 'Inspect signals at runtime',
      blurb: 'A browser panel to trace the reactive graph, time-travel effects and inspect components.' },
];

export const CATEGORIES: { id: PackageCategory; label: string; hint: string }[] = [
    { id: 'core', label: 'Core', hint: 'Reactivity, routing & state' },
    { id: 'render', label: 'Rendering', hint: 'SSG, SSR & islands' },
    { id: 'platform', label: 'Platforms', hint: 'Native, terminal & beyond' },
    { id: 'ui', label: 'UI', hint: 'Components & editors' },
    { id: 'tooling', label: 'Tooling', hint: 'CLI, bundler & devtools' },
];

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

/** Hue for the current collection, falling back to the core/violet default. */
export function hueForCollection(collection?: string | null): number {
    return packageForCollection(collection)?.hue ?? DEFAULT_HUE;
}
