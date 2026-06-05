// Runs the docs dev server with @sigx/daisyui aliased to a local source checkout
// so component edits hot-reload (see vite.config.ts -> SIGX_DAISYUI_SRC).
//
// Defaults to the standard sibling layout (C:/Dev/sigx/daisyui/...). Point at a
// different checkout by exporting SIGX_DAISYUI_SRC yourself before running.
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

process.env.SIGX_DAISYUI_SRC ||= resolve(root, '../../daisyui/main/packages/daisyui/src');

if (!existsSync(process.env.SIGX_DAISYUI_SRC)) {
    console.error(
        `\n[dev:daisyui] @sigx/daisyui source not found at:\n  ${process.env.SIGX_DAISYUI_SRC}\n\n` +
        `Clone the daisyUI library next to the docs repo, or point SIGX_DAISYUI_SRC at\n` +
        `your local packages/daisyui/src before running, e.g.:\n` +
        `  SIGX_DAISYUI_SRC=/path/to/daisyui/packages/daisyui/src npm run dev:daisyui\n`
    );
    process.exit(1);
}

const bin = resolve(root, 'node_modules/.bin/sigx' + (process.platform === 'win32' ? '.CMD' : ''));

spawn(bin, ['dev'], {
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: process.env,
}).on('exit', (code) => process.exit(code ?? 0));
