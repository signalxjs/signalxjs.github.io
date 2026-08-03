import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="safe-area" />);

export default Page;

export const meta = {
    title: "Safe Area",
    description: "Safe-area insets — the Safe Area module for SignalX Lynx (@sigx/lynx-safe-area).",
    layout: 'default',
    sidebar: false,
};
