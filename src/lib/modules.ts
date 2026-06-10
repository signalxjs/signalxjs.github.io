/**
 * SignalX sub-package registry — the modules inside the collection
 * packages (core, lynx — see `kind: 'collection'` in lib/family.ts).
 *
 * Presentational chrome ONLY (tiles, hues, switcher groups, catalog
 * cards): docs content + navigation stay data-driven from the SSG —
 * each module owns a real MDX collection (`lynx-mod-<id>-docs` /
 * `core-pkg-<id>-docs`, see ssg.config.ts + scripts/generate-module-docs.mjs).
 *
 * IMPORTANT: this file is imported by ssg.config.ts at config time —
 * keep it dependency-free (pure data + helpers, type-only imports + the
 * pure-data versions.generated.ts sibling, no `virtual:` / framework
 * imports). The `.ts` extension on that import is required so plain Node
 * (type-stripping) can resolve it; tsconfig has `allowImportingTsExtensions`.
 */

import type { PackageStatus } from './family';
import { VERSIONS } from './versions.generated.ts';

export type ModuleParent = 'lynx' | 'core' | 'server';

export interface SigxModule {
    /** Stable id — also the route segment and collection infix. */
    id: string;
    /** Collection package this module ships from. */
    parent: ModuleParent;
    npm: string;
    name: string;
    /** Grouping bucket in the module switcher / catalog filter. */
    category: string;
    /** Accent hue (OKLCH hue angle) — drives `--pkg-h`. */
    hue: number;
    glyph: string;
    status: PackageStatus;
    version: string;
    /** Weekly downloads label for catalog cards. */
    downloads?: string;
    /** One-line tagline (menus, switcher, strips). */
    tag: string;
    /** Longer blurb for catalog cards. */
    blurb: string;
    /** Role badge on collection strips (core: "Web renderer", "Umbrella" …). */
    role?: string;
    /** Screenshot count — modules with shots > 0 are featured on landings. */
    shots?: number;
    /**
     * Set when this catalog entry is really a top-level family package
     * (e.g. lynx "framework" → the lynx package itself). It renders in
     * catalogs/strips but routes to that package's canonical docs and
     * gets NO generated collection of its own — a package is documented
     * by the repo it ships from, once.
     */
    aliasFor?: string;
}

export const MODULE_CATEGORIES: Record<ModuleParent, { id: string; label: string }[]> = {
    lynx: [
        { id: 'framework', label: 'Framework' },
        { id: 'runtime', label: 'Runtime' },
        { id: 'native', label: 'Native modules' },
        { id: 'motion', label: 'Gestures & motion' },
        { id: 'ui', label: 'UI & routing' },
        { id: 'devtools', label: 'Dev tooling' },
    ],
    core: [
        { id: 'packages', label: 'Core repo' },
    ],
    server: [
        { id: 'packages', label: 'SSR packages' },
    ],
};

/**
 * Literal registry. Each `version` is the offline fallback; the live npm
 * `latest` is overlaid below from versions.generated.ts (refreshed at build
 * time by scripts/fetch-versions.mjs).
 */
