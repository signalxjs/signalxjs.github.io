import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="server" />);

export default Page;

export const meta = {
    title: "Server Functions",
    description: "Type-safe server functions — the Server Functions package for SignalX Server (@sigx/server).",
    layout: 'default',
    sidebar: false,
};
