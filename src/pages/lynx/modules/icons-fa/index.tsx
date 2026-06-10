import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="icons-fa" />);

export default Page;

export const meta = {
    title: "FA Icons",
    description: "FA Icons — module overview",
    layout: 'default',
    sidebar: false,
};
