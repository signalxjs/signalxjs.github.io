import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="network" />);

export default Page;

export const meta = {
    title: "Network",
    description: "Connectivity status — the Network module for SignalX Lynx (@sigx/lynx-network).",
    layout: 'default',
    sidebar: false,
};
