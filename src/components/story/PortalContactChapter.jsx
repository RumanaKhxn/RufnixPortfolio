import { useState } from 'react';
import { studioData } from '../../data/portfolioData';
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
  Database,
  Loader2,
  Sparkles,
  ShieldCheck,
  Terminal
} from 'lucide-react';

export default function PortalContactChapter() {
  const { email, instagram, founders } = studioData;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    projectType: 'Web Application',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Please enter your full name or company.';
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide a contact email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please provide project details (minimum 10 characters).';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setApiResponse(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setApiResponse({
          success: false,
          message: data.message || 'An error occurred while submitting.',
        });
      } else {
        setApiResponse({
          success: true,
          savedToDatabase: data.savedToDatabase,
          id: data.id,
          message: data.message,
        });

        // Reset form on success
        setFormData({
          fullName: '',
          email: '',
          projectType: 'Web Application',
          message: '',
        });
      }
    } catch (err) {
      // Graceful network fallback
      setApiResponse({
        success: false,
        isNetworkError: true,
        message: 'Could not connect to the API server. You can also contact us directly via email below.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-36 px-4 sm:px-6 lg:px-8 z-10 pointer-events-none flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto w-full space-y-16">
        
        {/* Dimensional Portal Header */}
        <div className="max-w-4xl pointer-events-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-studio-forest/80 border border-studio-panelBorder text-xs font-mono text-studio-mint backdrop-blur-md shadow-glow-subtle">
            <span className="w-2 h-2 rounded-full bg-studio-lime animate-pulse" />
            <span className="text-studio-emerald">05</span>
            <span>/ DIMENSIONAL PORTAL &bull; INQUIRIES</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-studio-text uppercase font-sans leading-[0.95]">
            HAVE AN IDEA? <br />
            <span className="bg-gradient-to-r from-studio-emerald via-studio-mint to-studio-lime bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,230,118,0.35)]">
              LET&apos;S ENGINEER IT.
            </span>
          </h2>

          <p className="text-sm sm:text-base font-mono text-studio-secondary leading-relaxed max-w-2xl">
            Whether you need a bespoke full-stack web application, a database-driven system, or an immersive digital product &mdash; transmit your requirements directly into our pipeline.
          </p>
        </div>

        {/* Studio Communication & Direct Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pointer-events-auto">
          
          {/* Left Column: Direct Channels & Founders */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Email Card */}
            <div className="rounded-3xl bg-studio-charcoal/90 border border-studio-panelBorder p-6 sm:p-7 space-y-4 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-studio-panelBorder">
                <span className="text-xs font-mono font-bold text-studio-lime">PRIMARY DESK</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-studio-forest text-studio-emerald border border-studio-emerald/30">
                  Shared Inbox
                </span>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-2xl bg-studio-forest border border-studio-panelBorder text-studio-lime flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-mono text-studio-muted">Studio Email</div>
                  <a
                    href={`mailto:${email}`}
                    className="text-sm sm:text-base font-mono font-bold text-studio-text hover:text-studio-mint transition-colors truncate block"
                  >
                    {email}
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="w-full py-2.5 px-4 rounded-xl bg-studio-forest border border-studio-panelBorder text-xs font-mono text-studio-mint hover:border-studio-lime hover:text-studio-lime transition-all flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-studio-lime" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Email Address'}</span>
              </button>
            </div>

            {/* Instagram Studio Channel */}
            <div className="rounded-3xl bg-studio-charcoal/90 border border-studio-panelBorder p-6 flex items-center justify-between backdrop-blur-xl shadow-2xl">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-2xl bg-studio-forest border border-studio-panelBorder text-studio-emerald">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-studio-muted">Official Instagram</div>
                  <div className="text-sm font-mono font-bold text-studio-text">@rufnix.studio</div>
                </div>
              </div>

              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-studio-forest border border-studio-panelBorder text-xs font-mono font-semibold text-studio-mint hover:border-studio-emerald hover:text-studio-lime transition-all flex items-center gap-1.5"
              >
                <span>Visit</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Direct Founder Directory */}
            <div className="rounded-3xl bg-studio-charcoal/90 border border-studio-panelBorder p-6 sm:p-7 space-y-4 backdrop-blur-xl shadow-2xl">
              <div className="text-xs font-mono text-studio-muted uppercase tracking-wider">
                Direct Developer Connect
              </div>

              <div className="space-y-3">
                {founders.map((f) => (
                  <div
                    key={f.name}
                    className="p-3.5 rounded-xl bg-studio-forest/50 border border-studio-panelBorder flex items-center justify-between"
                  >
                    <div>
                      <div className="text-sm font-mono font-bold text-studio-text">
                        {f.name}
                      </div>
                      <div className="text-[11px] font-mono text-studio-lime">
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

          {/* Right Column: Validated MongoDB Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-studio-charcoal/95 border-2 border-studio-panelBorder p-6 sm:p-10 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
              
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-studio-panelBorder">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-sans text-studio-text">
                    Project Dispatch
                  </h3>
                  <p className="text-xs font-mono text-studio-secondary mt-0.5">
                    Synchronized with live MongoDB Atlas storage.
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-studio-forest border border-studio-panelBorder text-xs font-mono text-studio-lime">
                  <Database className="w-3.5 h-3.5 text-studio-emerald" />
                  <span>MONGODB ATLAS // LIVE</span>
                </div>
              </div>

              {/* API Response Alert */}
              {apiResponse && (
                <div className={`mb-6 p-4 rounded-xl border text-xs font-mono space-y-1.5 ${
                  apiResponse.success
                    ? 'bg-studio-forest/90 border-studio-emerald text-studio-mint'
                    : 'bg-red-950/40 border-red-500/50 text-red-200'
                }`}>
                  <div className="font-bold flex items-center gap-2">
                    {apiResponse.success ? (
                      <>
                        <Check className="w-4 h-4 text-studio-lime" />
                        <span className="text-studio-lime">Inquiry Logged Successfully</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-red-400" />
                        <span className="text-red-400">Notice</span>
                      </>
                    )}
                  </div>
                  <p className="leading-relaxed">
                    {apiResponse.message}
                  </p>
                  {apiResponse.id && (
                    <div className="pt-1 text-[11px] text-studio-muted">
                      Database Record ID: <span className="font-mono text-studio-lime">{apiResponse.id}</span>
                    </div>
                  )}
                  {apiResponse.isNetworkError && (
                    <div className="pt-2">
                      <a
                        href={`mailto:${email}?subject=Project%20Inquiry&body=${encodeURIComponent(formData.message)}`}
                        className="inline-flex items-center gap-1 text-studio-lime underline font-semibold"
                      >
                        Send via Email Client Instead &rarr;
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Form Input Fields */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-studio-secondary">
                      Full Name / Entity <span className="text-studio-lime">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Alex Vance"
                      className={`w-full px-4 py-3 rounded-xl bg-studio-forest/60 border font-mono text-xs text-studio-text placeholder-studio-muted focus:outline-none focus:ring-1 transition-all ${
                        errors.fullName
                          ? 'border-red-500/80 focus:ring-red-500'
                          : 'border-studio-panelBorder focus:border-studio-lime focus:ring-studio-lime'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-[11px] font-mono text-red-400">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-studio-secondary">
                      Email Address <span className="text-studio-lime">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className={`w-full px-4 py-3 rounded-xl bg-studio-forest/60 border font-mono text-xs text-studio-text placeholder-studio-muted focus:outline-none focus:ring-1 transition-all ${
                        errors.email
                          ? 'border-red-500/80 focus:ring-red-500'
                          : 'border-studio-panelBorder focus:border-studio-lime focus:ring-studio-lime'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] font-mono text-red-400">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Project Scope / Category */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-studio-secondary">
                    Project Architecture
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-studio-forest/60 border border-studio-panelBorder font-mono text-xs text-studio-text focus:outline-none focus:border-studio-lime focus:ring-1 focus:ring-studio-lime"
                  >
                    <option value="Web Application">Full-Stack Web Application (React / Node / .NET)</option>
                    <option value="Creative 3D Experience">Creative 3D Web Experience / Motion Landing</option>
                    <option value="Database Engineering">Database Architecture &amp; API Integration</option>
                    <option value="Custom Software">Bespoke Software Consultation</option>
                  </select>
                </div>

                {/* Project Details */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-studio-secondary">
                    Project Vision &amp; Requirements <span className="text-studio-lime">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your vision, target timeline, key technical requirements, or objectives..."
                    className={`w-full px-4 py-3 rounded-xl bg-studio-forest/60 border font-mono text-xs text-studio-text placeholder-studio-muted focus:outline-none focus:ring-1 transition-all ${
                      errors.message
                        ? 'border-red-500/80 focus:ring-red-500'
                        : 'border-studio-panelBorder focus:border-studio-lime focus:ring-studio-lime'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] font-mono text-red-400">{errors.message}</p>
                  )}
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-studio-black bg-gradient-to-r from-studio-emerald via-studio-mint to-studio-lime hover:shadow-glow-emerald disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-studio-black" />
                      <span>Transmitting Payload...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Project Inquiry</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-5 pt-4 border-t border-studio-panelBorder flex items-center justify-between text-[11px] font-mono text-studio-muted">
                <span>Inquiries routed directly to founders</span>
                <span className="text-studio-emerald font-semibold">&bull; 24h Response Standard</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
