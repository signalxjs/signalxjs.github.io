import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="keyboard" />);

export default Page;

export const meta = {
    title: "Keyboard",
    description: "Keyboard — module overview",
    layout: 'default',
    sidebar: false,
};
