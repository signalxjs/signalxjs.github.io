import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="icons-fa" />);

export default Page;

export const meta = {
    title: "FA Icons",
    description: "Font Awesome adapter — the FA Icons module for SignalX Lynx (@sigx/lynx-icons-fa-free).",
    layout: 'default',
    sidebar: false,
};
