import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="daisyui" />);

export default Page;

export const meta = {
    title: "DaisyUI",
    description: "DaisyUI — module overview",
    layout: 'default',
    sidebar: false,
};
