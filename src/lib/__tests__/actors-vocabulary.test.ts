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
 */
const DEAD_VOCABULARY = /\b(silos?|grains?)\b/i;

describe('actors docs vocabulary', () => {
    const files = mdxFilesIn(ACTORS_PAGES);

    it('finds the actors pages', () => {
        expect(files.length).toBeGreaterThan(0);
    });

    it.each(files.map((f) => [relative(ACTORS_PAGES, f), f]))(
        '%s uses host/actor, never silo/grain',
        (_label, file) => {
            const offenders = readFileSync(file, 'utf8')
                .split('\n')
                .map((line, i) => [i + 1, line] as const)
                .filter(([, line]) => DEAD_VOCABULARY.test(line));

            expect(
                offenders.map(([n, line]) => `  ${n}: ${line.trim()}`).join('\n'),
                'silo/grain is pre-release vocabulary that no longer exists in @sigx/actors — '
                    + 'use host/actor. Write from the source, not the docs-issue bodies.',
            ).toBe('');
        },
    );
});
