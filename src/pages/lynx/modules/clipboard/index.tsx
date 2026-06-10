import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="clipboard" />);

export default Page;

export const meta = {
    title: "Clipboard",
    description: "Clipboard — module overview",
    layout: 'default',
    sidebar: false,
};
