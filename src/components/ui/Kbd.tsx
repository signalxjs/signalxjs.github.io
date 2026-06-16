/**
 * Keyboard key chip. Named class `sx-kbd` to avoid colliding with
 * daisyUI's `.kbd` component (used in docs live previews).
 */

import { component } from 'sigx';

export const Kbd = component(({ slots }) => {
    return () => <kbd class="sx-kbd">{slots.default?.()}</kbd>;
});
