import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="list" />);

export default Page;

export const meta = {
    title: "List",
    description: "List — module overview",
    layout: 'default',
    sidebar: false,
};
