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
    description: 'Browse the SignalX server packages — @sigx/server-renderer (streaming SSR), @sigx/ssr-islands, @sigx/server (server functions), @sigx/resume, @sigx/serialize.',
    layout: 'package',
};
