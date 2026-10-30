import { useState, useEffect } from 'react';
import { studioData } from '../data/portfolioData';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Evolution', href: '#evolution' },
    { name: 'Architecture', href: '#architecture' },
    { name: 'Founders', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Section spy
      const sections = ['hero', 'evolution', 'architecture', 'about', 'projects', 'contact'];
      const scrollPos = window.scrollY + 160;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll with precise fixed navbar offset
  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const targetId = href.replace('#', '');
    const el = document.getElementById(targetId);

    if (el) {
      // Responsive navbar height compensation
      const headerOffset = window.innerWidth >= 1024 ? 90 : 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });

      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', href);
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 lg:px-8 py-3 sm:py-4 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between pl-3 sm:pl-5 pr-2.5 sm:pr-4 py-2 sm:py-2.5 rounded-full transition-all duration-300 ${
          scrolled
            ? 'bg-studio-charcoal/90 backdrop-blur-md border border-studio-panelBorder shadow-glow-subtle'
            : 'bg-studio-charcoal/70 backdrop-blur-sm border border-white/10'
        }`}
      >
        {/* 1. Brand Logo (With dedicated clearance so circle is never clipped) */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-emerald rounded-full flex-shrink-0"
          aria-label="Rufnix Studio Home"
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-studio-emerald/50 p-0.5 bg-studio-forest flex items-center justify-center shadow-glow-subtle group-hover:border-studio-lime transition-colors flex-shrink-0">
            <img
              src="/assets/logo.jpg"
              alt="Rufnix Studio Logo"
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <span className="absolute text-[10px] font-mono font-bold text-studio-lime">RF</span>
          </div>

          <div className="flex items-center">
            <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-studio-text whitespace-nowrap flex items-center gap-0.5">
              <span className="text-studio-emerald font-semibold">&lt;</span>
              <span>RUFNIX</span>
              <span className="text-studio-lime ml-1">STUDIO</span>
              <span className="text-studio-emerald font-semibold">/&gt;</span>
            </span>
          </div>
        </a>

        {/* 2. Desktop Navigation Pill (Active on lg: 1024px and xl: 1280px+) */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 px-2.5 xl:px-3 py-1 bg-studio-forest/60 rounded-full border border-studio-panelBorder flex-shrink-0">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-2.5 xl:px-3.5 py-1 text-[11px] xl:text-xs font-mono tracking-wider transition-all duration-200 rounded-full whitespace-nowrap ${
                  isActive
                    ? 'text-studio-black font-bold bg-studio-emerald shadow-glow-emerald'
                    : 'text-studio-secondary hover:text-studio-text hover:bg-studio-panel/50'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* 3. Right Status Pill & CTA (Visible on lg: 1024px+) */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-4 flex-shrink-0">
          <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-studio-forest/80 border border-studio-emerald/20 text-xs font-mono text-studio-secondary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-studio-emerald opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-studio-emerald"></span>
            </span>
            <span className="text-[11px] text-studio-mint">online</span>
          </div>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="flex items-center gap-1.5 px-3.5 xl:px-4 py-1.5 rounded-full text-xs font-mono font-bold text-studio-black bg-gradient-to-r from-studio-emerald to-studio-lime hover:opacity-90 transition-all shadow-glow-emerald focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-lime whitespace-nowrap"
          >
            <span>LET&apos;S TALK</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 4. Mobile Menu Hamburger (Visible on < lg: Tablet 768px and Mobile 430px/390px/360px) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-studio-secondary hover:text-studio-text hover:bg-studio-forest border border-studio-panelBorder focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-emerald flex-shrink-0"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-studio-lime" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* 5. Mobile / Tablet Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 max-w-7xl mx-auto rounded-3xl bg-studio-charcoal/98 backdrop-blur-2xl border-2 border-studio-panelBorder p-5 sm:p-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-studio-panelBorder mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-studio-lime animate-pulse" />
              <span className="text-xs font-mono font-bold text-studio-lime tracking-wider uppercase">
                STUDIO NAVIGATION
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 rounded-lg text-studio-muted hover:text-studio-text hover:bg-studio-forest transition-colors"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-4 py-3 rounded-xl text-sm font-mono tracking-wider transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-studio-forest text-studio-lime font-bold border border-studio-lime/40'
                      : 'text-studio-secondary hover:text-studio-emerald hover:bg-studio-forest/50'
                  }`}
                >
                  <span>{link.name}</span>
                  <span className={`text-xs ${isActive ? 'text-studio-lime font-bold' : 'text-studio-muted'}`}>
                    &rarr;
                  </span>
                </a>
              );
            })}

            <div className="pt-4 mt-2 border-t border-studio-panelBorder flex flex-col gap-3">
              <div className="flex items-center justify-between px-2 text-xs font-mono text-studio-mint">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-studio-emerald animate-pulse" />
                  <span>online &bull; Available for projects</span>
                </span>
                <span className="text-[10px] text-studio-muted">SYS // 2026</span>
              </div>

              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="w-full text-center py-3.5 rounded-xl font-mono text-xs font-bold text-studio-black bg-gradient-to-r from-studio-emerald to-studio-lime shadow-glow-emerald flex items-center justify-center gap-2"
              >
                <span>START A PROJECT</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
