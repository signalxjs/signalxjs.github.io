import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="testing" />);

export default Page;

export const meta = {
    title: "Testing",
    description: "Testing — module overview",
    layout: 'default',
    sidebar: false,
};
