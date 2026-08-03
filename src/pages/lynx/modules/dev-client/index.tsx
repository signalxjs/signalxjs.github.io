import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="dev-client" />);

export default Page;

export const meta = {
    title: "Dev Client",
    description: "On-device dev menu — the Dev Client module for SignalX Lynx (@sigx/lynx-dev-client).",
    layout: 'default',
    sidebar: false,
};
