import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="webauth" />);

export default Page;

export const meta = {
    title: "Web Auth",
    description: "Web Auth — module overview",
    layout: 'default',
    sidebar: false,
};
