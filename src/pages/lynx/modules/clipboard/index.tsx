import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="clipboard" />);

export default Page;

export const meta = {
    title: "Clipboard",
    description: "System clipboard — the Clipboard module for SignalX Lynx (@sigx/lynx-clipboard).",
    layout: 'default',
    sidebar: false,
};
