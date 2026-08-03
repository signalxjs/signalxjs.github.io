import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="daisyui" />);

export default Page;

export const meta = {
    title: "DaisyUI",
    description: "Component library — the DaisyUI module for SignalX Lynx (@sigx/lynx-daisyui).",
    layout: 'default',
    sidebar: false,
};
