/**
 * Package-manager switcher — progressive enhancement for docs code blocks.
 *
 * Auto-upgrades every install-command code window (the `.code-window`
 * markup @sigx/live-code's Shiki transformer wraps around ```bash fences,
 * the same chrome PlaygroundHost hooks into) with an npm / pnpm / yarn /
 * bun tab strip in its header. Zero MDX changes: it scans the rendered
 * DOM, so it covers every page — current and future — automatically.
 *
 * Only lines that START with a recognized package manager are rewritten;
 * other lines in the same fence (e.g. `sigx prebuild`) are left untouched
 * with their Shiki highlighting intact.
 *
 * The preference is the shared `pm` signal (lib/package-manager.ts), so
 * docs code windows, the inline CopyLine widgets, and other tabs all stay
 * in sync — and an `effect` re-applies it to every enhanced window when it
 * changes (including cross-tab updates the signal mirrors in).
 *
 * Installed once from live-code-config.ts (client-only; no-op during SSR).
 */

import { effect } from 'sigx';
import { type Pm, PMS, parse, render, pm, setPm } from '@/lib/package-manager';

/** Rewrite a window's command lines + tab states for the active manager. */
function applyPm(win: Element, target: Pm): void {
    for (const line of win.querySelectorAll('.code-window-content .line')) {
        const parsed = parse(line.textContent ?? '');
        if (parsed) line.textContent = render(parsed, target);
    }
    for (const tab of win.querySelectorAll('.code-window-tab[data-pm]')) {
        tab.classList.toggle('code-window-tab-active', tab.getAttribute('data-pm') === target);
    }
}

/** Re-apply the active manager to every enhanced window on the page. */
function syncAll(target: Pm): void {
    for (const tabs of document.querySelectorAll('.code-window-pm-tabs')) {
        const win = tabs.closest('.code-window');
        if (win) applyPm(win, target);
    }
}

/** Upgrade a single code window if it contains an install command. */
function enhance(win: HTMLElement): void {
    if (win.dataset.pmEnhanced) return;
    win.dataset.pmEnhanced = '1';

    const lines = win.querySelectorAll('.code-window-content .line');
    const hasInstallCmd = [...lines].some((l) => parse(l.textContent ?? ''));
    if (!hasInstallCmd) return; // not an install window — leave it be

    const header = win.querySelector('.code-window-header');
    if (!header || header.querySelector('.code-window-pm-tabs')) return;

    const tabs = document.createElement('div');
    tabs.className = 'code-window-tabs code-window-pm-tabs';
    for (const p of PMS) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'code-window-tab';
        btn.setAttribute('data-pm', p);
        btn.textContent = p;
        btn.addEventListener('click', () => setPm(p));
        tabs.appendChild(btn);
    }
    header.appendChild(tabs);

    applyPm(win, pm.value);
}

let installed = false;

/**
 * Mount the switcher. Idempotent; client-only. Scans existing windows,
 * watches for late-hydrated ones (live-code renders some windows after
 * first paint), and re-applies the active manager whenever it changes.
 */
export function installPackageManagerSwitcher(): void {
    if (installed || typeof document === 'undefined') return;
    installed = true;

    const scan = () =>
        document
            .querySelectorAll<HTMLElement>('.code-window:not([data-pm-enhanced])')
            .forEach(enhance);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', scan, { once: true });
    } else {
        scan();
    }

    // Coalesce mutation-driven rescans (setting line text re-triggers the
    // observer; the data-flag guard makes the rescan a cheap no-op).
    let scheduled = false;
    new MutationObserver(() => {
        if (scheduled) return;
        scheduled = true;
        queueMicrotask(() => { scheduled = false; scan(); });
    }).observe(document.body, { childList: true, subtree: true });

    // React to manager changes from any source (other tabs/widgets, other
    // pages via cross-tab storage). Runs once eagerly — a no-op until the
    // first window is enhanced.
    effect(() => syncAll(pm.value));
}
