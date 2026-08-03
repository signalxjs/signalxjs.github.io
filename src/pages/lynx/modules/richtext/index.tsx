import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="richtext" />);

export default Page;

export const meta = {
    title: "Rich Text",
    description: "Native rich-text input — the Rich Text module for SignalX Lynx (@sigx/lynx-richtext).",
    layout: 'default',
    sidebar: false,
};
