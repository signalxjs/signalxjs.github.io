import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="location" />);

export default Page;

export const meta = {
    title: "Location",
    description: "GPS coordinates — the Location module for SignalX Lynx (@sigx/lynx-location).",
    layout: 'default',
    sidebar: false,
};
