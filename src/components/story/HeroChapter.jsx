import { ArrowDown, Sparkles, Terminal } from 'lucide-react';

export default function HeroChapter() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-4 sm:px-6 lg:px-8 z-10 pointer-events-none"
    >
      {/* Top Studio HUD Telemetry */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="pointer-events-auto inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-studio-forest/80 border border-studio-panelBorder text-xs font-mono text-studio-mint backdrop-blur-md shadow-glow-subtle">
          <span className="w-2 h-2 rounded-full bg-studio-lime animate-pulse" />
          <span className="text-studio-text tracking-widest font-semibold">RUFNIX STUDIO</span>
          <span className="text-studio-muted">/</span>
          <span className="text-studio-secondary">CREATIVE TECHNOLOGY LAB</span>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-xs font-mono text-studio-muted">
          <span className="text-studio-emerald font-bold">&bull;</span>
          <span>Parametric WebGL Universe Active</span>
          <span className="text-studio-muted">[60 FPS Engine]</span>
        </div>
      </div>

      {/* Center Kinetic Headline & Narrative */}
      <div className="max-w-7xl mx-auto w-full my-auto py-12">
        <div className="max-w-4xl space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-studio-forest/60 border border-studio-emerald/40 text-[11px] font-mono font-bold text-studio-lime backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-studio-lime" />
            <span>ENGINEERED BY IMAGINATION</span>
          </div>

          <div className="space-y-1">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter uppercase font-sans text-studio-text leading-[0.92]">
              WE BUILD
            </h1>
            <h2 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter uppercase font-sans leading-[0.92]">
              <span className="bg-gradient-to-r from-studio-emerald via-studio-mint to-studio-lime bg-clip-text text-transparent drop-shadow-[0_0_45px_rgba(0,230,118,0.45)]">
                WHAT&apos;S NEXT.
              </span>
            </h2>
          </div>

          <p className="text-base sm:text-lg lg:text-xl text-studio-secondary font-mono max-w-2xl leading-relaxed">
            Two minds. One vision. An independent software engineering studio crafting thoughtful digital experiences, robust architectures, and future-ready web systems.
          </p>

          {/* Action Row */}
          <div className="pointer-events-auto flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#projects"
              className="px-7 py-3.5 rounded-full text-xs font-mono font-bold text-studio-black bg-gradient-to-r from-studio-emerald to-studio-lime hover:shadow-glow-emerald transition-all transform hover:-translate-y-0.5"
            >
              EXPLORE WORK
            </a>
            <a
              href="#contact"
              className="px-7 py-3.5 rounded-full text-xs font-mono font-semibold text-studio-text bg-studio-forest/80 border border-studio-panelBorder hover:border-studio-lime hover:bg-studio-panel transition-all"
            >
              START A PROJECT &rarr;
            </a>
          </div>

        </div>
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-xs font-mono text-studio-muted border-t border-studio-panelBorder/40 pt-4">
        <div className="flex items-center gap-2 text-studio-secondary">
          <Terminal className="w-3.5 h-3.5 text-studio-emerald" />
          <span>Rumana Khan &amp; Sayyeda Farnaaz &mdash; Software Developers</span>
        </div>

        <a
          href="#evolution"
          className="pointer-events-auto flex items-center gap-2 text-studio-lime hover:text-studio-mint transition-colors group"
        >
          <span>SCROLL TO ENTER DIGITAL UNIVERSE</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
        </a>
      </div>
    </section>
  );
}
