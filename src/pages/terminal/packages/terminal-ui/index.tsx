import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="terminal-ui" />);

export default Page;

export const meta = {
    title: "Terminal UI",
    description: "Terminal UI — module overview",
    layout: 'default',
    sidebar: false,
};
