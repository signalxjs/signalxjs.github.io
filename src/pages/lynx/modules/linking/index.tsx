import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="linking" />);

export default Page;

export const meta = {
    title: "Linking",
    description: "Deep links & URL schemes — the Linking module for SignalX Lynx (@sigx/lynx-linking).",
    layout: 'default',
    sidebar: false,
};
