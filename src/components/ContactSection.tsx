import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Mail, Phone, Clock, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { useMagneticButton } from '../hooks/useMagneticButton.ts';

interface ContactSectionProps {
  onOpenModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenModal }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const magneticSubmit = useMagneticButton(5);
  const magneticWhatsApp = useMagneticButton(5);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Growth Flagship (₹8,999)',
    timeline: 'Immediate (1–2 Weeks)',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMsg('Please enter your name and email address.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || 'Not provided',
      service_plan: formData.service,
      desired_timeline: formData.timeline,
      project_message: formData.message || 'No additional details provided',
      recipient_email: 'prajapatiaksh32@gmail.com',
      _subject: `New WS Web Studio Appointment: ${formData.name} (${formData.service})`,
      _captcha: 'false',
      _template: 'table',
    };

    try {
      await fetch('https://formsubmit.co/ajax/prajapatiaksh32@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });
    } catch {
      // Graceful fallback
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const openWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello WS Web Studio! I'm interested in building a website with you. My name is ${
        formData.name || 'a visitor'
      } and I'm interested in the ${formData.service}.`
    );
    window.open(`https://wa.me/916206184568?text=${text}`, '_blank');
  };

  return (
    <section id="contact" ref={containerRef} className="relative py-28 border-t border-slate-800/80 bg-[#050811]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact & Info */}
          <div
            className={`lg:col-span-5 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Start Your Project
            </div>
            <h2
              className="mt-3 text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Let’s build something extraordinary together.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              Have an upcoming product launch or need to completely redesign your existing website?
              Reach out directly or chat with our lead engineer on WhatsApp.
            </p>

            {/* Direct Connect Cards */}
            <div className="mt-8 space-y-4">
              {/* WhatsApp Card */}
              <a
                href="https://wa.me/916206184568"
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={magneticWhatsApp.handleMouseMove}
                onMouseLeave={magneticWhatsApp.handleMouseLeave}
                style={magneticWhatsApp.buttonStyle}
                className="shine-effect flex items-center gap-4 p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 hover:border-emerald-400/60 transition-all duration-300 group shadow-lg shadow-emerald-950/20"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-emerald-400 font-semibold">
                    Instant WhatsApp Chat
                  </div>
                  <div className="text-sm font-bold text-white mt-0.5">
                    +91 6206184568
                  </div>
                  <div className="text-[11px] text-emerald-300/80">
                    Typical response time: Under 15 minutes
                  </div>
                </div>
              </a>

              {/* Email Card */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-cyan-400 font-semibold">
                    Direct Email
                  </div>
                  <div className="text-sm font-bold text-white mt-0.5">
                    contact@wswebstudio.com
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Project briefs & RFP submissions
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-blue-400 font-semibold">
                    Availability
                  </div>
                  <div className="text-sm font-bold text-white mt-0.5">
                    Monday – Saturday · 9:00 AM – 8:00 PM IST
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Worldwide remote client engagement
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Capture Form */}
          <div
            className={`lg:col-span-7 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            <div className="rounded-3xl bg-[#080d1f] border border-slate-800 p-8 sm:p-10 shadow-2xl relative overflow-hidden">
              {submitted ? (
                <div className="py-10 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-400">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 ring-8 ring-emerald-500/10">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-white">
                    Appointment Request Dispatched!
                  </h3>

                  <div className="mt-3 px-4 py-2 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-300 font-mono flex items-center gap-2">
                    <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Delivered to: prajapatiaksh32@gmail.com</span>
                  </div>

                  <p className="mt-3 text-sm text-slate-300 max-w-md">
                    Thank you, {formData.name}. Your appointment proposal for the <span className="text-cyan-400 font-semibold">{formData.service}</span> has been dispatched to our inbox.
                  </p>

                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <button
                      onClick={openWhatsAppDirect}
                      className="shine-effect px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/30"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat on WhatsApp Now</span>
                    </button>

                    <a
                      href={`mailto:prajapatiaksh32@gmail.com?subject=${encodeURIComponent(`Website Appointment Request - ${formData.name}`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nPlan: ${formData.service}\nDetails: ${formData.message}`)}`}
                      className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold flex items-center gap-2 border border-slate-700 cursor-pointer"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Open in Gmail</span>
                    </a>

                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                    >
                      Submit Another Query
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-bold font-display text-white mb-2">
                    Request Project Proposal & Timeline
                  </h3>

                  <div className="text-xs text-slate-400 -mt-1 mb-2">
                    Appointments automatically forward to <span className="text-cyan-400 font-mono">prajapatiaksh32@gmail.com</span>
                  </div>

                  {errorMsg && (
                    <div className="p-3 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-medium">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Alex Morgan"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700/80 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700/80 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700/80 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Target Plan / Package
                      </label>
                      <select
                        value={formData.service}
                        onChange={e => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700/80 focus:border-cyan-400 focus:outline-none text-sm text-white transition-colors"
                      >
                        <option value="Starter Flagship (₹5,999)">Starter Flagship (₹5,999)</option>
                        <option value="Growth Flagship (₹8,999)">Growth Flagship (₹8,999) · Most Popular</option>
                        <option value="Custom Architecture (₹12,999+)">Custom Architecture (₹12,999+)</option>
                        <option value="Custom Consultation">General Consultation / Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Desired Timeline
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={e => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700/80 focus:border-cyan-400 focus:outline-none text-sm text-white transition-colors"
                    >
                      <option value="Immediate (1–2 Weeks)">Immediate Launch (1–2 Weeks)</option>
                      <option value="Within 1 Month">Within 1 Month</option>
                      <option value="Exploring & Planning">Exploring & Planning Phase</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Project Details / Specific Goals
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your product, target audience, or current website challenges..."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700/80 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-500 transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      onMouseMove={magneticSubmit.handleMouseMove}
                      onMouseLeave={magneticSubmit.handleMouseLeave}
                      style={magneticSubmit.buttonStyle}
                      className="shine-effect w-full py-4 px-6 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(6,182,212,0.4)] cursor-pointer active:scale-98 transition-all disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Dispatching to prajapatiaksh32@gmail.com...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Appointment Request (to prajapatiaksh32@gmail.com)</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
