import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="linking" />);

export default Page;

export const meta = {
    title: "Linking",
    description: "Linking — module overview",
    layout: 'default',
    sidebar: false,
};
