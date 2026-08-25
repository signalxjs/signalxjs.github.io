/**
 * Zero Package Catalog — browse the zero repo's packages.
 *
 * Chrome page (not a collection): cards come from the module registry,
 * links resolve into each package's own docs collection.
 *
 * @layout package
 */

import { component } from 'sigx';
import { ModuleCatalog } from '@/components/ModuleCatalog';

const ZeroPackageCatalog = component(() => {
    return () => <ModuleCatalog parent="zero" />;
});

export default ZeroPackageCatalog;

export const meta = {
    title: 'Zero packages - runtime, authoring kit & design systems',
    description: 'Browse the zero packages — the @sigx/zero component runtime, the @sigx/zero-kit design-system authoring kit, and the @sigx/zero-basic and @sigx/zero-daisyui design systems.',
    layout: 'package',
};
