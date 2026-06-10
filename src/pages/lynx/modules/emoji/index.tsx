import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="emoji" />);

export default Page;

export const meta = {
    title: "Emoji Picker",
    description: "Emoji Picker — module overview",
    layout: 'default',
    sidebar: false,
};
