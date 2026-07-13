import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="args" />);

export default Page;

export const meta = {
    title: "Args",
    description: "Args — module overview",
    layout: 'default',
    sidebar: false,
};
