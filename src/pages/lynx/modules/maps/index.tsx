import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="maps" />);

export default Page;

export const meta = {
    title: "Maps",
    description: "Native map view — the Maps module for SignalX Lynx (@sigx/lynx-maps).",
    layout: 'default',
    sidebar: false,
};
