import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="runtime" />);

export default Page;

export const meta = {
    title: "Runtime",
    description: "Background-thread renderer — the Runtime module for SignalX Lynx (@sigx/lynx-runtime).",
    layout: 'default',
    sidebar: false,
};
