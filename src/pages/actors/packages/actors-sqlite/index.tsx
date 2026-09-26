import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="actors-sqlite" />);

export default Page;

export const meta = {
    title: "SQLite",
    description: "Actor storage in one file on node:sqlite — the SQLite package for SignalX (@sigx/actors-sqlite).",
    layout: 'default',
    sidebar: false,
};
