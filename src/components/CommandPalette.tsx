/**
 * ⌘K command palette — jump to any page across the package family.
 *
 * Render conditionally ({open && <CommandPalette …/>}); mount/unmount
 * drives listener setup and input focus. Entries come from the real
 * SSG navigation (see lib/commands.ts) and tint to their package hue.
 */

import { component, onMounted, onUnmounted, type Define } from 'sigx';
import { useRouter } from '@sigx/router';
import { buildCommands, type Command } from '@/lib/commands';
import { byId } from '@/lib/family';
import { canonicalPath } from '@/lib/url';
import { Icon } from '@/components/ui/Icon';
import { Kbd } from '@/components/ui/Kbd';

type CommandPaletteProps = Define.Event<'close', void>;

export const CommandPalette = component<CommandPaletteProps>(({ signal, emit }) => {
    const state = signal({ q: '', active: 0 });
    const router = useRouter();
    const all = buildCommands();

    const filtered = (): Command[] => {
        const t = state.q.trim().toLowerCase();
        if (!t) return all;
        return all.filter((c) => {
            const pkg = byId[c.pkgId];
            return (
                c.label.toLowerCase().includes(t) ||
                c.path.toLowerCase().includes(t) ||
                pkg.title.toLowerCase().includes(t) ||
                pkg.npm.toLowerCase().includes(t)
            );
        });
    };

    const pick = (c: Command) => {
        router.push(canonicalPath(c.href));
        emit('close');
    };

    const onKey = (e: KeyboardEvent) => {
        const results = filtered();
        if (e.key === 'Escape') {
            e.preventDefault();
            emit('close');
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            state.active = Math.min(state.active + 1, results.length - 1);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            state.active = Math.max(state.active - 1, 0);
        } else if (e.key === 'Enter' && results[state.active]) {
            e.preventDefault();
            pick(results[state.active]);
        }
    };

    onMounted(() => {
        window.addEventListener('keydown', onKey);
        requestAnimationFrame(() => {
            (document.querySelector('.cmd-input') as HTMLInputElement | null)?.focus();
        });
    });
    onUnmounted(() => window.removeEventListener('keydown', onKey));

    return () => {
        const results = filtered();
        return (
            <div class="cmd-scrim" onClick={() => emit('close')}>
                <div class="cmd" role="dialog" aria-label="Search the docs" onClick={(e: MouseEvent) => e.stopPropagation()}>
                    <div class="cmd-input-row">
                        <Icon name="search" size={19} class="cmd-search-icon" />
                        <input
                            class="cmd-input"
                            placeholder="Search packages, guides and API…"
                            value={state.q}
                            onInput={(e: Event) => {
                                state.q = (e.target as HTMLInputElement).value;
                                state.active = 0;
                            }}
                        />
                        <Kbd>Esc</Kbd>
                    </div>
                    <div class="cmd-list">
                        {results.length === 0 && <div class="cmd-empty">No matches for “{state.q}”.</div>}
                        {results.length > 0 && <div class="cmd-group-label">Jump to</div>}
                        {results.map((c, i) => {
                            const pkg = byId[c.pkgId];
                            return (
                                <div
                                    key={c.href}
                                    class="cmd-item"
                                    data-active={String(i === state.active)}
                                    style={`--pkg-h:${c.hue ?? pkg.hue}`}
                                    onMouseEnter={() => (state.active = i)}
                                    onClick={() => pick(c)}
                                >
                                    <span class="ci-tile">{c.glyph ?? pkg.glyph}</span>
                                    <div class="ci-body">
                                        <div class="ci-label">{c.label}</div>
                                        <div class="ci-path">{c.path}</div>
                                    </div>
                                    <Icon name="enter" size={15} class="ci-enter" />
                                </div>
                            );
                        })}
                    </div>
                    <div class="cmd-foot">
                        <span class="cf-item"><Kbd>↑</Kbd><Kbd>↓</Kbd> navigate</span>
                        <span class="cf-item"><Kbd>↵</Kbd> open</span>
                        <span class="cf-item"><Kbd>esc</Kbd> dismiss</span>
                        <span class="cf-spacer" />
                        <span class="cf-item">Search across the whole family</span>
                    </div>
                </div>
            </div>
        );
    };
});
