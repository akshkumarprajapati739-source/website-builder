import React, { useRef, useState, useEffect } from 'react';
import { MessageSquare, Layout, Cpu, Rocket, CheckCircle2 } from 'lucide-react';
import { ProcessStep } from '../types.ts';

const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Discuss',
    tagline: 'Strategic Discovery & Architecture',
    description:
      'We analyze your target market, competitors, sales funnels, and business goals to map out a clear conversion strategy.',
    iconType: 'discuss',
    deliverables: ['Conversion audit', 'Information architecture', 'Tech stack roadmap'],
  },
  {
    step: '02',
    title: 'Design',
    tagline: 'Apple-Grade Visual Systems',
    description:
      'We craft bespoke, ultra-clean UI/UX layouts in dark and light modes, focusing on typographic rhythm and intuitive micro-interactions.',
    iconType: 'design',
    deliverables: ['Custom component systems', 'Interactive wireframe previews', 'Brand motion language'],
  },
  {
    step: '03',
    title: 'Develop',
    tagline: 'Precision 60fps Engineering',
    description:
      'Engineered with modern React, TypeScript, and high-performance CSS. Zero unnecessary third-party plugins. 100% clean code.',
    iconType: 'develop',
    deliverables: ['Sub-second page speeds', 'Responsive across all devices', 'Full technical SEO integration'],
  },
  {
    step: '04',
    title: 'Launch',
    tagline: 'Rigorous QA & Go-Live Scale',
    description:
      'Thorough cross-browser testing, Core Web Vitals verification, analytics configuration, domain linking, and direct handover.',
    iconType: 'launch',
    deliverables: ['99+ Google Lighthouse score', 'Domain & SSL setup', 'Continuous maintenance support'],
  },
];

export const ProcessTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [scrollFillPercent, setScrollFillPercent] = useState(25);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check visibility
      if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
        setIsVisible(true);
      }

      // Calculate progress through container
      const totalDist = rect.height - windowHeight * 0.4;
      const currentScroll = windowHeight * 0.6 - rect.top;
      const progress = Math.min(100, Math.max(15, (currentScroll / totalDist) * 100));

      setScrollFillPercent(progress);

      // Determine active step based on progress
      if (progress < 35) {
        setActiveStepIndex(0);
      } else if (progress < 60) {
        setActiveStepIndex(1);
      } else if (progress < 85) {
        setActiveStepIndex(2);
      } else {
        setActiveStepIndex(3);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderIcon = (type: ProcessStep['iconType'], isActive: boolean) => {
    const iconClass = `w-6 h-6 transition-transform duration-300 ${
      isActive ? 'scale-110 text-white' : 'text-slate-400'
    }`;

    switch (type) {
      case 'discuss':
        return <MessageSquare className={iconClass} />;
      case 'design':
        return <Layout className={iconClass} />;
      case 'develop':
        return <Cpu className={iconClass} />;
      case 'launch':
        return <Rocket className={iconClass} />;
    }
  };

  return (
    <section id="process" ref={containerRef} className="relative py-28 bg-[#050812] border-t border-slate-800/80 overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`max-w-2xl transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Execution Blueprint
          </div>
          <h2
            className="mt-3 text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            How we bring your digital flagship from idea to launch in 4 focused steps.
          </h2>
          <p className="mt-3 text-base text-slate-300">
            A transparent, sprint-based workflow with zero guesswork. Continuous feedback, live prototype previews, and deterministic delivery.
          </p>
        </div>

        {/* 17. Process Timeline Display */}
        <div className="mt-16 relative">
          {/* Desktop Connecting Line Track */}
          <div className="hidden lg:block absolute top-20 left-[6%] right-[6%] h-[3px] bg-slate-800/90 rounded-full z-0 overflow-hidden">
            {/* Gradually filling connecting line */}
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 shadow-[0_0_12px_rgba(6,182,212,0.8)] transition-all duration-300 ease-out"
              style={{ width: `${scrollFillPercent}%` }}
            />
          </div>

          {/* 4 Process Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {PROCESS_STEPS.map((step, idx) => {
              const isActive = idx <= activeStepIndex;
              const isCurrent = idx === activeStepIndex;

              return (
                <div
                  key={step.step}
                  onClick={() => {
                    setActiveStepIndex(idx);
                    setScrollFillPercent((idx + 1) * 25);
                  }}
                  className={`group relative rounded-2xl p-6 sm:p-7 border transition-all duration-500 cursor-pointer flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-gradient-to-b from-[#09112a] to-[#070c1d] border-cyan-500/60 shadow-[0_0_30px_rgba(6,182,212,0.22)] scale-[1.02]'
                      : isActive
                      ? 'bg-[#070b1a]/90 border-slate-700/80 shadow-lg'
                      : 'bg-[#060915]/60 border-slate-800/70 opacity-70 hover:opacity-90'
                  }`}
                  style={{
                    transitionDelay: `${idx * 80}ms`,
                  }}
                >
                  {/* Step Icon Badge */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                          isCurrent
                            ? 'bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-[0_0_20px_rgba(6,182,212,0.5)] ring-2 ring-cyan-400/40'
                            : isActive
                            ? 'bg-slate-800 text-cyan-400 border border-cyan-500/30'
                            : 'bg-slate-900 border border-slate-800'
                        }`}
                      >
                        {renderIcon(step.iconType, isCurrent)}
                      </div>

                      <span
                        className={`font-mono text-sm font-bold transition-colors ${
                          isCurrent ? 'text-cyan-400 font-extrabold' : 'text-slate-500'
                        }`}
                      >
                        {step.step}
                      </span>
                    </div>

                    {/* Step Title & Tagline */}
                    <h3
                      className={`text-2xl font-bold font-display tracking-tight transition-colors ${
                        isCurrent ? 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'text-slate-200'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <div className="text-xs font-medium text-cyan-400 mt-1">
                      {step.tagline}
                    </div>

                    {/* Description */}
                    <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Deliverables List */}
                  <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-2">
                    {step.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2
                          className={`w-3.5 h-3.5 shrink-0 ${
                            isCurrent ? 'text-cyan-400' : 'text-slate-500'
                          }`}
                        />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
