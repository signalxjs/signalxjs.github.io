/**
 * DevTools Package Landing Page
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
    return () => <PackageLanding id="devtools" />;
});

export default Landing;

export const meta = {
    title: 'SignalX DevTools - Inspect signals at runtime',
    description: 'A browser panel to trace the reactive graph, time-travel effects and inspect components.',
    layout: 'package',
};
