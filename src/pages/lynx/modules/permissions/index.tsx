import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="permissions" />);

export default Page;

export const meta = {
    title: "Permissions",
    description: "Permission helper — the Permissions module for SignalX Lynx (@sigx/lynx-permissions).",
    layout: 'default',
    sidebar: false,
};
