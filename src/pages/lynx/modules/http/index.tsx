import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="http" />);

export default Page;

export const meta = {
    title: "HTTP",
    description: "HTTP — module overview",
    layout: 'default',
    sidebar: false,
};
