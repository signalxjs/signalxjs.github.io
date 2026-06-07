/**
 * Family mega-menu — organized by TARGET (Foundation / Web / Lynx /
 * Terminal), opened from the navbar package trigger. Capability is a
 * sub-group INSIDE each target column, so web UI and native UI sit in
 * parallel. Lynx & Terminal are collections: a Framework sub-group,
 * then "UI & modules" (featured Lynx modules + a catalog link; the
 * terminal equivalent is on the roadmap).
 *
 * Render conditionally ({open && <FamilyMenu …/>}). Scrim click and
 * Esc close it. Reflows 4 → 2 columns ≤1024 and to a single
 * scrollable sheet ≤720 (CSS only — see sigx-components.css).
 */

import { component, onMounted, onUnmounted, type Define } from 'sigx';
import { useRouter } from '@sigx/router';
import {
    CATEGORIES, CAT_SHORT, STATUS, TARGETS, byId, inTarget,
    type SigxPackage, type TargetId,
} from '@/lib/family';
import { LYNX_FEATURED, MODULES, moduleById, type SigxModule } from '@/lib/modules';
import { moduleHref } from '@/lib/packageLinks';
import { Icon } from '@/components/ui/Icon';
import { PkgTile } from '@/components/ui/PkgTile';

type FamilyMenuProps =
    & Define.Prop<'currentId', string>
    & Define.Event<'close', void>;

export const FamilyMenu = component<FamilyMenuProps>(({ props, emit }) => {
    const router = useRouter();

    const go = (href: string) => {
        router.push(href);
        emit('close');
    };
    const pick = (pkg: SigxPackage) => go(`/${pkg.id}`);
    const pickModule = (m: SigxModule) => go(moduleHref(m));

    const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') emit('close');
    };
    onMounted(() => window.addEventListener('keydown', onKey));
    onUnmounted(() => window.removeEventListener('keydown', onKey));

    // A target's packages grouped by capability, in CATEGORIES order.
    const groupsFor = (target: TargetId) => {
        const pkgs = inTarget(target);
        return CATEGORIES
            .map((c) => ({ cat: c.id, items: pkgs.filter((p) => p.cat === c.id) }))
            .filter((g) => g.items.length > 0);
    };

    const pkgItem = (pkg: SigxPackage) => (
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
    );

    // Identical tile/name/blurb markup so every column is visually uniform.
    const moduleItem = (m: SigxModule) => (
        <div
            key={m.id}
            class="mega-item"
            style={`--pkg-h:${m.hue}`}
            onClick={() => pickModule(m)}
        >
            <span class="pkg-tile" style="width:30px;height:30px;font-size:15px">{m.glyph}</span>
            <div class="mi-body">
                <div class="mi-name">{m.name}</div>
                <div class="mi-blurb">{m.tag}</div>
            </div>
        </div>
    );

    const lynxModuleCount = MODULES.filter((m) => m.parent === 'lynx').length;

    return () => (
        <>
            <div class="mega-scrim" onClick={() => emit('close')} />
            <div class="mega" role="dialog" aria-label="SignalX packages">
                <div class="mega-head">
                    <div>
                        <div class="mh-title">The SignalX family</div>
                        <div class="mh-sub">One reactive core, one toolchain — pick a target and ship the same components to it.</div>
                    </div>
                    <div class="mh-sub mono">{TARGETS.length} TARGETS · {Object.keys(byId).length} PACKAGES</div>
                </div>
                <div class="mega-body mega-body-targets">
                    {TARGETS.map((tgt) => (
                        <div class="mega-col" key={tgt.id}>
                            <div class="mega-col-head">
                                <span class="mc-label">{tgt.label}</span>
                                <span class="mc-hint">{tgt.hint}</span>
                            </div>

                            {/* Lynx & Terminal are collections: the framework package, then its modules */}
                            {tgt.id === 'lynx' ? (
                                <>
                                    <div class="mega-sub">
                                        <div class="mega-subhead mono">{CAT_SHORT.platform}</div>
                                        {pkgItem(byId.lynx)}
                                    </div>
                                    <div class="mega-sub">
                                        <div class="mega-subhead mono">UI &amp; modules</div>
                                        {LYNX_FEATURED
                                            .map((id) => moduleById[id])
                                            .filter(Boolean)
                                            .map(moduleItem)}
                                        <button class="mega-browse" onClick={() => go('/lynx/modules')}>
                                            Browse all {lynxModuleCount} modules <Icon name="arrowRight" size={13} />
                                        </button>
                                    </div>
                                </>
                            ) : tgt.id === 'terminal' ? (
                                <>
                                    <div class="mega-sub">
                                        <div class="mega-subhead mono">{CAT_SHORT.platform}</div>
                                        {pkgItem(byId.terminal)}
                                    </div>
                                    <div class="mega-sub">
                                        <div class="mega-subhead mono">UI &amp; modules</div>
                                        <div class="mega-note">Native-style modules for the terminal are on the roadmap.</div>
                                    </div>
                                </>
                            ) : (
                                groupsFor(tgt.id).map((g) => (
                                    <div class="mega-sub" key={g.cat}>
                                        <div class="mega-subhead mono">{CAT_SHORT[g.cat]}</div>
                                        {g.items.map(pkgItem)}
                                    </div>
                                ))
                            )}
                        </div>
                    ))}
                </div>
                <div class="mega-foot">
                    <span>Capabilities group <em>inside</em> each target — web UI &amp; native UI sit in parallel.</span>
                    <span class="mf-cta" onClick={() => pick(byId.core)}>
                        Ecosystem overview <Icon name="arrowRight" size={14} />
                    </span>
                </div>
            </div>
        </>
    );
});
