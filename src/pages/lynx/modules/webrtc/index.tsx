import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="webrtc" />);

export default Page;

export const meta = {
    title: "WebRTC",
    description: "W3C-shaped WebRTC — the WebRTC module for SignalX Lynx (@sigx/lynx-webrtc).",
    layout: 'default',
    sidebar: false,
};
