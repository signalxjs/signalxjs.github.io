import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="secure-storage" />);

export default Page;

export const meta = {
    title: "Secure Storage",
    description: "Secure Storage — module overview",
    layout: 'default',
    sidebar: false,
};
