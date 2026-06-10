import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="cli" />);

export default Page;

export const meta = {
    title: "CLI Plugin",
    description: "CLI Plugin — module overview",
    layout: 'default',
    sidebar: false,
};
