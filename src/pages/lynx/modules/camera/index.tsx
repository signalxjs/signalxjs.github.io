import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="camera" />);

export default Page;

export const meta = {
    title: "Camera",
    description: "Camera — module overview",
    layout: 'default',
    sidebar: false,
};
