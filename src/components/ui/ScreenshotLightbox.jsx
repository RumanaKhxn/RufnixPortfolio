import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, ZoomIn, ZoomOut, RotateCcw, ShieldCheck, ArrowUpRight } from 'lucide-react';

export default function ScreenshotLightbox({ isOpen, onClose, project }) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const overlayRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const savedScrollYRef = useRef(0);

  useEffect(() => {
    if (!isOpen) return;

    // Reset zoom when opened
    setZoomLevel(1);

    // 1. Capture exact scroll position
    const currentScrollY = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
    savedScrollYRef.current = currentScrollY;

    // 2. Measure scrollbar width to prevent background layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    // 3. Save previous styles
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevHtmlScrollBehavior = document.documentElement.style.scrollBehavior;
    const prevBodyOverflow = document.body.style.overflow;
    const prevBodyPaddingRight = document.body.style.paddingRight;

    // 4. Lock document root and body
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.scrollBehavior = 'auto'; // Prevent smooth scroll jumping
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // 5. Hard lockdown on window scroll to ensure background never drifts
    const lockScrollPosition = () => {
      const pos = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
      if (pos !== savedScrollYRef.current) {
        window.scrollTo({
          top: savedScrollYRef.current,
          left: 0,
          behavior: 'instant'
        });
      }
    };
    window.addEventListener('scroll', lockScrollPosition, { passive: true });

    // 6. Handle keyboard navigation & Escape key
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      // Handle keyboard scrolling inside modal without leaking to page
      const scrollKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];
      if (scrollKeys.includes(e.key)) {
        const container = scrollContainerRef.current;
        if (container) {
          const isScrollable = container.scrollHeight > container.clientHeight;
          if (isScrollable) {
            if (e.key === 'ArrowUp') container.scrollTop -= 60;
            else if (e.key === 'ArrowDown') container.scrollTop += 60;
            else if (e.key === 'PageUp') container.scrollTop -= container.clientHeight * 0.8;
            else if (e.key === 'PageDown' || e.key === ' ') container.scrollTop += container.clientHeight * 0.8;
            else if (e.key === 'Home') container.scrollTop = 0;
            else if (e.key === 'End') container.scrollTop = container.scrollHeight;
          }
        }
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // 7. Non-passive wheel and touch event trap to prevent scroll chaining to background
    const overlayElement = overlayRef.current;

    const handleWheelTrap = (e) => {
      const container = scrollContainerRef.current;
      if (!container) {
        e.preventDefault();
        return;
      }

      const isInsideScrollable = container.contains(e.target);
      if (!isInsideScrollable) {
        e.preventDefault();
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } = container;
      const canScroll = scrollHeight > clientHeight;

      if (!canScroll) {
        e.preventDefault();
        return;
      }

      const delta = e.deltaY;
      const atTop = scrollTop <= 0 && delta < 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1 && delta > 0;

      // Stop scroll propagation at boundaries so background never moves
      if (atTop || atBottom) {
        e.preventDefault();
      }
    };

    const handleTouchTrap = (e) => {
      const container = scrollContainerRef.current;
      if (!container || !container.contains(e.target)) {
        e.preventDefault();
        return;
      }

      const { scrollHeight, clientHeight } = container;
      if (scrollHeight <= clientHeight) {
        e.preventDefault();
      }
    };

    if (overlayElement) {
      overlayElement.addEventListener('wheel', handleWheelTrap, { passive: false });
      overlayElement.addEventListener('touchmove', handleTouchTrap, { passive: false });
    }

    // Clean up all locks and listeners
    return () => {
      window.removeEventListener('scroll', lockScrollPosition);
      window.removeEventListener('keydown', handleKeyDown);

      if (overlayElement) {
        overlayElement.removeEventListener('wheel', handleWheelTrap);
        overlayElement.removeEventListener('touchmove', handleTouchTrap);
      }

      document.documentElement.style.overflow = prevHtmlOverflow;
      document.documentElement.style.scrollBehavior = prevHtmlScrollBehavior;
      document.body.style.overflow = prevBodyOverflow;
      document.body.style.paddingRight = prevBodyPaddingRight;

      // Restore exact background scroll position cleanly
      window.scrollTo({
        top: savedScrollYRef.current,
        left: 0,
        behavior: 'instant'
      });
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const handleZoomIn = (e) => {
    e.stopPropagation();
    setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  };
  const handleZoomOut = (e) => {
    e.stopPropagation();
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  };
  const handleResetZoom = (e) => {
    e.stopPropagation();
    setZoomLevel(1);
  };

  const modalContent = (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      className="fixed inset-0 z-[99999] flex flex-col bg-studio-black/95 backdrop-blur-2xl animate-in fade-in duration-200 select-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* 1. LIGHTBOX TOP HEADER */}
      <div className="flex-shrink-0 px-3 sm:px-6 py-2.5 sm:py-4 bg-studio-charcoal/95 border-b border-studio-panelBorder flex items-center justify-between gap-2 sm:gap-4 z-10 shadow-lg">
        
        {/* Project Title & Category */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="min-w-0">
            <h3 id="lightbox-title" className="text-sm sm:text-lg font-bold font-sans text-studio-text flex items-center gap-2">
              <span className="truncate">{project.title}</span>
              <span className={`hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border flex-shrink-0 ${
                project.status === 'In Development'
                  ? 'bg-studio-lime/10 text-studio-lime border-studio-lime/40'
                  : 'bg-studio-forest text-studio-emerald border-studio-emerald/40'
              }`}>
                {project.status}
              </span>
            </h3>
            <p className="text-[10px] sm:text-xs font-mono text-studio-secondary truncate">{project.category}</p>
          </div>
        </div>

        {/* Action Controls & Zoom HUD */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          
          {/* Zoom controls (hidden on small mobile to save space) */}
          <div className="hidden md:flex items-center bg-studio-forest/80 rounded-xl p-1 border border-studio-panelBorder text-studio-secondary">
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1.5 rounded-lg hover:text-studio-lime hover:bg-studio-black/40 transition-colors"
              title="Zoom Out"
              aria-label="Zoom Out"
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
              aria-label="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              className="p-1.5 rounded-lg hover:text-studio-mint hover:bg-studio-black/40 transition-colors ml-1 border-l border-studio-panelBorder"
              title="Reset Zoom"
              aria-label="Reset Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Live Demo Action Button (strictly for projects with liveDemoUrl) */}
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-studio-emerald to-studio-lime text-studio-black font-mono font-bold text-xs flex items-center gap-1.5 shadow-glow-emerald hover:opacity-95 hover:scale-[1.02] transition-all"
              title={`Open ${project.title} Live Demo`}
            >
              <span className="whitespace-nowrap">Live Demo</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}

          {/* Prominent High-Contrast Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-studio-forest border border-studio-panelBorder text-studio-text hover:text-studio-lime hover:border-studio-lime/60 shadow-glow-subtle transition-all flex items-center gap-1.5 group cursor-pointer"
            aria-label="Close Preview"
            title="Close Preview (Esc)"
          >
            <span className="text-xs font-mono font-bold group-hover:text-studio-lime">Close</span>
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-studio-lime group-hover:rotate-90 transition-transform" />
          </button>
        </div>

      </div>

      {/* 2. MAIN LIGHTBOX VIEWPORT (Scrollable ONLY inside modal) */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-6 md:p-8 flex items-center justify-center cursor-zoom-out"
        style={{ overscrollBehavior: 'contain' }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div
          className="transition-transform duration-200 ease-out max-w-6xl w-full my-auto rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-studio-emerald/50 shadow-2xl bg-studio-charcoal flex flex-col"
          style={{ transform: `scale(${zoomLevel})` }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* High-Resolution Uncropped Screenshot Display */}
          <div className="relative w-full bg-[#050806] flex items-center justify-center p-2 sm:p-4">
            <img
              src={project.image}
              alt={`${project.title} Native Interface Screenshot`}
              className="max-w-full max-h-[70vh] sm:max-h-[75vh] w-auto h-auto object-contain select-none rounded-xl"
              style={{ imageRendering: '-webkit-optimize-contrast' }}
            />
          </div>

          {/* Footer Metadata & Details */}
          <div className="p-3 sm:p-4 bg-studio-forest/90 border-t border-studio-panelBorder flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-studio-mint">
              <ShieldCheck className="w-4 h-4 text-studio-lime flex-shrink-0" />
              <span className="truncate">Verified Production UI // High-DPI Capture</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-studio-muted">Stack:</span>
              <span className="text-studio-text">{project.stack.join(' • ')}</span>
            </div>

            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-studio-lime hover:underline font-bold ml-auto"
              >
                <span>Launch Live Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : modalContent;
}
