import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="navigation" />);

export default Page;

export const meta = {
    title: "Navigation",
    description: "Navigation — module overview",
    layout: 'default',
    sidebar: false,
};
