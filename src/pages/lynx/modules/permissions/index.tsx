import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="permissions" />);

export default Page;

export const meta = {
    title: "Permissions",
    description: "Permissions — module overview",
    layout: 'default',
    sidebar: false,
};
