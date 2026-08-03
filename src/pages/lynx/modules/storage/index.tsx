import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="storage" />);

export default Page;

export const meta = {
    title: "Storage",
    description: "Persistent KV store — the Storage module for SignalX Lynx (@sigx/lynx-storage).",
    layout: 'default',
    sidebar: false,
};
