/**
 * SignalX sub-package registry — the modules inside the collection
 * packages (core, lynx, server, terminal — see `kind: 'collection'` in
 * lib/family.ts).
 *
 * Presentational chrome ONLY (tiles, hues, switcher groups, catalog
 * cards): docs content + navigation stay data-driven from the SSG —
 * each module owns a real MDX collection (`lynx-mod-<id>-docs` /
 * `core-pkg-<id>-docs` / `server-pkg-<id>-docs` /
 * `terminal-pkg-<id>-docs`, see ssg.config.ts +
 * scripts/generate-module-docs.mjs).
 *
 * IMPORTANT: this file is imported by ssg.config.ts at config time —
 * keep it dependency-free (pure data + helpers, type-only imports + the
 * pure-data versions.generated.ts sibling, no `virtual:` / framework
 * imports). The `.ts` extension on that import is required so plain Node
 * (type-stripping) can resolve it; tsconfig has `allowImportingTsExtensions`.
 */

import type { PackageStatus } from './family';
import { VERSIONS } from './versions.generated.ts';

export type ModuleParent = 'lynx' | 'core' | 'server' | 'terminal' | 'deploy' | 'actors';

/**
 * Release gate for the actors line. `false` keeps `/actors/` off every PUBLIC
 * surface while the packages are unpublished; the pages themselves carry
 * `draft: true`, which makes the SSG drop them from the build entirely.
 *
 * Drafts alone are not enough: a registry row still renders tiles in the
 * mega-menu, home grid and ⌘K palette, linking to pages production never
 * emitted. So the public enumerations read `PUBLIC_PACKAGES` (lib/family.ts)
 * and the llms.txt sections are gated on this flag (ssg.config.ts).
 *
 * Dev ignores this flag — see SHOW_ACTORS in lib/family.ts. Writing an
 * unreleased area should feel like writing any other, and dev should show the
 * layout as it will ship, including `server` sitting beside `actors` in the
 * backend group. Only production hides it.
 *
 * On publish day: flip to `true` and strip `draft: true` from
 * src/pages/actors/**. The `server` category move follows automatically.
 */
