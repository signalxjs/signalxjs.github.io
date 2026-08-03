import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="updates-publisher" />);

export default Page;

export const meta = {
    title: "OTA Publisher",
    description: "CI bundle publisher — the OTA Publisher module for SignalX Lynx (@sigx/lynx-updates-publisher).",
    layout: 'default',
    sidebar: false,
};
