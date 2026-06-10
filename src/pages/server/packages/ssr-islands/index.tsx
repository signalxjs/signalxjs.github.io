import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="ssr-islands" />);

export default Page;

export const meta = {
    title: "Islands",
    description: "Islands — module overview",
    layout: 'default',
    sidebar: false,
};
