/**
 * Table of Contents Component
 * 
 * Auto-generated from page headings, highlights current section.
 * Uses IntersectionObserver for efficient scroll-spy behavior.
 * Falls back to client-side DOM extraction for non-MDX pages.
 * 
 * Watches for route changes to update headings when navigating.
 */

import { component, onMounted, onUnmounted, watch, type Define } from 'sigx';
import { useRoute } from '@sigx/router';

type Heading = {
    id: string;
    text: string;
    level: number;
};

type TableOfContentsProps = Define.Prop<'headings', Heading[], false>;

/**
 * Extract headings from DOM (fallback for TSX pages that don't have build-time headings)
 */
function extractHeadingsFromDOM(minLevel = 2, maxLevel = 3): Heading[] {
    const headings: Heading[] = [];
    const contentArea = document.querySelector('.prose') || document.querySelector('main') || document.body;
    
    const selectors = [];
    for (let i = minLevel; i <= maxLevel; i++) {
        selectors.push(`h${i}[id]`);
    }
    
    const elements = contentArea.querySelectorAll(selectors.join(', '));
    elements.forEach((el) => {
        const id = el.id;
        // Exclude decorations (count badges etc.) from the TOC label
        const clone = el.cloneNode(true) as HTMLElement;
        clone.querySelectorAll('[data-toc-ignore]').forEach((n) => n.remove());
        const text = clone.textContent?.trim() || '';
        const level = parseInt(el.tagName[1], 10);
        
        if (id && text) {
            headings.push({ id, text, level });
        }
    });
    
    return headings;
}

export const TableOfContents = component<TableOfContentsProps>(({ props, signal }) => {
    const route = useRoute();
    const state = signal({
        activeId: '',
        headings: props.headings || [] as Heading[]
    });
    
    // Track current observer for cleanup
    let currentObserver: IntersectionObserver | null = null;
    // Flag to ignore observer during programmatic scroll
    let isScrolling = false;
    
    /**
     * Setup headings and intersection observer
     * Called on mount and when route changes
     */
    function setupHeadings() {
        // Cleanup previous observer
        if (currentObserver) {
            currentObserver.disconnect();
            currentObserver = null;
        }
        
        // Use provided headings or fall back to DOM extraction
        let headings = props.headings || [];

        if (headings.length === 0) {
            // Client-side fallback for pages whose headings are rendered by
            // components (no build-time meta.headings). Content may render a
            // few frames after us — retry briefly until headings appear.
            let attempts = 0;
            const tryExtract = () => {
                attempts++;
                headings = extractHeadingsFromDOM();
                if (headings.length > 0) {
                    state.headings = headings;
                    waitForHeadingsAndSetup(headings);
                } else if (attempts < 20) {
                    requestAnimationFrame(tryExtract);
                }
            };
            requestAnimationFrame(tryExtract);
            return;
        }
        
        state.headings = headings;
        waitForHeadingsAndSetup(headings);
    }
    
    /**
     * Setup intersection observer for scroll spy
     */
    function setupObserver(headings: Heading[]) {
        if (headings.length === 0) {
            return;
        }
        
        // Cache heading elements
        const headingElements: HTMLElement[] = [];
        headings.forEach(h => {
            const el = document.getElementById(h.id);
            if (el) headingElements.push(el);
        });
        
        // Determine initial active heading
        // 1. Check URL hash first
        const hash = window.location.hash.slice(1);
        if (hash && headingElements.some(el => el.id === hash)) {
            state.activeId = hash;
        } else if (headingElements.length > 0) {
            // 2. Find the heading that's currently visible/closest to top
            const viewportTop = window.scrollY + 100; // Account for navbar
            let closestHeading = headingElements[0];
            
            for (const el of headingElements) {
                if (el.offsetTop <= viewportTop) {
                    closestHeading = el;
                } else {
                    break;
                }
            }
            state.activeId = closestHeading.id;
        }
        
        // Use IntersectionObserver for efficient scroll spy
        const observerOptions = {
            rootMargin: '-80px 0px -80% 0px', // Account for navbar and trigger when heading near top
            threshold: 0
        };
        
        currentObserver = new IntersectionObserver((entries) => {
            // Ignore during programmatic scroll
            if (isScrolling) return;
            
            // Find the topmost visible heading
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    state.activeId = entry.target.id;
                    break;
                }
            }
        }, observerOptions);
        
        // Observe all heading elements
        headingElements.forEach(el => currentObserver!.observe(el));
    }
    
    /**
     * Wait for headings to appear in DOM, then setup observer
     */
    function waitForHeadingsAndSetup(headings: Heading[], maxAttempts = 10) {
        let attempts = 0;
        
        function trySetup() {
            attempts++;
            // Check if first heading exists in DOM
            if (headings.length > 0) {
                const firstHeading = document.getElementById(headings[0].id);
                if (firstHeading) {
                    setupObserver(headings);
                    return;
                }
            }
            
            if (attempts < maxAttempts) {
                // Content not ready yet, try again
                requestAnimationFrame(trySetup);
            }
        }
        
        trySetup();
    }
    
    onMounted(() => {
        // Use requestAnimationFrame to wait for content to render.
        // setupHeadings (not waitForHeadingsAndSetup) so the DOM-extraction
        // fallback also runs on initial mount — pages whose headings are
        // rendered by components (e.g. ComponentCatalog) have no
        // build-time meta.headings.
        requestAnimationFrame(() => {
            setupHeadings();
        });
    });
    
    // Watch for route changes to update headings
    watch(
        () => route.path,
        () => {
            // Small delay to ensure new content is rendered
            requestAnimationFrame(() => {
                setupHeadings();
            });
        }
    );
    
    onUnmounted(() => {
        if (currentObserver) {
            currentObserver.disconnect();
            currentObserver = null;
        }
    });
    
    return () => {
        const headings = state.headings || [];
        const currentActiveId = state.activeId;
        
        if (headings.length === 0) {
            return null;
        }
        
        const handleClick = (id: string, e: MouseEvent) => {
            e.preventDefault();
            // Set flag to ignore observer during scroll
            isScrolling = true;
            state.activeId = id;
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Update URL hash without triggering scroll
                history.pushState(null, '', `#${id}`);
                // Re-enable observer after scroll completes
                setTimeout(() => {
                    isScrolling = false;
                }, 500);
            } else {
                isScrolling = false;
            }
        };
        
        return (
            <nav class="toc-nav">
                <div class="toc-title mono">On this page</div>
                <ul>
                    {headings.map((heading, idx) => {
                        const isActive = currentActiveId === heading.id;

                        return (
                            <li key={idx}>
                                <a
                                    href={`#${heading.id}`}
                                    onClick={(e: MouseEvent) => handleClick(heading.id, e)}
                                    class={`toc-link${heading.level > 2 ? ' toc-link-sub' : ''}`}
                                    data-active={String(isActive)}
                                >
                                    {heading.text}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        );
    };
});
