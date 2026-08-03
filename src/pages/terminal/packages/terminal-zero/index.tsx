import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="terminal-zero" />);

export default Page;

export const meta = {
    title: "Terminal Zero",
    description: "Tokens, theme engine, layout & prompts engine — the Terminal Zero package for SignalX Terminal (@sigx/terminal-zero).",
    layout: 'default',
    sidebar: false,
};
