/**
 * HeroBackdrop
 *
 * Per-package "signal field" behind hero sections. Auto-tints to the
 * current package via the `--pkg-h` token (set a `--pkg-h` on an ancestor,
 * e.g. the layout wrapper). On the family/home page pass `family` for a
 * multi-hue field.
 *
 * Variants: 'signal' (default) · 'aurora' · 'prism' · 'grid' · 'off'.
 *
 * Place it as the first child of a `position: relative` hero container that
 * carries the `.sigx-hero` class (see sigx-design.css). Styling lives in
 * sigx-design.css.
 */

import { component } from 'sigx';

export type HeroBackdropVariant = 'signal' | 'aurora' | 'prism' | 'grid' | 'off';

export interface HeroBackdropProps {
    variant?: HeroBackdropVariant;
    /** Multi-hue family field (use on the home / ecosystem page). */
    family?: boolean;
}

const FAMILY_HUES = [285, 205, 350, 158, 78];

export const HeroBackdrop = component<HeroBackdropProps>(({ props }) => {
    return () => {
        const variant = props.variant ?? 'signal';
        if (variant === 'off') return null;
        const family = !!props.family;

        return (
            <div class={`hero-bg v-${variant}${family ? ' is-family' : ''}`} aria-hidden="true">
                {variant === 'grid' && <div class="hb-grid" />}
                {variant === 'grid' && (
                    <>
                        <span class="hb-beam b1" />
                        <span class="hb-beam b2" />
                        <span class="hb-beam b3" />
                    </>
                )}
                {variant === 'signal' && <div class="hb-rings" />}
                {variant === 'prism' && (
                    <div class="hb-shards">
                        <span class="s s1" />
                        <span class="s s2" />
                        <span class="s s3" />
                        <span class="s s4" />
                    </div>
                )}

                {family
                    ? FAMILY_HUES.map((h, i) => (
                          <span key={i} class={`hb-bloom fb fb${i}`} style={`--h:${h}`} />
                      ))
                    : <span class="hb-bloom" />}

                <div class="hb-grain" />
                <div class="hb-fade" />
            </div>
        );
    };
});
