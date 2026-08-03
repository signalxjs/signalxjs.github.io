import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="emoji" />);

export default Page;

export const meta = {
    title: "Emoji Picker",
    description: "Themable emoji picker — the Emoji Picker module for SignalX Lynx (@sigx/lynx-emoji).",
    layout: 'default',
    sidebar: false,
};
