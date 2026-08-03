import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="updates-ui" />);

export default Page;

export const meta = {
    title: "OTA Update UI",
    description: "Prebuilt OTA update UI — the OTA Update UI module for SignalX Lynx (@sigx/lynx-updates-ui).",
    layout: 'default',
    sidebar: false,
};
