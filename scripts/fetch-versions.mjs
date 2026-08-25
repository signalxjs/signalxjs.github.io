/**
 * Refresh package versions from the npm `latest` dist-tag into
 * `src/lib/versions.generated.ts` — the single source the package
 * registries (lib/family.ts, lib/modules.ts) and the <PkgVersion> MDX
 * component read from.
 *
 *   pnpm fetch:versions     # run manually, or in CI before `pnpm build`
 *
 * Leverages lockstep versioning: the four monorepos (core, lynx,
 * terminal, actors) are fetched once each through an anchor package and fanned
 * out to every member; the standalone packages — plus `@sigx/vite` and
 * `@sigx/args`, which ship from the core/terminal monorepos but on their own
 * version lines (see anchorFor below) — are fetched individually (~12
 * requests total instead of ~60). Resilient by design — a failed request keeps the
 * previously committed value, so a flaky npm never breaks the build.
 *
 * Tracks the `latest` dist-tag (not the newest publish) so docs only ever
 * describe versions users can install — see the dist-tag note in AGENTS.md.
 *
 * Requires Node ≥ 22.18 (native TS type-stripping for the registry import).
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const genPath = join(root, 'src', 'lib', 'versions.generated.ts');
const modulesPath = join(root, 'src', 'lib', 'modules.ts');
const familyPath = join(root, 'src', 'lib', 'family.ts');

const REGISTRY = 'https://registry.npmjs.org';
const TIMEOUT_MS = 10_000;

/**
 * npm package → source-repo "anchor" package, per the npm→repo rule in
 * AGENTS.md. The reactive/runtime/SSR core of each monorepo publishes in
 * lockstep, so one fetch covers the whole family; everything else is its own
 * repo and is its own anchor.
 *
 * Exceptions — `@sigx/vite` and `@sigx/args` are published from the core /
 * terminal monorepos but on **independent version lines**, so they must NOT be
 * fanned out from the anchor: `@sigx/vite` skipped core's 0.11.0 entirely
 * (its line is 0.10.0 → 0.12.0), and `@sigx/args` has run ahead of
 * `@sigx/terminal` (args 0.6.x while terminal 0.5.x). Fanning the anchor's
 * version onto them would invent a version that doesn't exist on npm — which
 * this script would then write into versions.generated.ts and ship to the live
 * site. They stay out of the member sets below so anchorFor() self-anchors them
 * (one extra npm request each, fetched independently).
 */
const CORE_MEMBERS = new Set([
    'sigx',
    '@sigx/reactivity',
    '@sigx/runtime-core',
    '@sigx/runtime-dom',
    '@sigx/server-renderer',
]);
const TERMINAL_MEMBERS = new Set([
    '@sigx/terminal',
    '@sigx/runtime-terminal',
    '@sigx/terminal-zero',
    '@sigx/terminal-ui',
    '@sigx/terminal-dev',
]);
const anchorFor = (npm) =>
    CORE_MEMBERS.has(npm) ? 'sigx'
        : TERMINAL_MEMBERS.has(npm) ? '@sigx/terminal'
        : npm === '@sigx/lynx' || npm.startsWith('@sigx/lynx-') ? '@sigx/lynx'
        : npm === '@sigx/actors' || npm.startsWith('@sigx/actors-') ? '@sigx/actors'
        : npm === '@sigx/zero' || npm.startsWith('@sigx/zero-') ? '@sigx/zero'
            : npm;

// ---- Ensure the manifest exists before importing the registry ----
// modules.ts value-imports versions.generated.ts, so that file must exist
// before we can import modules.ts (first run / fresh checkout safety net).
if (!existsSync(genPath)) {
    writeFileSync(genPath, 'export const VERSIONS: Record<string, string> = {};\n', 'utf8');
}

// ---- Collect every npm name across both registries ----
// modules.ts is import-safe (dependency-free, type-only imports — see its
// header); family.ts has value imports that plain Node can't resolve, so we
// scan its `npm: '…'` literals as text instead.
const { MODULES } = await import(pathToFileURL(modulesPath).href);
const familyNpm = [...readFileSync(familyPath, 'utf8').matchAll(/\bnpm:\s*'([^']+)'/g)].map((m) => m[1]);
if (familyNpm.length === 0) {
    throw new Error('fetch-versions: parsed 0 packages from family.ts — has its shape changed?');
}
const npmNames = [...new Set([...familyNpm, ...MODULES.map((m) => m.npm)])].sort();

// ---- Prior values: the committed manifest is the fallback on failure ----
let prior = {};
if (existsSync(genPath)) {
    try {
        prior = (await import(pathToFileURL(genPath).href)).VERSIONS ?? {};
    } catch {
        /* unreadable/stale manifest — treat as empty */
    }
}

// ---- Fetch each distinct anchor's `latest` once ----
const fetched = {};
const failed = [];
await Promise.all(
    [...new Set(npmNames.map(anchorFor))].map(async (pkg) => {
        try {
            const ctrl = new AbortController();
            const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
            let res;
            try {
                res = await fetch(`${REGISTRY}/${pkg}/latest`, {
                    headers: { accept: 'application/json' },
                    signal: ctrl.signal,
                });
            } finally {
                clearTimeout(timer);
            }
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const { version } = await res.json();
            if (!version) throw new Error('no version field');
            fetched[pkg] = version;
        } catch (err) {
            failed.push(`${pkg} (${err instanceof Error ? err.message : String(err)})`);
        }
    }),
);

// ---- Resolve every npm name: fetched anchor → prior → skip ----
const versions = {};
const changes = [];
for (const npm of npmNames) {
    const next = fetched[anchorFor(npm)] ?? prior[npm];
    if (next == null) continue; // no value anywhere → registry RAW literal stays the fallback
    versions[npm] = next;
    if (prior[npm] !== next) changes.push(`${npm}: ${prior[npm] ?? '∅'} → ${next}`);
}

// ---- Write the manifest ----
const body = Object.entries(versions)
    .map(([k, v]) => `    ${JSON.stringify(k)}: ${JSON.stringify(v)},`)
    .join('\n');
const out = `/**
 * AUTO-GENERATED by scripts/fetch-versions.mjs — DO NOT EDIT BY HAND.
 *
 * npm \`latest\` versions keyed by package name, refreshed in CI before each
 * build (the Pages deploy + its daily cron) via scripts/fetch-versions.mjs.
 * Overlaid onto the package registries in lib/family.ts and lib/modules.ts,
 * and read by the <PkgVersion> MDX component. Committed so fresh clones and
 * offline builds have a fallback.
 */
export const VERSIONS: Record<string, string> = {
${body}
};
`;
writeFileSync(genPath, out, 'utf8');

console.log(
    `fetch:versions — ${Object.keys(versions).length} packages, ${changes.length} changed, ${failed.length} anchor(s) failed`,
);
if (changes.length) console.log(`  changed:\n    ${changes.join('\n    ')}`);
if (failed.length) console.log(`  failed (kept prior value):\n    ${failed.join('\n    ')}`);
