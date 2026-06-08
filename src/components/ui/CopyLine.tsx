/**
 * Copy-to-clipboard inline command (e.g. install lines).
 *
 * When the command is a recognized package-manager invocation (e.g.
 * `pnpm add …`, `npm create …`), it grows an npm/pnpm/yarn/bun tab strip
 * and reflects the shared, persisted manager choice (lib/package-manager.ts)
 * — so it stays in sync with the docs code-window switcher. The copied
 * text always matches the displayed command.
 */

import { component, type Define } from 'sigx';
import { Icon } from '@/components/ui/Icon';
import { PMS, parse, render, pm, setPm } from '@/lib/package-manager';

type CopyLineProps =
    & Define.Prop<'text', string, true>
    & Define.Prop<'prefix', string>;

export const CopyLine = component<CopyLineProps>(({ props, signal }) => {
    const state = signal({ done: false });

    const command = () => {
        const parsed = parse(props.text);
        return parsed ? render(parsed, pm.value) : props.text;
    };

    const copy = () => {
        navigator.clipboard?.writeText(command()).catch(() => {});
        state.done = true;
        setTimeout(() => (state.done = false), 1400);
    };

    return () => {
        const prefix = props.prefix ?? '$';
        const line = (
            <button class="copyline" onClick={copy}>
                {prefix && <span class="copyline-prefix">{prefix}</span>}
                <code>{command()}</code>
                <span class="copyline-icon">
                    <Icon name={state.done ? 'check' : 'copy'} size={14} />
                </span>
            </button>
        );

        // Plain commands stay a bare copy-line; only package-manager
        // commands get the switcher chrome.
        if (!parse(props.text)) return line;

        return (
            <div class="copyline-pm">
                <div class="copyline-tabs">
                    {PMS.map((p) => (
                        <button
                            type="button"
                            class={`copyline-tab${p === pm.value ? ' copyline-tab-active' : ''}`}
                            onClick={() => setPm(p)}
                        >
                            {p}
                        </button>
                    ))}
                </div>
                {line}
            </div>
        );
    };
});
