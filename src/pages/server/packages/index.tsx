/**
 * Server (SSR) Package Catalog — browse the server-side rendering packages.
 *
 * Chrome page (not a collection): cards come from the module registry,
 * links resolve into each package's own docs collection.
 *
 * @layout package
 */

import { component } from 'sigx';
import { ModuleCatalog } from '@/components/ModuleCatalog';

const ServerPackageCatalog = component(() => {
    return () => <ModuleCatalog parent="server" />;
});

export default ServerPackageCatalog;

export const meta = {
    title: 'Server packages - SSR, RPC, resume & serialize for SignalX',
    description: 'Browse the server-side packages — @sigx/server-renderer (streaming SSR & hydration), @sigx/ssr-islands (client:* selective hydration), @sigx/server (type-safe server functions), @sigx/resume (resumable boundary refresh) and @sigx/serialize (the boundary codec).',
    layout: 'package',
};