const RAW_MODULES: SigxModule[] = [
    // ============ Lynx (@sigx/lynx-*) — lockstep-versioned ============
    // ---- Framework ----
    { id: 'framework', parent: 'lynx', npm: '@sigx/lynx', name: 'Lynx', category: 'framework',
      hue: 285, glyph: '◑', status: 'stable', version: '0.5.0', downloads: '52k', shots: 0, aliasFor: 'lynx',
      tag: 'Framework barrel',
      blurb: 'Re-exports reactivity, runtime-core and the Lynx renderer under one import — home of SharedValue / useSharedValue.' },
    { id: 'plugin', parent: 'lynx', npm: '@sigx/lynx-plugin', name: 'Build Plugin', category: 'framework',
      hue: 318, glyph: '◮', status: 'stable', version: '0.5.0', downloads: '47k', shots: 0,
      tag: 'Rspack / Rspeedy plugin',
      blurb: 'Splits your source into the BG + MT bundles Lynx requires and runs the main-thread worklet transform.' },
    { id: 'cli', parent: 'lynx', npm: '@sigx/lynx-cli', name: 'CLI Plugin', category: 'framework',
      hue: 264, glyph: '›', status: 'stable', version: '0.5.0', downloads: '46k', shots: 0,
      tag: '@sigx/cli plugin',
      blurb: 'dev / build / prebuild / doctor / run:android / run:ios / run:web, plus the autolinker for native modules.' },

    // ---- Runtime ----
    { id: 'runtime', parent: 'lynx', npm: '@sigx/lynx-runtime', name: 'Runtime', category: 'runtime',
      hue: 232, glyph: '⊟', status: 'stable', version: '0.5.0', downloads: '45k', shots: 0,
      tag: 'Background-thread renderer',
      blurb: 'sigx RuntimeRenderer adapter, op queue, useMainThreadRef, useSharedValue and runOnMainThread.' },
    { id: 'runtime-main', parent: 'lynx', npm: '@sigx/lynx-runtime-main', name: 'Main Runtime', category: 'runtime',
      hue: 210, glyph: '⊞', status: 'stable', version: '0.5.0', downloads: '44k', shots: 0,
      tag: 'Main-thread (Lepus) runtime',
      blurb: 'Applies the BG → MT op stream via Lynx PAPI, runs worklets and drives useAnimatedStyle.' },
    { id: 'core', parent: 'lynx', npm: '@sigx/lynx-core', name: 'Native Bridge', category: 'runtime',
      hue: 200, glyph: '⊙', status: 'stable', version: '0.5.0', downloads: '44k', shots: 0,
      tag: 'Low-level NativeModules bridge',
      blurb: 'getModule, callSync, callAsync, guardModule — every native-module package depends on this.' },

    // ---- Native modules ----
    { id: 'biometric', parent: 'lynx', npm: '@sigx/lynx-biometric', name: 'Biometric', category: 'native',
      hue: 350, glyph: '✺', status: 'beta', version: '0.5.0', downloads: '12k', shots: 2,
      tag: 'Face ID / Touch ID auth',
      blurb: 'Biometric authentication — Face ID, Touch ID and BiometricPrompt.' },
    { id: 'camera', parent: 'lynx', npm: '@sigx/lynx-camera', name: 'Camera', category: 'native',
      hue: 24, glyph: '◉', status: 'stable', version: '0.5.0', downloads: '19k', shots: 3,
      tag: 'Camera capture',
      blurb: 'Photo and video capture with a reactive preview API.' },
    { id: 'clipboard', parent: 'lynx', npm: '@sigx/lynx-clipboard', name: 'Clipboard', category: 'native',
      hue: 60, glyph: '▤', status: 'stable', version: '0.5.0', downloads: '22k', shots: 0,
      tag: 'System clipboard',
      blurb: 'Read from and write to the system clipboard.' },
    { id: 'device-info', parent: 'lynx', npm: '@sigx/lynx-device-info', name: 'Device Info', category: 'native',
      hue: 138, glyph: '◳', status: 'stable', version: '0.5.0', downloads: '24k', shots: 0,
      tag: 'Device metrics',
      blurb: 'Device model, OS version, locale and screen metrics.' },
    { id: 'file-system', parent: 'lynx', npm: '@sigx/lynx-file-system', name: 'File System', category: 'native',
      hue: 158, glyph: '❏', status: 'stable', version: '0.5.0', downloads: '17k', shots: 0,
      tag: 'Sandboxed file access',
      blurb: 'Read / write / delete and list files in the app documents directory.' },
    { id: 'haptics', parent: 'lynx', npm: '@sigx/lynx-haptics', name: 'Haptics', category: 'native',
      hue: 46, glyph: '∿', status: 'stable', version: '0.5.0', downloads: '33k', shots: 0,
      tag: 'Haptic feedback',
      blurb: 'Impact, selection and notification haptic feedback.' },
    { id: 'image-picker', parent: 'lynx', npm: '@sigx/lynx-image-picker', name: 'Image Picker', category: 'native',
      hue: 18, glyph: '◫', status: 'beta', version: '0.5.0', downloads: '16k', shots: 2,
      tag: 'Pick / capture images',
      blurb: 'Pick or capture images from the photo library or camera.' },
    { id: 'linking', parent: 'lynx', npm: '@sigx/lynx-linking', name: 'Linking', category: 'native',
      hue: 196, glyph: '⊶', status: 'stable', version: '0.5.0', downloads: '20k', shots: 0,
      tag: 'Deep links & URL schemes',
      blurb: 'openURL, getInitialURL and inbound URL events.' },
    { id: 'location', parent: 'lynx', npm: '@sigx/lynx-location', name: 'Location', category: 'native',
      hue: 170, glyph: '◎', status: 'stable', version: '0.5.0', downloads: '23k', shots: 1,
      tag: 'GPS coordinates',
      blurb: 'One-shot and watch APIs for device location.' },
    { id: 'network', parent: 'lynx', npm: '@sigx/lynx-network', name: 'Network', category: 'native',
      hue: 220, glyph: '◴', status: 'stable', version: '0.5.0', downloads: '26k', shots: 0,
      tag: 'Connectivity status',
      blurb: 'wifi / cellular / none status. Pair with fetch or WebSocket — not a transport.' },
    { id: 'notifications', parent: 'lynx', npm: '@sigx/lynx-notifications', name: 'Notifications', category: 'native',
      hue: 12, glyph: '❂', status: 'beta', version: '0.5.0', downloads: '18k', shots: 2,
      tag: 'Local notifications',
      blurb: 'Schedule and present local push notifications.' },
    { id: 'permissions', parent: 'lynx', npm: '@sigx/lynx-permissions', name: 'Permissions', category: 'native',
      hue: 78, glyph: '▥', status: 'stable', version: '0.5.0', downloads: '14k', shots: 0,
      tag: 'Permission helper',
      blurb: 'Shared Android permission helper used by other native modules.' },
    { id: 'safe-area', parent: 'lynx', npm: '@sigx/lynx-safe-area', name: 'Safe Area', category: 'native',
      hue: 300, glyph: '▢', status: 'stable', version: '0.5.0', downloads: '28k', shots: 1,
      tag: 'Safe-area insets',
      blurb: 'Notch, home indicator, status bar and keyboard insets.' },
    { id: 'secure-storage', parent: 'lynx', npm: '@sigx/lynx-secure-storage', name: 'Secure Storage', category: 'native',
      hue: 96, glyph: '▩', status: 'beta', version: '0.5.0', downloads: '15k', shots: 0,
      tag: 'Encrypted KV storage',
      blurb: 'Keychain / Keystore-backed KV with optional per-key biometric gating.' },
    { id: 'share', parent: 'lynx', npm: '@sigx/lynx-share', name: 'Share', category: 'native',
      hue: 250, glyph: '⊼', status: 'stable', version: '0.5.0', downloads: '21k', shots: 1,
      tag: 'Native share sheet',
      blurb: 'UIActivityViewController / Intent.ACTION_SEND share sheet.' },
    { id: 'storage', parent: 'lynx', npm: '@sigx/lynx-storage', name: 'Storage', category: 'native',
      hue: 110, glyph: '▦', status: 'stable', version: '0.5.0', downloads: '34k', shots: 0,
      tag: 'Persistent KV store',
      blurb: 'Persistent string key-value store (UserDefaults / SharedPreferences).' },
    { id: 'websocket', parent: 'lynx', npm: '@sigx/lynx-websocket', name: 'WebSocket', category: 'native',
      hue: 240, glyph: '◇', status: 'beta', version: '0.5.0', downloads: '17k', shots: 0,
      tag: 'WebSocket global',
      blurb: 'Browser-standard WebSocket — URLSessionWebSocketTask (iOS), OkHttp (Android).' },

    // ---- Gestures & motion ----
    { id: 'gestures', parent: 'lynx', npm: '@sigx/lynx-gestures', name: 'Gestures', category: 'motion',
      hue: 285, glyph: '✦', status: 'stable', version: '0.5.0', downloads: '31k', shots: 2,
      tag: 'Frame-locked touch handling',
      blurb: 'Pressable, Draggable, Swipeable + useTap / usePan / usePinch / useSwipe and a useGesture composer.' },
    { id: 'motion', parent: 'lynx', npm: '@sigx/lynx-motion', name: 'Motion', category: 'motion',
      hue: 320, glyph: '◈', status: 'stable', version: '0.5.0', downloads: '29k', shots: 2,
      tag: 'Animation drivers',
      blurb: 'withSpring, withTiming, animate — progress is observable from the background thread for free.' },

    // ---- UI & routing ----
    { id: 'daisyui', parent: 'lynx', npm: '@sigx/lynx-daisyui', name: 'DaisyUI', category: 'ui',
      hue: 350, glyph: '✿', status: 'stable', version: '0.5.0', downloads: '27k', shots: 3,
      tag: 'Component library',
      blurb: 'DaisyUI-flavored component library, stylesheet and Tailwind preset for Lynx.' },
    { id: 'icons', parent: 'lynx', npm: '@sigx/lynx-icons', name: 'Icons', category: 'ui',
      hue: 46, glyph: '✸', status: 'stable', version: '0.5.0', downloads: '25k', shots: 1,
      tag: 'Icon component + registry',
      blurb: '<Icon set name /> with build-time auto-detection and subsetting.' },
    { id: 'icons-fa', parent: 'lynx', npm: '@sigx/lynx-icons-fa-free', name: 'FA Icons', category: 'ui',
      hue: 40, glyph: '✷', status: 'beta', version: '0.5.0', downloads: '11k', shots: 0,
      tag: 'Font Awesome adapter',
      blurb: 'Font Awesome Free adapter for @sigx/lynx-icons (solid / regular / brands).' },
    { id: 'icons-lucide', parent: 'lynx', npm: '@sigx/lynx-icons-lucide', name: 'Lucide Icons', category: 'ui',
      hue: 200, glyph: '✶', status: 'beta', version: '0.5.0', downloads: '13k', shots: 0,
      tag: 'Lucide adapter',
      blurb: 'Lucide adapter for @sigx/lynx-icons (SVG-mode only).' },
    { id: 'navigation', parent: 'lynx', npm: '@sigx/lynx-navigation', name: 'Navigation', category: 'ui',
      hue: 232, glyph: '⌖', status: 'stable', version: '0.5.0', downloads: '48k', shots: 3,
      tag: 'Type-first native navigator',
      blurb: 'Stack, Tabs, Drawer, modals, lazy routes and deep links.' },

    // ---- Dev tooling ----
    { id: 'dev-client', parent: 'lynx', npm: '@sigx/lynx-dev-client', name: 'Dev Client', category: 'devtools',
      hue: 158, glyph: '◵', status: 'stable', version: '0.5.0', downloads: '38k', shots: 1,
      tag: 'On-device dev menu',
      blurb: 'Debug-only auto-linked module — dev menu, QR scanner and devtool wiring.' },
    { id: 'testing', parent: 'lynx', npm: '@sigx/lynx-testing', name: 'Testing', category: 'devtools',
      hue: 138, glyph: '◷', status: 'stable', version: '0.5.0', downloads: '20k', shots: 0,
      tag: 'Component testing',
      blurb: 'render, fireEvent and queries — no native runtime needed.' },

    // ---- Additional native modules ----
    { id: 'appearance', parent: 'lynx', npm: '@sigx/lynx-appearance', name: 'Appearance', category: 'native',
      hue: 280, glyph: '◐', status: 'stable', version: '0.5.0',
      tag: 'System color scheme & bars',
      blurb: 'Observe the system color scheme and tint the status / navigation bars.' },
    { id: 'audio', parent: 'lynx', npm: '@sigx/lynx-audio', name: 'Audio', category: 'native',
      hue: 8, glyph: '♫', status: 'stable', version: '0.5.0',
      tag: 'Recording & playback',
      blurb: 'Record and play audio with metering and reactive handles.' },
    { id: 'background', parent: 'lynx', npm: '@sigx/lynx-background', name: 'Background Tasks', category: 'native',
      hue: 214, glyph: '◴', status: 'stable', version: '0.5.0',
      tag: 'Periodic sync & fetch',
      blurb: 'Schedule periodic background sync and fetch (BGTaskScheduler / WorkManager).' },
    { id: 'file-picker', parent: 'lynx', npm: '@sigx/lynx-file-picker', name: 'File Picker', category: 'native',
      hue: 162, glyph: '◰', status: 'stable', version: '0.5.0',
      tag: 'Document picker',
      blurb: 'Pick arbitrary files and documents from the system picker.' },
    { id: 'http', parent: 'lynx', npm: '@sigx/lynx-http', name: 'HTTP', category: 'native',
      hue: 222, glyph: '⇄', status: 'stable', version: '0.5.0',
      tag: 'WHATWG fetch transport',
      blurb: 'A native fetch implementation with FormData uploads and streaming response bodies.' },
    { id: 'keyboard', parent: 'lynx', npm: '@sigx/lynx-keyboard', name: 'Keyboard', category: 'native',
      hue: 104, glyph: '▭', status: 'stable', version: '0.5.0',
      tag: 'Soft-keyboard handling',
      blurb: 'KeyboardAvoidingView, KeyboardStickyView and keyboard hooks.' },

    // ---- Additional UI modules ----
    { id: 'datetime-picker', parent: 'lynx', npm: '@sigx/lynx-datetime-picker', name: 'Date/Time Picker', category: 'ui',
      hue: 188, glyph: '◷', status: 'stable', version: '0.5.0',
      tag: 'Native date & time picker',
      blurb: 'Native date / time / datetime picker (UIDatePicker / DatePickerDialog).' },
    { id: 'emoji', parent: 'lynx', npm: '@sigx/lynx-emoji', name: 'Emoji Picker', category: 'ui',
      hue: 45, glyph: '⊚', status: 'stable', version: '0.5.0',
      tag: 'Themable emoji picker',
      blurb: 'Headless categorized emoji grid with search, skin tones and recents.' },
    { id: 'maps', parent: 'lynx', npm: '@sigx/lynx-maps', name: 'Maps', category: 'ui',
      hue: 152, glyph: '◍', status: 'stable', version: '0.5.0',
      tag: 'Native map view',
      blurb: 'Native map view with markers and regions (MKMapView / Google Maps).' },
    { id: 'markdown', parent: 'lynx', npm: '@sigx/lynx-markdown', name: 'Markdown', category: 'ui',
      hue: 258, glyph: '▤', status: 'stable', version: '0.5.0',
      tag: 'Streaming markdown renderer',
      blurb: 'Zero-dependency markdown parsed in JS and rendered to native views, with streaming for AI output.' },
    { id: 'richtext', parent: 'lynx', npm: '@sigx/lynx-richtext', name: 'Rich Text', category: 'ui',
      hue: 302, glyph: '¶', status: 'stable', version: '0.5.0',
      tag: 'Native rich-text input',
      blurb: 'Attributed rich-text editing element with a span document model and formatting commands.' },
    { id: 'video', parent: 'lynx', npm: '@sigx/lynx-video', name: 'Video', category: 'ui',
      hue: 2, glyph: '▷', status: 'stable', version: '0.5.0',
      tag: 'Native video player',
      blurb: 'Native video player component (AVPlayer / ExoPlayer).' },
    { id: 'webview', parent: 'lynx', npm: '@sigx/lynx-webview', name: 'WebView', category: 'ui',
      hue: 206, glyph: '◫', status: 'stable', version: '0.5.0',
      tag: 'Native web view',
      blurb: 'Embed web content with a native WebView (WKWebView / android.webkit.WebView).' },

    // ---- Design systems ----
    { id: 'heroui', parent: 'lynx', npm: '@sigx/lynx-heroui', name: 'HeroUI', category: 'ui',
      hue: 266, glyph: '❖', status: 'beta', version: '0.5.0',
      tag: 'HeroUI design system',
      blurb: 'HeroUI-flavored component library, stylesheet and Tailwind preset for Lynx.' },
    { id: 'zero', parent: 'lynx', npm: '@sigx/lynx-zero', name: 'Zero', category: 'ui',
      hue: 240, glyph: '○', status: 'stable', version: '0.5.0',
      tag: 'Headless design-system foundation',
      blurb: 'Headless-first primitives, theme engine and Tailwind preset that custom design systems build on.' },

    // ============ Core repo sub-packages ============
    // core is a collection meta-package, like lynx — the "web platform"
    // is just runtime-dom + the sigx umbrella living in here.
    { id: 'reactivity', parent: 'core', npm: '@sigx/reactivity', name: 'Reactivity', category: 'packages',
      hue: 285, glyph: '◇', status: 'stable', version: '0.5.0', role: 'Primitives',
      tag: 'Signals, computed & effects',
      blurb: 'Signals, computed and effects — the reactive primitives everything is built on.' },
    { id: 'runtime-core', parent: 'core', npm: '@sigx/runtime-core', name: 'Runtime Core', category: 'packages',
      hue: 264, glyph: '⊙', status: 'stable', version: '0.5.0', role: 'Shared base',
      tag: 'Renderer-agnostic component model',
      blurb: 'Component model and renderer base shared across every render target.' },
    { id: 'runtime-dom', parent: 'core', npm: '@sigx/runtime-dom', name: 'Runtime DOM', category: 'packages',
      hue: 232, glyph: '◧', status: 'stable', version: '0.5.0', role: 'Web renderer',
      tag: 'The DOM renderer',
      blurb: 'The DOM renderer — this is SignalX on the web.' },
    { id: 'sigx', parent: 'core', npm: 'sigx', name: 'sigx', category: 'packages',
      hue: 200, glyph: '◑', status: 'stable', version: '0.5.0', role: 'Umbrella', aliasFor: 'core',
      tag: 'The public umbrella package',
      blurb: 'The public umbrella package you import in web apps (reactivity + runtime-core + runtime-dom).' },
    { id: 'vite', parent: 'core', npm: '@sigx/vite', name: 'Vite Plugin', category: 'packages',
      hue: 318, glyph: '◮', status: 'stable', version: '0.5.0', role: 'Tooling', aliasFor: 'vite',
      tag: 'Vite plugin & HMR',
      blurb: 'Vite plugin for dev and build with component HMR.' },

    // ============ Server (SSR) packages ============
    // `server` is a docs-only collection — there is no `@sigx/server`
    // umbrella npm package. It groups the two SSR packages: the renderer
    // (ships from signalxjs/core) and islands (ships from signalxjs/ssr-islands,
    // depends on the renderer).
    { id: 'server-renderer', parent: 'server', npm: '@sigx/server-renderer', name: 'Server Renderer', category: 'packages',
      hue: 210, glyph: '⊟', status: 'stable', version: '0.5.0', role: 'Renderer',
      tag: 'Streaming SSR & hydration',
      blurb: 'Render components to an HTML string or stream on the server, hydrate the DOM on the client, manage the document head, and extend rendering through the plugin SPI.' },
    { id: 'ssr-islands', parent: 'server', npm: '@sigx/ssr-islands', name: 'Islands', category: 'packages',
      hue: 40, glyph: '❖', status: 'stable', version: '0.4.2', role: 'Islands',
      tag: 'Selective hydration via client:*',
      blurb: 'Islands architecture for SignalX SSR — hydrate only interactive components with client:load / idle / visible / media / only, with per-island code splitting. Layers on @sigx/server-renderer.' },
];

