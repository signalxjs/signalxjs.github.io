import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="background" />);

export default Page;

export const meta = {
    title: "Background Tasks",
    description: "Background Tasks — module overview",
    layout: 'default',
    sidebar: false,
};
