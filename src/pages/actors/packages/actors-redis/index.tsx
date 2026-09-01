import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="actors-redis" />);

export default Page;

export const meta = {
    title: "Redis",
    description: "Membership, directory & storage on Redis — the Redis package for SignalX (@sigx/actors-redis).",
    layout: 'default',
    sidebar: false,
};
