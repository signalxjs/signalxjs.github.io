import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="vercel" />);

export default Page;

export const meta = {
    title: "Vercel",
    description: "Vercel — module overview",
    layout: 'default',
    sidebar: false,
};
