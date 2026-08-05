/**
 * SignalX family registry
 *
 * Single source of truth for the package family: identity, target,
 * category, release status, and the per-package accent HUE that drives
 * the `--pkg-h` design token across the site. Sub-packages of the
 * collection packages (core, lynx, server, terminal) live in lib/modules.ts.
 */

import { ACTORS_RELEASED, moduleById, type SigxModule } from '@/lib/modules';
import { VERSIONS } from '@/lib/versions.generated';

export type PackageStatus = 'stable' | 'beta' | 'experimental';
export type PackageCategory = 'core' | 'render' | 'backend' | 'platform' | 'ui' | 'tooling';
export type TargetId = 'foundation' | 'web' | 'lynx' | 'terminal';
/**
 * leaf — a single documented package.
 * collection — a meta-package/repo containing sub-packages with their own docs
 *   (core, lynx, server, terminal — see lib/modules.ts).
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
    /**
     * For `kind: 'collection'` only. `true` (default) when `npm` is a real
     * umbrella package you install to get the collection (core → `sigx`,
     * terminal → `@sigx/terminal`). `false` for a collection with no single
     * install package (server) — the landing then reads as a collection of N
     * packages rather than badging/installing one member.
     */
    umbrella?: boolean;
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
      hue: 285, glyph: '◇', status: 'stable', version: '0.15.2',
      tag: 'Signals, effects & the component model',
      blurb: 'Fine-grained reactivity with signals and effects, plus a tiny TSX component runtime.' },
    { id: 'router', npm: '@sigx/router', title: 'Router', cat: 'core', target: 'foundation',
      hue: 232, glyph: '⌖', status: 'stable', version: '0.11.0',
      tag: 'Type-safe routing with SSR',
      blurb: 'Nested routes, navigation guards and reactive params — isomorphic by default.' },
    { id: 'store', npm: '@sigx/store', title: 'Store', cat: 'core', target: 'foundation',
      hue: 78, glyph: '▦', status: 'stable', version: '0.12.0',
      tag: 'Centralized state on signals',
      blurb: 'Predictable, derived state for larger apps — built on the same reactive core.' },
    { id: 'use', npm: '@sigx/use', title: 'Use', cat: 'core', target: 'foundation',
      hue: 175, glyph: '⎔', status: 'beta', version: '0.4.0',
      tag: 'Reactive composables built on signals',
      blurb: 'Tree-shakable composables built on signals — sensors, storage, timing and more, SSR-safe across every target.' },
    { id: 'i18n', npm: '@sigx/i18n', title: 'i18n', cat: 'core', target: 'foundation',
      hue: 200, glyph: '⌘', status: 'beta', version: '0.3.1',
      tag: 'Reactive localization',
      blurb: 'Namespaces, a master locale with automatic fallback, locale detection and SSR-safe state transfer — renderer-neutral, so it runs on web, lynx and terminal alike.' },

    // ---- Web: rendering ----
    { id: 'ssg', npm: '@sigx/ssg', title: 'SSG', cat: 'render', target: 'web',
      hue: 158, glyph: '❏', status: 'beta', version: '0.19.0',
      tag: 'Static site generation + MDX',
      blurb: 'File-based routing, MDX content collections and island hydration for content sites.' },
    { id: 'server', npm: '@sigx/server-renderer', title: 'Server', cat: 'render', target: 'web', kind: 'collection', umbrella: false,
      hue: 210, glyph: '⊟', status: 'stable', version: '0.15.2',
      tag: 'SSR, server functions, resume & serialize',
      blurb: 'Type-safe RPC you call like a function, resumable SSR that ships almost no JS, streaming render with islands, and a codec that carries your own types across the wire. Reach for Actors when a call needs identity and memory as well.' },

    // ---- Web: server & state ----
    // `actors` is a collection like `server`, but with a real umbrella package.
    // It sits in `backend` alongside `server` — the `server` row's category is
    // switched to match in the PACKAGES mapping below, at the same moment
    // actors becomes visible, so the live mega-menu changes exactly once.
    { id: 'actors', npm: '@sigx/actors', title: 'Actors', cat: 'backend', target: 'web', kind: 'collection',
      hue: 116, glyph: '⬡', status: 'experimental', version: '0.1.0',
      tag: 'Addressable, single-threaded server state',
      blurb: 'Virtual actors for SignalX — addressable, persistent server objects that ride the serverFn wire. Lazy activation, turn-based concurrency so a method body never races itself, pluggable storage with optimistic concurrency, durable reminders, and clustering across hosts when one machine stops being enough.' },

    // ---- Targets with their own framework package ----
    { id: 'lynx', npm: '@sigx/lynx', title: 'Lynx', cat: 'platform', target: 'lynx', kind: 'collection',
      hue: 350, glyph: '◑', status: 'experimental', version: '0.23.0',
      tag: 'Native iOS & Android with Lynx',
      blurb: 'Write one SignalX component tree, render it to real native views on iOS and Android.' },
    { id: 'terminal', npm: '@sigx/terminal', title: 'Terminal', cat: 'platform', target: 'terminal', kind: 'collection',
      hue: 138, glyph: '▸', status: 'experimental', version: '0.11.0',
      tag: 'Build TUIs with TSX',
      blurb: 'The reactive model, rendered to the terminal — flexbox layout, input and a cell renderer.' },

    // ---- Web: UI ----
    { id: 'daisyui', npm: '@sigx/daisyui', title: 'DaisyUI', cat: 'ui', target: 'web', kind: 'component-library',
      hue: 24, glyph: '❂', status: 'stable', version: '0.11.0',
      tag: 'Themed component library',
      blurb: 'Accessible buttons, forms, modals and more with full DaisyUI theme support.' },
    { id: 'monaco', npm: '@sigx/monaco-editor', title: 'Monaco', cat: 'ui', target: 'web',
      hue: 46, glyph: '⌗', status: 'beta', version: '0.6.0',
      tag: 'Editor + live-code playground',
      blurb: 'A pluggable Monaco wrapper powering the live, runnable code samples in these docs.' },
    { id: 'mermaid', npm: '@sigx/mermaid', title: 'Mermaid', cat: 'ui', target: 'web',
      hue: 96, glyph: '◈', status: 'beta', version: '0.1.0',
      tag: 'Diagrams for sigx and SSG',
      blurb: 'A <Mermaid> component for any sigx app, plus drop-in ```mermaid fence support for @sigx/ssg — loaded lazily, only on pages that have a diagram.' },

    // ---- Tooling (foundation unless target-specific) ----
    { id: 'cli', npm: '@sigx/cli', title: 'CLI', cat: 'tooling', target: 'foundation',
      hue: 264, glyph: '›', status: 'stable', version: '0.9.0',
      tag: 'Scaffold & manage projects',
      blurb: 'npm create @sigx@latest — project scaffolding, plugin discovery and platform commands.' },
    { id: 'vite', npm: '@sigx/vite', title: 'Vite', cat: 'tooling', target: 'web',
      hue: 318, glyph: '◮', status: 'stable', version: '0.15.2',
      tag: 'Vite plugin & HMR',
      blurb: 'First-class Vite integration — HMR for components, optimized production builds.' },
    { id: 'deploy', npm: '@sigx/cloudflare', title: 'Deploy', cat: 'tooling', target: 'web', kind: 'collection', umbrella: false,
      hue: 60, glyph: '⇪', status: 'stable', version: '0.15.2',
      tag: 'Deploy adapters for every platform',
      blurb: 'Ship your SSR app anywhere — one WinterCG fetch handler plus build adapters for Cloudflare Workers, Vercel and Netlify, and documented Node, Deno and Bun entries.' },
    { id: 'devtools', npm: '@sigx/devtools', title: 'DevTools', cat: 'tooling', target: 'foundation',
      hue: 196, glyph: '⊙', status: 'beta', version: '0.1.0',
      tag: 'Inspect signals at runtime',
      blurb: 'A browser panel to trace the reactive graph, time-travel effects and inspect components.' },
];

