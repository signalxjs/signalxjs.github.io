import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="audio" />);

export default Page;

export const meta = {
    title: "Audio",
    description: "Recording & playback — the Audio module for SignalX Lynx (@sigx/lynx-audio).",
    layout: 'default',
    sidebar: false,
};
