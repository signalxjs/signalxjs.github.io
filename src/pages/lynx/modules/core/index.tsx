import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="core" />);

export default Page;

export const meta = {
    title: "Native Bridge",
    description: "Low-level NativeModules bridge — the Native Bridge module for SignalX Lynx (@sigx/lynx-core).",
    layout: 'default',
    sidebar: false,
};
