import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="runtime-dom" />);

export default Page;

export const meta = {
    title: "Runtime DOM",
    description: "Runtime DOM — module overview",
    layout: 'default',
    sidebar: false,
};
