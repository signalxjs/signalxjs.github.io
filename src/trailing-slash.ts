/**
 * Canonical trailing-slash URLs for SPA navigation.
 *
 * The site builds with `trailingSlash: 'always'`, so every page's canonical URL
 * ends in `/`. On a hard load GitHub Pages 301s `/x` → `/x/`. But during SPA
 * navigation the URL bar ends up at the slash-less `/x`, so the same page is
 * reachable at two URLs depending on how you got there. Two upstream behaviours
 * combine to cause it:
 *
 *  - ssg's `installSpaNavigation` pushes the clicked anchor's pathname verbatim
 *    (it doesn't normalise to the configured `trailingSlash`), and most of our
 *    internal links are emitted without a trailing slash; and
 *  - `@sigx/router` strips a trailing slash off the path it's given, so even a
 *    canonical `/x/` push lands the URL bar back on `/x`.
 *
 * The reliable fix is at the History API layer, below the router: patch
 * `history.pushState` / `replaceState` so any internal, extension-less path is
 * written to the URL bar with its trailing slash. The router still matches the
 * route the same way (it ignores the trailing slash), so navigation is unchanged
 * — only the displayed URL is canonicalised. We also normalise rendered `href`s
 * so links *display* their canonical form.
 *
 * Tracked upstream — ssg's SPA navigation / router should honour `trailingSlash`.
 */

/** Add a trailing slash to an extension-less pathname; leave files and `/` alone. */
function withTrailingSlash(pathname: string): string {
    if (!pathname || pathname.endsWith('/')) return pathname;
    // A dotted last segment is a file (e.g. `/sigx.png`), not a route.
    const lastSegment = pathname.slice(pathname.lastIndexOf('/') + 1);
    if (lastSegment.includes('.')) return pathname;
    return `${pathname}/`;
}

/** Canonicalise the `url` argument of pushState/replaceState (string | URL | null). */
function canonicalizeUrlArg(url: string | URL | null | undefined): string | URL | null | undefined {
    if (url == null) return url;
    let u: URL;
    try {
        u = new URL(url, location.href);
    } catch {
        return url;
    }
    if (u.origin !== location.origin) return url;
    const canonical = withTrailingSlash(u.pathname);
    if (canonical === u.pathname) return url;
    // Keep it relative so SPA semantics are preserved.
    return canonical + u.search + u.hash;
}

function normalizeAnchor(a: HTMLAnchorElement): void {
    if (a.hasAttribute('download') || a.closest('[data-no-spa]')) return;
    const target = a.getAttribute('target');
    if (target && target !== '_self') return;
    const href = a.getAttribute('href');
    if (!href || !href.startsWith('/') || href.startsWith('//')) return;
    const match = /^([^?#]*)([?#].*)?$/.exec(href);
    if (!match || !match[1]) return;
    const canonical = withTrailingSlash(match[1]);
    if (canonical !== match[1]) a.setAttribute('href', canonical + (match[2] ?? ''));
}

function sweep(root: ParentNode): void {
    for (const a of root.querySelectorAll<HTMLAnchorElement>('a[href]')) normalizeAnchor(a);
}

if (typeof window !== 'undefined' && typeof history !== 'undefined') {
    // 1) The actual fix: canonicalise the URL the router writes to the address bar.
    for (const method of ['pushState', 'replaceState'] as const) {
        const original = history[method];
        history[method] = function (this: History, state: unknown, unused: string, url?: string | URL | null) {
            return original.call(this, state, unused, canonicalizeUrlArg(url));
        };
    }
    // If we hard-loaded a slash-less URL that wasn't 301'd (e.g. local preview),
    // canonicalise the current entry too.
    const canonicalHere = withTrailingSlash(location.pathname);
    if (canonicalHere !== location.pathname) {
        history.replaceState(history.state, '', canonicalHere + location.search + location.hash);
    }

    // 2) Cosmetic: keep rendered hrefs in their canonical form across re-renders.
    const run = () => sweep(document);
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run, { once: true });
    } else {
        run();
    }
    new MutationObserver((records) => {
        for (const r of records) {
            for (const node of r.addedNodes) {
                if (node.nodeType !== 1) continue;
                const el = node as Element;
                if (el.matches('a[href]')) normalizeAnchor(el as HTMLAnchorElement);
                sweep(el);
            }
        }
    }).observe(document.body, { childList: true, subtree: true });
}
