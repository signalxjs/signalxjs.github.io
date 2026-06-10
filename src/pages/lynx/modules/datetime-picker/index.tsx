import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="datetime-picker" />);

export default Page;

export const meta = {
    title: "Date/Time Picker",
    description: "Date/Time Picker — module overview",
    layout: 'default',
    sidebar: false,
};
