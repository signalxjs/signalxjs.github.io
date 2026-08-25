import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="actors-cloudflare" />);

export default Page;

export const meta = {
    title: "Cloudflare",
    description: "One Durable Object per actor — the Cloudflare package for SignalX (@sigx/actors-cloudflare).",
    layout: 'default',
    sidebar: false,
};
