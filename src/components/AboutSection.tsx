import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, CheckCircle, Quote, Star } from 'lucide-react';
import { Testimonial } from '../types.ts';

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote:
      'WS Web Studio completely overhauled our digital presence. Our previous WordPress site took 4.5 seconds to load; the new build paints in under 600ms. In our first 60 days post-launch, qualified inbound sales inquiries grew by +175%.',
    author: 'Vikram Sengupta',
    role: 'Managing Director',
    company: 'Apex Horizon Capital',
    outcome: '+175% Qualified Inbound Inquiries',
  },
  {
    id: '2',
    quote:
      'The attention to detail and 60fps micro-animations feel on par with top Silicon Valley companies. Our users constantly compliment the speed and ease of our new web platform. Flawless communication from day one.',
    author: 'Elena Rostova',
    role: 'Chief Product Officer',
    company: 'AeroCloud Analytics',
    outcome: '99/100 Core Web Vitals Score',
  },
];

const FAQS = [
  {
    question: 'How long does a typical website build take?',
    answer:
      'Our Starter builds are typically delivered in 5 to 7 business days. Growth multi-page flagships take 10 to 14 days, and custom full-stack web applications take 2 to 3 weeks depending on API integration complexity.',
  },
  {
    question: 'Do I own 100% of the website code and design assets?',
    answer:
      'Yes, absolutely. Upon final milestone completion and launch, full ownership and copyright of the source code, design components, and production assets are transferred directly to your organization.',
  },
  {
    question: 'Can you work with our existing branding or redesign it?',
    answer:
      'Both! If you already have brand guidelines, fonts, and logos, we engineer directly within your design system. If you need a fresh brand identity, we craft modern typography pairings, color systems, and digital assets as part of the sprint.',
  },
  {
    question: 'What happens after the website launches?',
    answer:
      'Every project includes a 30 to 90-day post-launch warranty with continuous bug fixes, performance monitoring, and minor tweaks. We also offer affordable monthly retainer packages for continuous feature development and maintenance.',
  },
];

export const AboutSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

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

  return (
    <section id="about" ref={containerRef} className="relative py-28 border-t border-slate-800/80 bg-[#060a16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`max-w-3xl transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-cyan-400">
            About WS Web Studio
          </div>
          <h2
            className="mt-3 text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Crafting digital flagships that command authority and generate revenue.
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            We founded WS Web Studio with one clear mission: replace bloated, generic website templates with high-performance web engineering. Every project we touch combines Apple-level aesthetic discipline with battle-tested conversion mechanics.
          </p>
        </div>

        {/* 2-Column: Testimonials & FAQs */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Attributable Testimonials */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
              <span>Client Success Stories</span>
              <span className="text-xs font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10">Verified</span>
            </h3>

            {TESTIMONIALS.map((t, idx) => (
              <div
                key={t.id}
                className={`p-7 rounded-2xl bg-[#080e22] border border-slate-800 hover:border-slate-700 transition-all duration-500 relative overflow-hidden ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-sm text-slate-300 leading-relaxed italic">
                  "{t.quote}"
                </p>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-white">{t.author}</div>
                    <div className="text-xs text-slate-400">
                      {t.role} · <span className="text-slate-300">{t.company}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-mono font-semibold text-emerald-400">
                      {t.outcome}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="lg:col-span-6">
            <h3 className="text-lg font-bold font-display text-white mb-6">
              Frequently Asked Questions
            </h3>

            <div className="space-y-4">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-800 bg-[#080d1e] overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/40 transition-colors"
                    >
                      <span className="text-sm font-semibold text-slate-100">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-cyan-400 transition-transform duration-300 shrink-0 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3 animate-in fade-in duration-200">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
