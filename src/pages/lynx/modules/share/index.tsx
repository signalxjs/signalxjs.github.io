import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="share" />);

export default Page;

export const meta = {
    title: "Share",
    description: "Native share sheet — the Share module for SignalX Lynx (@sigx/lynx-share).",
    layout: 'default',
    sidebar: false,
};
