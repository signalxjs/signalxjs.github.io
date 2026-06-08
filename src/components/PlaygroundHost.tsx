/**
 * Playground launcher — a single host mounted on <body> that owns the
 * Live Playground's open state.
 *
 * Every runnable code block routes its Run button into OUR Playground via
 * live-code's first-class `configurePlayground` hook (signalxjs/live-code#16):
 *   - ```tsx live fences (Shiki-transformer `.code-window-live` blocks and
 *     LivePreview islands) call the `openPlayground` callback.
 *   - the <CodeWindow live> component calls `openPlayground()` directly.
 * No more capture-phase click interception, source-decoding, or label
 * rewriting. The "⚡ Run" label comes from `@sigx/ssg`'s `markdown.shiki.triggerLabel`
 * (static buttons) and live-code's `configurePlayground({ triggerLabel })`
 * (runtime LivePreview islands).
 *
 * Installed once from live-code-config.ts, before `@sigx/live-code/client`
 * auto-initializes (so the config is in place before islands hydrate).
 */

import { component, render, signal } from 'sigx';
import {
    configurePlayground,
    initRegisteredModules,
    initRuntime,
    isRuntimeInitialized,
} from '@sigx/live-code';
import { Playground } from '@/components/Playground';

interface PlaygroundRequest {
    code: string;
    language?: string;
    filename?: string;
    /** Accent hue for the playground window. Defaults to the current page's
     *  `--pkg-h` (the host mounts on <body>, outside any page's scope). */
    hue?: string;
}

const current = signal<{ req: PlaygroundRequest | null }>({ req: null });

/** Read the active page's accent hue (`--pkg-h`), set on the layout root. */
function readPageHue(): string | undefined {
    if (typeof document === 'undefined') return undefined;
    const scope = document.querySelector('main') ?? document.documentElement;
    return getComputedStyle(scope).getPropertyValue('--pkg-h').trim() || undefined;
}

/** Open the Live Playground with the given code (runtime init included). */
export async function openPlayground(req: PlaygroundRequest): Promise<void> {
    if (!req.hue) req.hue = readPageHue();
    if (!isRuntimeInitialized()) initRuntime();
    await initRegisteredModules();
    current.req = req;
}

const PlaygroundHost = component(() => {
    return () => {
        const req = current.req;
        if (!req) return null;
        return (
            <div style={req.hue ? `--pkg-h:${req.hue}` : ''}>
                <Playground
                    code={req.code}
                    language={req.language}
                    filename={req.filename}
                    onClose={() => (current.req = null)}
                />
            </div>
        );
    };
});

let installed = false;

/**
 * Mount the host and route every runnable code block's Run button into the
 * docs' own Live Playground via live-code's `configurePlayground` hook.
 * Idempotent; client-only (no-op during SSR).
 */
export function installPlaygroundLauncher(): void {
    if (installed || typeof document === 'undefined') return;
    installed = true;

    const host = document.createElement('div');
    host.id = 'sigx-playground-host';
    document.body.appendChild(host);
    render(<PlaygroundHost />, host);

    configurePlayground({
        // Runtime label for LivePreview islands; the SSG static buttons get
        // their label from markdown.shiki.triggerLabel in ssg.config.ts.
        triggerLabel: '⚡ Run',
        openPlayground: ({ code, language, filename }) =>
            void openPlayground({ code, language, filename }),
    });
}
