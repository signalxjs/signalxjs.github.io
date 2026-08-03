import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="plugin" />);

export default Page;

export const meta = {
    title: "Build Plugin",
    description: "Rspack / Rspeedy plugin — the Build Plugin module for SignalX Lynx (@sigx/lynx-plugin).",
    layout: 'default',
    sidebar: false,
};
