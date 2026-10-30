import { useState, useRef } from 'react';
import { Lock, Maximize2, ExternalLink, Code2, Eye, Sparkles } from 'lucide-react';

export default function StudioDeviceFrame({
  src,
  alt,
  title,
  hostname,
  status,
  aspectRatio = '2.09/1',
  codeSnippet,
  viewMode = 'ui',
  onToggleView,
  onInspect,
  primaryAction,
  className = '',
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const frameRef = useRef(null);

  const handleMouseMove = (e) => {
    // Only apply 3D tilt on devices with a mouse pointer and larger screens
    if (!frameRef.current || window.innerWidth < 1024) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: -y * 6, // Subtle 3 deg max tilt
      y: x * 6,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={frameRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
      }}
      className={`relative w-full rounded-2xl sm:rounded-3xl bg-studio-charcoal/95 border-2 transition-all duration-300 shadow-2xl overflow-hidden group ${
        isHovered
          ? 'border-studio-emerald/60 shadow-glow-emerald'
          : 'border-studio-panelBorder shadow-laptop'
      } ${className}`}
    >
      {/* 1. TOP BROWSER CHROME HUD */}
      <div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-studio-forest/90 via-studio-charcoal to-studio-forest/80 border-b border-studio-panelBorder flex items-center justify-between gap-2 sm:gap-3">
        
        {/* macOS Traffic Lights */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors shadow-sm" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors shadow-sm" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-studio-emerald hover:bg-studio-lime transition-colors shadow-sm" />
        </div>

        {/* Browser URL Capsule */}
        <div className="flex-1 min-w-0 max-w-[200px] sm:max-w-xs md:max-w-sm mx-auto flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 py-1 rounded-full bg-studio-black/80 border border-studio-panelBorder text-[10px] sm:text-xs font-mono text-studio-secondary">
          <Lock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-studio-lime flex-shrink-0" />
          <span className="text-studio-text truncate">{hostname || 'rufnix.studio/preview'}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-studio-emerald animate-pulse flex-shrink-0 ml-0.5" />
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
          {codeSnippet && onToggleView && (
            <button
              type="button"
              onClick={onToggleView}
              className={`p-1.5 rounded-lg border text-xs font-mono transition-colors flex items-center gap-1 ${
                viewMode === 'code'
                  ? 'bg-studio-forest border-studio-emerald text-studio-lime font-bold shadow-glow-subtle'
                  : 'bg-studio-black/60 border-studio-panelBorder text-studio-secondary hover:text-studio-text'
              }`}
              title="Toggle Code View"
              aria-label="Toggle Code View"
            >
              {viewMode === 'code' ? <Eye className="w-3.5 h-3.5" /> : <Code2 className="w-3.5 h-3.5" />}
              <span className="hidden md:inline text-[11px]">{viewMode === 'code' ? 'UI' : 'Code'}</span>
            </button>
          )}

          {onInspect && (
            <button
              type="button"
              onClick={onInspect}
              className="p-1.5 rounded-lg bg-studio-black/60 border border-studio-panelBorder text-studio-secondary hover:text-studio-lime hover:border-studio-lime/40 transition-colors"
              title="Inspect Fullscreen"
              aria-label="Inspect Fullscreen"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          )}

          {primaryAction && primaryAction.url && (
            <a
              href={primaryAction.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-studio-forest border border-studio-panelBorder text-studio-secondary hover:text-studio-emerald transition-colors"
              title={primaryAction.label}
              aria-label={primaryAction.label}
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

      </div>

      {/* 2. MAIN SCREENSHOT / CONTENT VIEWPORT */}
      <div
        className="relative w-full bg-studio-black overflow-hidden cursor-pointer"
        style={{ aspectRatio }}
        onClick={onInspect}
      >
        {viewMode === 'ui' ? (
          <div className="relative w-full h-full flex items-center justify-center bg-[#050806]">
            <img
              src={src}
              alt={alt || title}
              className="w-full h-full object-contain sm:object-cover object-top transition-transform duration-700 group-hover:scale-[1.01]"
              style={{ imageRendering: '-webkit-optimize-contrast' }}
              loading="lazy"
            />
            {/* Ambient Glass Sheen overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-studio-black/50 via-transparent to-transparent pointer-events-none" />

            {/* Click to inspect badge on hover */}
            <div className="absolute inset-0 bg-studio-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
              <div className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-studio-charcoal/90 backdrop-blur-md border border-studio-lime/50 text-[11px] sm:text-xs font-mono font-bold text-studio-lime shadow-glow-lime flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>CLICK TO INSPECT FULL RESOLUTION</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full p-4 sm:p-5 bg-[#030805] text-studio-mint font-mono text-xs overflow-auto select-all leading-relaxed">
            <pre>
              <code>{codeSnippet}</code>
            </pre>
          </div>
        )}

        {/* Status Badge Pin */}
        {status && (
          <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10 pointer-events-none">
            <span
              className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold backdrop-blur-md border shadow-lg ${
                status === 'In Development'
                  ? 'bg-studio-charcoal/95 text-studio-lime border-studio-lime/50'
                  : 'bg-studio-charcoal/95 text-studio-emerald border-studio-emerald/50'
              }`}
            >
              ● {status}
            </span>
          </div>
        )}
      </div>

      {/* 3. SUBTLE FOOTER BAR */}
      <div className="px-3.5 sm:px-4 py-2 bg-studio-charcoal/90 border-t border-studio-panelBorder flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-studio-muted">
        <span className="flex items-center gap-1.5 text-studio-secondary truncate mr-2">
          <Sparkles className="w-3 h-3 text-studio-emerald flex-shrink-0" />
          <span className="truncate">Mobbin High-DPI Inspection Certified</span>
        </span>
        <span className="text-studio-mint font-medium whitespace-nowrap flex-shrink-0">{title}</span>
      </div>
    </div>
  );
}
