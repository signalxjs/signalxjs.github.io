/**
 * Line icon set (simple strokes only) — ported from the redesign prototype.
 * Rendered in currentColor so icons tint with their surroundings.
 */

import { component, type Define } from 'sigx';

export const ICONS = {
    search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3',
    chevronDown: 'M6 9l6 6 6-6',
    chevronRight: 'M9 6l6 6-6 6',
    arrowRight: 'M5 12h14M13 6l6 6-6 6',
    arrowUpRight: 'M7 17 17 7M8 7h9v9',
    github: 'M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8 0-.6.3-1.1.6-1.4-2.2-.2-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7 0-.3-.4-1.3.2-2.7 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .6 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.8-4.6 5 .4.3.7.9.7 1.9v2.7c0 .3.2.6.7.5A10 10 0 0 0 12 2Z',
    copy: 'M9 9h10v10H9zM5 15H4V4h11v1',
    check: 'M5 12l4.5 4.5L19 7',
    hash: 'M9 4 7 20M17 4l-2 16M4 9h16M3 15h16',
    enter: 'M9 10l-4 4 4 4M5 14h11a4 4 0 0 0 4-4V6',
    close: 'M6 6l12 12M18 6 6 18',
    menu: 'M4 7h16M4 12h16M4 17h16',
    book: 'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM19 3v16',
    terminal: 'M5 6l5 5-5 5M12 18h7',
    sparkle: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z',
    layers: 'M12 3 3 8l9 5 9-5-9-5ZM3 14l9 5 9-5',
    bolt: 'M13 3 4 14h6l-1 7 9-11h-6z',
    external: 'M14 4h6v6M20 4l-9 9M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4',
    cube: 'M12 2 3 7v10l9 5 9-5V7zM3 7l9 5 9-5M12 12v10',
} as const;

export type IconName = keyof typeof ICONS;

type IconProps =
    & Define.Prop<'name', IconName, true>
    & Define.Prop<'size', number>
    & Define.Prop<'stroke', number>
    & Define.Prop<'class', string>;

export const Icon = component<IconProps>(({ props }) => {
    return () => {
        const size = props.size ?? 16;
        const filled = props.name === 'github';
        return (
            <svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill={filled ? 'currentColor' : 'none'}
                stroke={filled ? 'none' : 'currentColor'}
                stroke-width={props.stroke ?? 2}
                stroke-linecap="round"
                stroke-linejoin="round"
                class={`sx-icon ${props.class ?? ''}`}
                aria-hidden="true"
            >
                <path d={ICONS[props.name]} />
            </svg>
        );
    };
});
