/**
 * Store Package Landing Page
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
    return () => <PackageLanding id="store" />;
});

export default Landing;

export const meta = {
    title: 'SignalX Store - Centralized state on signals',
    description: 'Predictable, derived state for larger apps - built on the same reactive core.',
    layout: 'package',
};
