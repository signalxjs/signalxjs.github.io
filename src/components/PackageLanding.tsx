/**
 * Package Landing Component
 *
 * Data-driven landing page for every package in the family: pass an
 * `id` and everything (title, npm, blurb, glyph, hue, status, version,
 * features) comes from the family registry + landing-features map.
 *
 * "Get started" / "API reference" CTAs appear only when the package's
 * docs / api collection actually exists (see lib/packageLinks) — so a
 * package gains them automatically the moment its docs are added.
 */

import { component, type Define } from 'sigx';
import { useRouter } from '@sigx/router';
import { SxLink } from '@/components/ui/SxLink';
import { byId, PACKAGES, type SigxPackage } from '@/lib/family';
import { modulesByParent, type SigxModule } from '@/lib/modules';
import { featuresFor } from '@/lib/landing-features';
import { docsHref, apiHref, moduleHref } from '@/lib/packageLinks';
import { canonicalPath } from '@/lib/url';
import { Icon } from '@/components/ui/Icon';
import { CopyLine } from '@/components/ui/CopyLine';
import { PkgTile } from '@/components/ui/PkgTile';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { SiblingTargetPill } from '@/components/SiblingTargetPill';

type PackageLandingProps = Define.Prop<'id', string, true>;

export const PackageLanding = component<PackageLandingProps>(({ props }) => {
    const router = useRouter();

    const moduleCard = (m: SigxModule) => (
        <button key={m.id} class="lynx-mod-card" style={`--pkg-h:${m.hue}`} onClick={() => router.push(canonicalPath(moduleHref(m)))}>
            <span class="lmc-tile">{m.glyph}</span>
            <span class="lmc-meta">
                <span class="lmc-name">{m.name}{m.role && <> <span class="lmc-role">{m.role}</span></>}</span>
                <span class="lmc-tag">{m.role ? m.npm : m.tag}</span>
            </span>
        </button>
    );

    return () => {
        const pkg: SigxPackage = byId[props.id] ?? byId.core;
        const docs = docsHref(pkg.id);
        const api = apiHref(pkg.id);
        const others = PACKAGES.filter((p) => p.id !== pkg.id).slice(0, 4);

        return (
            <div class="page landing" style={`--pkg-h:${pkg.hue}`}>
                {/* Hero (full-bleed signal-field backdrop lives in the package layout) */}
                <section class="landing-hero">
                    <div class="lh-deco" />
                    <div class="lh-badge">
                        <span class="lhb-tile">{pkg.glyph}</span> {pkg.npm}
                        <span class="lhb-dot">·</span> v{pkg.version}
                    </div>
                    <h1>{pkg.title}</h1>
                    <p class="lh-tag">{pkg.blurb}</p>
                    <div class="lh-cta">
                        {docs && (
                            <SxLink to={docs} class="sx-btn sx-btn-primary">
                                Get started <Icon name="arrowRight" size={15} />
                            </SxLink>
                        )}
                        {pkg.id === 'lynx' && (
                            <SxLink to="/lynx/modules" class="sx-btn sx-btn-outline">
                                <Icon name="cube" size={15} /> Browse modules
                            </SxLink>
                        )}
                        {pkg.id === 'server' && (
                            <SxLink to="/server/packages" class={`sx-btn ${docs ? 'sx-btn-outline' : 'sx-btn-primary'}`}>
                                <Icon name="cube" size={15} /> Browse packages
                            </SxLink>
                        )}
                        {pkg.id === 'terminal' && (
                            <SxLink to="/terminal/packages" class={`sx-btn ${docs ? 'sx-btn-outline' : 'sx-btn-primary'}`}>
                                <Icon name="cube" size={15} /> Browse packages
                            </SxLink>
                        )}
                        {api && (
                            <SxLink to={api} class="sx-btn sx-btn-outline">
                                API reference
                            </SxLink>
                        )}
                        <a
                            class="sx-btn sx-btn-ghost"
                            href="https://github.com/signalxjs"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Icon name="github" size={16} /> GitHub
                        </a>
                        <a
                            class="sx-btn sx-btn-ghost"
                            href={`https://www.npmjs.com/package/${pkg.npm}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Icon name="external" size={15} /> npm
                        </a>
                        <StatusBadge status={pkg.status} />
                        {/* DaisyUI exists on two targets — link the native sibling (local, never a global mode) */}
                        {pkg.id === 'daisyui' && <SiblingTargetPill current="web" />}
                    </div>
                    {!docs && pkg.kind !== 'collection' && (
                        <p class="lh-soon">Documentation for {pkg.title} is on its way — watch this space.</p>
                    )}
                </section>

                {/* Highlights */}
                <div class="section-label"><span class="sl-text">Highlights</span><span class="sl-line" /></div>
                <div class="feature-grid">
                    {featuresFor(pkg).map((f, i) => (
                        <div class="feature-card" key={i}>
                            <span class="fc-icon"><Icon name={f.icon} size={18} /></span>
                            <h3>{f.title}</h3>
                            <p>{f.body}</p>
                        </div>
                    ))}
                </div>

                {/* Install — like lynx/core, the collection landing shows the main
                    package; per-package installs live on each module's own page. */}
                <div class="section-label"><span class="sl-text">Install</span><span class="sl-line" /></div>
                <CopyLine text={`pnpm add ${pkg.npm}`} prefix="$" />

                {/* Collection strips — core & lynx are meta-packages with sub-package docs */}
                {pkg.id === 'core' && (
                    <>
                        <div class="section-label">
                            <span class="sl-text">Packages in this repo</span>
                            <span class="sl-line" />
                            <span class="sl-note">core is a collection — the web renderer lives here</span>
                        </div>
                        <div class="lynx-mod-row">
                            {modulesByParent('core').map(moduleCard)}
                        </div>
                    </>
                )}
                {pkg.id === 'server' && (
                    <>
                        <div class="section-label">
                            <span class="sl-text">SSR packages</span>
                            <span class="sl-line" />
                            <span class="sl-note">server is a collection — the renderer and the islands add-on</span>
                        </div>
                        <div class="lynx-mod-row">
                            {modulesByParent('server').map(moduleCard)}
                        </div>
                    </>
                )}
                {pkg.id === 'terminal' && (
                    <>
                        <div class="section-label">
                            <span class="sl-text">Packages in this repo</span>
                            <span class="sl-line" />
                            <span class="sl-note">terminal is a collection — the renderer, foundation, UI skin and tooling</span>
                        </div>
                        <div class="lynx-mod-row">
                            {modulesByParent('terminal').map(moduleCard)}
                        </div>
                    </>
                )}
                {pkg.id === 'lynx' && (
                    <>
                        <div class="section-label">
                            <span class="sl-text">Native modules</span>
                            <span class="sl-line" />
                            <SxLink to="/lynx/modules" class="sl-link">
                                Browse all {modulesByParent('lynx').length} <Icon name="arrowRight" size={14} />
                            </SxLink>
                        </div>
                        <div class="lynx-mod-row">
                            {modulesByParent('lynx').filter((m) => (m.shots ?? 0) > 0).slice(0, 8).map(moduleCard)}
                        </div>
                    </>
                )}

                {/* Works with the family */}
                <div class="section-label"><span class="sl-text">Works with the family</span><span class="sl-line" /></div>
                <div class="works">
                    {others.map((p) => (
                        <div
                            class="works-card"
                            key={p.id}
                            style={`--pkg-h:${p.hue}`}
                            onClick={() => router.push(canonicalPath(`/${p.id}`))}
                        >
                            <PkgTile pkg={p} size={30} />
                            <div>
                                <div class="wc-name">{p.title}</div>
                                <div class="wc-sub">{p.npm}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };
});
