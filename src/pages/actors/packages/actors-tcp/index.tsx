import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="actors-tcp" />);

export default Page;

export const meta = {
    title: "TCP",
    description: "TCP — module overview",
    layout: 'default',
    sidebar: false,
};
