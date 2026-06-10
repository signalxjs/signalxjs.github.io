/**
 * Module catalog — the full browse page for a collection package's
 * sub-packages (Lynx modules at /lynx/modules, Core repo packages at
 * /core/packages). Search, category filter chips and a responsive grid
 * of cards, all driven by the module registry; cards link into each
 * module's own docs collection.
 */

import { component, type Define } from 'sigx';
import { useRouter } from '@sigx/router';
import { STATUS, byId } from '@/lib/family';
import { MODULE_CATEGORIES, modulesByParent, type ModuleParent, type SigxModule } from '@/lib/modules';
import { moduleHref } from '@/lib/packageLinks';
import { Icon } from '@/components/ui/Icon';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { SxLink } from '@/components/ui/SxLink';

type ModuleCatalogProps = Define.Prop<'parent', ModuleParent, true>;

export const ModuleCatalog = component<ModuleCatalogProps>(({ props, signal }) => {
    const state = signal({ q: '', cat: 'all' });
    const router = useRouter();

    const all = modulesByParent(props.parent);
    const cats = MODULE_CATEGORIES[props.parent].filter(
        (c) => all.some((m) => m.category === c.id),
    );

    const results = (): SigxModule[] => {
        const t = state.q.trim().toLowerCase();
        return all.filter((m) =>
            (state.cat === 'all' || m.category === state.cat) &&
            (!t ||
                m.name.toLowerCase().includes(t) ||
                m.npm.toLowerCase().includes(t) ||
                m.blurb.toLowerCase().includes(t)),
        );
    };

    return () => {
        const parentPkg = byId[props.parent];
        const isLynx = props.parent === 'lynx';
        const found = results();
        return (
            <div class="page catalog">
                <div class="cat-hero">
                    <SxLink to={`/${props.parent}`} class="back-link">
                        <Icon name="chevronRight" size={14} style="transform:rotate(180deg)" /> {parentPkg.title}
                    </SxLink>
                    <h1>
                        {parentPkg.title}{' '}
                        <span class="cat-accent">{isLynx ? 'modules' : 'packages'}</span>
                    </h1>
                    {isLynx ? (
                        <p>
                            The <code class="inline">@sigx/lynx-*</code> family — framework, runtime, native
                            modules, gestures, UI and tooling. Every package ships in lockstep at one version,
                            so any combination just works together, and each one carries its own docs.
                        </p>
                    ) : props.parent === 'server' ? (
                        <p>
                            Server-side rendering for SignalX — <code class="inline">@sigx/server-renderer</code>{' '}
                            streams your component tree to HTML and hydrates it on the client, and{' '}
                            <code class="inline">@sigx/ssr-islands</code> layers on selective{' '}
                            <code class="inline">client:*</code> hydration. Each one carries its own docs.
                        </p>
                    ) : (
                        <p>
                            Core is a collection — the packages in this repo, from the reactive primitives to
                            the DOM renderer that makes SignalX a web framework. Each one carries its own docs.
                        </p>
                    )}
                    <div class="cat-toolbar">
                        <div class="cat-search">
                            <Icon name="search" size={16} />
                            <input
                                placeholder={isLynx ? 'Search modules…' : 'Search packages…'}
                                value={state.q}
                                onInput={(e: Event) => (state.q = (e.target as HTMLInputElement).value)}
                            />
                        </div>
                        <div class="cat-count">{found.length} of {all.length}</div>
                    </div>
                    {cats.length > 1 && (
                        <div class="cat-chips">
                            <button class="chip" data-active={String(state.cat === 'all')} onClick={() => (state.cat = 'all')}>All</button>
                            {cats.map((c) => (
                                <button
                                    key={c.id}
                                    class="chip"
                                    data-active={String(state.cat === c.id)}
                                    onClick={() => (state.cat = c.id)}
                                >
                                    {c.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div class="module-grid">
                    {found.map((m) => (
                        <div
                            key={m.id}
                            class="module-card"
                            style={`--pkg-h:${m.hue};--st-h:${STATUS[m.status].hue}`}
                            onClick={() => router.push(moduleHref(m))}
                        >
                            <div class="mc-head">
                                <span class="mc-tile">{m.glyph}</span>
                                <StatusBadge status={m.status} />
                            </div>
                            <div class="mc-name">{m.name}</div>
                            <div class="mc-npm">{m.npm}</div>
                            <div class="mc-blurb">{m.blurb}</div>
                            <div class="mc-foot">
                                {m.downloads
                                    ? <span class="mc-dl"><Icon name="arrowUpRight" size={13} style="transform:rotate(90deg)" /> {m.downloads}/wk</span>
                                    : <span class="mc-dl">v{m.version}</span>}
                                <span class="mc-open">Open <Icon name="arrowRight" size={14} /></span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };
});
