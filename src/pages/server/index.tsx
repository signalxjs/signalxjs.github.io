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
    title: 'SignalX Server - Streaming SSR & island hydration',
    description: 'Render to a stream on the server and hydrate selectively with client:* directives.',
    layout: 'package',
};
