import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="sqlite" />);

export default Page;

export const meta = {
    title: "SQLite",
    description: "Embedded SQLite database — the SQLite module for SignalX Lynx (@sigx/lynx-sqlite).",
    layout: 'default',
    sidebar: false,
};
