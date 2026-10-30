import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailing, setTrailing] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Only enable on non-touch devices with fine pointers and no reduced-motion preference
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isTouch || reducedMotion) {
      setIsEnabled(false);
      return;
    }

    setIsEnabled(true);

    let mouseX = -100;
    let mouseY = -100;
    let trailX = -100;
    let trailY = -100;
    let animId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setPosition({ x: mouseX, y: mouseY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Smooth trailing animation loop
    const animateTrail = () => {
      trailX += (mouseX - trailX) * 0.18;
      trailY += (mouseY - trailY) * 0.18;
      setTrailing({ x: trailX, y: trailY });
      animId = requestAnimationFrame(animateTrail);
    };

    // Hover state detection
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('[role="button"]') ||
        target.closest('.interactive-target')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    animId = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  if (!isEnabled || !isVisible) return null;

  return (
    <>
      {/* Central pinpoint */}
      <div
        className="fixed pointer-events-none z-[100000] rounded-full bg-studio-lime transition-transform duration-75 ease-out shadow-glow-lime"
        style={{
          width: '6px',
          height: '6px',
          transform: `translate3d(${position.x - 3}px, ${position.y - 3}px, 0)`,
        }}
      />
      {/* Trailing illuminated aura */}
      <div
        className={`fixed pointer-events-none z-[100000] rounded-full border transition-all duration-200 ease-out ${
          isHovered
            ? 'border-studio-lime bg-studio-emerald/15 scale-150 shadow-glow-emerald'
            : 'border-studio-emerald/60 scale-100'
        }`}
        style={{
          width: '32px',
          height: '32px',
          transform: `translate3d(${trailing.x - 16}px, ${trailing.y - 16}px, 0)`,
        }}
      />
    </>
  );
}
