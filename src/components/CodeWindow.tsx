/**
 * CodeWindow - macOS-style code block wrapper
 *
 * Wraps code blocks with a fancy window header including
 * traffic light buttons and optional filename.
 *
 * When `live` prop is true, shows an accent "Run" button that
 * opens the Live Playground (Monaco editor + interactive preview +
 * console — see components/Playground.tsx). The code is extracted
 * from the slot content automatically.
 */

import { component, signal, type Define } from 'sigx';
import { initRuntime, initRegisteredModules, isRuntimeInitialized } from '@sigx/live-code';
import { Playground } from '@/components/Playground';

type CodeWindowProps = 
    & Define.Prop<'filename', string, false>
    & Define.Prop<'language', string, false>
    & Define.Prop<'live', boolean, false>  // When true, enables "Try Live" button
    & Define.Slot<'default'>;

/**
 * Get a nice display name for common languages
 */
function getLanguageLabel(lang?: string): string {
    const labels: Record<string, string> = {
        'tsx': 'TypeScript React',
        'jsx': 'JavaScript React',
        'ts': 'TypeScript',
        'typescript': 'TypeScript',
        'js': 'JavaScript',
        'javascript': 'JavaScript',
        'css': 'CSS',
        'html': 'HTML',
        'json': 'JSON',
        'bash': 'Terminal',
        'shell': 'Terminal',
        'sh': 'Terminal',
        'md': 'Markdown',
        'markdown': 'Markdown',
        'python': 'Python',
        'py': 'Python',
        'rust': 'Rust',
        'go': 'Go',
    };
    return labels[lang?.toLowerCase() ?? ''] ?? lang?.toUpperCase() ?? '';
}

export const CodeWindow = component<CodeWindowProps>(({ props, slots }) => {
    const isModalOpen = signal(false);
    const extractedCode = signal('');
    let contentRef: HTMLElement | null = null;
    
    function extractCodeFromSlot() {
        if (!contentRef) return '';
        // Find the code element inside the slot (Shiki renders pre > code)
        const codeEl = contentRef.querySelector('code');
        if (codeEl) {
            return codeEl.textContent ?? '';
        }
        // Fallback to pre content
        const preEl = contentRef.querySelector('pre');
        if (preEl) {
            return preEl.textContent ?? '';
        }
        return '';
    }
    
    async function openPlayground() {
        // Extract code from the rendered slot
        extractedCode.value = extractCodeFromSlot();

        // Ensure runtime is initialized (includes DaisyUI for component examples)
        if (!isRuntimeInitialized()) {
            initRuntime();
        }
        // Expose the modules registered in live-code-config (DaisyUI, router,
        // store) on `window.__SIGX_*__`. We use the registered loaders (static
        // bundled imports) rather than initDaisyUIRuntime()'s runtime dynamic
        // import, which silently fails to resolve the package.
        await initRegisteredModules();
        isModalOpen.value = true;
    }
    
    function closePlayground() {
        isModalOpen.value = false;
    }
    
    return () => {
        const filename = props.filename;
        const langLabel = getLanguageLabel(props.language);
        const hasLiveCode = !!props.live;
        
        return (
            <>
                <div class="code-window">
                    {/* Window header with traffic lights */}
                    <div class="code-window-header">
                        <div class="code-window-header-left">
                            <div class="code-window-dots">
                                <span class="code-window-dot dot-red" />
                                <span class="code-window-dot dot-yellow" />
                                <span class="code-window-dot dot-green" />
                            </div>
                            
                            {filename && (
                                <span class="code-window-filename">{filename}</span>
                            )}
                            
                            {!filename && langLabel && (
                                <span class="code-window-lang">{langLabel}</span>
                            )}
                        </div>
                        
                        {/* Run button - only shown when live prop is true */}
                        {hasLiveCode && (
                            <button
                                class="code-window-try-live"
                                onClick={openPlayground}
                                title="Open in Live Playground"
                            >
                                ⚡ Run
                            </button>
                        )}
                    </div>
                    
                    {/* Code content */}
                    <div 
                        class="code-window-content"
                        ref={(el: HTMLElement) => { contentRef = el; }}
                    >
                        {slots.default?.()}
                    </div>
                </div>
                
                {/* Live Playground - only rendered when live mode and open */}
                {hasLiveCode && isModalOpen.value && (
                    <Playground
                        code={extractedCode.value}
                        language={props.language ?? 'tsx'}
                        filename={filename}
                        onClose={closePlayground}
                    />
                )}
            </>
        );
    };
});

export default CodeWindow;
