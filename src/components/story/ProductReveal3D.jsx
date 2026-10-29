import { useState } from 'react';
import { studioData } from '../../data/portfolioData';
import StudioDeviceFrame from '../ui/StudioDeviceFrame';
import ScreenshotLightbox from '../ui/ScreenshotLightbox';
import { Instagram, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function ProductReveal3D() {
  const { instagram, projects } = studioData;
  const frProduct = projects.find((p) => p.id === 'fr-studio');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!frProduct) return null;

  return (
    <section
      id="featured"
      className="relative min-h-screen py-32 px-4 sm:px-6 lg:px-8 z-10 pointer-events-none flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Product Story & Strategic Focus */}
        <div className="lg:col-span-5 pointer-events-auto space-y-6">
          
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

        {/* Right Column: High-DPI Studio Device Showcase with Click-to-Zoom */}
        <div className="lg:col-span-7 pointer-events-auto space-y-4">
          
          <StudioDeviceFrame
            src={frProduct.image}
            alt="F&R Studio Luxury Salon Interface"
            title="F&R Studio"
            hostname="fr-beauty-studio.rufnix.internal"
            status="In Development"
            aspectRatio="2.09/1"
            onInspect={() => setIsLightboxOpen(true)}
            primaryAction={{
              label: 'Follow on Instagram',
              url: instagram,
            }}
          />

          {/* Architectural Telemetry Bar */}
          <div className="p-4 rounded-2xl bg-studio-charcoal/90 border border-studio-panelBorder flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-studio-mint">
              <Sparkles className="w-4 h-4 text-studio-lime" />
              <span>Multi-Tenant ASP.NET Core &amp; React Architecture</span>
            </div>
            <div className="text-studio-muted">
              Click screenshot to inspect native 1024px resolution
            </div>
          </div>

        </div>

      </div>

      {/* Mobbin Full-Resolution Lightbox */}
      <ScreenshotLightbox
        isOpen={isLightboxOpen}
        project={frProduct}
        onClose={() => setIsLightboxOpen(false)}
      />
    </section>
  );
}
