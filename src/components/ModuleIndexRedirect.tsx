/**
 * Redirect landing for a module root — `/lynx/modules/<id>/` and
 * `/core/packages/<id>/`. Those roots have no doc page of their own (modules
 * ship overview/installation/usage/api), so without this they 404. We send
 * visitors to the module's first doc page (overview) and render a real
 * fallback link so no-JS clients and crawlers still have somewhere to go.
 */

import { component, onMounted, type Define } from 'sigx';
import { useRouter } from '@sigx/router';
import { moduleById, moduleRoutePrefix } from '@/lib/modules';
import { firstModuleDocHref } from '@/lib/packageLinks';
import { canonicalPath } from '@/lib/url';
import { SxLink } from '@/components/ui/SxLink';

type ModuleIndexRedirectProps = Define.Prop<'id', string, true>;

export const ModuleIndexRedirect = component<ModuleIndexRedirectProps>(({ props }) => {
    const router = useRouter();
    const mod = moduleById[props.id];
    // First doc page (overview); never the bare root, so we can't self-redirect.
    const target = (mod && firstModuleDocHref(mod)) || (mod ? `${moduleRoutePrefix(mod)}/overview` : '/');

    onMounted(() => router.replace(canonicalPath(target)));

    return () => (
        <div class="redirect-note">
            <p>Redirecting to the <SxLink to={target}>overview</SxLink>…</p>
        </div>
    );
});
