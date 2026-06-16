/**
 * Canonical internal paths for `trailingSlash: 'always'`.
 *
 * `@sigx/ssg`'s `installSpaNavigation` normalises plain `<a>` clicks to the
 * configured trailing-slash form, but the site also navigates imperatively via
 * `router.push(...)` (SxLink, the command palette, family/module menus, …).
 * Those paths bypass `installSpaNavigation`, so the router faithfully displays
 * whatever slash-less string it's handed. Run such paths through `canonicalPath`
 * before pushing so SPA navigation lands on the same `/x/` URL as a hard load.
 */

/**
 * Add a trailing slash to an internal, extension-less route path. Leaves
 * external links, hash-only links, query/hash suffixes, files (`/sitemap.xml`),
 * the root, and already-slashed paths untouched.
 */
export function canonicalPath(to: string): string {
    if (!to || !to.startsWith('/') || to.startsWith('//')) return to;
    const match = /^([^?#]*)([?#].*)?$/.exec(to);
    if (!match || !match[1]) return to;
    const path = match[1];
    if (path.endsWith('/')) return to;
    // A dotted last segment is a file, not a route.
    const lastSegment = path.slice(path.lastIndexOf('/') + 1);
    if (lastSegment.includes('.')) return to;
    return `${path}/${match[2] ?? ''}`;
}
