import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="share" />);

export default Page;

export const meta = {
    title: "Share",
    description: "Share — module overview",
    layout: 'default',
    sidebar: false,
};
