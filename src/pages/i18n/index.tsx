import { component } from 'sigx';
import { PackageLanding } from '@/components/PackageLanding';

const Landing = component(() => {
    return () => <PackageLanding id="i18n" />;
});

export default Landing;

export const meta = {
    title: 'SignalX i18n - Reactive localization',
    description: 'Internationalization for SignalX — namespaces, a master locale with automatic fallback, locale detection and SSR-safe state transfer on web, Lynx and terminal.',
    layout: 'package',
};
