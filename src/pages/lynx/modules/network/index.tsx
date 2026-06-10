import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="network" />);

export default Page;

export const meta = {
    title: "Network",
    description: "Network — module overview",
    layout: 'default',
    sidebar: false,
};
