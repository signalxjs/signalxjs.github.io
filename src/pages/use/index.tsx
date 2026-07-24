import { component } from 'sigx';
import { PackageLanding } from '@/components/PackageLanding';

const Landing = component(() => {
    return () => <PackageLanding id="use" />;
});

export default Landing;

export const meta = {
    title: 'SignalX Use - Reactive composables built on signals',
    description: 'Tree-shakable composables built on signals - sensors, storage, timing and more, SSR-safe across every target.',
    layout: 'package',
};
