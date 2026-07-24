import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="netlify" />);

export default Page;

export const meta = {
    title: "Netlify",
    description: "Netlify — module overview",
    layout: 'default',
    sidebar: false,
};
