import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="file-picker" />);

export default Page;

export const meta = {
    title: "File Picker",
    description: "File Picker — module overview",
    layout: 'default',
    sidebar: false,
};