/** Registry with live npm versions overlaid (falls back to the literal). */
export const MODULES: SigxModule[] =
    RAW_MODULES.map((m) => ({ ...m, version: VERSIONS[m.npm] ?? m.version }));

/** Featured Lynx modules surfaced directly in the family menu's Lynx column. */
export const LYNX_FEATURED = ['navigation', 'daisyui', 'gestures', 'motion'];

/**
 * Component-library catalogs — component-heavy packages render this as
 * a categorized component menu in their docs (web daisyui + lynx daisyui
 * expose the same ~61-component surface).
 */
export const COMPONENT_CATALOGS: Record<string, { cat: string; items: string[] }[]> = {
    daisyui: [
        { cat: 'Actions', items: ['Button', 'Dropdown', 'Modal', 'Swap', 'Theme Controller'] },
        { cat: 'Data display', items: ['Accordion', 'Avatar', 'Badge', 'Card', 'Carousel', 'Chat bubble', 'Collapse', 'Countdown', 'Diff', 'Kbd', 'List', 'Stat', 'Status', 'Table', 'Timeline'] },
        { cat: 'Navigation', items: ['Breadcrumbs', 'Dock', 'Link', 'Menu', 'Navbar', 'Pagination', 'Steps', 'Tab'] },
        { cat: 'Feedback', items: ['Alert', 'Loading', 'Progress', 'Radial progress', 'Skeleton', 'Toast', 'Tooltip'] },
        { cat: 'Data input', items: ['Calendar', 'Checkbox', 'Fieldset', 'File input', 'Filter', 'Label', 'Radio', 'Range', 'Rating', 'Select', 'Text input', 'Textarea', 'Toggle', 'Validator'] },
        { cat: 'Layout', items: ['Divider', 'Drawer', 'Footer', 'Hero', 'Indicator', 'Join', 'Mask', 'Stack'] },
        { cat: 'Mockup', items: ['Browser', 'Code', 'Phone', 'Window'] },
    ],
    'lynx-daisyui': [
        { cat: 'Actions', items: ['Button'] },
        { cat: 'Data display', items: ['Avatar'] },
        { cat: 'Data input', items: ['Input', 'Textarea', 'Select', 'Checkbox', 'Radio', 'Toggle', 'FormField'] },
        { cat: 'Feedback', items: ['Alert', 'Badge', 'Loading', 'Modal', 'Progress', 'Skeleton', 'Steps'] },
        { cat: 'Layout', items: ['Card', 'Divider'] },
        { cat: 'Navigation', items: ['Tabs', 'NavTabBar', 'NavHeader', 'NavDrawer', 'SwiperIndicator'] },
        { cat: 'Typography', items: ['Text', 'Heading'] },
    ],
    'lynx-heroui': [
        { cat: 'Actions', items: ['Button'] },
        { cat: 'Data input', items: ['Input', 'Textarea', 'Checkbox', 'Radio', 'Toggle'] },
        { cat: 'Feedback', items: ['Modal'] },
        { cat: 'Layout', items: ['Card'] },
        { cat: 'Navigation', items: ['Tabs'] },
        { cat: 'Typography', items: ['Text', 'Heading'] },
    ],
    'lynx-markdown': [
        { cat: 'Content', items: ['MarkdownView'] },
        { cat: 'Editing', items: ['MarkdownEditor', 'EditorToolbar', 'SuggestionPopup'] },
    ],
};

