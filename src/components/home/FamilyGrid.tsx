/**
 * Family grid — the bridge between the home page and every package.
 * Categories render as rows; each package is a card (tile, title, npm,
 * blurb, status badge, version) that tints to its hue on hover and
 * links to its landing page. Fully driven by the family registry.
 */

import { component } from 'sigx';
import { useRouter } from '@sigx/router';
import { CATEGORIES, STATUS, inCategory } from '@/lib/family';
import { Icon } from '@/components/ui/Icon';
import { PkgTile } from '@/components/ui/PkgTile';
import { StatusBadge } from '@/components/ui/StatusBadge';

export const FamilyGrid = component(() => {
    const router = useRouter();

    const openFamily = () => {
        window.dispatchEvent(new CustomEvent('sigx:open-family'));
    };

    return () => (
        <section class="family" id="family">
            <div class="family-head">
                <div>
                    <h2>One core, every surface</h2>
                    <p>The same signals and components, from a static site to a native app.</p>
                </div>
                <button class="fh-link" onClick={openFamily}>
                    Open the family menu <Icon name="arrowRight" size={14} />
                </button>
            </div>

            {CATEGORIES.map((cat) => (
                <div class="cat-row" key={cat.id}>
                    <div class="cat-row-head">
                        <span class="crh-label">{cat.label}</span>
                        <span class="crh-hint">{cat.hint}</span>
                        <span class="crh-line" />
                    </div>
                    <div class="pkg-grid">
                        {inCategory(cat.id).map((pkg) => (
                            <div
                                key={pkg.id}
                                class="pkg-card"
                                style={`--pkg-h:${pkg.hue};--st-h:${STATUS[pkg.status].hue}`}
                                onClick={() => router.push(`/${pkg.id}`)}
                            >
                                <div class="pkg-card-top">
                                    <PkgTile pkg={pkg} size={38} />
                                    <div class="pct-meta">
                                        <div class="pkg-card-name">{pkg.title}</div>
                                        <div class="pkg-card-npm">{pkg.npm}</div>
                                    </div>
                                    <StatusBadge status={pkg.status} />
                                </div>
                                <div class="pkg-card-blurb">{pkg.blurb}</div>
                                <div class="pkg-card-foot">
                                    <span class="pcf-v">v{pkg.version}</span>
                                    <Icon name="arrowRight" size={16} class="pc-arrow" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
});
