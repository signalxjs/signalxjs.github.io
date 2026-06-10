/**
 * One-time codemod: replace the hardcoded `v0.x.y` strings baked into the
 * already-generated module docs with the <PkgVersion> component, so versions
 * track the live npm manifest like everything else.
 *
 *   node scripts/dehardcode-versions.mjs
 *
 * Surgical and idempotent: only the version token in the `mod-meta-row`
 * (overview.mdx) and the "Exports of … vX.Y.Z" lede (api.mdx) is touched,
 * and the <PkgVersion> import is added once. Hand-authored API content is
 * left untouched. New stubs already emit the component (generate-module-docs.mjs).
 *
 * Requires Node ≥ 22.18 (native TS type-stripping for the registry import).
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { MODULES, moduleDocsCollection, moduleRoutePrefix } = await import(
    pathToFileURL(join(root, 'src', 'lib', 'modules.ts')).href
);

const IMPORT_LINE = "import { PkgVersion } from '@/components/PkgVersion';";
const VERSION = /v\d+\.\d+\.\d+(?:-[0-9A-Za-z.]+)?/;

/** Add the component import right after the frontmatter, once (CRLF-safe). */
const ensureImport = (src) => {
    if (src.includes(IMPORT_LINE)) return src;
    const nl = src.includes('\r\n') ? '\r\n' : '\n';
    const lines = src.split(/\r?\n/);
    if (lines[0] !== '---') return src; // no frontmatter — leave as-is
    const end = lines.indexOf('---', 1);
    if (end === -1) return src;
    lines.splice(end + 1, 0, '', IMPORT_LINE);
    return lines.join(nl);
};

let changed = 0;
let skipped = 0;
const misses = [];

for (const m of MODULES) {
    if (!moduleDocsCollection(m)) continue; // alias entries: documented by their top-level package

    const dir = join(root, 'src', 'pages', ...moduleRoutePrefix(m).split('/').filter(Boolean));
    const tag = `<PkgVersion npm="${m.npm}" />`;

    const targets = [
        // overview.mdx — version token in the meta-row (may sit after inner
        // <strong>/<span> tags); bounded to the paragraph so it can't overrun.
        { file: 'overview.mdx', re: new RegExp(`(<p class="mod-meta-row">(?:(?!</p>)[\\s\\S])*?)${VERSION.source}`) },
        // api.mdx — version token in the lede paragraph, whatever the
        // lead-in ("Exports of" / "Every export of" / "Public exports of" …).
        // [^<] keeps the match inside the lede, before the closing </p>.
        { file: 'api.mdx', re: new RegExp(`(<p class="lede">[^<]*?)${VERSION.source}`) },
    ];

    for (const { file, re } of targets) {
        const path = join(dir, file);
        if (!existsSync(path)) { skipped++; continue; }

        const before = readFileSync(path, 'utf8');
        let after = before.replace(re, `$1${tag}`);
        if (after === before && !before.includes(tag)) {
            // No version token and no component yet — shape changed; flag it.
            misses.push(`${moduleRoutePrefix(m)}/${file}`);
            continue;
        }
        after = ensureImport(after);
        if (after !== before) { writeFileSync(path, after, 'utf8'); changed++; }
        else skipped++;
    }
}

console.log(`dehardcode-versions — ${changed} updated, ${skipped} unchanged`);
if (misses.length) {
    console.log(`  no version token found (left as-is, check manually):\n    ${misses.join('\n    ')}`);
}
