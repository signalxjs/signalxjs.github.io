import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="datetime-picker" />);

export default Page;

export const meta = {
    title: "Date/Time Picker",
    description: "Native date & time picker — the Date/Time Picker module for SignalX Lynx (@sigx/lynx-datetime-picker).",
    layout: 'default',
    sidebar: false,
};
