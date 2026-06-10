import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="storage" />);

export default Page;

export const meta = {
    title: "Storage",
    description: "Storage — module overview",
    layout: 'default',
    sidebar: false,
};
