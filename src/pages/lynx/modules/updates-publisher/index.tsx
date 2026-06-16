import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="updates-publisher" />);

export default Page;

export const meta = {
    title: "OTA Publisher",
    description: "OTA Publisher — module overview",
    layout: 'default',
    sidebar: false,
};
