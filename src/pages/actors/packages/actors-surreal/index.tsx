import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="actors-surreal" />);

export default Page;

export const meta = {
    title: "SurrealDB",
    description: "Membership, directory, storage & reminders on SurrealDB 3 — the SurrealDB package for SignalX (@sigx/actors-surreal).",
    layout: 'default',
    sidebar: false,
};
