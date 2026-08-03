import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="navigation" />);

export default Page;

export const meta = {
    title: "Navigation",
    description: "Type-first native navigator — the Navigation module for SignalX Lynx (@sigx/lynx-navigation).",
    layout: 'default',
    sidebar: false,
};
