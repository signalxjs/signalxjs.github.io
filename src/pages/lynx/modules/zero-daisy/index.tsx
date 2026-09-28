import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="zero-daisy" />);

export default Page;

export const meta = {
    title: "Zero DaisyUI",
    description: "daisyUI skin for Lynx Zero — the Zero DaisyUI module for SignalX Lynx (@sigx/lynx-zero-daisyui).",
    layout: 'default',
    sidebar: false,
};
