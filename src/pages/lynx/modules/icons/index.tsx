import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="icons" />);

export default Page;

export const meta = {
    title: "Icons",
    description: "Icons — module overview",
    layout: 'default',
    sidebar: false,
};
