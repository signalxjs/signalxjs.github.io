import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="richtext" />);

export default Page;

export const meta = {
    title: "Rich Text",
    description: "Rich Text — module overview",
    layout: 'default',
    sidebar: false,
};
