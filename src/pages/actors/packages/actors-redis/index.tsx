import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="actors-redis" />);

export default Page;

export const meta = {
    title: "Redis",
    description: "Redis — module overview",
    layout: 'default',
    sidebar: false,
};
