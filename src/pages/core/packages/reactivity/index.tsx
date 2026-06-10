import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="reactivity" />);

export default Page;

export const meta = {
    title: "Reactivity",
    description: "Reactivity — module overview",
    layout: 'default',
    sidebar: false,
};
