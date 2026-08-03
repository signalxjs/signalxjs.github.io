import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="testing" />);

export default Page;

export const meta = {
    title: "Testing",
    description: "Component testing — the Testing module for SignalX Lynx (@sigx/lynx-testing).",
    layout: 'default',
    sidebar: false,
};
