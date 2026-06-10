import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="runtime-main" />);

export default Page;

export const meta = {
    title: "Main Runtime",
    description: "Main Runtime — module overview",
    layout: 'default',
    sidebar: false,
};
