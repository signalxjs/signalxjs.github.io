import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="biometric" />);

export default Page;

export const meta = {
    title: "Biometric",
    description: "Face ID / Touch ID auth — the Biometric module for SignalX Lynx (@sigx/lynx-biometric).",
    layout: 'default',
    sidebar: false,
};
