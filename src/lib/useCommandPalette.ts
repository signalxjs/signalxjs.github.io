/**
 * Shared ⌘K / Ctrl+K wiring for layouts.
 *
 * Call during component setup; returns a reactive state whose `open`
 * flag toggles on the global shortcut. Listener registration is
 * client-only (onMounted), so prerendering stays clean.
 */

import { onMounted, onUnmounted, signal } from 'sigx';

export function useCommandPalette() {
    const state = signal({ open: false });

    const onKey = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
            e.preventDefault();
            state.open = !state.open;
        }
    };

    onMounted(() => window.addEventListener('keydown', onKey));
    onUnmounted(() => window.removeEventListener('keydown', onKey));

    return state;
}
