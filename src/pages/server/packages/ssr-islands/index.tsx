import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="ssr-islands" />);

export default Page;

export const meta = {
    title: "Islands",
    description: "Selective hydration via client:* — the Islands package for SignalX Server (@sigx/ssr-islands).",
    layout: 'default',
    sidebar: false,
};
