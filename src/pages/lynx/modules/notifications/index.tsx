import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="notifications" />);

export default Page;

export const meta = {
    title: "Notifications",
    description: "Local notifications — the Notifications module for SignalX Lynx (@sigx/lynx-notifications).",
    layout: 'default',
    sidebar: false,
};
