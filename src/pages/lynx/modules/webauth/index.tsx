import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="webauth" />);

export default Page;

export const meta = {
    title: "Web Auth",
    description: "System web-auth session for OAuth — the Web Auth module for SignalX Lynx (@sigx/lynx-webauth).",
    layout: 'default',
    sidebar: false,
};
