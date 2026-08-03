import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="runtime-dom" />);

export default Page;

export const meta = {
    title: "Runtime DOM",
    description: "The DOM renderer — the Runtime DOM package for SignalX (@sigx/runtime-dom).",
    layout: 'default',
    sidebar: false,
};
