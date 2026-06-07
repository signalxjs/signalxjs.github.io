/**
 * Playground launcher — a single host mounted on <body> that owns the
 * Live Playground's open state, plus a capture-phase click interceptor
 * that routes every runnable code block's Run button (both the
 * Shiki-transformer-rendered `.code-window-try-live` buttons from
 * ```tsx live fences and the <CodeWindow live> component) into OUR
 * Playground instead of @sigx/live-code's built-in modal.
 *
 * Installed once from live-code-config.ts (runs before
 * `@sigx/live-code/client` attaches its own handlers; capture phase
 * wins regardless).
 */

import { component, render, signal } from 'sigx';
import { initRuntime, initRegisteredModules, isRuntimeInitialized } from '@sigx/live-code';
import { Playground } from '@/components/Playground';

interface PlaygroundRequest {
    code: string;
    language?: string;
    filename?: string;
    /** Accent hue inherited from the launching context (the host mounts on
     *  <body>, outside any page's --pkg-h scope). */
    hue?: string;
}

const current = signal<{ req: PlaygroundRequest | null }>({ req: null });

/** Open the Live Playground with the given code (runtime init included). */
export async function openPlayground(req: PlaygroundRequest): Promise<void> {
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

/** Decode the base64 UTF-8 source carried in a LivePreview island's props. */
function decodeIslandCode(b64: string): string {
    try {
        return new TextDecoder().decode(Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)));
    } catch {
        return '';
    }
}

/** Resolve the runnable source + meta for a clicked Run button. */
function requestForButton(btn: Element): PlaygroundRequest | null {
    // LivePreview islands (```tsx live fences with preview tabs) carry their
    // source in data-island-props — the rendered DOM only shows the preview.
    const island = btn.closest('.live-preview-island');
    if (island) {
        try {
            const props = JSON.parse(island.getAttribute('data-island-props') ?? '{}');
            const code = props.code ? decodeIslandCode(props.code) : '';
            if (code.trim()) {
                return {
                    code,
                    language: props.language || 'tsx',
                    filename: props.filename || undefined,
                };
            }
        } catch { /* fall through to DOM extraction */ }
    }

    // Plain code windows: take the first non-empty code/pre under the window.
    const win = btn.closest('.code-window');
    for (const el of win?.querySelectorAll('.code-window-content code, .code-window-content pre, code, pre') ?? []) {
        const code = el.textContent ?? '';
        if (code.trim()) {
            const filename = win?.querySelector('.code-window-filename')?.textContent ?? undefined;
            return { code, language: 'tsx', filename };
        }
    }
    return null;
}

/** Rebrand upstream-rendered "⚡ Try Live" buttons to the v2 "⚡ Run". */
function relabelRunButtons(root: Element | Document): void {
    const relabel = (b: Element) => {
        if (/try live/i.test(b.textContent ?? '')) b.textContent = '⚡ Run';
    };
    if (root instanceof Element && root.matches('.code-window-try-live')) relabel(root);
    root.querySelectorAll('.code-window-try-live').forEach(relabel);
}

let installed = false;

/**
 * Mount the host and install the Run-button interceptor. Idempotent;
 * client-only (no-op during SSR).
 */
export function installPlaygroundLauncher(): void {
    if (installed || typeof document === 'undefined') return;
    installed = true;

    const host = document.createElement('div');
    host.id = 'sigx-playground-host';
    document.body.appendChild(host);
    render(<PlaygroundHost />, host);

    document.addEventListener(
        'click',
        (e) => {
            const btn = (e.target as Element | null)?.closest?.('.code-window-try-live');
            if (!btn) return;
            const req = requestForButton(btn);
            if (!req) return; // nothing to run — let other handlers try
            // Stop live-code's own modal handler (and CodeWindow's) from firing.
            e.preventDefault();
            e.stopPropagation();
            req.hue = getComputedStyle(btn).getPropertyValue('--pkg-h').trim() || undefined;
            void openPlayground(req);
        },
        true,
    );

    // Buttons render with upstream's "Try Live" label (Shiki transformer +
    // island hydration, outside our components) — keep them on-brand as
    // they appear. Cheap: only fires on subtree additions.
    relabelRunButtons(document);
    new MutationObserver((muts) => {
        for (const m of muts) {
            m.addedNodes.forEach((n) => {
                if (n.nodeType === 1) relabelRunButtons(n as Element);
            });
        }
    }).observe(document.body, { childList: true, subtree: true });
}
