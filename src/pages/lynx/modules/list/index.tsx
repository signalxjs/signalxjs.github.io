import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="list" />);

export default Page;

export const meta = {
    title: "List",
    description: "Data-driven virtualized list — the List module for SignalX Lynx (@sigx/lynx-list).",
    layout: 'default',
    sidebar: false,
};
