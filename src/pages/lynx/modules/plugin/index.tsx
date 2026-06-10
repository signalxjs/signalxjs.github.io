import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="plugin" />);

export default Page;

export const meta = {
    title: "Build Plugin",
    description: "Build Plugin — module overview",
    layout: 'default',
    sidebar: false,
};
