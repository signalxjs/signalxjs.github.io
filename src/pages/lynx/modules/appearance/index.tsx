import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="appearance" />);

export default Page;

export const meta = {
    title: "Appearance",
    description: "System color scheme & bars — the Appearance module for SignalX Lynx (@sigx/lynx-appearance).",
    layout: 'default',
    sidebar: false,
};