export const moduleById: Record<string, SigxModule> =
    Object.fromEntries(MODULES.map((m) => [m.id, m]));

export const modulesByParent = (parent: ModuleParent): SigxModule[] =>
    MODULES.filter((m) => m.parent === parent);

export const modulesInCategory = (parent: ModuleParent, category: string): SigxModule[] =>
    MODULES.filter((m) => m.parent === parent && m.category === category);

/** Route prefix of a module's docs pages (catalog pages live at the parent prefix). */
export const moduleRoutePrefix = (m: SigxModule): string =>
    m.parent === 'lynx' ? `/lynx/modules/${m.id}`
        : m.parent === 'server' ? `/server/packages/${m.id}`
        : `/core/packages/${m.id}`;

/**
 * Docs collection name for a module, or undefined for `aliasFor` entries
 * (those are documented by their top-level package). The `-mod-`/`-pkg-`
 * infix keeps names unambiguous against top-level `<id>-docs`/`<id>-api`
 * collections while `packageForCollection`'s prefix split still resolves
 * the parent package.
 */
export const moduleDocsCollection = (m: SigxModule): string | undefined =>
    m.aliasFor ? undefined
        : m.parent === 'lynx' ? `lynx-mod-${m.id}-docs`
        : m.parent === 'server' ? `server-pkg-${m.id}-docs`
        : `core-pkg-${m.id}-docs`;
