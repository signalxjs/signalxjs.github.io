/**
 * Deploy Collection Landing Page
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
    return () => <PackageLanding id="deploy" />;
});

export default Landing;

export const meta = {
    title: 'SignalX Deploy - Ship your app anywhere',
    description: 'Deploy adapters for Cloudflare Workers, Vercel and Netlify, plus documented Node, Deno and Bun entries — one WinterCG fetch handler on every platform.',
    layout: 'package',
};
