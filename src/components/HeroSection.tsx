import React from 'react';
import { ArrowUpRight, MessageCircle, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { HeroBackground } from './HeroBackground.tsx';
import { useMouseParallax } from '../hooks/useMouseParallax.ts';
import { useMagneticButton } from '../hooks/useMagneticButton.ts';

interface HeroSectionProps {
  onOpenEnquiry: (planName?: string) => void;
  isReady: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenEnquiry, isReady }) => {
  const parallax = useMouseParallax();

  // Magnetic CTA buttons
  const magneticGetStarted = useMagneticButton(6);
  const magneticViewPlans = useMagneticButton(6);
  const magneticWhatsApp = useMagneticButton(6);

  const scrollToPlans = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('plans');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 overflow-hidden">
      {/* 3. Animated Hero Background with 5px subtle mouse parallax */}
      <HeroBackground
        offsetX={parallax.isTouch ? 0 : parallax.backgroundX}
        offsetY={parallax.isTouch ? 0 : parallax.backgroundY}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Staggered Content Sequence */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Sequence 1: Logo & Studio Monogram (0.1s delay) */}
            <div
              className={`transition-all duration-700 ease-out flex items-center gap-3 ${
                isReady
                  ? 'opacity-100 scale-100 translate-y-0'
                  : 'opacity-0 scale-90 translate-y-4'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              <div className="relative w-10 h-10 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-cyan-400 to-blue-600 shadow-[0_0_20px_rgba(6,182,212,0.5)] shrink-0">
                <img
                  src="/logo.png"
                  alt="WS Web Studio Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-cyan-400 font-mono">
                WS Web Studio · Engineering & Design
              </span>
            </div>

            {/* Sequence 2: Small Tagline (0.2s delay) */}
            <div
              className={`mt-4 transition-all duration-700 ease-out ${
                isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-300 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-300 font-medium">Accepting Q2/Q3 Web Development Projects</span>
                <span className="text-slate-500 font-light">·</span>
                <span className="text-cyan-400 font-medium">Bespoke Architecture</span>
              </div>
            </div>

            {/* Sequence 3: Main Heading (0.35s delay) with masked upward text reveal */}
            <div
              className={`mt-6 overflow-hidden transition-all duration-800 ease-out ${
                isReady ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: '350ms' }}
            >
              <h1
                className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-white leading-[1.08] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isReady ? 'translate-y-0' : 'translate-y-full'
                }`}
                style={{ textWrap: 'balance' }}
              >
                WE BUILD{' '}
                <span className="animate-gradient-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                  WEBSITES
                </span>{' '}
                THAT{' '}
                <span className="animate-gradient-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400 bg-clip-text text-transparent">
                  GROW
                </span>{' '}
                YOUR{' '}
                <span className="animate-gradient-text bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  BUSINESS
                </span>
                .
              </h1>
            </div>

            {/* Sequence 4: Description (0.55s delay) */}
            <p
              className={`mt-6 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed transition-all duration-700 ease-out ${
                isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '550ms' }}
            >
              We craft high-performance websites that transform passive visitors into qualified leads.
              Engineered with clean modern aesthetics, 60fps fluid responsiveness, and battle-tested conversion architecture.
            </p>

            {/* Sequence 5: Magnetic Action Buttons (0.7s delay) */}
            <div
              className={`mt-8 flex flex-wrap items-center gap-4 transition-all duration-700 ease-out ${
                isReady ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
              }`}
              style={{ transitionDelay: '700ms' }}
            >
              {/* Primary: Get Started */}
              <button
                onClick={() => onOpenEnquiry()}
                onMouseMove={magneticGetStarted.handleMouseMove}
                onMouseLeave={magneticGetStarted.handleMouseLeave}
                style={magneticGetStarted.buttonStyle}
                className="shine-effect relative px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm shadow-[0_0_25px_rgba(6,182,212,0.4)] flex items-center gap-2 transition-shadow cursor-pointer active:scale-95"
              >
                <span>Get Started</span>
                <ArrowUpRight className="w-4 h-4 text-cyan-100" />
              </button>

              {/* Secondary: View Plans */}
              <a
                href="#plans"
                onClick={scrollToPlans}
                onMouseMove={magneticViewPlans.handleMouseMove}
                onMouseLeave={magneticViewPlans.handleMouseLeave}
                style={magneticViewPlans.buttonStyle}
                className="shine-effect relative px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 text-slate-200 border border-slate-700/80 font-semibold text-sm backdrop-blur-md shadow-lg shadow-black/20 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>View Plans</span>
                <span className="text-cyan-400 font-mono text-xs">→</span>
              </a>

              {/* WhatsApp Quick CTA */}
              <a
                href="https://wa.me/916206184568"
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={magneticWhatsApp.handleMouseMove}
                onMouseLeave={magneticWhatsApp.handleMouseLeave}
                style={magneticWhatsApp.buttonStyle}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-500/30 text-emerald-300 font-medium text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Micro Trust Proof */}
            <div
              className={`mt-10 flex flex-wrap items-center gap-6 text-xs text-slate-400 transition-all duration-700 ${
                isReady ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: '780ms' }}
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>60fps Native Performance</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Responsive Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Zero Slop · Production Clean</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Interactive Graphic with 10px & 15px Mouse Parallax (0.85s delay) */}
          <div
            className={`lg:col-span-5 relative transition-all duration-1000 ease-out ${
              isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '850ms' }}
          >
            {/* Graphic Container with Parallax (10px) */}
            <div
              className="relative rounded-2xl p-1 bg-gradient-to-b from-cyan-500/30 via-slate-800/40 to-slate-900/80 shadow-[0_0_50px_rgba(6,182,212,0.18)]"
              style={{
                transform: parallax.isTouch
                  ? 'none'
                  : `translate3d(${parallax.graphicX}px, ${parallax.graphicY}px, 0)`,
                transition: 'transform 250ms cubic-bezier(0.16, 1, 0.3, 1)',
                willChange: 'transform',
              }}
            >
              {/* Inner Dashboard Glass Mockup */}
              <div className="rounded-[15px] bg-[#070d1e]/90 backdrop-blur-2xl border border-slate-700/60 p-6 overflow-hidden">
                {/* Window Chrome Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="px-3 py-1 rounded-md bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-cyan-400/90 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    <span>ws-studio-core.app</span>
                  </div>
                  <Sparkles className="w-4 h-4 text-cyan-400/70" />
                </div>

                {/* Dashboard Metrics Content */}
                <div className="mt-5 space-y-4">
                  {/* Revenue / Conversion Growth Graph Mockup */}
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">Conversion Velocity</span>
                      <span className="text-emerald-400 font-mono font-semibold">+342% ROI</span>
                    </div>
                    {/* SVG Graphic with glowing curve */}
                    <div className="mt-3 h-24 w-full">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 280 80" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="heroGraphGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.45" />
                            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M0,65 Q40,55 80,45 T160,25 T240,15 L280,8 L280,80 L0,80 Z"
                          fill="url(#heroGraphGradient)"
                        />
                        <path
                          d="M0,65 Q40,55 80,45 T160,25 T240,15 L280,8"
                          fill="none"
                          stroke="#22d3ee"
                          strokeWidth="3"
                          strokeLinecap="round"
                          className="drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                        />
                        {/* Data point dot */}
                        <circle cx="280" cy="8" r="4" fill="#38bdf8" className="animate-ping" />
                        <circle cx="280" cy="8" r="4" fill="#ffffff" />
                      </svg>
                    </div>
                  </div>

                  {/* Two Mini Stat Tiles */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
                      <div className="text-[11px] text-slate-400 uppercase tracking-wider">Page Speed</div>
                      <div className="text-xl font-bold font-mono text-cyan-300 mt-1 flex items-baseline gap-1">
                        <span>99</span>
                        <span className="text-xs text-slate-500 font-sans">/ 100</span>
                      </div>
                      <div className="mt-1 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full w-[99%]" />
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
                      <div className="text-[11px] text-slate-400 uppercase tracking-wider">Frame Rate</div>
                      <div className="text-xl font-bold font-mono text-emerald-400 mt-1 flex items-baseline gap-1">
                        <span>60</span>
                        <span className="text-xs text-slate-500 font-sans">FPS</span>
                      </div>
                      <div className="mt-1 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full w-[100%]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Card 1: 15px Parallax */}
            <div
              className="absolute -top-6 -left-6 rounded-xl bg-slate-900/90 border border-cyan-500/30 p-3.5 shadow-2xl backdrop-blur-xl hidden sm:flex items-center gap-3 animate-float"
              style={{
                transform: parallax.isTouch
                  ? 'none'
                  : `translate3d(${parallax.cardX * 0.9}px, ${parallax.cardY * 0.9}px, 0)`,
                transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)',
                willChange: 'transform',
              }}
            >
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
                ⚡
              </div>
              <div>
                <div className="text-xs font-semibold text-white">Ultra-Fast Load</div>
                <div className="text-[10px] text-slate-400 font-mono">0.38s First Paint</div>
              </div>
            </div>

            {/* Floating Card 2: 15px Parallax Opposite Float */}
            <div
              className="absolute -bottom-6 -right-4 rounded-xl bg-slate-900/90 border border-blue-500/30 p-3.5 shadow-2xl backdrop-blur-xl hidden sm:flex items-center gap-3 animate-float-delayed"
              style={{
                transform: parallax.isTouch
                  ? 'none'
                  : `translate3d(${-parallax.cardX * 0.8}px, ${-parallax.cardY * 0.8}px, 0)`,
                transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)',
                willChange: 'transform',
              }}
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                ✓
              </div>
              <div>
                <div className="text-xs font-semibold text-white">High Conversion UX</div>
                <div className="text-[10px] text-slate-400 font-mono">Enterprise Standard</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
