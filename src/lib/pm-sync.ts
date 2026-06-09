/**
 * Same-tab sync between the server-rendered package-manager switcher and the
 * inline CopyLine widget.
 *
 * The code-window switcher now lives in `@sigx/ssg` (rendered server-side; its
 * client toggles which variant is visible). It persists the choice to the same
 * `sigx-pm` localStorage key the docs `pm` signal (lib/package-manager.ts) uses,
 * so cross-reload and cross-tab already agree. But `storage` events don't fire
 * in the tab that made the change, so within a single tab the SSG switcher and
 * the CopyLine widgets wouldn't track each other.
 *
 * This bridge makes the shared `pm` signal the single source of truth:
 * - clicking an SSG `.code-window-pm` tab updates the signal (CopyLine follows);
 * - a signal change (e.g. a CopyLine click) drives the SSG windows.
 *
 * The SSG client also handles the tab click and persists the choice; every
 * operation here is idempotent, so running both is harmless.
 */

import { effect } from 'sigx';
import { PMS, pm, setPm, type Pm } from '@/lib/package-manager';

/** Reflect the active manager onto every server-rendered PM code window. */
function applyToCodeWindows(target: Pm): void {
    for (const win of document.querySelectorAll<HTMLElement>('.code-window-pm')) {
        win.dataset.pm = target;
        for (const variant of win.querySelectorAll<HTMLElement>('[data-pm-variant]')) {
            variant.style.display = variant.dataset.pmVariant === target ? '' : 'none';
        }
        for (const tab of win.querySelectorAll<HTMLElement>('.code-window-pm-tab')) {
            const active = tab.dataset.pm === target;
            tab.classList.toggle('code-window-tab-active', active);
            tab.setAttribute('aria-selected', String(active));
        }
    }
}

let installed = false;

/** Mount the bridge. Idempotent and client-only. */
export function installPmSync(): void {
    if (installed || typeof document === 'undefined') return;
    installed = true;

    // SSG tab → shared signal, so CopyLine (and any other `pm` consumer) follows.
    document.addEventListener('click', (e) => {
        if (!(e.target instanceof Element)) return;
        const next = e.target.closest<HTMLElement>('.code-window-pm-tab')?.dataset.pm;
        if (next && (PMS as string[]).includes(next)) setPm(next as Pm);
    });

    // Shared signal → SSG windows. Runs eagerly and on every change; a no-op
    // when the page has no `.code-window-pm` blocks.
    effect(() => applyToCodeWindows(pm.value));
}
