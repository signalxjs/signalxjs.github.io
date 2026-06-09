/**
 * SPA navigation for inline MDX content links.
 *
 * Markdown links in MDX compile to bare `<a href>` intrinsics. `@sigx/ssg`
 * builds MDX with `providerImportSource: undefined`, so there's no
 * `useMDXComponents` hook to map `a` onto a router-aware link, and
 * `@sigx/router` only wires clicks on its own `RouterLink` / our `SxLink`
 * components — there is no global anchor interception. The result is that
 * every inline content link does a full-page reload instead of an SPA
 * transition (and a no-trailing-slash hard load 404s under `vite dev` /
 * `vite preview`).
 *
 * This installs ONE delegated click listener, scoped to `.prose` content,
 * that routes same-origin internal anchors through the router. Router-aware
 * links (`SxLink`) call `preventDefault()` first, so the `defaultPrevented`
 * guard leaves them untouched; same-page `#hash`, external, `download`,
 * `target=_blank`, and modified clicks fall through to the browser.
 *
 * Upstream fix tracked at signalxjs/ssg#35 — remove this once `@sigx/ssg`
 * intercepts internal anchor navigation in its client runtime.
 */

import type { Router } from '@sigx/router';

let installed = false;

export function installSpaLinks(router: Router): void {
    if (installed || typeof document === 'undefined') return;
    installed = true;

    document.addEventListener('click', (e: MouseEvent) => {
        // Let the browser handle modified clicks and anything already handled
        // (SxLink etc. call preventDefault before this bubbles to document).
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

        const anchor = (e.target as Element | null)?.closest?.('a') as HTMLAnchorElement | null;
        if (!anchor) return;

        // Only inline content links. Chrome links (navbar/sidebar/breadcrumbs)
        // are SxLink and handled above; staying inside `.prose` also keeps the
        // app out of links rendered inside live-code previews.
        if (!anchor.closest('.prose')) return;

        const href = anchor.getAttribute('href');
        if (!href || href.startsWith('#')) return;
        if (anchor.hasAttribute('download') || anchor.dataset.noSpa !== undefined) return;
        const linkTarget = anchor.getAttribute('target');
        if (linkTarget && linkTarget !== '_self') return;

        let url: URL;
        try {
            url = new URL(anchor.href, location.href);
        } catch {
            return;
        }
        if (url.origin !== location.origin) return; // external, mailto:, tel:, …

        // Same-page hash → let the browser scroll natively.
        if (url.pathname === location.pathname && url.hash) return;

        e.preventDefault();
        void router.push(url.pathname + url.search + url.hash);
    });
}
