/**
 * Web ↔ native cross-link for DaisyUI — the only platform-aware UI on
 * the site, handled locally on the two DaisyUI surfaces (never a global
 * mode): web @sigx/daisyui and native @sigx/lynx-daisyui document the
 * same component surface on two targets, so each page links its sibling.
 */

import { component, type Define } from 'sigx';
import { moduleById } from '@/lib/modules';
import { docsHref, moduleHref } from '@/lib/packageLinks';
import { SxLink } from '@/components/ui/SxLink';

type SiblingTargetPillProps = Define.Prop<'current', 'web' | 'native', true>;

export const SiblingTargetPill = component<SiblingTargetPillProps>(({ props }) => {
    return () => {
        const webHref = docsHref('daisyui') ?? '/daisyui';
        const nativeHref = moduleHref(moduleById.daisyui);
        return (
            <span class="sibling-pill" title="DaisyUI exists on two targets — same components, same themes">
                <span class="sp-lead">Also available on</span>
                {props.current === 'web' ? (
                    <>
                        <span class="sp-target" data-current="true">Web</span>
                        <SxLink to={nativeHref} class="sp-target">Native</SxLink>
                    </>
                ) : (
                    <>
                        <SxLink to={webHref} class="sp-target">Web</SxLink>
                        <span class="sp-target" data-current="true">Native</span>
                    </>
                )}
            </span>
        );
    };
});
