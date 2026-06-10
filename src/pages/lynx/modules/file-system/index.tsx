import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="file-system" />);

export default Page;

export const meta = {
    title: "File System",
    description: "File System — module overview",
    layout: 'default',
    sidebar: false,
};
