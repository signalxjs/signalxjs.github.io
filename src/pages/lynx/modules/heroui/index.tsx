import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="heroui" />);

export default Page;

export const meta = {
    title: "HeroUI",
    description: "HeroUI — module overview",
    layout: 'default',
    sidebar: false,
};