/**
 * Injected by vite.config.ts — true only under the dev server (`command ===
 * 'serve'`). Declared with a `typeof` guard below so any consumer outside the
 * Vite graph (a plain Node script, a vitest run without the define) still
 * evaluates it safely rather than throwing on an unresolved global.
 */
declare const __SIGX_SHOW_UNRELEASED__: boolean | undefined;

/**
 * Whether the site shows the actors area at all: once the packages ship, and
 * in the dev server regardless — matching the `showDrafts: 'dev'` convention
 * the rest of the site uses. Writing an unreleased area should feel like
 * writing any other section, and dev shows the layout as it will ship,
 * including `server` sitting beside `actors` in the backend group.
 *
 * Deliberately NOT `import.meta.env.DEV`: that is **true during the SSG's
 * prerender step**, so gating on it renders the area into the static HTML that
 * ships. `command === 'serve'` in vite.config.ts is the signal that actually
 * distinguishes serving from building.
 */
const SHOW_ACTORS =
    ACTORS_RELEASED
    || (typeof __SIGX_SHOW_UNRELEASED__ !== 'undefined' && __SIGX_SHOW_UNRELEASED__);

/**
 * Registry with live npm versions overlaid (falls back to the literal).
 *
 * `server` moves from the `render` group to `backend` at the same moment
 * actors becomes visible, so the two sit together as siblings — see the
 * `actors` row above. Doing it here rather than in the literal keeps the
 * release a single flag flip instead of two edits that must agree.
 */
