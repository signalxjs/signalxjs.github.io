import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="observability" />);

export default Page;

export const meta = {
    title: "Observability",
    description: "Error capture, sinks & memory — the Observability module for SignalX Lynx (@sigx/lynx-observability).",
    layout: 'default',
    sidebar: false,
};
