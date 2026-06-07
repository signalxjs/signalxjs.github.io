/**
 * Lynx Module Catalog — browse every @sigx/lynx-* module.
 *
 * Chrome page (not a collection): cards come from the module registry,
 * links resolve into each module's own docs collection.
 *
 * @layout package
 */

import { component } from 'sigx';
import { ModuleCatalog } from '@/components/ModuleCatalog';

const LynxModuleCatalog = component(() => {
    return () => <ModuleCatalog parent="lynx" />;
});

export default LynxModuleCatalog;

export const meta = {
    title: 'Lynx modules - the @sigx/lynx-* family',
    description: 'Browse all Lynx native modules — framework, runtime, native APIs, gestures, UI and tooling, lockstep-versioned.',
    layout: 'package',
};
