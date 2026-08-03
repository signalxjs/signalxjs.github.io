import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="zero" />);

export default Page;

export const meta = {
    title: "Zero",
    description: "Headless design-system foundation — the Zero module for SignalX Lynx (@sigx/lynx-zero).",
    layout: 'default',
    sidebar: false,
};
