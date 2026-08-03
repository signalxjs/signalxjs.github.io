import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="server-renderer" />);

export default Page;

export const meta = {
    title: "Server Renderer",
    description: "Streaming SSR & hydration — the Server Renderer package for SignalX Server (@sigx/server-renderer).",
    layout: 'default',
    sidebar: false,
};
