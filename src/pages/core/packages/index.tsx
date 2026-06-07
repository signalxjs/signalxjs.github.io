/**
 * Core Package Catalog — browse the packages in the core repo.
 *
 * Chrome page (not a collection): cards come from the module registry,
 * links resolve into each sub-package's own docs collection.
 *
 * @layout package
 */

import { component } from 'sigx';
import { ModuleCatalog } from '@/components/ModuleCatalog';

const CorePackageCatalog = component(() => {
    return () => <ModuleCatalog parent="core" />;
});

export default CorePackageCatalog;

export const meta = {
    title: 'Core packages - the SignalX core repo',
    description: 'Browse the packages in the core repo — reactivity, runtime-core, the DOM renderer, the sigx umbrella, SSR and the Vite plugin.',
    layout: 'package',
};
