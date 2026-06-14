import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="updates-ui" />);

export default Page;

export const meta = {
    title: "OTA Update UI",
    description: "OTA Update UI — module overview",
    layout: 'default',
    sidebar: false,
};
