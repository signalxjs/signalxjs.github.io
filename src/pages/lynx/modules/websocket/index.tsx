import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="websocket" />);

export default Page;

export const meta = {
    title: "WebSocket",
    description: "WebSocket global — the WebSocket module for SignalX Lynx (@sigx/lynx-websocket).",
    layout: 'default',
    sidebar: false,
};
