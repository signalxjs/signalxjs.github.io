/**
 * Per-package landing-page feature sets, with a generic fallback so a
 * new package gets a sensible landing without any component edits.
 * Icons are names from the redesign Icon set (components/ui/Icon).
 */

import type { IconName } from '@/components/ui/Icon';
import type { SigxPackage } from '@/lib/family';

export interface LandingFeature {
    icon: IconName;
    title: string;
    body: string;
}

const FEATURES: Record<string, LandingFeature[]> = {
    core: [
        { icon: 'bolt', title: 'Signals & effects', body: 'Push-based reactivity that updates exactly what changed.' },
        { icon: 'cube', title: 'Tiny runtime', body: '~7kb gzipped with zero dependencies.' },
        { icon: 'book', title: 'TSX components', body: 'A familiar component model with full type inference.' },
    ],
    router: [
        { icon: 'layers', title: 'Nested routes', body: 'Declarative route trees with dynamic params and guards.' },
        { icon: 'bolt', title: 'Reactive params', body: 'Route params and queries are signals — UI updates on navigation.' },
        { icon: 'cube', title: 'SSR-ready', body: 'Isomorphic by default; works with streaming server rendering.' },
    ],
    store: [
        { icon: 'layers', title: 'Centralized state', body: 'Predictable stores for larger apps, built on the signal core.' },
        { icon: 'bolt', title: 'Derived state', body: 'Computed values update automatically and exactly once.' },
        { icon: 'book', title: 'Typed actions', body: 'Full inference from state shape to actions and getters.' },
    ],
    ssg: [
        { icon: 'book', title: 'MDX collections', body: 'File-based routing and content collections with frontmatter.' },
        { icon: 'bolt', title: 'Island hydration', body: 'Ship static HTML; hydrate only the interactive islands.' },
        { icon: 'terminal', title: 'One command', body: 'Dev server, prerender and sitemap from a single config.' },
    ],
    server: [
        { icon: 'bolt', title: 'Type-safe server functions', body: 'Call server code from a component as a plain async function — serverFn compiles to a secure-by-default RPC endpoint. No routes, no fetch wrappers, no DTOs to keep in sync.' },
        { icon: 'sparkle', title: 'Resumable by default', body: 'Ship almost no JS. The browser gets a tiny loader, and a component’s chunk loads only when a handler first writes state — upgrade-on-write, not hydrate-everything.' },
        { icon: 'layers', title: 'Streaming SSR & hydration', body: 'Render to a string or a stream for a fast first paint, re-attach reactivity on the client, and manage the document head.' },
        { icon: 'cube', title: 'Islands when you want them', body: 'Hydrate only the interactive parts with client:load / idle / visible / media — each in its own code-split chunk.' },
        { icon: 'book', title: 'Your types on the wire', body: 'Date, Map, Set, bigint, URL and your own classes round-trip across every boundary through the serialize codec — not just JSON.' },
        { icon: 'terminal', title: 'One plugin wires it all', body: 'The Vite plugin sets up SSR, server functions and resume together — manifests and endpoints included, zero config in dev.' },
    ],
    lynx: [
        { icon: 'layers', title: 'Real native views', body: 'Components render to UIView / Android View — not a webview.' },
        { icon: 'bolt', title: 'Fine-grained updates', body: 'Only the nodes that read a changed signal re-render. No diffing.' },
        { icon: 'terminal', title: 'One toolchain', body: 'Same CLI, Vite plugin and devtools you already use on the web.' },
        { icon: 'cube', title: 'Shared components', body: 'Lift logic and components straight from your web app.' },
        { icon: 'sparkle', title: 'Native gestures', body: 'First-class pan, tap and swipe with platform-correct physics.' },
        { icon: 'book', title: 'Typed by default', body: 'End-to-end TSX with full inference across the bridge.' },
    ],
    terminal: [
        { icon: 'terminal', title: 'TUIs in TSX', body: 'The reactive component model, rendered to terminal cells.' },
        { icon: 'layers', title: 'Flexbox layout', body: 'Familiar layout primitives for panes, lists and prompts.' },
        { icon: 'bolt', title: 'Live updates', body: 'Signals drive efficient repaints of just the cells that changed.' },
    ],
    daisyui: [
        { icon: 'sparkle', title: 'Themed components', body: 'Buttons, forms, modals and more with full DaisyUI theme support.' },
        { icon: 'layers', title: 'Accessible by default', body: 'Keyboard and screen-reader friendly out of the box.' },
        { icon: 'cube', title: 'Tailwind v4 native', body: 'Composes cleanly with your utilities and design tokens.' },
    ],
    monaco: [
        { icon: 'terminal', title: 'Editor component', body: 'A pluggable Monaco wrapper with themes and language support.' },
        { icon: 'bolt', title: 'Live code', body: 'Powers the runnable, editable samples across these docs.' },
        { icon: 'cube', title: 'Bundled or CDN', body: 'Prebundle for offline or load from a CDN — your choice.' },
    ],
    cli: [
        { icon: 'terminal', title: 'Scaffolding', body: 'npm create @sigx@latest — new projects in seconds.' },
        { icon: 'layers', title: 'Plugin discovery', body: 'Add platforms and integrations with a single command.' },
        { icon: 'bolt', title: 'Platform commands', body: 'Build, run and ship to web, native and terminal targets.' },
    ],
    vite: [
        { icon: 'bolt', title: 'Instant HMR', body: 'Component-level hot updates that preserve signal state.' },
        { icon: 'cube', title: 'Optimized builds', body: 'Tree-shaken, code-split production output by default.' },
        { icon: 'book', title: 'Zero config', body: 'One plugin enables TSX, islands and dev ergonomics.' },
    ],
    devtools: [
        { icon: 'sparkle', title: 'Reactive graph', body: 'Trace which signals drive which effects and components.' },
        { icon: 'bolt', title: 'Time travel', body: 'Step through effect runs and state transitions.' },
        { icon: 'layers', title: 'Component inspector', body: 'Inspect props, signals and emitted events live.' },
    ],
};

export function featuresFor(pkg: SigxPackage): LandingFeature[] {
    return FEATURES[pkg.id] ?? [
        { icon: 'bolt', title: 'Reactive by default', body: `${pkg.title} is built on the same signal core as the rest of SignalX.` },
        { icon: 'cube', title: 'Composable', body: 'Drop it into an existing SignalX app — it just works with the others.' },
        { icon: 'book', title: 'Fully typed', body: 'First-class TypeScript with inference across every API.' },
    ];
}
