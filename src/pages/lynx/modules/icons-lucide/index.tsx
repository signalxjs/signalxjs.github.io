import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="icons-lucide" />);

export default Page;

export const meta = {
    title: "Lucide Icons",
    description: "Lucide adapter — the Lucide Icons module for SignalX Lynx (@sigx/lynx-icons-lucide).",
    layout: 'default',
    sidebar: false,
};
