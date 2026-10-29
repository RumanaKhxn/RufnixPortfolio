import ParticleNetwork from './components/ParticleNetwork';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import FeaturedProduct from './components/FeaturedProduct';
import Projects from './components/Projects';
import Services from './components/Services';
import Workflow from './components/Workflow';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-studio-black text-studio-text selection:bg-studio-emerald selection:text-studio-black">
      {/* Background Interactive Particle Network Canvas */}
      <ParticleNetwork />

      {/* Non-intrusive Desktop Custom Cursor */}
      <CustomCursor />

      {/* Floating Capsule HUD Navbar */}
      <Navbar />

      {/* Main Page Content Flow */}
      <main className="relative z-10 flex flex-col">
        <Hero />
        <About />
        <Skills />
        <FeaturedProduct />
        <Projects />
        <Services />
        <Workflow />
        <Contact />
      </main>

      {/* Studio Footer */}
      <Footer />
    </div>
  );
}
