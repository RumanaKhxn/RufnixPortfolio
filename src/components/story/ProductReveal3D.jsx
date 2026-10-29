import { studioData } from '../../data/portfolioData';
import { Instagram, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function ProductReveal3D() {
  const { instagram, projects } = studioData;
  const frProduct = projects.find(p => p.id === 'fr-studio');

  if (!frProduct) return null;

  return (
    <section
      id="featured"
      className="relative min-h-screen py-32 px-4 sm:px-6 lg:px-8 z-10 pointer-events-none flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Product Story */}
        <div className="lg:col-span-6 pointer-events-auto space-y-6">
          
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-studio-forest/90 border border-studio-emerald/50 text-xs font-mono text-studio-lime backdrop-blur-md shadow-glow-subtle">
              <span className="w-2 h-2 rounded-full bg-studio-lime animate-ping" />
              <span>SCENE E // FEATURED PRODUCT REVEAL</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-studio-text uppercase font-sans leading-[1.05]">
              SOMETHING BIG IS <br />
              <span className="bg-gradient-to-r from-studio-emerald via-studio-mint to-studio-lime bg-clip-text text-transparent">
                IN DEVELOPMENT.
              </span>
            </h2>

            <p className="text-base sm:text-lg font-mono text-studio-secondary leading-relaxed">
              Introducing <span className="text-studio-text font-bold">F&R Studio</span> — a dedicated software platform built to modernize multi-tenant salon management, verify advance booking deposits, and eliminate scheduling friction.
            </p>
          </div>

          {/* Status & Highlights */}
          <div className="space-y-3 pt-2">
            <div className="inline-block px-3 py-1 rounded-md bg-studio-forest border border-studio-panelBorder text-xs font-mono text-studio-mint">
              Status: <span className="text-studio-lime font-bold">Currently in Development</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {frProduct.highlights.map((item) => (
                <div
                  key={item}
                  className="p-3 rounded-xl bg-studio-charcoal/80 border border-studio-panelBorder flex items-center gap-2.5 text-xs font-mono text-studio-text"
                >
                  <ShieldCheck className="w-4 h-4 text-studio-emerald flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA & Instagram Link */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full text-xs font-mono font-bold text-studio-black bg-gradient-to-r from-studio-emerald to-studio-lime shadow-glow-emerald hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              <Instagram className="w-4 h-4" />
              <span>FOLLOW OUR JOURNEY</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <span className="text-xs font-mono text-studio-muted text-center sm:text-left">
              Follow @rufnix.studio for milestone releases
            </span>
          </div>

        </div>

        {/* Right Column: Architectural Telemetry HUD */}
        <div className="lg:col-span-6 pointer-events-auto">
          <div className="rounded-3xl bg-studio-charcoal/90 backdrop-blur-xl border-2 border-studio-panelBorder p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-studio-panelBorder">
              <span className="text-xs font-mono font-bold text-studio-lime">
                F&R STUDIO // DIMENSIONAL SYSTEM
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-studio-forest text-studio-mint">
                Active Three.js Display
              </span>
            </div>

            <div className="p-4 rounded-xl bg-studio-black/80 border border-studio-panelBorder font-mono text-xs text-studio-secondary space-y-2">
              <div className="text-studio-muted">// System Architecture Specification</div>
              <div><span className="text-studio-lime">platform</span>: &ldquo;F&R Luxury Salon Ecosystem&rdquo;;</div>
              <div><span className="text-studio-lime">runtime</span>: &ldquo;React SPA + ASP.NET Core API&rdquo;;</div>
              <div><span className="text-studio-lime">database</span>: &ldquo;Microsoft SQL Server Multi-Tenant&rdquo;;</div>
              <div><span className="text-studio-lime">telemetry</span>: &ldquo;Deposit Escrow & Stylist Calendars&rdquo;;</div>
            </div>

            <p className="text-xs font-mono text-studio-muted">
              Observe the persistent 3D canvas behind this panel: the volumetric device chassis coordinates perspective rotation with your pointer movement.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
