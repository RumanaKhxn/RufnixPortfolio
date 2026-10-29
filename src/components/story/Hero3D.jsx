import { ArrowDown, Sparkles, Terminal } from 'lucide-react';

export default function Hero3D() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-4 sm:px-6 lg:px-8 z-10 pointer-events-none"
    >
      {/* Top Monogram Tag */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="pointer-events-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-studio-forest/90 border border-studio-panelBorder text-xs font-mono text-studio-mint backdrop-blur-md shadow-glow-subtle">
          <span className="w-2 h-2 rounded-full bg-studio-lime animate-pulse" />
          <span className="text-studio-text tracking-widest font-semibold">RUFNIX STUDIO</span>
          <span className="text-studio-muted">|</span>
          <span className="text-studio-secondary">IMMERSIVE 3D DIGITAL LAB</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-studio-muted">
          <span className="text-studio-emerald">&lt;</span>
          <span>WebGL 3D Core Active</span>
          <span className="text-studio-emerald">/&gt;</span>
        </div>
      </div>

      {/* Center Kinetic Typography */}
      <div className="max-w-7xl mx-auto w-full my-auto py-12">
        <div className="max-w-3xl space-y-4">
          
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-studio-emerald/10 border border-studio-emerald/30 text-[11px] font-mono font-bold text-studio-lime">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ENGINEERED BY IMAGINATION</span>
          </div>

          <div className="space-y-1">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight uppercase font-sans text-studio-text leading-[0.95]">
              WE BUILD
            </h1>
            <h2 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight uppercase font-sans leading-[0.95]">
              <span className="bg-gradient-to-r from-studio-emerald via-studio-mint to-studio-lime bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(0,230,118,0.5)]">
                DIGITAL
              </span>
            </h2>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight uppercase font-sans text-studio-text leading-[0.95]">
              EXPERIENCES.
            </h2>
          </div>

          <p className="text-sm sm:text-base lg:text-lg text-studio-secondary font-mono max-w-xl leading-relaxed pt-2">
            Two minds. One vision. Building what&apos;s next. We engineer high-performance web applications, scalable software architectures, and immersive digital platforms.
          </p>

          {/* Action Row */}
          <div className="pointer-events-auto flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#projects"
              className="px-6 py-3 rounded-full text-xs font-mono font-bold text-studio-black bg-gradient-to-r from-studio-emerald to-studio-lime hover:shadow-glow-emerald transition-all transform hover:-translate-y-0.5"
            >
              EXPLORE 3D GALLERY
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-full text-xs font-mono font-semibold text-studio-text bg-studio-forest/80 border border-studio-panelBorder hover:border-studio-lime hover:bg-studio-panel transition-all"
            >
              LET&apos;S BUILD TOGETHER
            </a>
          </div>

        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-xs font-mono text-studio-muted border-t border-studio-panelBorder/40 pt-4">
        <div className="flex items-center gap-2 text-studio-secondary">
          <Terminal className="w-3.5 h-3.5 text-studio-emerald" />
          <span>Interactive 3D Universe Loaded</span>
        </div>

        <a
          href="#process"
          className="pointer-events-auto flex items-center gap-2 text-studio-lime hover:text-studio-mint transition-colors group"
        >
          <span>SCROLL TO UNPACK ARCHITECTURE</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
        </a>
      </div>
    </section>
  );
}
