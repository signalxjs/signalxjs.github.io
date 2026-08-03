import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="markdown" />);

export default Page;

export const meta = {
    title: "Markdown",
    description: "Streaming markdown renderer — the Markdown module for SignalX Lynx (@sigx/lynx-markdown).",
    layout: 'default',
    sidebar: false,
};
