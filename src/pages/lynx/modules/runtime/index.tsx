import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="runtime" />);

export default Page;

export const meta = {
    title: "Runtime",
    description: "Runtime — module overview",
    layout: 'default',
    sidebar: false,
};
