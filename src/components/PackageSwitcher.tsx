/**
 * Sidebar package switcher — current package tile + title + npm name;
 * opens a compact dropdown of all packages grouped by category.
 * Selecting one routes to its first docs page (when the collection
 * exists) or to its landing page.
 */

import { component, onMounted, onUnmounted, type Define } from 'sigx';
import { useRouter } from '@sigx/router';
import { CATEGORIES, STATUS, inCategory, type SigxPackage } from '@/lib/family';
import { docsHref } from '@/lib/packageLinks';
import { Icon } from '@/components/ui/Icon';
import { PkgTile } from '@/components/ui/PkgTile';

type PackageSwitcherProps = Define.Prop<'currentPkg', SigxPackage, true>;

export const PackageSwitcher = component<PackageSwitcherProps>(({ props, signal }) => {
    const state = signal({ open: false });
    const router = useRouter();

    const pick = (pkg: SigxPackage) => {
        state.open = false;
        router.push(docsHref(pkg.id) ?? `/${pkg.id}`);
    };

    // Close on outside click (single switcher per page, class check suffices).
    const onDoc = (e: MouseEvent) => {
        if (!(e.target as Element | null)?.closest('.switcher')) state.open = false;
    };
    onMounted(() => document.addEventListener('mousedown', onDoc));
    onUnmounted(() => document.removeEventListener('mousedown', onDoc));

    return () => {
        const current = props.currentPkg;
        return (
            <div class="switcher">
                <button
                    class="switcher-trigger"
                    data-open={String(state.open)}
                    style={`--pkg-h:${current.hue}`}
                    onClick={() => (state.open = !state.open)}
                >
                    <PkgTile pkg={current} size={32} />
                    <span class="sw-meta">
                        <span class="sw-name">{current.title}</span>
                        <span class="sw-npm">{current.npm}</span>
                    </span>
                    <Icon name="chevronDown" size={15} class="sw-chev" />
                </button>

                {state.open && (
                    <div class="switcher-pop">
                        <div class="sw-pop-search mono">Switch package</div>
                        <div class="sw-pop-scroll">
                            {CATEGORIES.map((cat) => (
                                <div class="sw-pop-group" key={cat.id}>
                                    <div class="sw-pop-cat mono">{cat.label}</div>
                                    {inCategory(cat.id).map((pkg) => (
                                        <button
                                            key={pkg.id}
                                            class="sw-pop-item"
                                            data-current={String(pkg.id === current.id)}
                                            style={`--pkg-h:${pkg.hue};--st-h:${STATUS[pkg.status].hue}`}
                                            onClick={() => pick(pkg)}
                                        >
                                            <span class="swi-tile">{pkg.glyph}</span>
                                            <span class="swi-name">{pkg.title}</span>
                                            <span class="swi-status" />
                                            {pkg.id === current.id && <Icon name="check" size={14} class="swi-check" />}
                                        </button>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };
});
