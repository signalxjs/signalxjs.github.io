import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="actors-pg" />);

export default Page;

export const meta = {
    title: "Postgres",
    description: "Membership, directory, storage & reminders on Postgres — the Postgres package for SignalX (@sigx/actors-pg).",
    layout: 'default',
    sidebar: false,
};
