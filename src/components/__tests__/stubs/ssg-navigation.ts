/**
 * Test stub for the `virtual:ssg-navigation` module (aliased in vitest.config.ts).
 *
 * Provides a grouped daisyui-docs sidebar — a section whose items contain
 * nested `items` — which is the shape that exercises `renderNavItem`'s group
 * branch and the `<li>`-nesting hydration bug.
 */

export const navigation = {
    'daisyui-docs': {
        sidebar: [
            {
                title: 'Components',
                items: [
                    {
                        title: 'Actions',
                        items: [
                            { title: 'Button', href: '/daisyui/docs/components/button' },
                            { title: 'Dropdown', href: '/daisyui/docs/components/dropdown' },
                        ],
                    },
                    {
                        title: 'Feedback',
                        items: [
                            { title: 'Alert', href: '/daisyui/docs/components/alert' },
                            { title: 'Badge', href: '/daisyui/docs/components/badge' },
                        ],
                    },
                ],
            },
        ],
    },
} as const;

export function detectCollection(_path: string): string {
    return 'daisyui-docs';
}

export default { navigation, detectCollection };
