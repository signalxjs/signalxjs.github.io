/**
 * Family mega-menu — all packages grouped by category, opened from the
 * navbar package trigger. Each row tints to its package hue; selecting
 * one routes to that package's landing page.
 *
 * Render conditionally ({open && <FamilyMenu …/>}). Scrim click and
 * Esc close it. Reflows 5 → 2 columns ≤1024 and to a single
 * scrollable sheet ≤720 (CSS only — see sigx-components.css).
 */

import { component, onMounted, onUnmounted, type Define } from 'sigx';
import { useRouter } from '@sigx/router';
import { CATEGORIES, PACKAGES, STATUS, byId, inCategory, type SigxPackage } from '@/lib/family';
import { Icon } from '@/components/ui/Icon';
import { Kbd } from '@/components/ui/Kbd';
import { PkgTile } from '@/components/ui/PkgTile';

type FamilyMenuProps =
    & Define.Prop<'currentId', string>
    & Define.Event<'close', void>;

export const FamilyMenu = component<FamilyMenuProps>(({ props, emit }) => {
    const router = useRouter();

    const pick = (pkg: SigxPackage) => {
        router.push(`/${pkg.id}`);
        emit('close');
    };

    const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') emit('close');
    };
    onMounted(() => window.addEventListener('keydown', onKey));
    onUnmounted(() => window.removeEventListener('keydown', onKey));

    return () => (
        <>
            <div class="mega-scrim" onClick={() => emit('close')} />
            <div class="mega" role="dialog" aria-label="SignalX packages">
                <div class="mega-head">
                    <div>
                        <div class="mh-title">The SignalX family</div>
                        <div class="mh-sub">One reactive core — twelve packages across every surface you ship to.</div>
                    </div>
                    <div class="mh-sub mono">{PACKAGES.length} PACKAGES</div>
                </div>
                <div class="mega-body">
                    {CATEGORIES.map((cat) => (
                        <div class="mega-col" key={cat.id}>
                            <div class="mega-col-head">
                                <span class="mc-label">{cat.label}</span>
                                <span class="mc-hint">{cat.hint}</span>
                            </div>
                            {inCategory(cat.id).map((pkg) => (
                                <div
                                    key={pkg.id}
                                    class="mega-item"
                                    style={`--pkg-h:${pkg.hue};--st-h:${STATUS[pkg.status].hue}`}
                                    onClick={() => pick(pkg)}
                                >
                                    <PkgTile pkg={pkg} size={30} />
                                    <div class="mi-body">
                                        <div class="mi-name">
                                            {pkg.title}
                                            {pkg.id === props.currentId && <span class="mi-dot" />}
                                        </div>
                                        <div class="mi-blurb">{pkg.tag}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div class="mega-foot">
                    <span>Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to jump to any page</span>
                    <span class="mf-cta" onClick={() => pick(byId.core)}>
                        Ecosystem overview <Icon name="arrowRight" size={14} />
                    </span>
                </div>
            </div>
        </>
    );
});
