/**
 * Live Code Configuration for Docs
 *
 * Registers the SignalX packages that should be available inside live-code
 * playgrounds. Registering them here means live-code's runtime won't try to
 * dynamically import them at startup (which fails when an optional peer
 * isn't installed).
 */

import { configureLiveCode, initRegisteredModules } from '@sigx/live-code';
import * as daisyui from '@sigx/daisyui';
import * as router from '@sigx/router';
import * as store from '@sigx/store';

// Modules become available inside live-code as `window.__SIGX_DAISYUI__`,
// `window.__SIGX_ROUTER__`, `window.__SIGX_STORE__`.
configureLiveCode({
    modules: {
        '@sigx/daisyui': () => daisyui,
        '@sigx/router': () => router,
        '@sigx/store': () => store,
    }
});

// Eagerly expose the registered modules on `window.__SIGX_*__`.
//
// The inline <LivePreview> blocks only initialize the runtimes when
// `window.__SIGX__` is still unset. In the production bundle the SignalX
// runtime is already initialized by the time previews mount, so that guard
// short-circuits and the module globals (DaisyUI, router, store) never get
// set — previews then fail with "Cannot destructure ... __SIGX_DAISYUI__".
// Initializing here (before @sigx/live-code/client) guarantees they exist
// regardless of runtime-init timing. In dev this is masked because previews
// mount before `__SIGX__` is set, so the package's own init path still runs.
if (typeof window !== 'undefined') {
    await initRegisteredModules();

    // Route every runnable code block's Run button into the docs' own
    // Live Playground (Monaco + interactive preview + console) instead
    // of live-code's built-in modal. Capture-phase, so it wins over the
    // handlers @sigx/live-code/client attaches right after this module.
    const { installPlaygroundLauncher } = await import('@/components/PlaygroundHost');
    installPlaygroundLauncher();

    // Upgrade every install-command code window (```bash fences with a
    // `pnpm add …` / `npm i …` / etc. line) with an npm/pnpm/yarn/bun tab
    // strip. Pure DOM enhancement — no MDX changes, so it covers all pages.
    const { installPackageManagerSwitcher } = await import('@/components/PackageManagerSwitcher');
    installPackageManagerSwitcher();
}
