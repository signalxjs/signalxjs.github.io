import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="haptics" />);

export default Page;

export const meta = {
    title: "Haptics",
    description: "Haptics — module overview",
    layout: 'default',
    sidebar: false,
};
