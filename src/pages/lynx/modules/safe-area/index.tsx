import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="safe-area" />);

export default Page;

export const meta = {
    title: "Safe Area",
    description: "Safe Area — module overview",
    layout: 'default',
    sidebar: false,
};
