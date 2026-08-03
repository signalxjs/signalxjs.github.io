import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="secure-storage" />);

export default Page;

export const meta = {
    title: "Secure Storage",
    description: "Encrypted KV storage — the Secure Storage module for SignalX Lynx (@sigx/lynx-secure-storage).",
    layout: 'default',
    sidebar: false,
};
