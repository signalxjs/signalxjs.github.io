import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="zero" />);

export default Page;

export const meta = {
    title: "Zero",
    description: "Zero — module overview",
    layout: 'default',
    sidebar: false,
};
