import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="actors-otel" />);

export default Page;

export const meta = {
    title: "OpenTelemetry",
    description: "Prometheus exposition & OTel traces — the OpenTelemetry package for SignalX (@sigx/actors-otel).",
    layout: 'default',
    sidebar: false,
};
