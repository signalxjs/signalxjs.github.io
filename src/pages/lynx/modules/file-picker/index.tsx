import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="file-picker" />);

export default Page;

export const meta = {
    title: "File Picker",
    description: "Document picker — the File Picker module for SignalX Lynx (@sigx/lynx-file-picker).",
    layout: 'default',
    sidebar: false,
};
