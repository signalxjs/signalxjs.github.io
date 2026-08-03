import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="keyboard" />);

export default Page;

export const meta = {
    title: "Keyboard",
    description: "Soft-keyboard handling — the Keyboard module for SignalX Lynx (@sigx/lynx-keyboard).",
    layout: 'default',
    sidebar: false,
};
