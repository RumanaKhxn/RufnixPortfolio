import { useState } from 'react';
import { studioData } from '../../data/portfolioData';
import StudioDeviceFrame from '../ui/StudioDeviceFrame';
import ScreenshotLightbox from '../ui/ScreenshotLightbox';
import { Sparkles, ShieldCheck, ChevronRight, ArrowUpRight, Maximize2, Code2, Eye } from 'lucide-react';

export default function ProjectGalleryChapter({ activeProjectId, onSelectProject }) {
  const { projects } = studioData;
  const [viewMode, setViewMode] = useState('ui');
  const [lightboxProject, setLightboxProject] = useState(null);

  // Spotlighting genuine screenshot-backed projects in premier 3D gallery
  const premierProjects = projects.filter((p) => p.hasGenuineImage);
  const activeProject = premierProjects.find((p) => p.id === activeProjectId) || premierProjects[0];

  // Exact native aspect ratios audited from files:
  // fr-beauty-studio: 1024/491 = 2.09
  // lifepilot: 1024/486 = 2.11
  // bytemind: 1024/543 = 1.89
  const getAspectRatio = (id) => {
    switch (id) {
      case 'fr-studio': return '2.09/1';
      case 'lifepilot': return '2.11/1';
      case 'bytemind': return '1.89/1';
      default: return '16/9';
    }
  };

  const getHostname = (id) => {
    switch (id) {
      case 'fr-studio': return 'fr-studio.rufnix.internal';
      case 'lifepilot': return 'lifepilot.workspace';
      case 'bytemind': return 'bytemind.ai/chat';
      default: return 'rufnix.studio';
    }
  };

  return (
    <section
      id="projects"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 z-10 scroll-mt-24 sm:scroll-mt-28 lg:scroll-mt-32"
    >
      <div className="max-w-7xl mx-auto w-full space-y-8 sm:space-y-10">
        
        {/* 1. SECTION HEADER (Clear offset, never hidden under navbar) */}
        <div className="max-w-3xl space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-studio-forest/90 border border-studio-panelBorder text-xs font-mono text-studio-mint backdrop-blur-md shadow-glow-subtle">
            <span className="w-2 h-2 rounded-full bg-studio-lime animate-pulse" />
            <span className="text-studio-emerald font-semibold">04</span>
            <span>/ FEATURED SOFTWARE PRODUCTS</span>
          </div>

          <h2 className="text-[clamp(1.85rem,4.5vw,3.75rem)] font-black tracking-tight text-studio-text uppercase font-sans leading-[1.05]">
            CRAFTED FOR <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-studio-emerald via-studio-mint to-studio-lime bg-clip-text text-transparent">
              HIGH IMPACT.
            </span>
          </h2>

          <p className="text-[clamp(0.8125rem,1.1vw,1rem)] font-mono text-studio-secondary leading-relaxed max-w-2xl">
            Two minds. One vision. Explore our core software architectures with verified production code, genuine interface screenshots, and modern technology stacks.
          </p>
        </div>

        {/* 2. INTERACTIVE PROJECT SELECTOR TABS (Seamless switching, zero truncation on any viewport) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {premierProjects.map((proj, idx) => {
            const isSelected = proj.id === activeProject.id;
            return (
              <button
                key={proj.id}
                type="button"
                onClick={() => onSelectProject(proj.id)}
                className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between group ${
                  isSelected
                    ? 'bg-studio-forest/90 border-studio-lime shadow-glow-emerald scale-[1.01]'
                    : 'bg-studio-charcoal/80 border-studio-panelBorder hover:border-studio-emerald/50 hover:bg-studio-forest/40'
                }`}
                aria-pressed={isSelected}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-mono text-xs font-bold flex-shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-studio-black text-studio-lime border border-studio-lime/40'
                        : 'bg-studio-forest text-studio-muted'
                    }`}
                  >
                    0{idx + 1}
                  </div>
                  <div className="min-w-0">
                    <div
                      className={`text-xs sm:text-sm font-mono font-bold whitespace-nowrap transition-colors ${
                        isSelected ? 'text-studio-text' : 'text-studio-secondary group-hover:text-studio-text'
                      }`}
                    >
                      {proj.title}
                    </div>
                    <div className="text-[10px] sm:text-[11px] font-mono text-studio-muted flex items-center gap-1.5 mt-0.5">
                      <span className="truncate">{proj.category}</span>
                      <span className="text-studio-muted">&bull;</span>
                      <span
                        className={`font-semibold whitespace-nowrap ${
                          proj.status === 'In Development' ? 'text-studio-lime' : 'text-studio-mint'
                        }`}
                      >
                        {proj.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-studio-lime translate-x-0.5' : 'text-studio-muted group-hover:translate-x-0.5'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* 3. SHOWCASE STAGE (Balanced Visual Preview & Architecture Dossier) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column: Titanium Studio Device Frame (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-3">
            <StudioDeviceFrame
              src={activeProject.image}
              alt={activeProject.title}
              title={activeProject.title}
              hostname={getHostname(activeProject.id)}
              status={activeProject.status}
              aspectRatio={getAspectRatio(activeProject.id)}
              codeSnippet={activeProject.codeSnippet}
              viewMode={viewMode}
              onToggleView={() => setViewMode(viewMode === 'ui' ? 'code' : 'ui')}
              onInspect={() => setLightboxProject(activeProject)}
              primaryAction={activeProject.primaryAction}
            />

            {/* Helper Pill Below Preview */}
            <div className="p-3 rounded-xl bg-studio-forest/30 border border-studio-panelBorder text-[11px] font-mono text-studio-muted flex flex-wrap items-center justify-between gap-2">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-studio-lime flex-shrink-0" />
                <span>Click image to open uncropped full-resolution lightbox</span>
              </span>
              <button
                type="button"
                onClick={() => setLightboxProject(activeProject)}
                className="inline-flex items-center gap-1 text-studio-lime hover:underline font-bold"
              >
                <span>Inspect Fullscreen</span>
                <Maximize2 className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Right Column: Project Architecture Dossier (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl sm:rounded-3xl bg-studio-charcoal/90 border border-studio-panelBorder p-5 sm:p-6 lg:p-7 space-y-5 shadow-2xl backdrop-blur-xl">
              
              {/* Dossier Header & Primary Action Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-studio-panelBorder">
                <div className="min-w-0">
                  <h3 className="text-[clamp(1.35rem,2.5vw,1.875rem)] font-black font-sans text-studio-text tracking-tight">
                    {activeProject.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-mono text-studio-lime font-bold">
                      {activeProject.category}
                    </span>
                    <span className="text-studio-muted">&bull;</span>
                    <span className="text-[11px] font-mono text-studio-mint">
                      {activeProject.status}
                    </span>
                  </div>
                </div>

                {activeProject.primaryAction && activeProject.primaryAction.url && (
                  <a
                    href={activeProject.primaryAction.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold text-studio-black bg-gradient-to-r from-studio-emerald to-studio-lime shadow-glow-emerald hover:opacity-95 transition-all w-fit flex-shrink-0"
                  >
                    <span>{activeProject.primaryAction.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              {/* Description (Naturally readable, never clipped) */}
              <p className="text-xs sm:text-sm font-mono text-studio-secondary leading-relaxed">
                {activeProject.description}
              </p>

              {/* Verified Feature Highlights (Never truncated, full text preserved) */}
              {activeProject.highlights && (
                <div className="space-y-2 pt-1">
                  <div className="text-[10px] font-mono text-studio-muted uppercase tracking-wider">
                    Core Architectural Capabilities
                  </div>
                  <div className="space-y-2">
                    {activeProject.highlights.map((h) => (
                      <div
                        key={h}
                        className="p-2.5 sm:p-3 rounded-xl bg-studio-forest/50 border border-studio-panelBorder text-xs font-mono text-studio-text flex items-start gap-2.5"
                      >
                        <ShieldCheck className="w-4 h-4 text-studio-emerald flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technology Stack Tags */}
              <div className="space-y-2 pt-1">
                <div className="text-[10px] font-mono text-studio-muted uppercase tracking-wider">
                  Verified Production Stack
                </div>
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  {activeProject.stack.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-studio-forest/80 border border-studio-panelBorder text-studio-mint font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interactive Controls Row */}
              <div className="pt-3 border-t border-studio-panelBorder flex items-center justify-between gap-2 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setViewMode(viewMode === 'ui' ? 'code' : 'ui')}
                  className="px-3 py-1.5 rounded-lg bg-studio-forest border border-studio-panelBorder text-studio-secondary hover:text-studio-lime hover:border-studio-lime transition-all flex items-center gap-1.5 text-[11px]"
                >
                  {viewMode === 'code' ? <Eye className="w-3.5 h-3.5" /> : <Code2 className="w-3.5 h-3.5" />}
                  <span>{viewMode === 'code' ? 'View UI Screenshot' : 'View Code Snippet'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setLightboxProject(activeProject)}
                  className="px-3 py-1.5 rounded-lg bg-studio-forest border border-studio-panelBorder text-studio-secondary hover:text-studio-emerald hover:border-studio-emerald transition-all flex items-center gap-1.5 text-[11px]"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Inspect Fullscreen</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Full-Resolution Modal Lightbox */}
      <ScreenshotLightbox
        isOpen={Boolean(lightboxProject)}
        project={lightboxProject}
        onClose={() => setLightboxProject(null)}
      />
    </section>
  );
}
