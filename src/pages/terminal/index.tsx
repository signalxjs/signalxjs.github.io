/**
 * Terminal Package Landing Page
 *
 * Thin data-driven page - all content comes from src/lib/family.ts
 * via <PackageLanding>. (One file per package because @sigx/ssg uses
 * file-based routing with no dynamic params.)
 *
 * @layout package
 */

import { component } from 'sigx';
import { PackageLanding } from '@/components/PackageLanding';

const Landing = component(() => {
    return () => <PackageLanding id="terminal" />;
});

export default Landing;

export const meta = {
    title: 'SignalX Terminal - Build TUIs with TSX',
    description: 'The reactive model, rendered to the terminal - flexbox layout, input and a cell renderer.',
    layout: 'package',
};
