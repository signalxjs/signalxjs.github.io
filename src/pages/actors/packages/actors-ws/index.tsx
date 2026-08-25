import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="actors-ws" />);

export default Page;

export const meta = {
    title: "WebSocket",
    description: "Browser to host, over one socket — the WebSocket package for SignalX (@sigx/actors-ws).",
    layout: 'default',
    sidebar: false,
};
