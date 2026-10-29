import { Sparkles, Terminal, Code2, Layers, Cpu } from 'lucide-react';

export default function EvolutionChapter() {
  return (
    <section
      id="evolution"
      className="relative min-h-screen py-36 px-4 sm:px-6 lg:px-8 z-10 pointer-events-none flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Big Editorial Statement */}
        <div className="lg:col-span-7 pointer-events-auto space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-studio-forest/80 border border-studio-panelBorder text-xs font-mono text-studio-mint backdrop-blur-md">
            <span className="text-studio-emerald">01</span>
            <span>/ DIGITAL EVOLUTION</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-studio-text uppercase font-sans leading-[1.0]">
            TWO MINDS. <br />
            <span className="bg-gradient-to-r from-studio-emerald via-studio-mint to-studio-lime bg-clip-text text-transparent">
              ONE VISION.
            </span>
          </h2>

          <p className="text-base sm:text-lg lg:text-xl font-mono text-studio-secondary max-w-xl leading-relaxed">
            Rufnix Studio was founded by <span className="text-studio-text font-bold">Rumana Khan</span> and <span className="text-studio-text font-bold">Sayyeda Farnaaz</span> with a clear conviction: to engineer software that merges technical rigor with imaginative design.
          </p>

          <p className="text-xs sm:text-sm font-mono text-studio-muted max-w-lg leading-relaxed">
            We don&apos;t build repetitive templates or generic SaaS clones. We architect custom, high-speed digital products and database-driven applications built to solve genuine operational challenges.
          </p>

        </div>

        {/* Right Column: Editorial Telemetry Matrix */}
        <div className="lg:col-span-5 pointer-events-auto space-y-4">
          
          <div className="rounded-3xl bg-studio-charcoal/90 backdrop-blur-xl border border-studio-panelBorder p-6 sm:p-8 space-y-5 shadow-2xl">
            
            <div className="flex items-center justify-between pb-3 border-b border-studio-panelBorder">
              <span className="text-xs font-mono font-bold text-studio-lime">STUDIO MANIFESTO</span>
              <span className="text-[10px] font-mono text-studio-muted">SYS // 2026</span>
            </div>

            <div className="space-y-4 text-xs font-mono text-studio-secondary leading-relaxed">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-studio-emerald mt-1.5 flex-shrink-0" />
                <p>
                  <strong className="text-studio-text">Direct Engineering:</strong> No layers of middle management. You collaborate directly with the engineers writing every line of code.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-studio-lime mt-1.5 flex-shrink-0" />
                <p>
                  <strong className="text-studio-text">Modern Performance:</strong> Built with production-grade frameworks &mdash; React, ASP.NET Core, Node.js, and SQL Server.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-studio-mint mt-1.5 flex-shrink-0" />
                <p>
                  <strong className="text-studio-text">Cinematic Polish:</strong> Fluid, purposeful interaction that elevates your brand beyond ordinary competitors.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-studio-panelBorder flex items-center justify-between text-[11px] font-mono text-studio-muted">
              <span>Rufnix Studio Engine</span>
              <span className="text-studio-emerald font-semibold">&bull; Active Evolution</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
