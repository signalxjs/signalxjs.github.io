import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="args" />);

export default Page;

export const meta = {
    title: "Args",
    description: "Fluent, type-aware argument parser — the Args package for SignalX Terminal (@sigx/args).",
    layout: 'default',
    sidebar: false,
};
