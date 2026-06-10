import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="motion" />);

export default Page;

export const meta = {
    title: "Motion",
    description: "Motion — module overview",
    layout: 'default',
    sidebar: false,
};
