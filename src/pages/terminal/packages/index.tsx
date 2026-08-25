/**
 * Terminal Package Catalog — browse the terminal repo's packages.
 *
 * Chrome page (not a collection): cards come from the module registry,
 * links resolve into each package's own docs collection.
 *
 * @layout package
 */

import { component } from 'sigx';
import { ModuleCatalog } from '@/components/ModuleCatalog';

const TerminalPackageCatalog = component(() => {
    return () => <ModuleCatalog parent="terminal" />;
});

export default TerminalPackageCatalog;

export const meta = {
    title: 'Terminal packages - The @sigx/terminal monorepo',
    description: 'Browse the SignalX terminal packages — @sigx/terminal, @sigx/runtime-terminal, @sigx/terminal-zero, @sigx/terminal-ui, @sigx/terminal-dev and @sigx/args.',
    layout: 'package',
};
