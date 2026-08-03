import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="image-picker" />);

export default Page;

export const meta = {
    title: "Image Picker",
    description: "Pick / capture images — the Image Picker module for SignalX Lynx (@sigx/lynx-image-picker).",
    layout: 'default',
    sidebar: false,
};
