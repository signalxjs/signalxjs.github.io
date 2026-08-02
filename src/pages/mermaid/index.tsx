import { component } from 'sigx';
import { PackageLanding } from '@/components/PackageLanding';

const Landing = component(() => {
    return () => <PackageLanding id="mermaid" />;
});

export default Landing;

export const meta = {
    title: 'SignalX Mermaid - Diagrams for sigx and SSG',
    description: 'A Mermaid component for any sigx app, plus drop-in mermaid fence support for @sigx/ssg - loaded lazily, only on pages that have a diagram.',
    layout: 'package',
};
