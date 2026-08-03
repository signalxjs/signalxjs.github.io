import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="cloudflare" />);

export default Page;

export const meta = {
    title: "Cloudflare",
    description: "Bundled workerd worker + wrangler scaffold — the Cloudflare adapter for SignalX (@sigx/cloudflare).",
    layout: 'default',
    sidebar: false,
};
