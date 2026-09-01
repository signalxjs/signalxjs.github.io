import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="actors-dashboard" />);

export default Page;

export const meta = {
    title: "Dashboard",
    description: "The web dashboard, as sigx components — the Dashboard package for SignalX (@sigx/actors-dashboard).",
    layout: 'default',
    sidebar: false,
};
