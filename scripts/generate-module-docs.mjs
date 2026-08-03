/**
 * Scaffold MDX doc stubs for every sub-package in the module registry
 * (src/lib/modules.ts) — one collection per module, four starter pages.
 *
 *   pnpm gen:modules
 *
 * Idempotent: existing files are NEVER overwritten, so hand-authored
 * content survives re-runs; only missing pages are created. Output is
 * committed — docs stay real MDX files, data-driven through the SSG
 * (collections in ssg.config.ts, nav from frontmatter).
 *
 * Requires Node ≥ 22.18 (native TS type stripping for the registry import).
 */

import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MODULES, moduleDocsCollection, moduleRoutePrefix, COMPONENT_CATALOGS } from '../src/lib/modules.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** Escape text for a double-quoted YAML scalar. */
const yaml = (s) => `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;

/** Escape prose for MDX (blurbs may contain `<Icon …/>`-style text). */
const mdx = (s) => s.replace(/([<>{}])/g, '\\$1');

/** Slugify a component name — must match `slug` in src/components/ComponentCatalog.tsx. */
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

/** A lynx module's component-catalog key, or undefined if it has no catalog. */
const catalogFor = (m) =>
    m.parent === 'lynx' ? COMPONENT_CATALOGS[`lynx-${m.id}`] : undefined;

/** "SignalX Lynx" / "SignalX Terminal" / … — plain "SignalX" for core. */
export const familyName = (parent) =>
    parent === 'lynx' ? 'SignalX Lynx'
        : parent === 'server' ? 'SignalX Server'
        : parent === 'terminal' ? 'SignalX Terminal'
        : 'SignalX';

/**
 * Per-page-type meta descriptions (#516). One shared description across a
 * module's four pages made 4× duplicate-description clusters in search
 * results — each page type gets its own unique, keyword-bearing line.
 */
export const pageDescription = (m, file) => {
    const family = familyName(m.parent);
    const noun = m.parent === 'lynx' ? 'module' : m.parent === 'deploy' ? 'adapter' : 'package';
    const tagLower = m.tag.charAt(0).toLowerCase() + m.tag.slice(1);
    switch (file) {
        case 'overview.mdx':
            return `${m.tag} — the ${m.name} ${noun} for ${family} (${m.npm}): what it does, setup and API.`;
        case 'installation.mdx':
            return `Install and configure ${m.npm}, the ${m.name} ${noun} for ${family}.`;
        case 'usage.mdx':
            return `Using ${m.name} in a ${family} app — ${tagLower} patterns and examples with ${m.npm}.`;
        case 'api.mdx':
            return `API reference for ${m.npm} — every export of the ${family} ${m.name} ${noun}.`;
        default:
            return `${m.tag} — the ${m.name} ${noun} for ${family} (${m.npm}).`;
    }
};

const pageSet = (m) => {
    const parentTitle =
        m.parent === 'lynx' ? 'Lynx'
            : m.parent === 'server' ? 'Server'
            : m.parent === 'terminal' ? 'Terminal'
            : m.parent === 'deploy' ? 'Deploy'
            : 'Core';
    const noun = m.parent === 'lynx' ? 'module' : m.parent === 'deploy' ? 'adapter' : 'package';
    // Lynx, core & terminal ship lockstep from one repo; the server packages do not.
    const lockstep = m.parent === 'lynx'
        ? ' It is versioned in lockstep with the rest of the Lynx module family, so any combination of modules just works together.'
        : m.parent === 'core'
            ? ' It is versioned in lockstep with the rest of the Core repo, so any combination of packages just works together.'
        : m.parent === 'terminal'
            ? ' It is versioned in lockstep with the rest of the terminal repo, so any combination of packages just works together.'
        : m.parent === 'deploy'
            ? ' It ships from the core repo in lockstep with the release it deploys, so the adapter always matches your sigx version.'
            : '';
    // Deploy adapters are build-time tooling — install as devDependencies.
    const installCmd = m.parent === 'deploy' ? `pnpm add -D ${m.npm}` : `pnpm add ${m.npm}`;
    const importName = m.name.replace(/[^A-Za-z0-9]/g, '');
    const pages = [
        {
            file: 'overview.mdx', title: 'Overview', category: 'Getting Started', order: 10,
            body: `import { PkgVersion } from '@/components/PkgVersion';

# ${m.name}

<p class="lede">${mdx(m.blurb)}</p>

<p class="mod-meta-row">${m.downloads ? `<strong>${m.downloads}</strong> weekly <span class="mmr-dot" /> ` : ''}<PkgVersion npm="${m.npm}" />${m.parent === 'lynx' ? ' <span class="mmr-dot" /> iOS · Android' : ''} <span class="mmr-dot" /> MIT</p>

## Installation

\`\`\`bash
${installCmd}${m.parent === 'lynx' && m.category === 'native' ? '\nsigx prebuild   # auto-links the native module' : ''}
\`\`\`

## About

\`${m.npm}\` is a ${parentTitle} ${noun} — ${mdx(m.tag.charAt(0).toLowerCase() + m.tag.slice(1))}.${lockstep}

## Next steps

Continue with [Installation](${moduleRoutePrefix(m)}/installation) for project setup, or jump to the [API reference](${moduleRoutePrefix(m)}/api).
`,
        },
        {
            file: 'installation.mdx', title: 'Installation', category: 'Getting Started', order: 20,
            body: `# Installation

<p class="lede">Add \`${m.npm}\` to your project.</p>

## Install the package

\`\`\`bash
${installCmd}
\`\`\`

${m.parent === 'lynx' ? `## Native setup

${m.category === 'native' ? 'Native modules are autolinked by `@sigx/lynx-cli` — run a prebuild after installing:' : 'Rebuild your development client after installing:'}

\`\`\`bash
sigx prebuild
\`\`\`

` : ''}## Verify

