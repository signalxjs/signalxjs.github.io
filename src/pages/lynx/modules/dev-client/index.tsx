import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="dev-client" />);

export default Page;

export const meta = {
    title: "Dev Client",
    description: "Dev Client — module overview",
    layout: 'default',
    sidebar: false,
};
