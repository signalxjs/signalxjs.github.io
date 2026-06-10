import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="location" />);

export default Page;

export const meta = {
    title: "Location",
    description: "Location — module overview",
    layout: 'default',
    sidebar: false,
};
