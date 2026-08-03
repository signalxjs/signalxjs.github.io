import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="terminal-dev" />);

export default Page;

export const meta = {
    title: "Terminal Dev",
    description: "HMR dev runner — the Terminal Dev package for SignalX Terminal (@sigx/terminal-dev).",
    layout: 'default',
    sidebar: false,
};
