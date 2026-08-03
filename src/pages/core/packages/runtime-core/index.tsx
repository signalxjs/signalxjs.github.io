import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="runtime-core" />);

export default Page;

export const meta = {
    title: "Runtime Core",
    description: "Renderer-agnostic component model — the Runtime Core package for SignalX (@sigx/runtime-core).",
    layout: 'default',
    sidebar: false,
};
