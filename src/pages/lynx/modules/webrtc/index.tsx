import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="webrtc" />);

export default Page;

export const meta = {
    title: "WebRTC",
    description: "WebRTC — module overview",
    layout: 'default',
    sidebar: false,
};
