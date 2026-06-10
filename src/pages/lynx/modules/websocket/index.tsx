import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="websocket" />);

export default Page;

export const meta = {
    title: "WebSocket",
    description: "WebSocket — module overview",
    layout: 'default',
    sidebar: false,
};
