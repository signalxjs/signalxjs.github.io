import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="actors-k8s" />);

export default Page;

export const meta = {
    title: "Kubernetes",
    description: "Host liveness on coordination.k8s.io Leases — the Kubernetes package for SignalX (@sigx/actors-k8s).",
    layout: 'default',
    sidebar: false,
};
