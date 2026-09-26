import { component } from 'sigx';
import { PackageLanding } from '@/components/PackageLanding';

const Landing = component(() => {
    return () => <PackageLanding id="richtext" />;
});

export default Landing;

export const meta = {
    title: 'SignalX Rich Text - Documents, formats, streaming view and block editor',
    description: 'A schema-driven, mdast-shaped document with pluggable formats (markdown, HTML, plain text), a streaming-stable incremental engine, a renderer-neutral view and a block-tree editor for SignalX.',
    layout: 'package',
};
