/**
 * Deploy Adapter Catalog — browse the platform deploy adapters.
 *
 * Chrome page (not a collection): cards come from the module registry,
 * links resolve into each adapter's own docs collection.
 *
 * @layout package
 */

import { component } from 'sigx';
import { ModuleCatalog } from '@/components/ModuleCatalog';

const DeployAdapterCatalog = component(() => {
    return () => <ModuleCatalog parent="deploy" />;
});

export default DeployAdapterCatalog;

export const meta = {
    title: 'Deploy adapters - Cloudflare, Vercel & Netlify for SignalX',
    description: 'Browse the deploy adapters — @sigx/cloudflare (bundled workerd worker), @sigx/vercel (Build Output API v3) and @sigx/netlify (Frameworks API function). Node, Deno and Bun deploy without an adapter package.',
    layout: 'package',
};
