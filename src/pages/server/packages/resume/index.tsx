import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="resume" />);

export default Page;

export const meta = {
    title: "Resume",
    description: "Resume — module overview",
    layout: 'default',
    sidebar: false,
};
