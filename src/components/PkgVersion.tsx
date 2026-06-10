/**
 * Inline package version, resolved from the live npm manifest
 * (versions.generated.ts, refreshed at build time by
 * scripts/fetch-versions.mjs). Used in MDX prose so versions never need
 * hand-editing:
 *
 *   Exports of `@sigx/lynx-camera` <PkgVersion npm="@sigx/lynx-camera" />.
 *
 * Renders nothing for an unknown / unpublished package so prose degrades
 * cleanly rather than printing a bare "v".
 */

import { component } from 'sigx';
import { VERSIONS } from '@/lib/versions.generated';

export type PkgVersionProps = {
    /** npm package name to look up (e.g. `@sigx/lynx-camera`). */
    npm: string;
};

export const PkgVersion = component<PkgVersionProps>(({ props }) => {
    return () => {
        const version = VERSIONS[props.npm];
        return version ? <>v{version}</> : <></>;
    };
});
