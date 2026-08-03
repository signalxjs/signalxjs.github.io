import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="vercel" />);

export default Page;

export const meta = {
    title: "Vercel",
    description: "Build Output API v3 generation — the Vercel adapter for SignalX (@sigx/vercel).",
    layout: 'default',
    sidebar: false,
};
