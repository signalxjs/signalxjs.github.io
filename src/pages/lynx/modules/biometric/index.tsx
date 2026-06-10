import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="biometric" />);

export default Page;

export const meta = {
    title: "Biometric",
    description: "Biometric — module overview",
    layout: 'default',
    sidebar: false,
};
