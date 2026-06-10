import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="webview" />);

export default Page;

export const meta = {
    title: "WebView",
    description: "WebView — module overview",
    layout: 'default',
    sidebar: false,
};
