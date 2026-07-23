import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="server" />);

export default Page;

export const meta = {
    title: "Server Functions",
    description: "Server Functions — module overview",
    layout: 'default',
    sidebar: false,
};
