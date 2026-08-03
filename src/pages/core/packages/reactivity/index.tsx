import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="reactivity" />);

export default Page;

export const meta = {
    title: "Reactivity",
    description: "Signals, computed & effects — the Reactivity package for SignalX (@sigx/reactivity).",
    layout: 'default',
    sidebar: false,
};
