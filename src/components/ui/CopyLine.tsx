/**
 * Copy-to-clipboard inline command (e.g. install lines).
 */

import { component, type Define } from 'sigx';
import { Icon } from '@/components/ui/Icon';

type CopyLineProps =
    & Define.Prop<'text', string, true>
    & Define.Prop<'prefix', string>;

export const CopyLine = component<CopyLineProps>(({ props, signal }) => {
    const state = signal({ done: false });

    const copy = () => {
        navigator.clipboard?.writeText(props.text).catch(() => {});
        state.done = true;
        setTimeout(() => (state.done = false), 1400);
    };

    return () => (
        <button class="copyline" onClick={copy}>
            {(props.prefix ?? '$') && <span class="copyline-prefix">{props.prefix ?? '$'}</span>}
            <code>{props.text}</code>
            <span class="copyline-icon">
                <Icon name={state.done ? 'check' : 'copy'} size={14} />
            </span>
        </button>
    );
});
