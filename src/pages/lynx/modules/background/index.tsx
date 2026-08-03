import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="background" />);

export default Page;

export const meta = {
    title: "Background Tasks",
    description: "Periodic sync & fetch — the Background Tasks module for SignalX Lynx (@sigx/lynx-background).",
    layout: 'default',
    sidebar: false,
};
