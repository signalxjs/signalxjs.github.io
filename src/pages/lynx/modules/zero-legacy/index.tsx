import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="zero-legacy" />);

export default Page;

export const meta = {
    title: "Zero Legacy",
    description: "The pre-contract foundation, frozen — the Zero Legacy module for SignalX Lynx (@sigx/lynx-zero-legacy).",
    layout: 'default',
    sidebar: false,
};
