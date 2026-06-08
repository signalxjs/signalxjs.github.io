/**
 * Shared package-manager preference + command translation.
 *
 * One reactive, persisted choice of npm / pnpm / yarn / bun for the whole
 * site. Both the docs code-window switcher (PackageManagerSwitcher.ts, a
 * DOM enhancer) and the inline CopyLine widget read and write the same
 * `pm` signal, so picking a manager anywhere updates everywhere.
 *
 * `parse` reduces a written command to a manager-agnostic shape; `render`
 * emits it for a target manager. Package arguments are never translated —
 * only the command prefix changes — and `parse` is total over `render`'s
 * output, so managers round-trip cleanly when the user flips repeatedly.
 */

import { signal, computed } from 'sigx';

export type Pm = 'pnpm' | 'npm' | 'yarn' | 'bun';

export const PMS: Pm[] = ['pnpm', 'npm', 'yarn', 'bun'];
export const DEFAULT_PM: Pm = 'pnpm';
const STORAGE_KEY = 'sigx-pm';

function read(): Pm {
    if (typeof localStorage === 'undefined') return DEFAULT_PM;
    try {
        const v = localStorage.getItem(STORAGE_KEY);
        if (v && PMS.includes(v as Pm)) return v as Pm;
    } catch { /* storage unavailable */ }
    return DEFAULT_PM;
}

// Backing store kept internal: PrimitiveSignal widens its `.value` type
// (the Pm union collapses to `string`). The exported `computed` preserves
// the `Pm` type for reads and makes the preference read-only — writes go
// through setPm.
const store = signal<Pm>(read());

/** The active manager — reactive, persisted, shared across the site. */
export const pm = computed<Pm>(() => store.value as Pm);

/** Set the active manager; persists and (via the signal) syncs every block. */
export function setPm(next: Pm): void {
    if (!PMS.includes(next) || next === store.value) return;
    store.value = next;
    if (typeof localStorage !== 'undefined') {
        try { localStorage.setItem(STORAGE_KEY, next); } catch { /* ignore */ }
    }
}

// Cross-tab sync: mirror changes made in other tabs into the signal.
if (typeof window !== 'undefined') {
    window.addEventListener('storage', (e) => {
        if (e.key === STORAGE_KEY && e.newValue && PMS.includes(e.newValue as Pm)) {
            store.value = e.newValue as Pm;
        }
    });
}

/** A package-manager invocation reduced to a manager-agnostic shape. */
export interface Parsed {
    action: 'add' | 'install' | 'remove' | 'dlx' | 'create' | 'run';
    dev: boolean;
    global: boolean;
    /** Packages / target / script — verbatim, never translated. */
    args: string;
    /** Trailing ` # …` comment, preserved verbatim (incl. leading space). */
    comment: string;
}

const DEV_FLAGS = new Set(['-D', '--save-dev', '--dev', '-d']);
const GLOBAL_FLAGS = new Set(['-g', '--global']);

/** Pull dev/global flags out of an argument token list. */
function stripFlags(tokens: string[]): { dev: boolean; global: boolean; args: string[] } {
    let dev = false;
    let global = false;
    const args = tokens.filter((t) => {
        if (DEV_FLAGS.has(t)) return (dev = true), false;
        if (GLOBAL_FLAGS.has(t)) return (global = true), false;
        return true;
    });
    return { dev, global, args };
}

function finalize(
    action: Parsed['action'],
    tokens: string[],
    comment: string,
    globalFromSub = false,
): Parsed {
    const { dev, global, args } = stripFlags(tokens);
    return { action, dev, global: global || globalFromSub, args: args.join(' '), comment };
}

/**
 * Parse one command line into a manager-agnostic shape, or null when the
 * line is not a recognized package-manager command.
 */
export function parse(raw: string): Parsed | null {
    const hashIdx = raw.indexOf(' #');
    const comment = hashIdx === -1 ? '' : raw.slice(hashIdx);
    const body = (hashIdx === -1 ? raw : raw.slice(0, hashIdx)).trim();
    if (!body) return null;

    const tokens = body.split(/\s+/);
    const pmTok = tokens[0];

    // Bare one-off executors map straight to `dlx`.
    if (pmTok === 'npx' || pmTok === 'bunx') {
        return finalize('dlx', tokens.slice(1), comment);
    }
    if (!PMS.includes(pmTok as Pm)) return null;

    let sub = tokens[1] ?? '';
    let rest = tokens.slice(2);

    // `bun x` is bun's dlx.
    if (pmTok === 'bun' && sub === 'x') return finalize('dlx', rest, comment);

    // `yarn global add …` — global is a prefix sub-command in yarn classic.
    let global = false;
    if (pmTok === 'yarn' && sub === 'global') {
        global = true;
        sub = rest[0] ?? '';
        rest = rest.slice(1);
    }

    switch (sub) {
        case 'add':
            return finalize('add', rest, comment, global);
        case 'install':
        case 'i':
            // `<pm> install <pkgs>` is an add; bare `<pm> install` installs all.
            return finalize(
                stripFlags(rest).args.length ? 'add' : 'install',
                rest,
                comment,
                global,
            );
        case 'uninstall':
        case 'remove':
        case 'rm':
            return finalize('remove', rest, comment);
        case 'dlx':
            return finalize('dlx', rest, comment);
        case 'create':
        case 'init':
            return finalize('create', rest, comment);
        case 'run':
            return finalize('run', rest, comment);
        case '':
            // `yarn` on its own installs all dependencies.
            return { action: 'install', dev: false, global: false, args: '', comment };
        default:
            return null;
    }
}

/** Render a parsed command for a target manager. */
export function render(p: Parsed, target: Pm): string {
    const { action, dev, global, args, comment } = p;
    let cmd: string;

    switch (action) {
        case 'add': {
            if (global && target === 'yarn') {
                cmd = `yarn global add ${args}`;
                break;
            }
            const verb = target === 'npm' ? 'install' : 'add';
            const flags = [dev ? '-D' : '', global ? '-g' : ''].filter(Boolean).join(' ');
            cmd = `${target} ${verb}${flags ? ` ${flags}` : ''} ${args}`;
            break;
        }
        case 'install':
            cmd = `${target} install`;
            break;
        case 'remove':
            cmd = `${target} ${target === 'npm' ? 'uninstall' : 'remove'} ${args}`;
            break;
        case 'dlx':
            cmd =
                target === 'npm' ? `npx ${args}`
                : target === 'bun' ? `bunx ${args}`
                : `${target} dlx ${args}`;
            break;
        case 'create':
            cmd = `${target} create ${args}`;
            break;
        case 'run':
            cmd = `${target} run ${args}`;
            break;
    }

    return cmd.replace(/\s+/g, ' ').trim() + comment;
}

/** Translate a written command to the target manager, or return it unchanged. */
export function translate(raw: string, target: Pm): string {
    const parsed = parse(raw);
    return parsed ? render(parsed, target) : raw;
}
