import { component } from 'sigx';
import { ModuleIndexRedirect } from '@/components/ModuleIndexRedirect';

const Page = component(() => () => <ModuleIndexRedirect id="resume" />);

export default Page;

export const meta = {
    title: "Resume",
    description: "Resumable SSR & boundary refresh — the Resume package for SignalX Server (@sigx/resume).",
    layout: 'default',
    sidebar: false,
};
