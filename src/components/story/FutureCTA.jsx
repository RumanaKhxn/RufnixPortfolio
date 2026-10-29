import { ArrowDown, Sparkles } from 'lucide-react';

export default function FutureCTA() {
  return (
    <section
      id="future"
      className="relative min-h-screen py-32 px-4 sm:px-6 lg:px-8 z-10 pointer-events-none flex items-center justify-center text-center"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="pointer-events-auto inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-studio-forest/90 border border-studio-panelBorder text-xs font-mono text-studio-lime shadow-glow-subtle backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>SCENE F // CULMINATION</span>
        </div>

        <div className="space-y-4">
          <p className="text-xs sm:text-sm font-mono font-bold tracking-widest text-studio-lime uppercase">
            ENGINEERED BY IMAGINATION.
          </p>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-studio-text uppercase font-sans leading-[1.0]">
            BUILDING <br />
            <span className="bg-gradient-to-r from-studio-emerald via-studio-mint to-studio-lime bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,230,118,0.5)]">
              WHAT&apos;S NEXT.
            </span>
          </h2>

          <p className="text-base sm:text-xl font-mono text-studio-secondary max-w-2xl mx-auto leading-relaxed">
            &ldquo;Two minds. One vision.&rdquo; From high-performance web applications to complex software products, we translate ideas into reality.
          </p>
        </div>

        <div className="pointer-events-auto pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="px-8 py-4 rounded-full font-mono text-sm font-bold text-studio-black bg-gradient-to-r from-studio-emerald via-studio-mint to-studio-lime hover:shadow-glow-emerald transition-all transform hover:-translate-y-1"
          >
            LET&apos;S BUILD TOGETHER
          </a>

          <a
            href="#hero"
            className="px-6 py-4 rounded-full font-mono text-xs font-semibold text-studio-text bg-studio-forest/80 border border-studio-panelBorder hover:border-studio-lime transition-all"
          >
            RETURN TO ORBIT
          </a>
        </div>

      </div>
    </section>
  );
}
