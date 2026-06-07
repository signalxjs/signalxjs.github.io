/**
 * Package glyph tile, tinted with the package hue via --pkg-h.
 */

import { component, type Define } from 'sigx';
import type { SigxPackage } from '@/lib/family';

type PkgTileProps =
    & Define.Prop<'pkg', SigxPackage, true>
    & Define.Prop<'size', number>
    & Define.Prop<'class', string>;

export const PkgTile = component<PkgTileProps>(({ props }) => {
    return () => {
        const size = props.size ?? 34;
        return (
            <span
                class={`pkg-tile ${props.class ?? ''}`}
                style={`--pkg-h:${props.pkg.hue};width:${size}px;height:${size}px;font-size:${size * 0.5}px`}
            >
                {props.pkg.glyph}
            </span>
        );
    };
});
