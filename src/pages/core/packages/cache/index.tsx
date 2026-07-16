import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="cache" />);

export default Page;

export const meta = {
    title: "Cache",
    description: "Cache — module overview",
    layout: 'default',
    sidebar: false,
};