\`\`\`tsx
import * as ${importName} from '${m.npm}';

console.log(Object.keys(${importName}));
\`\`\`
`,
        },
        {
            file: 'usage.mdx', title: 'Usage', category: 'Guides', order: 30,
            body: `# Using ${m.name}

<p class="lede">${mdx(m.tag)} — the essentials.</p>

## Basic usage

\`\`\`tsx
import * as ${importName} from '${m.npm}';
\`\`\`

{/* TODO: author real guide content for ${m.npm} */}

## Notes

${mdx(m.blurb)}
`,
        },
        {
            file: 'api.mdx', title: 'API reference', category: 'Reference', order: 40,
            body: `import { PkgVersion } from '@/components/PkgVersion';

# API reference

<p class="lede">Exports of \`${m.npm}\` <PkgVersion npm="${m.npm}" />.</p>

## Exports

{/* TODO: document the public API of ${m.npm} */}

See the package source for the complete typed surface.
`,
        },
    ];
    // Server, terminal & deploy packages are documented with custom guides
    // (terminal's live in the umbrella's docs/; deploy adapters get a
    // hand-authored "Deploying" guide), not the generic "Usage" stub — skip
    // it so re-runs stay idempotent.
    return m.parent === 'server' || m.parent === 'terminal' || m.parent === 'deploy'
        ? pages.filter((p) => p.file !== 'usage.mdx')
        : pages;
};

let created = 0;
let skipped = 0;

for (const m of MODULES) {
    if (!moduleDocsCollection(m)) continue; // alias entries: documented by their top-level package

    const dir = join(root, 'src', 'pages', ...moduleRoutePrefix(m).split('/').filter(Boolean));
    mkdirSync(dir, { recursive: true });

    // Module root redirect: the bare `/lynx/modules/<id>/` (or `/core/packages/<id>/`)
    // has no doc page of its own and would 404 — emit an index page that redirects to
    // the module's first doc page (overview). Idempotent; kept out of the sidebar.
    const indexPath = join(dir, 'index.tsx');
    if (existsSync(indexPath)) { skipped++; } else {
        writeFileSync(indexPath, `import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="${m.id}" />);

export default Page;

export const meta = {
    title: ${yaml(m.name)},
    description: ${yaml(pageDescription(m, 'index.tsx'))},
    layout: 'default',
    sidebar: false,
};
`, 'utf8');
        created++;
    }

    for (const page of pageSet(m)) {
        const path = join(dir, page.file);
        if (existsSync(path)) { skipped++; continue; }
        const frontmatter = [
            '---',
            `title: ${yaml(page.title)}`,
            `description: ${yaml(pageDescription(m, page.file))}`,
            'layout: module-docs',
            `category: ${yaml(page.category)}`,
            `order: ${page.order}`,
            '---',
        ].join('\n');
        writeFileSync(path, `${frontmatter}\n\n${page.body}`, 'utf8');
        created++;
    }

    // Component-library pages: for modules with a COMPONENT_CATALOGS entry,
    // scaffold a Components catalog index + one stub page per component, so the
    // sidebar gets a "Components" section (mirrors lynx-daisyui / lynx-heroui).
    // Idempotent: hand-authored pages are never overwritten.
    const catalog = catalogFor(m);
    if (catalog) {
        const idxPath = join(dir, 'components.mdx');
        if (existsSync(idxPath)) { skipped++; } else {
            const fm = [
                '---',
                'title: Components',
                `description: ${yaml(`Browse every ${m.npm} component, by category.`)}`,
                'layout: module-docs',
                'category: Guides',
                'order: 25',
                '---',
            ].join('\n');
            const body = `import { ComponentCatalog } from '@/components/ComponentCatalog';

# Components

<p class="lede">Every component in \`${m.npm}\`, grouped by category.</p>

<ComponentCatalog catalogId="lynx-${m.id}" collection="${moduleDocsCollection(m)}" />
`;
            writeFileSync(idxPath, `${fm}\n\n${body}`, 'utf8');
            created++;
        }

        const compDir = join(dir, 'components');
        mkdirSync(compDir, { recursive: true });
        let n = 0;
        for (const group of catalog) {
            for (const name of group.items) {
                n++;
                const path = join(compDir, `${slug(name)}.mdx`);
                if (existsSync(path)) { skipped++; continue; }
                const fm = [
                    '---',
                    `title: ${yaml(name)}`,
                    `description: ${yaml(`${name} component for ${familyName(m.parent)} — usage, props and import (${m.npm}).`)}`,
                    'layout: module-docs',
                    `category: [${yaml('Components')}, ${yaml(group.cat)}]`,
                    `order: ${100 + n}`,
                    '---',
                ].join('\n');
                const body = `# ${name}

<p class="lede">${mdx(name)} — ${mdx(m.tag)}.</p>

## Import

\`\`\`tsx
import { ${name} } from '${m.npm}';
\`\`\`

{/* TODO: author usage, props, slots & events for ${name} */}
`;
                writeFileSync(path, `${fm}\n\n${body}`, 'utf8');
                created++;
            }
        }
    }
}

console.log(`gen:modules — ${created} created, ${skipped} skipped (existing)`);
