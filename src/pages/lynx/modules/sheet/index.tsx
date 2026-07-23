import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="sheet" />);

export default Page;

export const meta = {
    title: "Bottom Sheet",
    description: "Bottom Sheet — module overview",
    layout: 'default',
    sidebar: false,
};
