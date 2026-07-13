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
    description: 'Browse the terminal repo packages — the @sigx/terminal umbrella, the @sigx/runtime-terminal renderer, the @sigx/terminal-zero foundation, @sigx/terminal-ui components, the @sigx/terminal-dev HMR runner and the standalone @sigx/args parser.',
    layout: 'package',
};
