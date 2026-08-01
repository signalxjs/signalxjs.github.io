/**
 * Styled SPA link.
 *
 * @sigx/router's RouterLink only forwards its own props (to/replace/
 * activeClass…) — a `class` or `style` prop is silently dropped. This
 * renders a real <a> with arbitrary class/style/data-active and pushes
 * through the router on plain left-clicks (modified clicks fall through
 * to the browser).
 */

import { component, type Define } from 'sigx';
import { useRouter } from '@sigx/router';
import { canonicalPath } from '@/lib/url';

type SxLinkProps =
    & Define.Prop<'to', string, true>
    & Define.Prop<'class', string>
    & Define.Prop<'style', string>
    & Define.Prop<'active', boolean>
    & Define.Event<'click', void>
    & Define.Slot<'default'>;

export const SxLink = component<SxLinkProps>(({ props, slots, emit }) => {
    const router = useRouter();

    // Canonicalise to the trailing-slash form so both the rendered href and the
    // imperative push match the hard-load URL (router.push bypasses ssg's
    // installSpaNavigation, which would otherwise normalise it).
    const href = () => canonicalPath(props.to);

    const onClick = (e: MouseEvent) => {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        emit('click');
        router.push(href());
    };

    return () => (
        <a
            href={href()}
            class={props.class}
            style={props.style}
            data-active={props.active === undefined ? undefined : String(props.active)}
            onClick={onClick}
        >
            {slots.default?.()}
        </a>
    );
});
