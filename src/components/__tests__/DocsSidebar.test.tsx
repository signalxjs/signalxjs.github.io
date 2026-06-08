/**
 * Regression test for the sidebar hydration duplication bug.
 *
 * `DocsSidebar` renders grouped nav items. The bug: a group was wrapped in an
 * `<li>` by `renderNavItem` AND again by the caller, emitting `<li><li><details>`.
 * SSR serializes that faithfully, but the HTML5 parser closes the outer `<li>`
 * at the second `<li>` (an `<li>` start tag implicitly ends an open `<li>`), so
 * the browser builds two *sibling* `<li>`s — the first empty. The client VNode
 * tree still expects nesting, so hydration walks into the empty wrapper, mounts
 * the group fresh, and orphans the real (reparsed) content → duplicated
 * `<details>` groups and dead reactivity.
 *
 * These tests reproduce that by rendering to an HTML string, reparsing it
 * through `innerHTML` (which applies the same correction a browser does), then
 * hydrating — and asserting the structure stays valid and un-duplicated.
 */

import { describe, it, expect, vi, afterEach } from 'vitest';
import { component, defineApp } from 'sigx';
import { createRouter, createMemoryHistory } from '@sigx/router';
import { renderToString } from '@sigx/server-renderer/server';
import { ssrClientPlugin } from '@sigx/ssg/client';

// The grouped daisyui-docs sidebar fixture lives in the stub aliased for
// `virtual:ssg-navigation` (see vitest.config.ts) — a section with nested
// `items`, the shape that triggers the `<li><li>` emission.

// Switchers/Icon pull in unrelated UI; stub them so the test stays focused on
// the nav list structure.
vi.mock('@/components/PackageSwitcher', () => ({
    PackageSwitcher: () => () => null,
}));
vi.mock('@/components/ModuleSwitcher', () => ({
    ModuleSwitcher: () => () => null,
}));
vi.mock('@/components/ui/Icon', () => ({
    Icon: () => () => null,
}));

// Imported after the mocks are registered.
const { DocsSidebar } = await import('@/components/DocsSidebar');

function makeRouter() {
    return createRouter({
        history: createMemoryHistory({
            initialLocation: '/daisyui/docs/components/button',
        }),
        routes: [{ path: '/:rest*', component: component(() => () => null) }],
    });
}

afterEach(() => {
    document.body.innerHTML = '';
});

describe('DocsSidebar grouped nav hydration', () => {
    it('does not emit an <li> directly inside another <li> (invalid nesting)', async () => {
        const app = defineApp(<DocsSidebar collection="daisyui-docs" />).use(makeRouter());
        const html = await renderToString(app);

        // The raw SSR string must not contain a `<li>` whose first child is
        // another `<li>`. We test the STRING (not a reparsed DOM) because
        // reparsing is exactly what hides the bug.
        expect(html).not.toMatch(/<li[^>]*>\s*<li[\s>]/);
    });

    it('hydrates grouped items without duplicating <details> groups', async () => {
        // 1. Server render.
        const ssrApp = defineApp(<DocsSidebar collection="daisyui-docs" />).use(makeRouter());
        const html = await renderToString(ssrApp);

        // 2. Reparse through innerHTML, like a browser parsing the response.
        const container = document.createElement('div');
        container.id = 'app';
        container.innerHTML = html;
        document.body.appendChild(container);

        const groupsAfterParse = container.querySelectorAll('details.side-group').length;
        expect(groupsAfterParse).toBe(2); // Actions + Feedback

        // 3. Hydrate against the reparsed DOM (mirrors the real client entry).
        // `hydrate` is added to the app by ssrClientPlugin (declared optional in
        // the module augmentation), so assert its presence after `.use(...)`.
        const app = defineApp(<DocsSidebar collection="daisyui-docs" />)
            .use(makeRouter())
            .use(ssrClientPlugin);
        app.hydrate!(container);

        // Hydration must not mount duplicate groups.
        const groupsAfterHydrate = container.querySelectorAll('details.side-group').length;
        expect(groupsAfterHydrate).toBe(groupsAfterParse);

        // Each leaf link should appear exactly once.
        const buttonLinks = container.querySelectorAll('a[href="/daisyui/docs/components/button"]');
        expect(buttonLinks.length).toBe(1);
    });
});
