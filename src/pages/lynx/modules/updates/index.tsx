import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="updates" />);

export default Page;

export const meta = {
    title: "OTA Updates",
    description: "OTA Updates — module overview",
    layout: 'default',
    sidebar: false,
};
