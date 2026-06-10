import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="server-renderer" />);

export default Page;

export const meta = {
    title: "Server Renderer",
    description: "Server Renderer — module overview",
    layout: 'default',
    sidebar: false,
};
