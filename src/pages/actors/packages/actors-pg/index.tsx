import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="actors-pg" />);

export default Page;

export const meta = {
    title: "Postgres",
    description: "Postgres — module overview",
    layout: 'default',
    sidebar: false,
};
