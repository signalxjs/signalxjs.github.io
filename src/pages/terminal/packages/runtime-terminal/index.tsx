import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="runtime-terminal" />);

export default Page;

export const meta = {
    title: "Runtime Terminal",
    description: "Runtime Terminal — module overview",
    layout: 'default',
    sidebar: false,
};
