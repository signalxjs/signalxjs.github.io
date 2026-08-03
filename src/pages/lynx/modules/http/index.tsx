import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="http" />);

export default Page;

export const meta = {
    title: "HTTP",
    description: "WHATWG fetch transport — the HTTP module for SignalX Lynx (@sigx/lynx-http).",
    layout: 'default',
    sidebar: false,
};
