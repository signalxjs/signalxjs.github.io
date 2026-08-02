/**
 * Page-title qualification for SEO.
 *
 * Most of this site is per-package docs that repeat a small set of page names:
 * 73 pages titled "Overview", 79 "Installation", 70 "API reference", and 91
 * landings titled just "SignalX". Search engines read identical titles as a
 * duplicate-content signal, and a reader scanning a results list or a row of
 * browser tabs cannot tell those pages apart either.
 *
 * The fix is a qualifier derived from the route rather than ~500 hand-edited
 * frontmatter lines: `Installation · @sigx/lynx-camera · SignalX`. It is applied
 * in one `transformHtml` build hook, so a page added later gets it without
 * anyone remembering to.
 *
 * A title that is already distinctive keeps it — the qualifier is appended,
 * never substituted.
 *
 * Imported by `ssg.config.ts`, which esbuild-bundles at config time, so the
 * relative `.ts` import below is deliberate and the module must stay free of
 * path aliases and runtime dependencies.
 */
import { MODULES, moduleRoutePrefix } from './modules.ts';

const SITE = 'SignalX';
const SEP = ' · ';

/** Display label for a top-level area segment that is not a module route. */
const AREA_LABELS: Record<string, string> = {
    i18n: '@sigx/i18n',
    ssg: '@sigx/ssg',
    cli: '@sigx/cli',
    vite: '@sigx/vite',
    store: '@sigx/store',
    router: '@sigx/router',
    daisyui: '@sigx/daisyui',
    monaco: '@sigx/monaco-editor',
    mermaid: '@sigx/mermaid',
    devtools: '@sigx/devtools',
    use: '@sigx/use',
    core: 'SignalX Core',
    lynx: 'SignalX Lynx',
    terminal: 'SignalX Terminal',
    server: 'SignalX Server',
    deploy: 'Deploying SignalX',
    errors: 'SignalX error codes',
    blog: 'SignalX blog',
};

/** Module route prefixes, longest first so `/lynx/modules/camera` beats `/lynx`. */
const MODULE_PREFIXES: [string, string][] = MODULES
    .filter((m) => !m.aliasFor)
    .map((m) => [moduleRoutePrefix(m), m.npm] as [string, string])
    .sort((a, b) => b[0].length - a[0].length);

/** The qualifier for a route, or `undefined` when none applies. */
export function qualifierFor(path: string): string | undefined {
    const p = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;

    for (const [prefix, npm] of MODULE_PREFIXES) {
        if (p === prefix || p.startsWith(`${prefix}/`)) return npm;
    }

    const area = p.split('/')[1];
    return area ? AREA_LABELS[area] : undefined;
}

/**
 * The `<title>` a page should carry, or `undefined` to leave it alone.
 */
export function qualifiedTitle(rawTitle: string, path: string): string | undefined {
    const title = rawTitle.trim();
    if (!title) return undefined;

    // Redirect shells are noindex — nothing to gain.
    if (title === 'Redirecting…' || title === 'Redirecting...') return undefined;

    // Already qualified (by us, or by a hand-written title using the separator).
    if (title.includes(SEP)) return undefined;

    const qualifier = qualifierFor(path);

    if (!qualifier) {
        return title.includes(SITE) ? undefined : `${title}${SEP}${SITE}`;
    }

    if (title.includes(qualifier)) return `${title}${SEP}${SITE}`;

    // A landing already titled "SignalX" becomes "SignalX Core", not "SignalX · SignalX Core".
    if (title === SITE) return qualifier;

    return `${title}${SEP}${qualifier}${SEP}${SITE}`;
}

/** Decode the entities the head writer emits into a title. */
export function decodeTitleEntities(s: string): string {
    return s
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, '&');
}

/** Escape a title for re-insertion into the document. */
export function escapeTitle(s: string): string {
    return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
