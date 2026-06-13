import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="sqlite" />);

export default Page;

export const meta = {
    title: "SQLite",
    description: "SQLite — module overview",
    layout: 'default',
    sidebar: false,
};
