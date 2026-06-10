import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="device-info" />);

export default Page;

export const meta = {
    title: "Device Info",
    description: "Device Info — module overview",
    layout: 'default',
    sidebar: false,
};
