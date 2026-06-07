/**
 * SSG Package Landing Page
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
    return () => <PackageLanding id="ssg" />;
});

export default Landing;

export const meta = {
    title: 'SignalX SSG - Static site generation + MDX',
    description: 'File-based routing, MDX content collections and island hydration for content sites.',
    layout: 'package',
};
