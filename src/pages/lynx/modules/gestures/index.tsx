import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="gestures" />);

export default Page;

export const meta = {
    title: "Gestures",
    description: "Gestures — module overview",
    layout: 'default',
    sidebar: false,
};
