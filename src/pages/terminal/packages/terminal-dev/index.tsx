import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="terminal-dev" />);

export default Page;

export const meta = {
    title: "Terminal Dev",
    description: "Terminal Dev — module overview",
    layout: 'default',
    sidebar: false,
};
