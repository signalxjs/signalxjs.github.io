import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="actors-tcp" />);

export default Page;

export const meta = {
    title: "TCP",
    description: "Framed, multiplexed host-to-host TCP — the TCP package for SignalX (@sigx/actors-tcp).",
    layout: 'default',
    sidebar: false,
};
