/**
 * Lynx Package Landing Page
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
    return () => <PackageLanding id="lynx" />;
});

export default Landing;

export const meta = {
    title: 'SignalX Lynx - Native iOS & Android with Lynx',
    description: 'Write one SignalX component tree, render it to real native views on iOS and Android.',
    layout: 'package',
};
