import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="heroui" />);

export default Page;

export const meta = {
    title: "HeroUI",
    description: "HeroUI design system — the HeroUI module for SignalX Lynx (@sigx/lynx-heroui).",
    layout: 'default',
    sidebar: false,
};
