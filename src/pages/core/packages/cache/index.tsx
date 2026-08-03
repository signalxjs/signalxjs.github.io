import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="cache" />);

export default Page;

export const meta = {
    title: "Cache",
    description: "Cache policy for value-first async — the Cache package for SignalX (@sigx/cache).",
    layout: 'default',
    sidebar: false,
};
