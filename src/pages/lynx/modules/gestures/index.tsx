import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="gestures" />);

export default Page;

export const meta = {
    title: "Gestures",
    description: "Frame-locked touch handling — the Gestures module for SignalX Lynx (@sigx/lynx-gestures).",
    layout: 'default',
    sidebar: false,
};
