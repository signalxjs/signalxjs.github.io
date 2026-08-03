import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="runtime-terminal" />);

export default Page;

export const meta = {
    title: "Runtime Terminal",
    description: "The cell renderer — the Runtime Terminal package for SignalX Terminal (@sigx/runtime-terminal).",
    layout: 'default',
    sidebar: false,
};
