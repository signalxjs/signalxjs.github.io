import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="video" />);

export default Page;

export const meta = {
    title: "Video",
    description: "Native video player — the Video module for SignalX Lynx (@sigx/lynx-video).",
    layout: 'default',
    sidebar: false,
};