export const ACTORS_RELEASED = false;

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
        { id: 'packages', label: 'Server packages' },
    ],
    terminal: [
        { id: 'stack', label: 'TUI stack' },
        { id: 'tooling', label: 'Standalone tooling' },
    ],
    deploy: [
        { id: 'adapters', label: 'Platform adapters' },
    ],
    actors: [
        { id: 'runtime', label: 'Runtime' },
        { id: 'providers', label: 'Storage & membership' },
        { id: 'transports', label: 'Host transports' },
        { id: 'platforms', label: 'Platform backends' },
        { id: 'tooling', label: 'Tooling & observability' },
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
      hue: 285, glyph: '◑', status: 'stable', version: '0.23.0', downloads: '52k', shots: 0, aliasFor: 'lynx',
      tag: 'Framework barrel',
      blurb: 'Re-exports reactivity, runtime-core and the Lynx renderer under one import — home of SharedValue / useSharedValue.' },
    { id: 'plugin', parent: 'lynx', npm: '@sigx/lynx-plugin', name: 'Build Plugin', category: 'framework',
      hue: 318, glyph: '◮', status: 'stable', version: '0.23.0', downloads: '47k', shots: 0,
      tag: 'Rspack / Rspeedy plugin',
      blurb: 'Splits your source into the BG + MT bundles Lynx requires and runs the main-thread worklet transform.' },
    { id: 'cli', parent: 'lynx', npm: '@sigx/lynx-cli', name: 'CLI Plugin', category: 'framework',
      hue: 264, glyph: '›', status: 'stable', version: '0.23.0', downloads: '46k', shots: 0,
      tag: '@sigx/cli plugin',
      blurb: 'dev / build / prebuild / doctor / run:android / run:ios / run:web, plus the autolinker for native modules.' },

    // ---- Runtime ----
    { id: 'runtime', parent: 'lynx', npm: '@sigx/lynx-runtime', name: 'Runtime', category: 'runtime',
      hue: 232, glyph: '⊟', status: 'stable', version: '0.23.0', downloads: '45k', shots: 0,
      tag: 'Background-thread renderer',
      blurb: 'sigx RuntimeRenderer adapter, op queue, useMainThreadRef, useSharedValue and runOnMainThread.' },
    { id: 'runtime-main', parent: 'lynx', npm: '@sigx/lynx-runtime-main', name: 'Main Runtime', category: 'runtime',
      hue: 210, glyph: '⊞', status: 'stable', version: '0.23.0', downloads: '44k', shots: 0,
      tag: 'Main-thread (Lepus) runtime',
      blurb: 'Applies the BG → MT op stream via Lynx PAPI, runs worklets and drives useAnimatedStyle.' },
    { id: 'core', parent: 'lynx', npm: '@sigx/lynx-core', name: 'Native Bridge', category: 'runtime',
      hue: 200, glyph: '⊙', status: 'stable', version: '0.23.0', downloads: '44k', shots: 0,
      tag: 'Low-level NativeModules bridge',
      blurb: 'getModule, callSync, callAsync, guardModule — every native-module package depends on this.' },

    // ---- Native modules ----
    { id: 'biometric', parent: 'lynx', npm: '@sigx/lynx-biometric', name: 'Biometric', category: 'native',
      hue: 350, glyph: '✺', status: 'beta', version: '0.23.0', downloads: '12k', shots: 2,
      tag: 'Face ID / Touch ID auth',
      blurb: 'Biometric authentication — Face ID, Touch ID and BiometricPrompt.' },
    { id: 'camera', parent: 'lynx', npm: '@sigx/lynx-camera', name: 'Camera', category: 'native',
      hue: 24, glyph: '◉', status: 'stable', version: '0.23.0', downloads: '19k', shots: 3,
      tag: 'Camera capture',
      blurb: 'Photo and video capture with a reactive preview API.' },
    { id: 'clipboard', parent: 'lynx', npm: '@sigx/lynx-clipboard', name: 'Clipboard', category: 'native',
      hue: 60, glyph: '▤', status: 'stable', version: '0.23.0', downloads: '22k', shots: 0,
      tag: 'System clipboard',
      blurb: 'Read from and write to the system clipboard.' },
    { id: 'file-system', parent: 'lynx', npm: '@sigx/lynx-file-system', name: 'File System', category: 'native',
      hue: 158, glyph: '❏', status: 'stable', version: '0.23.0', downloads: '17k', shots: 0,
      tag: 'Sandboxed file access',
      blurb: 'Read / write / delete and list files in the app documents directory.' },
    { id: 'haptics', parent: 'lynx', npm: '@sigx/lynx-haptics', name: 'Haptics', category: 'native',
      hue: 46, glyph: '∿', status: 'stable', version: '0.23.0', downloads: '33k', shots: 0,
      tag: 'Haptic feedback',
      blurb: 'Impact, selection and notification haptic feedback.' },
    { id: 'image-picker', parent: 'lynx', npm: '@sigx/lynx-image-picker', name: 'Image Picker', category: 'native',
      hue: 18, glyph: '◫', status: 'beta', version: '0.23.0', downloads: '16k', shots: 2,
      tag: 'Pick / capture images',
      blurb: 'Pick or capture images from the photo library or camera.' },
    { id: 'linking', parent: 'lynx', npm: '@sigx/lynx-linking', name: 'Linking', category: 'native',
      hue: 196, glyph: '⊶', status: 'stable', version: '0.23.0', downloads: '20k', shots: 0,
      tag: 'Deep links & URL schemes',
      blurb: 'openURL, getInitialURL and inbound URL events.' },
    { id: 'location', parent: 'lynx', npm: '@sigx/lynx-location', name: 'Location', category: 'native',
      hue: 170, glyph: '◎', status: 'stable', version: '0.23.0', downloads: '23k', shots: 1,
      tag: 'GPS coordinates',
      blurb: 'One-shot and watch APIs for device location.' },
    { id: 'network', parent: 'lynx', npm: '@sigx/lynx-network', name: 'Network', category: 'native',
      hue: 220, glyph: '◴', status: 'stable', version: '0.23.0', downloads: '26k', shots: 0,
      tag: 'Connectivity status',
      blurb: 'wifi / cellular / none status. Pair with fetch or WebSocket — not a transport.' },
    { id: 'notifications', parent: 'lynx', npm: '@sigx/lynx-notifications', name: 'Notifications', category: 'native',
      hue: 12, glyph: '❂', status: 'beta', version: '0.23.0', downloads: '18k', shots: 2,
      tag: 'Local notifications',
      blurb: 'Schedule and present local push notifications.' },
    { id: 'permissions', parent: 'lynx', npm: '@sigx/lynx-permissions', name: 'Permissions', category: 'native',
      hue: 78, glyph: '▥', status: 'stable', version: '0.23.0', downloads: '14k', shots: 0,
      tag: 'Permission helper',
      blurb: 'Shared Android permission helper used by other native modules.' },
    { id: 'safe-area', parent: 'lynx', npm: '@sigx/lynx-safe-area', name: 'Safe Area', category: 'native',
      hue: 300, glyph: '▢', status: 'stable', version: '0.23.0', downloads: '28k', shots: 1,
      tag: 'Safe-area insets',
      blurb: 'Notch, home indicator, status bar and keyboard insets.' },
    { id: 'secure-storage', parent: 'lynx', npm: '@sigx/lynx-secure-storage', name: 'Secure Storage', category: 'native',
      hue: 96, glyph: '▩', status: 'beta', version: '0.23.0', downloads: '15k', shots: 0,
      tag: 'Encrypted KV storage',
      blurb: 'Keychain / Keystore-backed KV with optional per-key biometric gating.' },
    { id: 'share', parent: 'lynx', npm: '@sigx/lynx-share', name: 'Share', category: 'native',
      hue: 250, glyph: '⊼', status: 'stable', version: '0.23.0', downloads: '21k', shots: 1,
      tag: 'Native share sheet',
      blurb: 'UIActivityViewController / Intent.ACTION_SEND share sheet.' },
    { id: 'storage', parent: 'lynx', npm: '@sigx/lynx-storage', name: 'Storage', category: 'native',
      hue: 110, glyph: '▦', status: 'stable', version: '0.23.0', downloads: '34k', shots: 0,
      tag: 'Persistent KV store',
      blurb: 'Persistent string key-value store (UserDefaults / SharedPreferences).' },
    { id: 'websocket', parent: 'lynx', npm: '@sigx/lynx-websocket', name: 'WebSocket', category: 'native',
      hue: 240, glyph: '◇', status: 'beta', version: '0.23.0', downloads: '17k', shots: 0,
      tag: 'WebSocket global',
      blurb: 'Browser-standard WebSocket — URLSessionWebSocketTask (iOS), OkHttp (Android).' },

    // ---- Gestures & motion ----
    { id: 'gestures', parent: 'lynx', npm: '@sigx/lynx-gestures', name: 'Gestures', category: 'motion',
      hue: 285, glyph: '✦', status: 'stable', version: '0.23.0', downloads: '31k', shots: 2,
      tag: 'Frame-locked touch handling',
      blurb: 'Pressable, Draggable, Swipeable + useTap / usePan / usePinch / useSwipe and a useGesture composer.' },
    { id: 'motion', parent: 'lynx', npm: '@sigx/lynx-motion', name: 'Motion', category: 'motion',
      hue: 320, glyph: '◈', status: 'stable', version: '0.23.0', downloads: '29k', shots: 2,
      tag: 'Animation drivers',
      blurb: 'withSpring, withTiming, animate — progress is observable from the background thread for free.' },

    // ---- UI & routing ----
    { id: 'daisyui', parent: 'lynx', npm: '@sigx/lynx-daisyui', name: 'DaisyUI', category: 'ui',
      hue: 350, glyph: '✿', status: 'stable', version: '0.23.0', downloads: '27k', shots: 3,
      tag: 'Component library',
      blurb: 'DaisyUI-flavored component library, stylesheet and Tailwind preset for Lynx.' },
    { id: 'icons', parent: 'lynx', npm: '@sigx/lynx-icons', name: 'Icons', category: 'ui',
      hue: 46, glyph: '✸', status: 'stable', version: '0.23.0', downloads: '25k', shots: 1,
      tag: 'Icon component + registry',
      blurb: '<Icon set name /> with build-time auto-detection and subsetting.' },
    { id: 'icons-fa', parent: 'lynx', npm: '@sigx/lynx-icons-fa-free', name: 'FA Icons', category: 'ui',
      hue: 40, glyph: '✷', status: 'beta', version: '0.23.0', downloads: '11k', shots: 0,
      tag: 'Font Awesome adapter',
      blurb: 'Font Awesome Free adapter for @sigx/lynx-icons (solid / regular / brands).' },
    { id: 'icons-lucide', parent: 'lynx', npm: '@sigx/lynx-icons-lucide', name: 'Lucide Icons', category: 'ui',
      hue: 200, glyph: '✶', status: 'beta', version: '0.23.0', downloads: '13k', shots: 0,
      tag: 'Lucide adapter',
      blurb: 'Lucide adapter for @sigx/lynx-icons (SVG-mode only).' },
    { id: 'navigation', parent: 'lynx', npm: '@sigx/lynx-navigation', name: 'Navigation', category: 'ui',
      hue: 232, glyph: '⌖', status: 'stable', version: '0.23.0', downloads: '48k', shots: 3,
      tag: 'Type-first native navigator',
      blurb: 'Stack, Tabs, Drawer, modals, lazy routes and deep links.' },
    { id: 'list', parent: 'lynx', npm: '@sigx/lynx-list', name: 'List', category: 'ui',
      hue: 168, glyph: '☰', status: 'beta', version: '0.23.0', shots: 0,
      tag: 'Data-driven virtualized list',
      blurb: 'Virtualized wrapper over the native list recycler — grid/waterfall, header/footer/empty slots, pull-to-refresh, chat mode and windowing over long histories.' },
    { id: 'sheet', parent: 'lynx', npm: '@sigx/lynx-sheet', name: 'Bottom Sheet', category: 'ui',
      hue: 216, glyph: '⬓', status: 'beta', version: '0.23.0',
      tag: 'Route-free bottom sheet',
      blurb: 'Standalone bottom sheet with DetentSpec geometry (px / fraction / keyboard), persistent or dismissible modes, a backdrop, and handle / surface / grabber drag with inner-scroll arbitration and keyboard riding — the shared engine behind the navigation route sheet.' },

    // ---- Dev tooling ----
    { id: 'dev-client', parent: 'lynx', npm: '@sigx/lynx-dev-client', name: 'Dev Client', category: 'devtools',
      hue: 158, glyph: '◵', status: 'stable', version: '0.23.0', downloads: '38k', shots: 1,
      tag: 'On-device dev menu',
      blurb: 'Debug-only auto-linked module — dev menu, QR scanner and devtool wiring.' },
    { id: 'testing', parent: 'lynx', npm: '@sigx/lynx-testing', name: 'Testing', category: 'devtools',
      hue: 138, glyph: '◷', status: 'stable', version: '0.23.0', downloads: '20k', shots: 0,
      tag: 'Component testing',
      blurb: 'render, fireEvent and queries — no native runtime needed.' },

    // ---- Additional native modules ----
    { id: 'appearance', parent: 'lynx', npm: '@sigx/lynx-appearance', name: 'Appearance', category: 'native',
      hue: 280, glyph: '◐', status: 'stable', version: '0.23.0',
      tag: 'System color scheme & bars',
      blurb: 'Observe the system color scheme and tint the status / navigation bars.' },
    { id: 'audio', parent: 'lynx', npm: '@sigx/lynx-audio', name: 'Audio', category: 'native',
      hue: 8, glyph: '♫', status: 'stable', version: '0.23.0',
      tag: 'Recording & playback',
      blurb: 'Record and play audio with metering and reactive handles.' },
    { id: 'background', parent: 'lynx', npm: '@sigx/lynx-background', name: 'Background Tasks', category: 'native',
      hue: 214, glyph: '◴', status: 'stable', version: '0.23.0',
      tag: 'Periodic sync & fetch',
      blurb: 'Schedule periodic background sync and fetch (BGTaskScheduler / WorkManager).' },
    { id: 'file-picker', parent: 'lynx', npm: '@sigx/lynx-file-picker', name: 'File Picker', category: 'native',
      hue: 162, glyph: '◰', status: 'stable', version: '0.23.0',
      tag: 'Document picker',
      blurb: 'Pick arbitrary files and documents from the system picker.' },
    { id: 'http', parent: 'lynx', npm: '@sigx/lynx-http', name: 'HTTP', category: 'native',
      hue: 222, glyph: '⇄', status: 'stable', version: '0.23.0',
      tag: 'WHATWG fetch transport',
      blurb: 'A native fetch implementation with FormData uploads and streaming response bodies.' },
    { id: 'keyboard', parent: 'lynx', npm: '@sigx/lynx-keyboard', name: 'Keyboard', category: 'native',
      hue: 104, glyph: '▭', status: 'stable', version: '0.23.0',
      tag: 'Soft-keyboard handling',
      blurb: 'KeyboardAvoidingView, KeyboardStickyView and keyboard hooks.' },

    // ---- Additional UI modules ----
    { id: 'datetime-picker', parent: 'lynx', npm: '@sigx/lynx-datetime-picker', name: 'Date/Time Picker', category: 'ui',
      hue: 188, glyph: '◷', status: 'stable', version: '0.23.0',
      tag: 'Native date & time picker',
      blurb: 'Native date / time / datetime picker (UIDatePicker / DatePickerDialog).' },
    { id: 'emoji', parent: 'lynx', npm: '@sigx/lynx-emoji', name: 'Emoji Picker', category: 'ui',
      hue: 45, glyph: '⊚', status: 'stable', version: '0.23.0',
      tag: 'Themable emoji picker',
      blurb: 'Headless categorized emoji grid with search, skin tones and recents.' },
    { id: 'maps', parent: 'lynx', npm: '@sigx/lynx-maps', name: 'Maps', category: 'ui',
      hue: 152, glyph: '◍', status: 'stable', version: '0.23.0',
      tag: 'Native map view',
      blurb: 'Native map view with markers and regions (MKMapView / Google Maps).' },
    { id: 'markdown', parent: 'lynx', npm: '@sigx/lynx-markdown', name: 'Markdown', category: 'ui',
      hue: 258, glyph: '▤', status: 'stable', version: '0.23.0',
      tag: 'Streaming markdown renderer',
      blurb: 'Zero-dependency markdown parsed in JS and rendered to native views, with streaming for AI output.' },
    { id: 'richtext', parent: 'lynx', npm: '@sigx/lynx-richtext', name: 'Rich Text', category: 'ui',
      hue: 302, glyph: '¶', status: 'stable', version: '0.23.0',
      tag: 'Native rich-text input',
      blurb: 'Attributed rich-text editing element with a span document model and formatting commands.' },
    { id: 'video', parent: 'lynx', npm: '@sigx/lynx-video', name: 'Video', category: 'ui',
      hue: 2, glyph: '▷', status: 'stable', version: '0.23.0',
      tag: 'Native video player',
      blurb: 'Native video player component (AVPlayer / ExoPlayer).' },
    { id: 'webview', parent: 'lynx', npm: '@sigx/lynx-webview', name: 'WebView', category: 'ui',
      hue: 206, glyph: '◫', status: 'stable', version: '0.23.0',
      tag: 'Native web view',
      blurb: 'Embed web content with a native WebView (WKWebView / android.webkit.WebView).' },

    // ---- Design systems ----
    { id: 'heroui', parent: 'lynx', npm: '@sigx/lynx-heroui', name: 'HeroUI', category: 'ui',
      hue: 266, glyph: '❖', status: 'beta', version: '0.23.0',
      tag: 'HeroUI design system',
      blurb: 'HeroUI-flavored component library, stylesheet and Tailwind preset for Lynx.' },
    { id: 'zero', parent: 'lynx', npm: '@sigx/lynx-zero', name: 'Zero', category: 'ui',
      hue: 240, glyph: '○', status: 'stable', version: '0.23.0',
      tag: 'Headless design-system foundation',
      blurb: 'Headless-first primitives, theme engine and Tailwind preset that custom design systems build on.' },

    // ---- New in 0.7.0 ----
    { id: 'sqlite', parent: 'lynx', npm: '@sigx/lynx-sqlite', name: 'SQLite', category: 'native',
      hue: 150, glyph: '⊡', status: 'stable', version: '0.23.0',
      tag: 'Embedded SQLite database',
      blurb: 'SQL, transactions, migrations and live queries for offline-first apps — openDatabase, parameterized execute, PRAGMA user_version migrations and a reactive useLiveQuery hook.' },
    { id: 'webrtc', parent: 'lynx', npm: '@sigx/lynx-webrtc', name: 'WebRTC', category: 'native',
      hue: 8, glyph: '⊛', status: 'beta', version: '0.23.0',
      tag: 'W3C-shaped WebRTC',
      blurb: 'Peer connections, audio tracks and data channels — RTCPeerConnection, RTCDataChannel, mediaDevices.getUserMedia and a native audio session.' },
    { id: 'updates', parent: 'lynx', npm: '@sigx/lynx-updates', name: 'OTA Updates', category: 'native',
      hue: 88, glyph: '⟳', status: 'beta', version: '0.23.0',
      tag: 'OTA bundle updates',
      blurb: 'Over-the-air bundle updates with pluggable backends, update modes, native streaming + SHA-256 verification and two-phase apply with crash rollback.' },
    { id: 'updates-ui', parent: 'lynx', npm: '@sigx/lynx-updates-ui', name: 'OTA Update UI', category: 'ui',
      hue: 268, glyph: '⇩', status: 'beta', version: '0.23.0',
      tag: 'Prebuilt OTA update UI',
      blurb: 'Drop-in update gate, prompt modal, download progress and restart banner over @sigx/lynx-updates.' },

    // ---- New in 0.8.0 ----
    { id: 'updates-publisher', parent: 'lynx', npm: '@sigx/lynx-updates-publisher', name: 'OTA Publisher', category: 'devtools',
      hue: 128, glyph: '⇧', status: 'beta', version: '0.23.0',
      tag: 'CI bundle publisher',
      blurb: 'Dependency-light publishUpdate() that packages a built bundle into the static-manifest OTA layout — the programmatic core of `sigx updates:publish` for CI pipelines.' },

    // ---- New in 0.9.1 ----
    { id: 'webauth', parent: 'lynx', npm: '@sigx/lynx-webauth', name: 'Web Auth', category: 'native',
      hue: 270, glyph: '⊕', status: 'stable', version: '0.23.0',
      tag: 'System web-auth session for OAuth',
      blurb: 'System web-auth session for OAuth — openAuthSession drives ASWebAuthenticationSession (iOS) and Chrome Custom Tabs (Android), returning the callback URL inline, with an opt-in PKCE helper.' },

    // ============ Core repo sub-packages ============
    // core is a collection meta-package, like lynx — the "web platform"
    // is just runtime-dom + the sigx umbrella living in here.
    { id: 'reactivity', parent: 'core', npm: '@sigx/reactivity', name: 'Reactivity', category: 'packages',
      hue: 285, glyph: '◇', status: 'stable', version: '0.14.0', role: 'Primitives',
      tag: 'Signals, computed & effects',
      blurb: 'Signals, computed and effects — the reactive primitives everything is built on.' },
    { id: 'runtime-core', parent: 'core', npm: '@sigx/runtime-core', name: 'Runtime Core', category: 'packages',
      hue: 264, glyph: '⊙', status: 'stable', version: '0.14.0', role: 'Shared base',
      tag: 'Renderer-agnostic component model',
      blurb: 'Component model and renderer base shared across every render target.' },
    { id: 'runtime-dom', parent: 'core', npm: '@sigx/runtime-dom', name: 'Runtime DOM', category: 'packages',
      hue: 232, glyph: '◧', status: 'stable', version: '0.14.0', role: 'Web renderer',
      tag: 'The DOM renderer',
      blurb: 'The DOM renderer — this is SignalX on the web.' },
    { id: 'cache', parent: 'core', npm: '@sigx/cache', name: 'Cache', category: 'packages',
      hue: 172, glyph: '◈', status: 'stable', version: '0.14.0', role: 'Cache policy',
      tag: 'Cache policy for value-first async',
      blurb: 'A cache-policy pack for useData/useAction — staleTime, focus & interval revalidation, keepPreviousData, cache-aware invalidate() and optimistic mutate(). Renderer-portable; installs as one plugin without touching your call sites.' },
    { id: 'sigx', parent: 'core', npm: 'sigx', name: 'sigx', category: 'packages',
      hue: 200, glyph: '◑', status: 'stable', version: '0.14.0', role: 'Umbrella', aliasFor: 'core',
      tag: 'The public umbrella package',
      blurb: 'The public umbrella package you import in web apps (reactivity + runtime-core + runtime-dom).' },
    { id: 'vite', parent: 'core', npm: '@sigx/vite', name: 'Vite Plugin', category: 'packages',
      hue: 318, glyph: '◮', status: 'stable', version: '0.14.0', role: 'Tooling', aliasFor: 'vite',
      tag: 'Vite plugin & HMR',
      blurb: 'Vite plugin for dev and build with component HMR.' },

    // ============ Server (SSR) packages ============
    // `server` is a docs-only collection — there is no `@sigx/server`
    // umbrella npm package. It groups the two SSR packages, both shipped
    // from signalxjs/core (packages/server-renderer + packages/ssr-islands),
    // released in lockstep: the renderer, plus islands (the first-party
    // reference strategy pack built on the renderer's plugin API).
    { id: 'server-renderer', parent: 'server', npm: '@sigx/server-renderer', name: 'Server Renderer', category: 'packages',
      hue: 210, glyph: '⊟', status: 'stable', version: '0.14.0', role: 'Renderer',
      tag: 'Streaming SSR & hydration',
      blurb: 'Render components to an HTML string or stream on the server, hydrate the DOM on the client, manage the document head, and extend rendering through the plugin SPI.' },
    { id: 'ssr-islands', parent: 'server', npm: '@sigx/ssr-islands', name: 'Islands', category: 'packages',
      hue: 40, glyph: '❖', status: 'stable', version: '0.14.0', role: 'Islands',
      tag: 'Selective hydration via client:*',
      blurb: 'The first-party reference strategy pack for SignalX SSR, built on the @sigx/server-renderer plugin API — hydrate only interactive components with client:load / idle / visible / media / only, with per-island code splitting.' },
    { id: 'server', parent: 'server', npm: '@sigx/server', name: 'Server Functions', category: 'packages',
      hue: 265, glyph: '⇅', status: 'stable', version: '0.14.0', role: 'RPC',
      tag: 'Type-safe server functions',
      blurb: 'Call server code from a component as a plain async function — serverFn / serverStream compile to typed RPC endpoints, run on the server, and return the result. Secure by default: POST-only JSON with a CSRF gate, origin checks, guards and prod error masking.' },
    { id: 'resume', parent: 'server', npm: '@sigx/resume', name: 'Resume', category: 'packages',
      hue: 190, glyph: '⟳', status: 'stable', version: '0.14.0', role: 'Resumability',
      tag: 'Resumable SSR & boundary refresh',
      blurb: 'The resumability layer — single-flight refresh of the server boundaries a mutation invalidated, driven by createBoundaryRefresh and the build-time resume manifest, so a write re-renders only the parts of the page that depend on it.' },
    { id: 'serialize', parent: 'server', npm: '@sigx/serialize', name: 'Serialize', category: 'packages',
      hue: 320, glyph: '⧉', status: 'stable', version: '0.14.0', role: 'Codec',
      tag: 'Custom-type serialization codec',
      blurb: 'The codec behind the SSR state blob and server-function arguments — round-trips Date / Map / Set / bigint / URL / RegExp / undefined out of the box, and defineTypeHandler adds your own types with type-guard-driven inference.' },

    // ============ Terminal repo packages ============
    // terminal is a collection like core — signalxjs/terminal publishes
    // all six in lockstep. The umbrella depends on runtime-terminal +
    // terminal-zero + terminal-ui (plus the core packages); terminal-dev
    // (a devDependency install) and args (fully standalone — it also
    // powers @sigx/cli) are NOT part of the umbrella.
    { id: 'terminal', parent: 'terminal', npm: '@sigx/terminal', name: 'Terminal', category: 'stack',
      hue: 138, glyph: '▸', status: 'experimental', version: '0.11.0', role: 'Umbrella', aliasFor: 'terminal',
      tag: 'The public umbrella package',
      blurb: 'The package you install — re-exports the renderer, the headless foundation and the themed components under one @sigx/terminal entry.' },
    { id: 'runtime-terminal', parent: 'terminal', npm: '@sigx/runtime-terminal', name: 'Runtime Terminal', category: 'stack',
      hue: 152, glyph: '⊞', status: 'experimental', version: '0.11.0', role: 'Renderer',
      tag: 'The cell renderer',
      blurb: 'Walks your component tree into ANSI lines and paints them — render modes, layered key dispatch, color-depth detection, output targets and reactive terminal size. The host platform for @sigx/runtime-core.' },
    { id: 'terminal-zero', parent: 'terminal', npm: '@sigx/terminal-zero', name: 'Terminal Zero', category: 'stack',
      hue: 96, glyph: '○', status: 'experimental', version: '0.11.0', role: 'Headless foundation',
      tag: 'Tokens, theme engine, layout & prompts engine',
      blurb: 'The design-system-neutral half: the token contract, the theme engine, shared glyphs, layout primitives and the prompts engine. No fixed look — skins build on it.' },
    { id: 'terminal-ui', parent: 'terminal', npm: '@sigx/terminal-ui', name: 'Terminal UI', category: 'stack',
      hue: 46, glyph: '❖', status: 'experimental', version: '0.11.0', role: 'Component library',
      tag: 'Themed components — the SigX-tui skin',
      blurb: 'The SigX-tui skin: forms, feedback, navigation, layout, data, fx and tasks components, plus five built-in themes (default obsidian). Built entirely on terminal-zero tokens.' },
    { id: 'terminal-dev', parent: 'terminal', npm: '@sigx/terminal-dev', name: 'Terminal Dev', category: 'tooling',
      hue: 158, glyph: '⟳', status: 'experimental', version: '0.11.0', role: 'Dev runner',
      tag: 'HMR dev runner',
      blurb: 'sigx-terminal-dev <entry> runs your TUI under an in-process Vite dev server — edit a component, the running app patches in place. Install as a devDependency; not part of the umbrella.' },
    { id: 'args', parent: 'terminal', npm: '@sigx/args', name: 'Args', category: 'tooling',
      hue: 264, glyph: '›', status: 'stable', version: '0.11.0', role: 'CLI parser',
      tag: 'Fluent, type-aware argument parser',
      blurb: 'A fluent, type-aware command & argument parser where the builders you chain drive your handler types. Zero runtime dependencies, fully standalone — the engine behind @sigx/cli.' },

    // ============ Deploy adapters ============
    // `deploy` is a docs-only collection — there is no umbrella npm package.
    // All three adapters ship from signalxjs/core (packages/cloudflare +
    // packages/vercel + packages/netlify) in lockstep with the core release.
    // They are build glue over the public SigxAdapter seam in @sigx/vite;
    // the runtime on every platform is @sigx/server-renderer's
    // createFetchHandler. Node, Deno and Bun need no adapter package.
    { id: 'cloudflare', parent: 'deploy', npm: '@sigx/cloudflare', name: 'Cloudflare', category: 'adapters',
      hue: 55, glyph: '≋', status: 'stable', version: '0.14.0', role: 'Workers',
      tag: 'Bundled workerd worker + wrangler scaffold',
      blurb: 'The flagship adapter — a fully bundled, workerd-conditioned worker with a node-free render path, a wrangler.jsonc scaffolded once and validated on drift, and optional local binding proxies in dev. Deploy with wrangler deploy.' },
    { id: 'vercel', parent: 'deploy', npm: '@sigx/vercel', name: 'Vercel', category: 'adapters',
      hue: 240, glyph: '▲', status: 'stable', version: '0.14.0', role: 'Node & Edge',
      tag: 'Build Output API v3 generation',
      blurb: 'Generates the complete .vercel/output layout on every build — static assets, the bundled render function and the route table — on the Node runtime (default) or the edge. Deploy with vercel deploy --prebuilt.' },
    { id: 'netlify', parent: 'deploy', npm: '@sigx/netlify', name: 'Netlify', category: 'adapters',
      hue: 180, glyph: '⟡', status: 'stable', version: '0.14.0', role: 'Functions',
      tag: 'Frameworks API function generation',
      blurb: 'Emits the .netlify/v1/functions/sigx-ssr catch-all function with preferStatic routing — CDN files win, the raw outlet template stays off "/", and netlify.toml stays yours. Deploy with netlify deploy --prod.' },

    // ============ Actors (@sigx/actors*) — lockstep-versioned ============
    // actors is a collection like terminal: signalxjs/actors publishes all nine
    // in lockstep, and `@sigx/actors` is a real umbrella you install. The eight
    // satellites are all OPTIONAL — each one peer-depends on `@sigx/actors` and
    // adds a backend, a transport or a tool. A single-node app needs none of them.
    { id: 'actors', parent: 'actors', npm: '@sigx/actors', name: 'Actors', category: 'runtime',
      hue: 116, glyph: '⬡', status: 'experimental', version: '0.1.0', role: 'Umbrella', aliasFor: 'actors',
      tag: 'The actor runtime',
      blurb: 'The package you install — actor definitions, the host, the client proxy, the Vite plugin, jobs and clustering under one @sigx/actors entry with eleven subpath exports.' },
    { id: 'actors-redis', parent: 'actors', npm: '@sigx/actors-redis', name: 'Redis', category: 'providers',
      hue: 25, glyph: '◆', status: 'experimental', version: '0.1.0', role: 'Redis',
      tag: 'Membership, directory & storage on Redis',
      blurb: 'The usual first step out of one process — host membership, the distributed actor directory and etag-CAS actor storage, all on one ioredis client. Requires Redis 7 for SET NX GET.' },
    { id: 'actors-pg', parent: 'actors', npm: '@sigx/actors-pg', name: 'Postgres', category: 'providers',
      hue: 230, glyph: '⬢', status: 'experimental', version: '0.1.0', role: 'Postgres',
      tag: 'Membership, directory, storage & reminders on Postgres',
      blurb: 'The whole cluster on the database you already run — jsonb storage with etag compare-and-set, database-clock membership, the directory, and durable reminders claimed with SKIP LOCKED. Ships its DDL; never issues it for you.' },
    { id: 'actors-k8s', parent: 'actors', npm: '@sigx/actors-k8s', name: 'Kubernetes', category: 'providers',
      hue: 255, glyph: '⎈', status: 'experimental', version: '0.1.0', role: 'Kubernetes',
      tag: 'Host liveness on coordination.k8s.io Leases',
      blurb: 'Membership with no extra store — one Lease per host, renewed as a heartbeat and watched by label selector, so the cluster you are already running is the membership provider. Pairs with a Redis or Postgres directory.' },
    { id: 'actors-tcp', parent: 'actors', npm: '@sigx/actors-tcp', name: 'TCP', category: 'transports',
      hue: 180, glyph: '⇄', status: 'experimental', version: '0.1.0', role: 'TCP',
      tag: 'Framed, multiplexed host-to-host TCP',
      blurb: 'One connection per peer instead of one per in-flight request. Node-only by design, so the cluster core stays WinterCG-clean — reach for it when socket count is the pain, not when you want raw speed.' },
    { id: 'actors-ws', parent: 'actors', npm: '@sigx/actors-ws', name: 'WebSocket', category: 'transports',
      hue: 200, glyph: '⇌', status: 'experimental', version: '0.1.0', role: 'WebSocket',
      tag: 'Host-to-host frames over the HTTP port',
      blurb: 'The same frame codec as TCP, over one port your proxy already forwards. Attaches to your existing HTTP server as an upgrade handler — the one thing a contributed route cannot express.' },
    { id: 'actors-cloudflare', parent: 'actors', npm: '@sigx/actors-cloudflare', name: 'Cloudflare', category: 'platforms',
      hue: 55, glyph: '⊛', status: 'experimental', version: '0.1.0', role: 'Durable Objects',
      tag: 'One Durable Object per actor',
      blurb: 'Cloudflare already guarantees one instance of a Durable Object globally and serializes its requests — which is the virtual-actor contract. So there is no membership, no directory and no authenticated host mount: the platform is the cluster.' },
    { id: 'actors-cli', parent: 'actors', npm: '@sigx/actors-cli', name: 'CLI', category: 'tooling',
      hue: 264, glyph: '›', status: 'experimental', version: '0.1.0', role: 'Dashboard',
      tag: 'sigx actors — a terminal dashboard',
      blurb: 'A @sigx/cli plugin: sigx actors top, stats and health. Reads a running host over its ops endpoint, or loads your app module in-process for zero-config local use.' },
    { id: 'actors-otel', parent: 'actors', npm: '@sigx/actors-otel', name: 'OpenTelemetry', category: 'tooling',
      hue: 300, glyph: '⌁', status: 'experimental', version: '0.1.0', role: 'Exporters',
      tag: 'Prometheus exposition & OTel traces',
      blurb: 'Scrape-ready Prometheus text on an OTel-free entry, plus spans that join across hosts through the propagated traceparent. Labels are type and method — never actor keys.' },
];

