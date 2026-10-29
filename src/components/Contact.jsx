import { useState } from 'react';
import { studioData } from '../data/portfolioData';
import { 
  Mail, 
  Instagram, 
  Github, 
  Linkedin, 
  Send, 
  Copy, 
  Check, 
  ArrowUpRight, 
  AlertCircle,
  Sparkles
} from 'lucide-react';

export default function Contact() {
  const { email, instagram, founders } = studioData;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Web Application',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(false);
  const [submittedStatus, setSubmittedStatus] = useState(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your name or organization.';
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide a contact email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please share a brief message about your project (at least 10 characters).';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Build mailto URI as real direct fallback
    const subject = encodeURIComponent(`Project Inquiry: ${formData.projectType} from ${formData.name}`);
    const body = encodeURIComponent(
      `Hello Rufnix Studio,\n\nName: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.projectType}\n\nProject Details:\n${formData.message}\n`
    );
    const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`;

    // Open email client
    window.location.href = mailtoUrl;

    setSubmittedStatus('initiated');
  };

  return (
    <section id="contact" className="relative py-24 sm:py-36 bg-studio-black overflow-hidden border-t border-studio-panelBorder">
      {/* Background Ambience */}
      <div className="absolute top-1/4 right-1/4 w-[36rem] h-[36rem] bg-studio-emerald/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-studio-lime/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-studio-forest/80 border border-studio-panelBorder text-xs font-mono text-studio-mint">
            <span className="text-studio-emerald">&lt;/&gt;</span>
            <span>GET IN TOUCH</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-studio-text uppercase font-sans">
            LET&apos;S BUILD SOMETHING <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-studio-emerald via-studio-mint to-studio-lime bg-clip-text text-transparent">
              MEANINGFUL.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-studio-secondary max-w-2xl font-mono">
            Have an idea, software project, or web application you would like to build? Reach out to Rufnix Studio directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Contact Information & Founder Channels */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Shared Email Card with Instant Copy */}
            <div className="rounded-2xl bg-studio-charcoal/90 border border-studio-panelBorder p-6 space-y-4 shadow-panel">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-studio-muted">PRIMARY INQUIRY CHANNEL</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-studio-forest text-studio-emerald border border-studio-emerald/30">
                  Shared Inbox
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-studio-forest border border-studio-panelBorder text-studio-lime">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-mono text-studio-secondary">Studio Email</div>
                  <a
                    href={`mailto:${email}`}
                    className="text-sm sm:text-base font-mono font-bold text-studio-text hover:text-studio-mint transition-colors truncate block"
                  >
                    {email}
                  </a>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex-1 py-2 px-3 rounded-xl bg-studio-forest border border-studio-panelBorder text-xs font-mono text-studio-mint hover:border-studio-lime hover:text-studio-lime transition-all flex items-center justify-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-studio-lime" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied to Clipboard' : 'Copy Email Address'}</span>
                </button>
              </div>
            </div>

            {/* Instagram Studio Channel */}
            <div className="rounded-2xl bg-studio-charcoal/90 border border-studio-panelBorder p-6 flex items-center justify-between shadow-panel">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-studio-forest border border-studio-panelBorder text-studio-emerald">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-studio-secondary">Instagram Studio</div>
                  <div className="text-sm font-mono font-bold text-studio-text">@rufnix.studio</div>
                </div>
              </div>

              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-studio-forest border border-studio-panelBorder text-xs font-mono font-semibold text-studio-mint hover:border-studio-emerald hover:text-studio-lime transition-all flex items-center gap-1"
              >
                <span>Visit</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Direct Founder Directory */}
            <div className="rounded-2xl bg-studio-charcoal/90 border border-studio-panelBorder p-6 space-y-4">
              <div className="text-xs font-mono text-studio-muted uppercase tracking-wider">
                Founder Social Channels
              </div>

              <div className="space-y-3">
                {founders.map((f) => (
                  <div
                    key={f.name}
                    className="p-3 rounded-xl bg-studio-forest/50 border border-studio-panelBorder flex items-center justify-between"
                  >
                    <div>
                      <div className="text-sm font-mono font-bold text-studio-text">
                        {f.name}
                      </div>
                      <div className="text-[10px] font-mono text-studio-muted">
                        {f.role}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={f.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-studio-charcoal border border-studio-panelBorder text-studio-secondary hover:text-studio-lime transition-colors"
                        aria-label={`${f.name}'s GitHub`}
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={f.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-studio-charcoal border border-studio-panelBorder text-studio-secondary hover:text-studio-emerald transition-colors"
                        aria-label={`${f.name}'s LinkedIn`}
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT: Validated Project Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-studio-charcoal/90 border-2 border-studio-panelBorder p-6 sm:p-10 shadow-2xl relative">
              
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-studio-panelBorder">
                <div>
                  <h3 className="text-xl font-bold font-sans text-studio-text">
                    Project Inquiry Form
                  </h3>
                  <p className="text-xs font-mono text-studio-secondary">
                    Provide your requirements to initialize a project conversation.
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-studio-forest border border-studio-panelBorder text-xs font-mono text-studio-lime">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>START A PROJECT</span>
                </div>
              </div>

              {submittedStatus === 'initiated' && (
                <div className="mb-6 p-4 rounded-xl bg-studio-forest border border-studio-emerald/40 text-xs font-mono text-studio-mint space-y-1">
                  <div className="font-bold text-studio-lime flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Inquiry Prepared</span>
                  </div>
                  <p>
                    Your email client has been prepared with your inquiry details addressed to <span className="text-studio-text">{email}</span>. If your mail client did not open automatically, you can also copy our email above.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-studio-secondary mb-1.5">
                    Your Name or Organization <span className="text-studio-lime">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Vance / TechCo"
                    className={`w-full px-4 py-3 rounded-xl bg-studio-forest/60 border font-mono text-sm text-studio-text placeholder-studio-muted focus:outline-none focus:ring-2 focus:ring-studio-emerald transition-all ${
                      errors.name ? 'border-red-500/80' : 'border-studio-panelBorder'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-[11px] font-mono text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-studio-secondary mb-1.5">
                    Your Email Address <span className="text-studio-lime">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@example.com"
                    className={`w-full px-4 py-3 rounded-xl bg-studio-forest/60 border font-mono text-sm text-studio-text placeholder-studio-muted focus:outline-none focus:ring-2 focus:ring-studio-emerald transition-all ${
                      errors.email ? 'border-red-500/80' : 'border-studio-panelBorder'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] font-mono text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Project Type */}
                <div>
                  <label className="block text-xs font-mono text-studio-secondary mb-1.5">
                    Project Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      'Web Application',
                      'Frontend Dev',
                      'Full-Stack App',
                      'UI Implementation',
                      'API Integration',
                      'Consultation'
                    ].map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setFormData({ ...formData, projectType: type })}
                        className={`p-2 rounded-xl text-xs font-mono border text-center transition-all ${
                          formData.projectType === type
                            ? 'bg-studio-forest border-studio-lime text-studio-lime font-bold shadow-glow-subtle'
                            : 'bg-studio-forest/40 border-studio-panelBorder text-studio-secondary hover:border-studio-panelBorder/80'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-mono text-studio-secondary mb-1.5">
                    Project Overview & Goals <span className="text-studio-lime">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe what you are looking to build, any timeline constraints, or existing codebase..."
                    className={`w-full px-4 py-3 rounded-xl bg-studio-forest/60 border font-mono text-sm text-studio-text placeholder-studio-muted focus:outline-none focus:ring-2 focus:ring-studio-emerald transition-all ${
                      errors.message ? 'border-red-500/80' : 'border-studio-panelBorder'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] font-mono text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-full font-mono text-sm font-bold text-studio-black bg-gradient-to-r from-studio-emerald via-studio-mint to-studio-lime hover:shadow-glow-emerald transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-lime"
                >
                  <Send className="w-4 h-4" />
                  <span>START A PROJECT</span>
                </button>

                {/* Genuine Integration Status Notice */}
                <div className="pt-2 text-[10px] font-mono text-studio-muted text-center flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-studio-emerald" />
                  <span>Direct mailto transmission configured. No external tracker or third-party middleware used.</span>
                </div>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
