/**
 * Package release-status badge (Stable / Beta / Preview), tinted via --st-h.
 */

import { component, type Define } from 'sigx';
import { STATUS, type PackageStatus } from '@/lib/family';

type StatusBadgeProps = Define.Prop<'status', PackageStatus, true>;

export const StatusBadge = component<StatusBadgeProps>(({ props }) => {
    return () => {
        const s = STATUS[props.status];
        return (
            <span class="status-badge" style={`--st-h:${s.hue}`}>
                <span class="status-dot" />
                {s.label}
            </span>
        );
    };
});
