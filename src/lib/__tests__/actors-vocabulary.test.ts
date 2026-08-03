/**
 * The actors line renamed its Orleans-derived vocabulary before its first
 * release: `silo` became `host` and `grain` became `actor`, throughout —
 * `@sigx/actors/silo` → `@sigx/actors/host`, `createSilo` → `createHost`,
 * `/_sigx/silo*` → `/_sigx/host*`, redis `{ns}:silos` → `{ns}:hosts`, and so
 * on. There are no compatibility aliases, because nothing ever shipped under
 * the old names.
 *
 * That rename landed AFTER most of this repo's actors docs-issues were
 * filed, so the queue describes the API in vocabulary that no longer exists.
 * Anyone writing or updating an /actors/ page from an issue body — rather
 * than from the source — will reintroduce it, and the result reads
 * plausibly while naming things that are not there.
 *
 * Hence a test rather than a review convention.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const ACTORS_PAGES = resolve(__dirname, '../../pages/actors');

/** Every .mdx page under src/pages/actors, recursively. */
function mdxFilesIn(dir: string): string[] {
    return readdirSync(dir).flatMap((entry) => {
        const path = join(dir, entry);
        if (statSync(path).isDirectory()) return mdxFilesIn(path);
        return path.endsWith('.mdx') ? [path] : [];
    });
}

/**
 * Word-boundary so `Silon`/`grainy` are not false positives, and the plural
 * forms because "silos"/"grains" are how the old docs usually said it.
 *
 * `Orleans` is here for a different reason: the actor model's prior art is
 * genuinely Orleans-shaped, and the source README explains several decisions by
 * reference to it ("the Orleans posture", `[Reentrant]`). That reads on sigx.dev
 * as borrowing another project's authority to justify our own design. Every one
 * of those points stands on its own once stated directly, so state it directly.
 */
const DEAD_VOCABULARY = /\b(silos?|grains?|orleans)\b/i;

/**
 * `mailbox` describes something the runtime does not have — turns chain onto a
 * promise, so there is no queue to inspect, reorder or bound, and some turns
 * bypass the chain entirely (see andtii/actors#284). The source README still
 * uses the word throughout, so it is easy to copy back in.
 *
 * `turns.mdx` is exempt because its whole job is to say the mailbox does not
 * exist, which requires naming it.
 */
const NO_MAILBOX = /\bmailbox(es)?\b/i;
const MAILBOX_EXEMPT = new Set(['turns.mdx']);

describe('actors docs vocabulary', () => {
    const files = mdxFilesIn(ACTORS_PAGES);

    it('finds the actors pages', () => {
        expect(files.length).toBeGreaterThan(0);
    });

    /** Lines matching `pattern`, as `  <line>: <text>` for the failure message. */
    const offendingLines = (file: string, pattern: RegExp): string =>
        readFileSync(file, 'utf8')
            .split('\n')
            .map((line, i) => [i + 1, line] as const)
            .filter(([, line]) => pattern.test(line))
            .map(([n, line]) => `  ${n}: ${line.trim()}`)
            .join('\n');

    it.each(files.map((f) => [relative(ACTORS_PAGES, f), f]))(
        '%s uses host/actor, and does not lean on Orleans',
        (_label, file) => {
            expect(
                offendingLines(file, DEAD_VOCABULARY),
                'silo/grain is pre-release vocabulary that no longer exists in @sigx/actors — '
                    + 'use host/actor. Write from the source, not the docs-issue bodies. And '
                    + 'state design decisions directly rather than by reference to Orleans.',
            ).toBe('');
        },
    );

    it.each(
        files
            .map((f) => [relative(ACTORS_PAGES, f), f] as const)
            .filter(([label]) => !MAILBOX_EXEMPT.has(label.split(/[\\/]/).pop()!)),
    )('%s does not say "mailbox"', (_label, file) => {
        expect(
            offendingLines(file, NO_MAILBOX),
            'the runtime has no mailbox — turns chain onto a promise, there is nothing to '
                + 'inspect or reorder, and some turns bypass the chain. Say what is actually '
                + 'happening: "blocks other turns", "outside the turn sequence", "accepted by '
                + 'the target activation". See /actors/docs/turns.',
        ).toBe('');
    });
});
