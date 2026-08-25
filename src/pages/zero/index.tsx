/**
 * Zero Package Landing Page
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
    return () => <PackageLanding id="zero" />;
});

export default Landing;

export const meta = {
    title: 'SignalX Zero - Unstyled components + generatable design systems',
    description: 'Headless, accessible compound components with a machine-readable anatomy, and design systems as pure data compiled to plain CSS — @sigx/zero, @sigx/zero-kit, @sigx/zero-basic and @sigx/zero-daisyui.',
    layout: 'package',
};
