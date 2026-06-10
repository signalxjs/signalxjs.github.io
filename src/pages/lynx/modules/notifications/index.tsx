import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="notifications" />);

export default Page;

export const meta = {
    title: "Notifications",
    description: "Notifications — module overview",
    layout: 'default',
    sidebar: false,
};
