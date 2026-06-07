/**
 * Core Package Landing Page
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
    return () => <PackageLanding id="core" />;
});

export default Landing;

export const meta = {
    title: 'SignalX Core - Signals, effects & the component model',
    description: 'Fine-grained reactivity with signals and effects, plus a tiny TSX component runtime.',
    layout: 'package',
};
