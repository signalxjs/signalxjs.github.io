import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="haptics" />);

export default Page;

export const meta = {
    title: "Haptics",
    description: "Haptic feedback — the Haptics module for SignalX Lynx (@sigx/lynx-haptics).",
    layout: 'default',
    sidebar: false,
};
