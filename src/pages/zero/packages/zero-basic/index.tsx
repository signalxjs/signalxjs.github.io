import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="zero-basic" />);

export default Page;

export const meta = {
    title: "Zero Basic",
    description: "The neutral starter design system — the Zero Basic package for SignalX Zero (@sigx/zero-basic).",
    layout: 'default',
    sidebar: false,
};
