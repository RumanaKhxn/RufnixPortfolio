import { useState, useEffect } from 'react';
import Scene3D from './components/canvas/Scene3D';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero3D from './components/story/Hero3D';
import EngineeringProcess3D from './components/story/EngineeringProcess3D';
import SpatialSkills3D from './components/story/SpatialSkills3D';
import Founders3D from './components/story/Founders3D';
import ProjectsOrbit3D from './components/story/ProjectsOrbit3D';
import ProductReveal3D from './components/story/ProductReveal3D';
import FutureCTA from './components/story/FutureCTA';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeProjectId, setActiveProjectId] = useState('fr-studio');

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentProgress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
          setScrollProgress(Math.min(Math.max(currentProgress, 0), 1));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-studio-black text-studio-text selection:bg-studio-emerald selection:text-studio-black">
      {/* 1. Master Three.js WebGL 3D Scene */}
      <Scene3D
        scrollProgress={scrollProgress}
        activeProjectId={activeProjectId}
        onProjectSelect={(id) => setActiveProjectId(id)}
      />

      {/* 2. Desktop Custom Cursor */}
      <CustomCursor />

      {/* 3. Floating Capsule Navbar */}
      <Navbar />

      {/* 4. Cinematic Scroll-Driven Story Chapters */}
      <main className="relative z-10 flex flex-col">
        <Hero3D />
        <EngineeringProcess3D />
        <SpatialSkills3D />
        <Founders3D />
        <ProjectsOrbit3D
          activeProjectId={activeProjectId}
          onSelectProject={(id) => setActiveProjectId(id)}
        />
        <ProductReveal3D />
        <Services />
        <FutureCTA />
        <Contact />
      </main>

      {/* 5. Studio Footer */}
      <Footer />
    </div>
  );
}
