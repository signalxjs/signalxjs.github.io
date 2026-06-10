import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="appearance" />);

export default Page;

export const meta = {
    title: "Appearance",
    description: "Appearance — module overview",
    layout: 'default',
    sidebar: false,
};
