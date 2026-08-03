import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="terminal-ui" />);

export default Page;

export const meta = {
    title: "Terminal UI",
    description: "Themed components — the SigX-tui skin — the Terminal UI package for SignalX Terminal (@sigx/terminal-ui).",
    layout: 'default',
    sidebar: false,
};
