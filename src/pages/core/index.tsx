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
    title: 'SignalX Core — Signals and fine-grained reactivity for TSX',
    description: 'Fine-grained reactivity for TypeScript: signals, computed values and effects update exactly the DOM nodes that changed — no virtual DOM, no re-renders.',
    layout: 'package',
};
