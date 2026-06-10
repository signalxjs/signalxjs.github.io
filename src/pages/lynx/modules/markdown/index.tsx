import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="markdown" />);

export default Page;

export const meta = {
    title: "Markdown",
    description: "Markdown — module overview",
    layout: 'default',
    sidebar: false,
};
