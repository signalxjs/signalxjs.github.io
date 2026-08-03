import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="sheet" />);

export default Page;

export const meta = {
    title: "Bottom Sheet",
    description: "Route-free bottom sheet — the Bottom Sheet module for SignalX Lynx (@sigx/lynx-sheet).",
    layout: 'default',
    sidebar: false,
};
