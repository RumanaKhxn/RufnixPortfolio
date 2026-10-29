import { studioData } from '../data/portfolioData';
import { Sparkles, ArrowUpRight, Instagram, Layers, ShieldCheck, Calendar, Lock } from 'lucide-react';

export default function FeaturedProduct() {
  const { projects, instagram } = studioData;
  const frProduct = projects.find(p => p.id === 'fr-studio');

  if (!frProduct) return null;

  return (
    <section id="featured" className="relative py-28 sm:py-36 bg-gradient-to-b from-studio-black via-studio-forest/30 to-studio-black overflow-hidden border-t border-studio-panelBorder">
      {/* Volumetric Green Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[30rem] bg-studio-emerald/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-studio-lime/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-studio-forest/90 border border-studio-emerald/40 text-xs font-mono text-studio-lime shadow-glow-subtle">
            <span className="w-2 h-2 rounded-full bg-studio-lime animate-ping" />
            <span>FEATURED PRODUCT SHOWCASE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-studio-text uppercase font-sans">
            SOMETHING BIG IS <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-studio-emerald via-studio-mint to-studio-lime bg-clip-text text-transparent">
              IN DEVELOPMENT.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-studio-secondary font-mono leading-relaxed">
            Introducing <span className="text-studio-text font-bold">F&R Studio</span> — a dedicated software product engineered by Rufnix Studio to modernize multi-tenant salon operations, schedule coordination, and advance deposit verification.
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-studio-forest border border-studio-panelBorder text-xs font-mono text-studio-mint">
            <span className="text-studio-lime font-bold">●</span>
            <span>Status: Currently in Development</span>
          </div>
        </div>

        {/* 3D Showcase Container */}
        <div className="relative rounded-3xl bg-studio-charcoal/90 border-2 border-studio-panelBorder/80 p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden group hover:border-studio-emerald/40 transition-all duration-500">
          
          {/* Subtle Grid Backdrop */}
          <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Product Information & Architecture */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="space-y-2">
                <div className="text-xs font-mono font-bold text-studio-emerald uppercase tracking-wider">
                  Product Architecture
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-sans text-studio-text">
                  F&R Studio
                </h3>
                <p className="text-sm font-mono text-studio-secondary leading-relaxed">
                  {frProduct.description}
                </p>
              </div>

              {/* Verified Product Highlights */}
              <div className="space-y-3 pt-2">
                {frProduct.highlights.map((highlight) => (
                  <div key={highlight} className="flex items-start gap-3 p-3 rounded-xl bg-studio-forest/50 border border-studio-panelBorder">
                    <div className="p-1 rounded-md bg-studio-charcoal text-studio-lime">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono text-studio-text">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stack Pills */}
              <div>
                <div className="text-[11px] font-mono text-studio-muted mb-2">ENGINEERED WITH</div>
                <div className="flex flex-wrap gap-2">
                  {frProduct.stack.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-studio-forest border border-studio-panelBorder text-studio-mint"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA to Follow Journey on Instagram */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full text-xs font-mono font-bold text-studio-black bg-gradient-to-r from-studio-emerald to-studio-lime shadow-glow-emerald hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  <Instagram className="w-4 h-4" />
                  <span>FOLLOW OUR JOURNEY</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <span className="text-[11px] font-mono text-studio-muted text-center sm:text-left">
                  Development updates posted on @rufnix.studio
                </span>
              </div>

            </div>

            {/* Right: Floating Product Interface Mockup Frame */}
            <div className="lg:col-span-7 relative">
              
              {/* Luminous Glow Frame */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-studio-emerald/30 bg-studio-black shadow-glow-emerald group-hover:border-studio-lime/50 transition-colors duration-500">
                
                {/* Browser-like HUD Bar */}
                <div className="px-4 py-2.5 bg-studio-charcoal flex items-center justify-between border-b border-studio-panelBorder">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-studio-emerald" />
                    <span className="ml-2 text-xs font-mono text-studio-secondary font-medium">
                      fr-beauty-studio.preview.internal
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-studio-emerald/20 text-studio-lime border border-studio-lime/30">
                    IN DEVELOPMENT
                  </span>
                </div>

                {/* Genuine Product Screenshot */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-studio-forest">
                  <img
                    src={frProduct.image}
                    alt="F&R Studio Preview Interface"
                    className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Subtle Dark Gradient Overlay at base */}
                  <div className="absolute inset-0 bg-gradient-to-t from-studio-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Mini Live Status Overlay */}
                <div className="p-3 bg-studio-charcoal/95 border-t border-studio-panelBorder flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                  <div className="flex items-center gap-2 text-studio-mint">
                    <span className="w-2 h-2 rounded-full bg-studio-emerald animate-pulse" />
                    <span>Multi-Tenant Architecture Active</span>
                  </div>
                  <div className="text-studio-muted">
                    .NET Backend + React SPA
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
