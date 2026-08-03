import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="icons" />);

export default Page;

export const meta = {
    title: "Icons",
    description: "Icon component + registry — the Icons module for SignalX Lynx (@sigx/lynx-icons).",
    layout: 'default',
    sidebar: false,
};
