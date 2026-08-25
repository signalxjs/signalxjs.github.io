import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="zero-kit" />);

export default Page;

export const meta = {
    title: "Zero Kit",
    description: "Tokens + recipes → plain layered CSS — the Zero Kit package for SignalX Zero (@sigx/zero-kit).",
    layout: 'default',
    sidebar: false,
};
