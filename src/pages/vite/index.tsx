/**
 * Vite Package Landing Page
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
    return () => <PackageLanding id="vite" />;
});

export default Landing;

export const meta = {
    title: 'SignalX Vite - Vite plugin & HMR',
    description: 'First-class Vite integration - HMR for components, optimized production builds.',
    layout: 'package',
};
