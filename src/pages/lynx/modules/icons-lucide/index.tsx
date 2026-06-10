import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="icons-lucide" />);

export default Page;

export const meta = {
    title: "Lucide Icons",
    description: "Lucide Icons — module overview",
    layout: 'default',
    sidebar: false,
};
