/**
 * Home hero — Signal(X) wordmark over the multi-hue signal field,
 * tagline, CTAs and the install copy-line.
 */

import { component } from 'sigx';
import { byId } from '@/lib/family';
import { docsHref } from '@/lib/packageLinks';
import { CopyLine } from '@/components/ui/CopyLine';
import { Icon } from '@/components/ui/Icon';
import { SxLink } from '@/components/ui/SxLink';

export const HeroSection = component(() => {
    const openFamily = () => {
        // The mega-menu lives in the Navbar; ask it to open.
        window.dispatchEvent(new CustomEvent('sigx:open-family'));
    };

    return () => (
        <section class="home-hero">
            <img
                src={`${import.meta.env.BASE_URL}sigx.png`}
                alt=""
                class="hh-mark"
                loading="eager"
                decoding="async"
            />
            <h1>
                Signal<span class="paren">(</span><span class="xx">X</span><span class="paren">)</span>
                {/* Visually hidden: gives the wordmark-only h1 real words for
                    screen readers (the split glyphs read as "Signal ( X )")
                    and for search engines (#516). */}
                <span class="sr-only"> — SignalX, a fine-grained reactive TypeScript framework</span>
            </h1>
            <p class="hh-sub">
                A fine-grained reactive framework with one core and a package for every surface —
                web, native, terminal and the tooling in between.{' '}
                <SxLink to="/why-signalx">Why SignalX?</SxLink>
            </p>
            <div class="hh-cta">
                <SxLink
                    to={docsHref('core') ?? '/core'}
                    class="sx-btn sx-btn-primary"
                    style={`--pkg-h:${byId.core.hue}`}
                >
                    Get started <Icon name="arrowRight" size={15} />
                </SxLink>
                <button class="sx-btn sx-btn-outline" onClick={openFamily}>
                    <Icon name="cube" size={15} /> Explore the family
                </button>
            </div>
            <div class="hh-install"><CopyLine text="npm create @sigx@latest" prefix="$" /></div>
        </section>
    );
});
