/**
 * SignalX Documentation Homepage
 *
 * Family-overview home: hero with the multi-hue signal field, a stats
 * band, and the family grid bridging to every package's landing page.
 *
 * @layout home
 */

import { component } from 'sigx';
import { HeroSection } from '@/components/home/HeroSection';
import { FamilyGrid } from '@/components/home/FamilyGrid';
import { PUBLIC_PACKAGES } from '@/lib/family';

/**
 * Homepage content - layout handles navigation and footer
 */
const HomePage = component(() => {
    return () => (
        <div class="page">
            <HeroSection />

            <div class="home-band">
                <div class="hb-stat"><span class="hb-num">{PUBLIC_PACKAGES.length}</span><span>packages</span></div>
                <span class="hb-sep" />
                <div class="hb-stat"><span class="hb-num">~7kb</span><span>core runtime</span></div>
                <span class="hb-sep" />
                <div class="hb-stat"><span class="hb-num">4</span><span>render targets</span></div>
                <span class="hb-sep" />
                <div class="hb-stat"><span class="hb-num">7</span><span>deploy targets</span></div>
                <span class="hb-sep" />
                <div class="hb-stat"><span class="hb-num">MIT</span><span>licensed</span></div>
            </div>

            <FamilyGrid />
        </div>
    );
});

export default HomePage;

/**
 * Page metadata for SSG
 * The layout property tells SSG which layout to wrap this page with
 */
export const meta = {
    title: 'SignalX — Fine-grained reactive TypeScript framework',
    description: 'SignalX (sigx) — a fine-grained reactive TypeScript framework: signals, TSX components, server functions and actors. Web, native and terminal.',
    layout: 'home',
    // The site-wide graph in index.html already describes the homepage.
    autoJsonLd: false,
};
