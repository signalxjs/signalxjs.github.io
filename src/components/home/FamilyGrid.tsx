/**
 * Family grid — the bridge between the home page and every package.
 * One row per TARGET (same order as the family menu); each package is
 * a card (tile, title, npm, blurb, status badge, version) that tints
 * to its hue on hover and links to its landing page. The Lynx row ends
 * with a dashed "Browse modules" card into the module catalog.
 * Fully driven by the family registry.
 */

import { component } from 'sigx';
import { useRouter } from '@sigx/router';
import { STATUS, TARGETS, byId, inTarget } from '@/lib/family';
import { modulesByParent } from '@/lib/modules';
import { Icon } from '@/components/ui/Icon';
import { PkgTile } from '@/components/ui/PkgTile';
import { StatusBadge } from '@/components/ui/StatusBadge';

export const FamilyGrid = component(() => {
    const router = useRouter();

    const openFamily = () => {
        window.dispatchEvent(new CustomEvent('sigx:open-family'));
    };

    const lynxModuleCount = modulesByParent('lynx').length;

    return () => (
        <section class="family" id="family">
            <div class="family-head">
                <div>
                    <h2>One core, every target</h2>
                    <p>A universal foundation, then everything each target needs — including its own UI.</p>
                </div>
                <button class="fh-link" onClick={openFamily}>
                    Open the family menu <Icon name="arrowRight" size={14} />
                </button>
            </div>

            {TARGETS.map((tgt) => (
                <div class="cat-row" key={tgt.id}>
                    <div class="cat-row-head">
                        <span class="crh-label">{tgt.label}</span>
                        <span class="crh-hint">{tgt.hint}</span>
                        <span class="crh-line" />
                    </div>
                    <div class="pkg-grid">
                        {inTarget(tgt.id).map((pkg) => (
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
                        {tgt.id === 'lynx' && (
                            <div
                                class="pkg-card pkg-card-browse"
                                style={`--pkg-h:${byId.lynx.hue}`}
                                onClick={() => router.push('/lynx/modules')}
                            >
                                <div class="pkg-card-top">
                                    <span class="pkg-tile" style="width:38px;height:38px;font-size:19px">
                                        <Icon name="cube" size={19} />
                                    </span>
                                    <div class="pct-meta">
                                        <div class="pkg-card-name">Browse modules</div>
                                        <div class="pkg-card-npm">@sigx/lynx-*</div>
                                    </div>
                                </div>
                                <div class="pkg-card-blurb">
                                    {lynxModuleCount} lockstep native modules — gestures, camera, navigation, a DaisyUI component library and more.
                                </div>
                                <div class="pkg-card-foot">
                                    <span class="pcf-v">Catalog</span>
                                    <Icon name="arrowRight" size={16} class="pc-arrow" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </section>
    );
});
