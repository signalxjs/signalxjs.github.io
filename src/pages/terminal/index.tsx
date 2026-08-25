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
    title: 'SignalX Terminal — Reactive terminal UIs (TUIs) in TSX',
    description: 'Build terminal UIs (TUIs) in TypeScript with signals and TSX: the SignalX reactive model rendered to terminal cells, with flexbox layout and keyboard input.',
    layout: 'package',
};
