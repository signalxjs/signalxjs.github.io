import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="motion" />);

export default Page;

export const meta = {
    title: "Motion",
    description: "Animation drivers — the Motion module for SignalX Lynx (@sigx/lynx-motion).",
    layout: 'default',
    sidebar: false,
};
