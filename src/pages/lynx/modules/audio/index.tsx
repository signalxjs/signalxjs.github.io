import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="audio" />);

export default Page;

export const meta = {
    title: "Audio",
    description: "Audio — module overview",
    layout: 'default',
    sidebar: false,
};
