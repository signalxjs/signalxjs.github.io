import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="maps" />);

export default Page;

export const meta = {
    title: "Maps",
    description: "Maps — module overview",
    layout: 'default',
    sidebar: false,
};
