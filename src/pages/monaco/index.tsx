/**
 * Monaco Package Landing Page
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
    return () => <PackageLanding id="monaco" />;
});

export default Landing;

export const meta = {
    title: 'SignalX Monaco - Editor + live-code playground',
    description: 'A pluggable Monaco wrapper powering the live, runnable code samples in these docs.',
    layout: 'package',
};
