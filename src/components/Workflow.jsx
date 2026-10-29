import { studioData } from '../data/portfolioData';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function Workflow() {
  const { workflow } = studioData;

  return (
    <section id="workflow" className="relative py-24 sm:py-32 bg-studio-black overflow-hidden border-t border-studio-panelBorder">
      {/* Background Ambience */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-studio-emerald/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-dot-pattern opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-studio-forest/80 border border-studio-panelBorder text-xs font-mono text-studio-mint">
            <span className="text-studio-emerald">01-05</span>
            <span>ENGINEERING PIPELINE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-studio-text uppercase font-sans">
            OUR <span className="bg-gradient-to-r from-studio-emerald to-studio-lime bg-clip-text text-transparent">WORKFLOW.</span>
          </h2>

          <p className="text-base sm:text-lg text-studio-secondary max-w-2xl font-mono">
            A structured, repeatable development cycle ensuring quality from conceptual requirements to final release.
          </p>
        </div>

        {/* Steps Container with Connecting Circuit Line */}
        <div className="relative">
          
          {/* Glowing Green Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-studio-emerald via-studio-lime to-studio-emerald opacity-30 transform -translate-y-8 pointer-events-none shadow-glow-emerald" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {workflow.map((item, idx) => (
              <div
                key={item.step}
                className="group relative rounded-2xl bg-studio-charcoal/90 border border-studio-panelBorder p-6 transition-all duration-300 hover:border-studio-emerald/50 hover:bg-studio-forest/40 hover:shadow-glow-emerald flex flex-col justify-between"
              >
                {/* Node Pill */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-studio-forest border border-studio-panelBorder flex items-center justify-center font-mono text-sm font-bold text-studio-lime group-hover:border-studio-emerald group-hover:text-studio-mint transition-colors shadow-glow-subtle">
                    {item.step}
                  </div>
                  <span className="text-[10px] font-mono text-studio-muted">
                    STAGE 0{idx + 1}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="text-[10px] font-mono font-bold text-studio-emerald uppercase tracking-wider">
                    {item.subtitle}
                  </div>
                  <h3 className="text-xl font-bold font-sans text-studio-text group-hover:text-studio-mint transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono text-studio-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-studio-panelBorder flex items-center gap-1.5 text-[10px] font-mono text-studio-muted group-hover:text-studio-lime transition-colors">
                  <CheckCircle2 className="w-3.5 h-3.5 text-studio-emerald" />
                  <span>Quality Assured</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
