import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="runtime-core" />);

export default Page;

export const meta = {
    title: "Runtime Core",
    description: "Runtime Core — module overview",
    layout: 'default',
    sidebar: false,
};
