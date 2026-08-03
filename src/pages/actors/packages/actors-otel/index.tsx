import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="actors-otel" />);

export default Page;

export const meta = {
    title: "OpenTelemetry",
    description: "OpenTelemetry — module overview",
    layout: 'default',
    sidebar: false,
};
