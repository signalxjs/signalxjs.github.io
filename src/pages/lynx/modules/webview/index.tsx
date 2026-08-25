import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="webview" />);

export default Page;

export const meta = {
    title: '@sigx/lynx-webview',
    description: "Native web view — the WebView module for SignalX Lynx (@sigx/lynx-webview).",
    layout: 'default',
    sidebar: false,
};
