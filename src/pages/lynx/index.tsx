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
    title: 'SignalX Lynx — Native iOS & Android apps with signals',
    description: 'Build native iOS and Android apps with the SignalX component model: one reactive TSX tree rendered to real native views, plus a library of native modules.',
    layout: 'package',
};
