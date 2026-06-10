import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="core" />);

export default Page;

export const meta = {
    title: "Native Bridge",
    description: "Native Bridge — module overview",
    layout: 'default',
    sidebar: false,
};
