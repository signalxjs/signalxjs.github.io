import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="zero-daisyui" />);

export default Page;

export const meta = {
    title: "Zero DaisyUI",
    description: "daisyUI’s look as pure tokens + recipes — the Zero DaisyUI package for SignalX Zero (@sigx/zero-daisyui).",
    layout: 'default',
    sidebar: false,
};
