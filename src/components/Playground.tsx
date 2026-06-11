/**
 * Live Playground — the editor window opened from a runnable code
 * block's Run button. macOS-style header with an accent Run (⌘↵),
 * a real Monaco editor pane (via @sigx/live-code → @sigx/monaco-editor),
 * and an interactive Preview / Console pane executed by the live-code
 * runtime (modules registered in live-code-config).
 *
 * Console output streams from live-code's first-class headless API
 * (`onConsole`, signalxjs/live-code#16) — no more reading the
 * `window.__LIVE_CODE_CONSOLE__` capture global directly.
 */

import { component, onMounted, onUnmounted, type Define } from 'sigx';
import {
    clearPreview,
    createEditor,
    onConsole,
    runCode,
    SIGX_DARK_THEME,
    SIGX_LIGHT_THEME,
    type ConsoleEntry,
    type MonacoEditor,
} from '@sigx/live-code';
import { Icon } from '@/components/ui/Icon';
import { Kbd } from '@/components/ui/Kbd';

type PlaygroundProps =
    & Define.Prop<'code', string, true>
    & Define.Prop<'language', string, false>
    & Define.Prop<'filename', string, false>
    & Define.Event<'close', void>;

let uid = 0;

const LOG_ICONS: Record<ConsoleEntry['type'], string> = {
    log: '›', info: 'ℹ', warn: '⚠', error: '✕',
};

export const Playground = component<PlaygroundProps>(({ props, signal, emit }) => {
    const containerId = `pg-stage-${++uid}`;
    const state = signal({
        tab: 'preview' as 'preview' | 'console',
        running: false,
        ready: false,
        error: '',
        logs: [] as ConsoleEntry[],
    });

    let editor: MonacoEditor | null = null;
    let editorHost: HTMLElement | null = null;
    let offConsole: (() => void) | null = null;

    const run = async () => {
        if (state.running) return;
        state.running = true;
        state.error = '';
        state.tab = 'preview';
        // runCode clears this container's console at the start; the onConsole
        // subscription streams the resulting logs into state.logs.
        try {
            const code = editor?.getValue() ?? props.code;
            const result = await runCode(code, containerId);
            if (!result.success && result.error) state.error = result.error;
        } catch (err) {
            state.error = err instanceof Error ? err.message : String(err);
        } finally {
            state.running = false;
        }
    };

    const reset = () => {
        editor?.setValue(props.code);
        void run();
    };

    const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            e.preventDefault();
            emit('close');
        } else if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            void run();
        }
    };

    onMounted(() => {
        window.addEventListener('keydown', onKey);
        // Stream console output live (fires immediately, then on every captured
        // log — including from effects/async — and on clear).
        offConsole = onConsole(containerId, (logs) => {
            state.logs = [...logs] as ConsoleEntry[];
        });
        void (async () => {
            if (editorHost) {
                const dark = document.documentElement.getAttribute('data-theme') !== 'light';
                editor = await createEditor({
                    container: editorHost,
                    value: props.code,
                    language: props.language ?? 'tsx',
                    theme: dark ? SIGX_DARK_THEME : SIGX_LIGHT_THEME,
                    minimap: false,
                    fontSize: 13,
                });
            }
            state.ready = true;
            await run();
        })();
    });

    onUnmounted(() => {
        window.removeEventListener('keydown', onKey);
        offConsole?.();
        offConsole = null;
        editor?.dispose();
        editor = null;
        clearPreview(document.getElementById(containerId));
    });

    return () => (
        <div class="pg-overlay" onClick={() => emit('close')}>
            <div class="pg-window" role="dialog" aria-label="Live playground" onClick={(e: MouseEvent) => e.stopPropagation()}>
                <header class="pg-head">
                    <div class="pg-head-left">
                        <span class="pg-spark"><Icon name="bolt" size={15} /></span>
                        <span class="pg-title">Live Playground</span>
                        {props.filename && <span class="pg-file">{props.filename}</span>}
                    </div>
                    <div class="pg-head-right">
                        <button class="pg-run" data-running={String(state.running)} onClick={() => void run()}>
                            <Icon name="bolt" size={14} /> Run
                        </button>
                        <button class="pg-ghost" onClick={reset}>Reset</button>
                        <span class="pg-hint"><Kbd>⌘</Kbd><Kbd>↵</Kbd> run</span>
                        <span class="pg-divider" />
                        <button class="pg-close" onClick={() => emit('close')} aria-label="Close playground">
                            <Icon name="close" size={17} />
                        </button>
                    </div>
                </header>

                <div class="pg-body">
                    {/* Editor pane */}
                    <div class="pg-editor">
                        <div class="pg-pane-bar">
                            <span class="pg-dots">
                                <i style="background:#FF5F57" /><i style="background:#FEBC2E" /><i style="background:#28C840" />
                            </span>
                            <span class="pg-pane-file">{props.filename ?? 'playground.tsx'}</span>
                            <span class="pg-lang">{props.language ?? 'tsx'}</span>
                        </div>
                        <div class="pg-monaco" ref={(el: HTMLElement) => { editorHost = el; }} />
                    </div>

                    {/* Preview / console pane */}
                    <div class="pg-preview">
                        <div class="pg-pane-bar pg-preview-bar">
                            <div class="pg-tabs">
                                <button class="pg-tab" data-active={String(state.tab === 'preview')} onClick={() => (state.tab = 'preview')}>
                                    Preview
                                </button>
                                <button class="pg-tab" data-active={String(state.tab === 'console')} onClick={() => (state.tab = 'console')}>
                                    Console
                                    {state.logs.length > 0 && <span class="pg-tab-badge">{state.logs.length}</span>}
                                </button>
                            </div>
                            <button class="pg-refresh" onClick={() => void run()} aria-label="Re-run">
                                <Icon name="enter" size={14} />
                            </button>
                        </div>

                        {/* The stage stays mounted (hidden on the console tab) so the
                            rendered demo keeps its state across tab switches. */}
                        <div class="pg-stage" data-no-spa data-hidden={String(state.tab !== 'preview')}>
                            {state.running && (
                                <div class="pg-spinner-wrap"><span class="pg-spinner" /></div>
                            )}
                            {state.error && !state.running && <div class="pg-error">{state.error}</div>}
                            <div
                                id={containerId}
                                class="pg-stage-inner"
                                style={state.running || state.error ? 'display:none' : ''}
                            />
                        </div>
                        {state.tab === 'console' && (
                            <div class="pg-console">
                                {state.logs.length === 0 && (
                                    <div class="pg-console-empty">No console output — add a console.log() and Run.</div>
                                )}
                                {state.logs.map((l, i) => (
                                    <div class={`pg-log pg-log-${l.type}`} key={i}>
                                        <span class="pg-log-icon">{LOG_ICONS[l.type]}</span>
                                        <span class="pg-log-msg">{l.args.join(' ')}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});
