import { useState } from 'react';
import { studioData } from '../../data/portfolioData';
import { Eye, Code2, ExternalLink, Sparkles, ShieldCheck, ChevronRight, Layers, ArrowUpRight } from 'lucide-react';

export default function ProjectsOrbit3D({ activeProjectId, onSelectProject }) {
  const { projects } = studioData;
  const [viewMode, setViewMode] = useState('ui'); // 'ui' | 'code'

  // Filter only genuine screenshot-backed projects for the premier 3D gallery
  // Removing the plain list rows for NutriRoute & Umbrella Invoice from this selector
  const premierProjects = projects.filter(p => p.hasGenuineImage);

  const activeProject = premierProjects.find(p => p.id === activeProjectId) || premierProjects[0];

  return (
    <section
      id="projects"
      className="relative min-h-screen py-32 px-4 sm:px-6 lg:px-8 z-10 pointer-events-none flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Premium Project Carousel & Selection HUD */}
        <div className="lg:col-span-5 pointer-events-auto space-y-6">
          
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-studio-forest/90 border border-studio-panelBorder text-xs font-mono text-studio-mint backdrop-blur-md shadow-glow-subtle">
              <span className="w-2 h-2 rounded-full bg-studio-lime animate-pulse" />
              <span className="text-studio-emerald">SCENE D</span>
              <span>// PREMIER PROJECT SHOWCASE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-studio-text uppercase font-sans">
              PROJECTS THAT <br />
              <span className="bg-gradient-to-r from-studio-emerald via-studio-mint to-studio-lime bg-clip-text text-transparent">
                SPEAK.
              </span>
            </h2>

            <p className="text-xs sm:text-sm font-mono text-studio-secondary leading-relaxed">
              Explore our core software architectures. Select any product below to animate its dimensional preview into the foreground.
            </p>
          </div>

          {/* Premium Project Cards Selector (Clean & High-Tech) */}
          <div className="space-y-3">
            {premierProjects.map((proj, idx) => {
              const isSelected = proj.id === activeProject.id;
              return (
                <div
                  key={proj.id}
                  onClick={() => onSelectProject(proj.id)}
                  className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between group ${
                    isSelected
                      ? 'bg-studio-forest/90 border-studio-lime shadow-glow-emerald scale-[1.02]'
                      : 'bg-studio-charcoal/80 border-studio-panelBorder hover:border-studio-emerald/50 hover:bg-studio-forest/40'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono text-xs font-bold transition-colors ${
                      isSelected ? 'bg-studio-black text-studio-lime border border-studio-lime/40' : 'bg-studio-forest text-studio-muted'
                    }`}>
                      0{idx + 1}
                    </div>
                    <div>
                      <div className={`text-sm font-mono font-bold transition-colors ${isSelected ? 'text-studio-text' : 'text-studio-secondary group-hover:text-studio-text'}`}>
                        {proj.title}
                      </div>
                      <div className="text-[11px] font-mono text-studio-muted">
                        {proj.category}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full font-bold border ${
                      proj.status === 'In Development'
                        ? 'bg-studio-lime/10 text-studio-lime border-studio-lime/30'
                        : 'bg-studio-forest text-studio-mint border-studio-emerald/30'
                    }`}>
                      {proj.status}
                    </span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-studio-lime translate-x-0.5' : 'text-studio-muted group-hover:translate-x-0.5'}`} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3.5 rounded-xl bg-studio-forest/30 border border-studio-panelBorder text-[11px] font-mono text-studio-muted flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-studio-lime" />
              <span>Three.js Spatial Raycasting Enabled</span>
            </span>
            <span className="text-studio-emerald font-bold">&bull; Real Screenshots</span>
          </div>

        </div>

        {/* Right Column: Premium Dimensional Device Frame & Inspector */}
        <div className="lg:col-span-7 pointer-events-auto">
          <div className="rounded-3xl bg-studio-charcoal/95 backdrop-blur-xl border-2 border-studio-emerald/40 p-6 sm:p-8 shadow-2xl relative space-y-6 group hover:border-studio-lime/60 transition-colors duration-500">
            
            {/* Custom Browser Titlebar HUD */}
            <div className="flex items-center justify-between pb-4 border-b border-studio-panelBorder">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-studio-emerald" />
                </div>
                <div className="px-3 py-1 rounded-md bg-studio-forest border border-studio-panelBorder text-xs font-mono text-studio-secondary flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-studio-emerald animate-pulse" />
                  <span className="text-studio-text truncate max-w-[180px] sm:max-w-xs">{activeProject.codeFilename}</span>
                </div>
              </div>

              {/* View Toggle */}
              <div className="flex items-center bg-studio-black rounded-lg p-1 border border-studio-panelBorder">
                <button
                  type="button"
                  onClick={() => setViewMode('ui')}
                  className={`px-3 py-1 rounded text-xs font-mono flex items-center gap-1.5 transition-colors ${
                    viewMode === 'ui' ? 'bg-studio-forest text-studio-lime font-bold shadow-glow-subtle' : 'text-studio-muted hover:text-studio-text'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>UI Preview</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('code')}
                  className={`px-3 py-1 rounded text-xs font-mono flex items-center gap-1.5 transition-colors ${
                    viewMode === 'code' ? 'bg-studio-forest text-studio-emerald font-bold shadow-glow-subtle' : 'text-studio-muted hover:text-studio-text'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Code</span>
                </button>
              </div>
            </div>

            {/* High-Resolution Screenshot Frame with Depth Reveal */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-studio-black border-2 border-studio-panelBorder shadow-laptop group-hover:border-studio-emerald/50 transition-all duration-500">
              {viewMode === 'ui' ? (
                <div className="w-full h-full relative overflow-hidden">
                  <img
                    src={activeProject.image}
                    alt={`${activeProject.title} Interface Preview`}
                    className="w-full h-full object-cover object-top hover:scale-[1.03] transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Subtle Cinematic Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-studio-black/60 via-transparent to-transparent pointer-events-none" />
                </div>
              ) : (
                <div className="w-full h-full p-5 bg-[#030805] text-studio-mint font-mono text-xs overflow-auto select-all leading-relaxed">
                  <pre>
                    <code>{activeProject.codeSnippet}</code>
                  </pre>
                </div>
              )}

              {/* Status Chip */}
              <div className="absolute top-3.5 left-3.5 z-10">
                <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold backdrop-blur-md border shadow-lg ${
                  activeProject.status === 'In Development'
                    ? 'bg-studio-charcoal/90 text-studio-lime border-studio-lime/50'
                    : 'bg-studio-charcoal/90 text-studio-emerald border-studio-emerald/50'
                }`}>
                  ● {activeProject.status}
                </span>
              </div>
            </div>

            {/* Project Details Dossier */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold font-sans text-studio-text">
                    {activeProject.title}
                  </h3>
                  <p className="text-xs font-mono text-studio-lime font-semibold">
                    {activeProject.category}
                  </p>
                </div>

                {activeProject.primaryAction && activeProject.primaryAction.url && (
                  <a
                    href={activeProject.primaryAction.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold text-studio-black bg-gradient-to-r from-studio-emerald to-studio-lime shadow-glow-emerald hover:opacity-90 transition-all w-fit"
                  >
                    <span>{activeProject.primaryAction.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <p className="text-xs sm:text-sm font-mono text-studio-secondary leading-relaxed">
                {activeProject.description}
              </p>

              {/* Feature Highlights */}
              {activeProject.highlights && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {activeProject.highlights.map((h) => (
                    <div
                      key={h}
                      className="p-2.5 rounded-xl bg-studio-forest/50 border border-studio-panelBorder text-xs font-mono text-studio-text flex items-center gap-2"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-studio-emerald flex-shrink-0" />
                      <span className="truncate">{h}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Technologies */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono text-studio-muted uppercase mr-1">STACK:</span>
                {activeProject.stack.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded text-xs font-mono bg-studio-forest border border-studio-panelBorder text-studio-mint"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
