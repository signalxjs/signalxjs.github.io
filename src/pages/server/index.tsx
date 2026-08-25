/**
 * Server Package Landing Page
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
    return () => <PackageLanding id="server" />;
});

export default Landing;

export const meta = {
    title: 'SignalX Server — Streaming SSR, islands and server functions',
    description: 'Server-side rendering for SignalX: stream HTML, hydrate selectively with client:* islands, resume state at the boundary and call typed server functions.',
    layout: 'package',
};
