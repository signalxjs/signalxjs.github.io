import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="actors-cloudflare" />);

export default Page;

export const meta = {
    title: "Cloudflare",
    description: "Cloudflare — module overview",
    layout: 'default',
    sidebar: false,
};
