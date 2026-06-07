/**
 * Sidebar module switcher — the sub-package counterpart of
 * PackageSwitcher: current module tile + name + npm; opens a dropdown
 * of every module in the same collection (lynx / core), grouped by
 * category. Selecting one routes to its first docs page. Shares the
 * .switcher* styles so package and module docs look identical.
 */

import { component, onMounted, onUnmounted, type Define } from 'sigx';
import { useRouter } from '@sigx/router';
import { STATUS } from '@/lib/family';
import { MODULE_CATEGORIES, modulesInCategory, type SigxModule } from '@/lib/modules';
import { moduleHref } from '@/lib/packageLinks';
import { Icon } from '@/components/ui/Icon';

type ModuleSwitcherProps = Define.Prop<'currentModule', SigxModule, true>;

export const ModuleSwitcher = component<ModuleSwitcherProps>(({ props, signal }) => {
    const state = signal({ open: false });
    const router = useRouter();

    const pick = (m: SigxModule) => {
        state.open = false;
        router.push(moduleHref(m));
    };

    // Close on outside click (single switcher per page, class check suffices).
    const onDoc = (e: MouseEvent) => {
        if (!(e.target as Element | null)?.closest('.switcher')) state.open = false;
    };
    onMounted(() => document.addEventListener('mousedown', onDoc));
    onUnmounted(() => document.removeEventListener('mousedown', onDoc));

    return () => {
        const current = props.currentModule;
        const groups = MODULE_CATEGORIES[current.parent]
            .map((cat) => ({ cat, items: modulesInCategory(current.parent, cat.id) }))
            .filter((g) => g.items.length > 0);
        return (
            <div class="switcher">
                <button
                    class="switcher-trigger"
                    data-open={String(state.open)}
                    style={`--pkg-h:${current.hue}`}
                    onClick={() => (state.open = !state.open)}
                >
                    <span class="pkg-tile" style="width:32px;height:32px;font-size:16px">{current.glyph}</span>
                    <span class="sw-meta">
                        <span class="sw-name">{current.name}</span>
                        <span class="sw-npm">{current.npm}</span>
                    </span>
                    <Icon name="chevronDown" size={15} class="sw-chev" />
                </button>

                {state.open && (
                    <div class="switcher-pop">
                        <div class="sw-pop-search mono">Switch module</div>
                        <div class="sw-pop-scroll">
                            {groups.map((g) => (
                                <div class="sw-pop-group" key={g.cat.id}>
                                    <div class="sw-pop-cat mono">{g.cat.label}</div>
                                    {g.items.map((m) => (
                                        <button
                                            key={m.id}
                                            class="sw-pop-item"
                                            data-current={String(m.id === current.id)}
                                            style={`--pkg-h:${m.hue};--st-h:${STATUS[m.status].hue}`}
                                            onClick={() => pick(m)}
                                        >
                                            <span class="swi-tile">{m.glyph}</span>
                                            <span class="swi-name">{m.name}</span>
                                            <span class="swi-status" />
                                            {m.id === current.id && <Icon name="check" size={14} class="swi-check" />}
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
