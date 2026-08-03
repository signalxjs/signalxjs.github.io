import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="file-system" />);

export default Page;

export const meta = {
    title: "File System",
    description: "Sandboxed file access — the File System module for SignalX Lynx (@sigx/lynx-file-system).",
    layout: 'default',
    sidebar: false,
};