/** Registry with live npm versions overlaid (falls back to the literal). */
export const MODULES: SigxModule[] =
    RAW_MODULES.map((m) => ({ ...m, version: VERSIONS[m.npm] ?? m.version }));

/** Featured Lynx modules surfaced directly in the family menu's Lynx column. */
export const LYNX_FEATURED = ['navigation', 'daisyui', 'gestures', 'motion'];

/** Featured terminal packages surfaced in the family menu's Terminal column. */
export const TERMINAL_FEATURED = ['terminal-ui', 'terminal-zero', 'terminal-dev', 'args'];

/**
 * Component-library catalogs — component-heavy packages render this as
 * a categorized component menu in their docs (web daisyui + lynx daisyui
 * expose the same ~61-component surface).
 */
export const COMPONENT_CATALOGS: Record<string, { cat: string; items: string[] }[]> = {
    // The catalog is what `@sigx/daisyui` ACTUALLY exports — an entry with no
    // page renders as a greyed "soon" chip, so listing a component the package
    // does not have promises something that will never arrive. `Collapse`,
    // `List`, `Dock`, `Calendar`, `Filter` and `Validator` are upstream daisyUI
    // CSS components with no sigx component, and `Tab` / `Text input` were
    // duplicates of `Tabs` / `Input`; all eight are out until they ship.
    daisyui: [
        { cat: 'Actions', items: ['Button', 'Dropdown', 'Modal', 'Swap', 'Theme Controller'] },
        { cat: 'Data display', items: ['Accordion', 'Avatar', 'Badge', 'Card', 'Carousel', 'Chat bubble', 'Countdown', 'Diff', 'Kbd', 'Stat', 'Status', 'Table', 'Timeline'] },
        { cat: 'Navigation', items: ['Breadcrumbs', 'Link', 'Menu', 'Navbar', 'Pagination', 'Steps', 'Tabs'] },
        { cat: 'Feedback', items: ['Alert', 'Loading', 'Progress', 'Radial progress', 'Skeleton', 'Toast', 'Tooltip'] },
        { cat: 'Data input', items: ['Checkbox', 'Fieldset', 'File input', 'Input', 'Label', 'Radio', 'Range', 'Rating', 'Select', 'Textarea', 'Toggle'] },
        { cat: 'Layout', items: ['Divider', 'Drawer', 'Footer', 'Hero', 'Indicator', 'Join', 'Mask', 'Stack'] },
        { cat: 'Mockup', items: ['Browser', 'Code', 'Phone', 'Window'] },
    ],
    'lynx-daisyui': [
        { cat: 'Actions', items: ['Button'] },
        { cat: 'Data display', items: ['Avatar', 'Collapse', 'Table'] },
        { cat: 'Data input', items: ['Input', 'Textarea', 'Select', 'Checkbox', 'Radio', 'Toggle', 'Range', 'Rating', 'FormField'] },
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
    'lynx-navigation': [
        { cat: 'Navigators', items: ['Stack', 'Tabs', 'Drawer'] },
        { cat: 'Screens', items: ['NavigationRoot', 'Screen'] },
        { cat: 'Chrome', items: ['Header', 'TabBar'] },
        { cat: 'Linking', items: ['Link'] },
    ],
    'lynx-emoji': [
        { cat: 'Pickers', items: ['EmojiPicker', 'KeyboardPanelPicker', 'SheetPicker'] },
        { cat: 'Parts', items: ['EmojiGrid', 'EmojiCell', 'CategoryTabBar', 'SearchInput', 'SkinTonePopover'] },
        { cat: 'State', items: ['EmojiProvider'] },
    ],
    'lynx-zero': [
        { cat: 'Theme', items: ['ThemeProvider', 'StatusBarSync'] },
        { cat: 'Layout', items: ['Row', 'Col', 'Center', 'Spacer', 'ScrollView'] },
    ],
    'lynx-gestures': [
        { cat: 'Touch', items: ['Pressable', 'TouchGuard'] },
        { cat: 'Drag & swipe', items: ['Draggable', 'Swipeable'] },
        { cat: 'Scroll', items: ['ScrollView', 'Swiper'] },
        { cat: 'Multi-touch', items: ['PinchRotate'] },
    ],
    'lynx-maps': [
        { cat: 'Map', items: ['Map', 'MapMarker'] },
    ],
    'lynx-richtext': [
        { cat: 'Editor', items: ['RichTextInput'] },
    ],
    'lynx-video': [
        { cat: 'Media', items: ['VideoPlayer'] },
    ],
    'lynx-webview': [
        { cat: 'Web', items: ['WebView'] },
    ],
    'lynx-updates-ui': [
        { cat: 'Update flow', items: ['UpdateGate', 'UpdatePrompt', 'UpdateProgress', 'UpdateReadyBanner'] },
    ],
    'lynx-sheet': [
        { cat: 'Sheet', items: ['BottomSheet'] },
        { cat: 'Parts', items: ['Backdrop'] },
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
        : m.parent === 'terminal' ? `/terminal/packages/${m.id}`
        : m.parent === 'deploy' ? `/deploy/packages/${m.id}`
        : m.parent === 'actors' ? `/actors/packages/${m.id}`
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
        : m.parent === 'terminal' ? `terminal-pkg-${m.id}-docs`
        : m.parent === 'deploy' ? `deploy-pkg-${m.id}-docs`
        : m.parent === 'actors' ? `actors-pkg-${m.id}-docs`
        : `core-pkg-${m.id}-docs`;
