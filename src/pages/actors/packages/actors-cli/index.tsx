import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="actors-cli" />);

export default Page;

export const meta = {
    title: "CLI",
    description: "sigx actors — a terminal dashboard — the CLI package for SignalX (@sigx/actors-cli).",
    layout: 'default',
    sidebar: false,
};
