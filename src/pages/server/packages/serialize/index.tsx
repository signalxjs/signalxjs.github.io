import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="serialize" />);

export default Page;

export const meta = {
    title: "Serialize",
    description: "Custom-type serialization codec — the Serialize package for SignalX Server (@sigx/serialize).",
    layout: 'default',
    sidebar: false,
};
