import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="actors-cli" />);

export default Page;

export const meta = {
    title: "CLI",
    description: "CLI — module overview",
    layout: 'default',
    sidebar: false,
};
