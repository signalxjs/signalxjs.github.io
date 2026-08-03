import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="cli" />);

export default Page;

export const meta = {
    title: "CLI Plugin",
    description: "@sigx/cli plugin — the CLI Plugin module for SignalX Lynx (@sigx/lynx-cli).",
    layout: 'default',
    sidebar: false,
};
