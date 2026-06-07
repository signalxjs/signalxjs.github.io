/**
 * Site top bar — 58px sticky blur bar with the family-bridging chrome:
 * logo + Signal(X) wordmark, package trigger (opens the family
 * mega-menu), centre nav links, search pill (opens the ⌘K palette),
 * theme toggle and GitHub.
 *
 * Responsive behaviour lives in CSS classes (sigx-components.css) —
 * never inline display styles: burger ≤880 (docs pages only), wordmark
 * + trigger label + nav links hidden ≤720, search pill → icon ≤720.
 */

import { component, onMounted, onUnmounted, type Define } from 'sigx';
import { ThemeToggle } from '@sigx/daisyui';
import { useRoute } from '@sigx/router';
import { detectCollection } from 'virtual:ssg-navigation';
import { byId, moduleForCollection, packageForCollection } from '@/lib/family';
import { moduleRoutePrefix } from '@/lib/modules';
import { apiHref, docsHref } from '@/lib/packageLinks';
import { FamilyMenu } from '@/components/FamilyMenu';
import { Icon } from '@/components/ui/Icon';
import { Kbd } from '@/components/ui/Kbd';
import { SxLink } from '@/components/ui/SxLink';

type NavbarProps =
    & Define.Prop<'showMenu', boolean>
    & Define.Event<'menuClick', void>
    & Define.Event<'openCmd', void>;

export const Navbar = component<NavbarProps>(({ props, signal, emit }) => {
    const state = signal({ megaOpen: false });
    const route = useRoute();

    // Pages (home hero, family grid) can ask the bar to open the mega-menu.
    const onOpenFamily = () => (state.megaOpen = true);
    onMounted(() => window.addEventListener('sigx:open-family', onOpenFamily));
    onUnmounted(() => window.removeEventListener('sigx:open-family', onOpenFamily));

    /** Package the visitor is currently in (collection → landing segment → core). */
    const currentPkg = () => {
        const fromCollection = packageForCollection(detectCollection(route.path));
        if (fromCollection) return fromCollection;
        const seg = route.path.split('/')[1];
        return byId[seg] ?? byId.core;
    };

    return () => {
        const pkg = currentPkg();
        // API is package-local: the current package's reference, or — inside
        // a sub-package's docs — that module's own API page. No collection,
        // no link: jumping to another package's API would just mislead.
        const mod = moduleForCollection(detectCollection(route.path));
        const api = apiHref(pkg.id) ?? (mod ? `${moduleRoutePrefix(mod)}/api` : undefined);
        return (
            <header class="topbar">
                <div class="topbar-left">
                    {props.showMenu && (
                        <button class="icon-btn topbar-burger" onClick={() => emit('menuClick')} aria-label="Open menu">
                            <Icon name="menu" size={19} />
                        </button>
                    )}
                    <SxLink to="/" class="logo">
                        <img
                            src={`${import.meta.env.BASE_URL}sigx.png`}
                            alt=""
                            class="logo-mark"
                            loading="eager"
                            decoding="async"
                        />
                        <span class="logo-word">
                            Signal<span class="logo-paren">(</span><span class="logo-x">X</span><span class="logo-paren">)</span>
                        </span>
                    </SxLink>
                    <span class="topbar-divider" />
                    <button
                        class="pkg-trigger"
                        data-open={String(state.megaOpen)}
                        onClick={() => (state.megaOpen = !state.megaOpen)}
                    >
                        <span class="mini-tile" style={`--pkg-h:${pkg.hue}`}>{pkg.glyph}</span>
                        <span class="pkg-trigger-label">{pkg.title}</span>
                        <Icon name="chevronDown" size={15} class="chev" />
                    </button>
                </div>

                <nav class="topbar-nav">
                    {/* Docs/API follow the package you're in; packages without
                        their own collection yet fall back to core's. */}
                    <SxLink
                        to={docsHref(pkg.id) ?? docsHref('core') ?? '/core/docs/getting-started'}
                        class="nav-link"
                        active={/^\/[^/]+\/docs(\/|$)|^\/lynx\/modules\/.|^\/core\/packages\/./.test(route.path)}
                    >
                        Docs
                    </SxLink>
                    {api && (
                        <SxLink
                            to={api}
                            class="nav-link"
                            active={/^\/[^/]+\/api(\/|$)|\/(modules|packages)\/[^/]+\/api(\/|$)/.test(route.path)}
                        >
                            API
                        </SxLink>
                    )}
                    <SxLink to="/examples" class="nav-link" active={route.path === '/examples'}>
                        Examples
                    </SxLink>
                </nav>

                <div class="topbar-spacer" />

                <div class="topbar-right">
                    <button class="search-pill" onClick={() => emit('openCmd')}>
                        <Icon name="search" size={15} />
                        <span class="sp-label">Search the docs</span>
                        <span class="sp-keys"><Kbd>⌘</Kbd><Kbd>K</Kbd></span>
                    </button>
                    <ThemeToggle />
                    <a
                        class="icon-btn"
                        href="https://github.com/signalxjs"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                    >
                        <Icon name="github" size={18} />
                    </a>
                </div>

                {state.megaOpen && (
                    <FamilyMenu currentId={pkg.id} onClose={() => (state.megaOpen = false)} />
                )}
            </header>
        );
    };
});
