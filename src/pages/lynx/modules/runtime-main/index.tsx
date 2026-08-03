import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="runtime-main" />);

export default Page;

export const meta = {
    title: "Main Runtime",
    description: "Main-thread (Lepus) runtime — the Main Runtime module for SignalX Lynx (@sigx/lynx-runtime-main).",
    layout: 'default',
    sidebar: false,
};
