import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="serialize" />);

export default Page;

export const meta = {
    title: "Serialize",
    description: "Serialize — module overview",
    layout: 'default',
    sidebar: false,
};
