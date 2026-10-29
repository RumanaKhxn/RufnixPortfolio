import { useEffect, useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, ExternalLink, ShieldCheck } from 'lucide-react';

export default function ScreenshotLightbox({ isOpen, onClose, project }) {
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    if (!isOpen) return;

    // Reset zoom when opened
    setZoomLevel(1);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      className="fixed inset-0 z-50 flex flex-col bg-studio-black/95 backdrop-blur-2xl animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Lightbox Top Header */}
      <div className="px-6 py-4 bg-studio-charcoal/90 border-b border-studio-panelBorder flex items-center justify-between gap-4 z-10">
        
        {/* Project Title & Category */}
        <div className="flex items-center gap-3">
          <div>
            <h3 id="lightbox-title" className="text-lg font-bold font-sans text-studio-text flex items-center gap-2">
              <span>{project.title}</span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                project.status === 'In Development'
                  ? 'bg-studio-lime/10 text-studio-lime border-studio-lime/40'
                  : 'bg-studio-forest text-studio-emerald border-studio-emerald/40'
              }`}>
                {project.status}
              </span>
            </h3>
            <p className="text-xs font-mono text-studio-secondary">{project.category}</p>
          </div>
        </div>

        {/* Zoom & Action Controls */}
        <div className="flex items-center gap-2">
          
          <div className="hidden sm:flex items-center bg-studio-forest/80 rounded-xl p-1 border border-studio-panelBorder text-studio-secondary">
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1.5 rounded-lg hover:text-studio-lime hover:bg-studio-black/40 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="px-2 text-xs font-mono text-studio-text min-w-[50px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-1.5 rounded-lg hover:text-studio-lime hover:bg-studio-black/40 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              className="p-1.5 rounded-lg hover:text-studio-mint hover:bg-studio-black/40 transition-colors ml-1 border-l border-studio-panelBorder"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {project.primaryAction && project.primaryAction.url && (
            <a
              href={project.primaryAction.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-studio-forest border border-studio-panelBorder text-xs font-mono font-bold text-studio-lime hover:border-studio-lime transition-all flex items-center gap-1.5"
            >
              <span>{project.primaryAction.label}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-studio-forest border border-studio-panelBorder text-studio-secondary hover:text-studio-lime hover:border-studio-lime transition-all"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* Main Lightbox Inspection Viewport */}
      <div
        className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center cursor-zoom-out"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div
          className="transition-transform duration-200 ease-out max-w-5xl w-full rounded-2xl overflow-hidden border-2 border-studio-emerald/40 shadow-2xl bg-studio-charcoal"
          style={{ transform: `scale(${zoomLevel})` }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* High-Resolution Uncropped Screenshot */}
          <img
            src={project.image}
            alt={`${project.title} Native Resolution Interface`}
            className="w-full h-auto object-contain select-none"
            style={{ imageRendering: '-webkit-optimize-contrast' }}
          />

          {/* Footer Metadata */}
          <div className="p-4 bg-studio-forest/90 border-t border-studio-panelBorder flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-studio-mint">
              <ShieldCheck className="w-4 h-4 text-studio-lime" />
              <span>Genuine Native Product Interface // High-DPI Capture</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-studio-muted">Stack:</span>
              <span className="text-studio-text">{project.stack.join(' • ')}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
