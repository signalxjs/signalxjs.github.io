/**
 * DaisyUI Package Landing Page
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
    return () => <PackageLanding id="daisyui" />;
});

export default Landing;

export const meta = {
    title: 'SignalX DaisyUI - Themed component library',
    description: 'Accessible buttons, forms, modals and more with full DaisyUI theme support.',
    layout: 'package',
};
