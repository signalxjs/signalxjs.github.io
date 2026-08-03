import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="netlify" />);

export default Page;

export const meta = {
    title: "Netlify",
    description: "Frameworks API function generation — the Netlify adapter for SignalX (@sigx/netlify).",
    layout: 'default',
    sidebar: false,
};