export const PACKAGES: SigxPackage[] = RAW_PACKAGES.map((p) => ({
    ...p,
    version: VERSIONS[p.npm] ?? p.version,
    cat: p.id === 'server' && SHOW_ACTORS ? 'backend' : p.cat,
}));

/**
 * The registry minus anything not yet released — what the site's PUBLIC
 * surfaces (mega-menu, home grid, ⌘K palette, package counts) enumerate.
 *
 * `PACKAGES`/`byId` stay complete on purpose: the docs pages themselves are
 * gated by `draft: true` (the SSG drops draft routes from the build entirely),
 * so a `--drafts` build still needs to resolve the landing, catalog and hues.
 * What drafts do NOT cover is a registry row rendering a tile that links to a
 * page the production build never emitted — hence this second list.
 *
 * See SHOW_ACTORS above, and ACTORS_RELEASED in lib/modules.ts.
 */
export const PUBLIC_PACKAGES: SigxPackage[] =
    PACKAGES.filter((p) => SHOW_ACTORS || p.id !== 'actors');

export const CATEGORIES: { id: PackageCategory; label: string; hint: string }[] = [
    { id: 'core', label: 'Core', hint: 'Reactivity, routing & state' },
    { id: 'render', label: 'Rendering', hint: 'SSG, SSR & islands' },
    { id: 'backend', label: 'Server & state', hint: 'RPC, actors & persistence' },
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
    backend: 'Server & state',
    ui: 'UI',
    tooling: 'Tooling',
    platform: 'Framework',
};

/** package id → target id (derived from the registry). */
export const TARGET_OF: Record<string, TargetId> =
    Object.fromEntries(PACKAGES.map((p) => [p.id, p.target]));

/** Public packages in a target — drives the mega-menu columns and home grid. */
export const inTarget = (target: TargetId): SigxPackage[] =>
    PUBLIC_PACKAGES.filter((p) => p.target === target);

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
 * (`lynx-mod-<id>-docs` / `core-pkg-<id>-docs` / `server-pkg-<id>-docs` /
 * `terminal-pkg-<id>-docs` / `deploy-pkg-<id>-docs` / `actors-pkg-<id>-docs` —
 * see lib/modules.ts).
 * The `-mod-`/`-pkg-` infix keeps these unambiguous against top-level
 * collections (`core-api` vs a core sub-package named `api`), while
 * `packageForCollection`'s prefix split still yields the parent package.
 */
export function moduleForCollection(collection?: string | null): SigxModule | undefined {
    if (!collection) return undefined;
    const m = collection.match(/^(?:lynx-mod|core-pkg|server-pkg|terminal-pkg|deploy-pkg|actors-pkg)-(.+?)-(?:docs|api)$/);
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
