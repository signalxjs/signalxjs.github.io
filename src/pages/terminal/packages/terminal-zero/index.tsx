import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="terminal-zero" />);

export default Page;

export const meta = {
    title: "Terminal Zero",
    description: "Terminal Zero — module overview",
    layout: 'default',
    sidebar: false,
};
