import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="updates" />);

export default Page;

export const meta = {
    title: "OTA Updates",
    description: "OTA bundle updates — the OTA Updates module for SignalX Lynx (@sigx/lynx-updates).",
    layout: 'default',
    sidebar: false,
};
