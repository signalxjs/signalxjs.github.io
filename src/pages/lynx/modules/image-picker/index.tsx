import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="image-picker" />);

export default Page;

export const meta = {
    title: "Image Picker",
    description: "Image Picker — module overview",
    layout: 'default',
    sidebar: false,
};
