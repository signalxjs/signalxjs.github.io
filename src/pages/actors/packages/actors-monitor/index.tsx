import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="actors-monitor" />);

export default Page;

export const meta = {
    title: "Monitor",
    description: "The renderer-free dashboard data layer — the Monitor package for SignalX (@sigx/actors-monitor).",
    layout: 'default',
    sidebar: false,
};
