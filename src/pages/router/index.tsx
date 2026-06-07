/**
 * Router Package Landing Page
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
    return () => <PackageLanding id="router" />;
});

export default Landing;

export const meta = {
    title: 'SignalX Router - Type-safe routing with SSR',
    description: 'Nested routes, navigation guards and reactive params - isomorphic by default.',
    layout: 'package',
};
