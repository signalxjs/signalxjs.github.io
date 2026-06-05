import { component } from 'sigx';
import { Button } from '@sigx/daisyui';
import { RouterLink } from '@sigx/router';
import { Typewriter } from '@/components/effects/Typewriter';
import { ScrollReveal } from '@/components/effects/ScrollReveal';

const heroWords = ['Reactive', 'Blazing Fast', 'Lightweight', 'Modern', 'Powerful'];

/**
 * Hero section with animated gradient, tagline, and CTAs
 */
export const HeroSection = component(({ signal }) => {
    const state = signal({ copied: false });
    
    const copyInstallCommand = async () => {
        await navigator.clipboard.writeText('npm create @sigx@latest');
        state.copied = true;
        setTimeout(() => state.copied = false, 2000);
    };

    return () => (
        <section class="relative min-h-screen flex items-center justify-center pt-8 pb-20 px-4">
            {/* Enhanced floating decorative elements with better animations */}
            <div class="absolute top-20 left-10 w-24 h-24 bg-gradient-to-br from-primary/40 to-secondary/20 rounded-2xl rotate-12 animate-float-1 blur-sm" />
            <div class="absolute bottom-32 right-20 w-20 h-20 bg-gradient-to-br from-secondary/40 to-accent/20 rounded-full animate-float-2 blur-sm" />
            <div class="absolute top-40 right-32 w-16 h-16 bg-gradient-to-br from-accent/40 to-primary/20 rounded-xl -rotate-12 animate-float-3 blur-sm" />
            <div class="absolute top-1/3 left-1/4 w-12 h-12 bg-primary/30 rounded-full animate-float-2" />
            <div class="absolute bottom-1/4 right-1/3 w-14 h-14 bg-secondary/30 rounded-lg rotate-45 animate-float-1" />
            
            <div class="max-w-6xl mx-auto text-center relative z-10">
                {/* Logo */}
                <ScrollReveal animation="fade-up" delay={0}>
                    <img
                        src={`${import.meta.env.BASE_URL}sigx.png`}
                        alt="SignalX"
                        width={150}
                        height={119}
                        class="mx-auto mb-6 h-32 w-auto md:h-40 lg:h-48 drop-shadow-[0_0_40px_rgba(99,102,241,0.35)]"
                        loading="eager"
                        decoding="async"
                    />
                </ScrollReveal>

                {/* Main headline with enhanced styling */}
                <ScrollReveal animation="zoom" delay={100}>
                    <h1 class="hero-headline text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight">
                        <span class="text-gradient">Signal</span>
                        <span class="text-base-content/40 font-semibold inline-block -translate-y-[0.07em]">(</span>
                        <span class="text-base-content">X</span>
                        <span class="text-base-content/40 font-semibold inline-block -translate-y-[0.07em]">)</span>
                    </h1>
                </ScrollReveal>
                
                {/* Typewriter subtitle */}
                <ScrollReveal animation="fade-up" delay={200}>
                    <p class="text-xl md:text-2xl lg:text-3xl text-base-content/70 mb-4 font-medium">
                        The{' '}
                        <Typewriter
                            words={heroWords}
                            class="text-gradient font-bold"
                            typingSpeed={80}
                            deletingSpeed={40}
                            pauseDuration={2500}
                        />
                        {' '}App Framework
                    </p>
                </ScrollReveal>

                {/* Description */}
                <ScrollReveal animation="fade-up" delay={300}>
                    <p class="text-lg md:text-xl text-base-content/50 max-w-3xl mx-auto mb-12 leading-relaxed">
                        Build blazing-fast applications with fine-grained reactivity,
                        minimal bundle size, and an intuitive developer experience.
                        <span class="text-primary font-semibold"> Pure signals. Pure performance.</span>
                    </p>
                </ScrollReveal>

                {/* CTA buttons with enhanced glow */}
                <ScrollReveal animation="fade-up" delay={400}>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                        <RouterLink to="/core/docs/getting-started">
                            <Button 
                                variant="primary" 
                                size="lg" 
                                class="px-8 py-4 text-lg font-semibold glow-primary-intense hover:scale-105 transition-transform"
                            >
                                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                Get Started
                            </Button>
                        </RouterLink>
                        
                        <a href="https://github.com/signalxjs/core" target="_blank" rel="noopener">
                            <Button
                                outline
                                size="lg"
                                class="px-8 py-4 text-lg font-semibold hover:bg-base-content/10 hover:scale-105 transition-all"
                            >
                                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                </svg>
                                View on GitHub
                            </Button>
                        </a>
                    </div>
                </ScrollReveal>
                
                {/* Install command with gradient border */}
                <ScrollReveal animation="fade-up" delay={500}>
                    <div class="flex justify-center">
                        <div 
                            class="gradient-border glass-effect rounded-xl px-6 py-4 flex items-center gap-4 cursor-pointer hover:scale-105 transition-transform"
                            onClick={copyInstallCommand}
                        >
                            <code class="text-lg font-mono text-base-content">
                                <span class="text-accent">npm</span> create @sigx@latest
                            </code>
                            <button class="text-base-content/50 hover:text-base-content transition-colors">
                                {state.copied ? (
                                    <svg class="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </ScrollReveal>
                
                {/* Scroll indicator */}
                <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <svg class="w-6 h-6 text-base-content/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>
        </section>
    );
});
