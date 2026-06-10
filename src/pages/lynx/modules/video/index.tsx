import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="video" />);

export default Page;

export const meta = {
    title: "Video",
    description: "Video — module overview",
    layout: 'default',
    sidebar: false,
};
