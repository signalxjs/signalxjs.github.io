import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="actors-k8s" />);

export default Page;

export const meta = {
    title: "Kubernetes",
    description: "Kubernetes — module overview",
    layout: 'default',
    sidebar: false,
};
