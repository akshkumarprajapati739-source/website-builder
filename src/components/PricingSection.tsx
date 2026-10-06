import React, { useRef, useState, useEffect } from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { PricingPlan } from '../types.ts';
import { useTiltCard } from '../hooks/useTiltCard.ts';
import { useMagneticButton } from '../hooks/useMagneticButton.ts';

const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter Flagship',
    tagline: 'Ideal for small businesses & agile product launches',
    price: '₹5,999',
    originalPrice: '₹8,999',
    period: 'one-time investment',
    deliveryTime: '5 – 7 Business Days',
    description:
      'A sleek, high-conversion single-page digital flagship designed to establish credibility and capture inbound leads.',
    features: [
      'Bespoke modern UI/UX design (No cookie-cutter themes)',
      '100% mobile-first fluid responsive layout',
      'Sub-second page load speed (95+ Lighthouse)',
      'Direct WhatsApp click-to-chat integration',
      'Technical SEO meta tags & OpenGraph social cards',
      'Interactive contact enquiry form',
      '30 days post-launch warranty support',
    ],
    ctaText: 'Get Started with Starter',
  },
  {
    id: 'growth',
    name: 'Growth Flagship',
    tagline: 'Engineered for scaling brands & market competitors',
    isPopular: true,
    price: '₹8,999',
    originalPrice: '₹12,999',
    period: 'one-time investment',
    deliveryTime: '10 – 14 Business Days',
    description:
      'Complete multi-page high-performance web experience with custom micro-animations, 3D card tilt, and lead engines.',
    features: [
      'Comprehensive multi-page architecture (5–8 key pages)',
      'Custom 60fps interactive animations & micro-interactions',
      'Advanced 3D interactive portfolio & card tilt mechanics',
      'High-velocity conversion copywriting structure',
      'Complete Google Analytics 4 & Meta Pixel integration',
      'Advanced technical SEO & Schema.org rich snippets',
      'Priority direct WhatsApp & video engineering support',
      '60 days continuous optimization & updates',
    ],
    ctaText: 'Get Started with Growth',
  },
  {
    id: 'enterprise',
    name: 'Custom Architecture',
    tagline: 'Bespoke web applications & complex portals',
    price: '₹12,999',
    originalPrice: '₹17,999',
    period: 'starting estimate',
    deliveryTime: '2 – 3 Weeks Sprint',
    description:
      'Tailored full-stack digital platform engineered with custom business logic, interactive dashboards, and seamless API integrations.',
    features: [
      'Tailored React & TypeScript enterprise architecture',
      'Custom client portals, calculators, or interactive tools',
      'Full API backend & CRM webhook integrations',
      'State-of-the-art security, authentication & encryption',
      'Dedicated lead management automation flow',
      'Comprehensive Core Web Vitals SLA guarantee',
      'Unlimited revisions during staging review',
      '90 days VIP direct engineering SLA support',
    ],
    ctaText: 'Request Custom Website',
  },
];

interface PricingCardProps {
  plan: PricingPlan;
  delayIndex: number;
  isVisible: boolean;
  onSelectPlan: (planName: string) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  delayIndex,
  isVisible,
  onSelectPlan,
}) => {
  const { handleMouseMove, handleMouseLeave, cardStyle, glareStyle, isHovered } = useTiltCard(
    plan.isPopular ? 6 : 5
  );
  const magneticButton = useMagneticButton(5);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...cardStyle,
        transitionDelay: `${delayIndex * 120}ms`,
      }}
      className={`interactive-card relative rounded-3xl p-8 transition-all duration-500 flex flex-col justify-between group ${
        plan.isPopular
          ? 'bg-gradient-to-b from-[#0c1638] via-[#09112e] to-[#060b1e] border-2 border-cyan-400/80 shadow-[0_0_40px_rgba(6,182,212,0.28)] z-10 scale-[1.03]'
          : 'bg-[#070c1a]/90 border border-slate-800 hover:border-slate-700 shadow-xl'
      } ${
        isVisible
          ? 'opacity-100 translate-y-0 filter-none'
          : 'opacity-0 translate-y-12 blur-[4px]'
      }`}
    >
      {/* 5. Cursor Glare effect */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-3xl"
        style={glareStyle}
      />

      {/* 11. Most Popular Floating Badge */}
      {plan.isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <div className="animate-float px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-500 text-slate-950 font-extrabold text-[11px] uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(6,182,212,0.6)] flex items-center gap-1.5 whitespace-nowrap">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>Most Popular</span>
          </div>
        </div>
      )}

      {/* 11. Subtle Pulse Glow for Most Popular */}
      {plan.isPopular && (
        <div className="absolute inset-0 rounded-3xl bg-cyan-500/5 pulse-ring-anim pointer-events-none" />
      )}

      {/* Plan Header */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold font-display text-white">
            {plan.name}
          </h3>
          <span className="text-xs font-mono text-cyan-400 px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20">
            {plan.deliveryTime}
          </span>
        </div>

        <p className="mt-2 text-xs text-slate-300">
          {plan.tagline}
        </p>

        {/* Pricing tag with tabular numbers */}
        <div className="mt-6 flex items-baseline gap-2">
          <span className="text-4xl sm:text-5xl font-extrabold font-mono text-white tracking-tight tabular-nums">
            {plan.price}
          </span>
          {plan.originalPrice && (
            <span className="text-sm line-through text-slate-500 font-mono">
              {plan.originalPrice}
            </span>
          )}
          <span className="text-xs text-slate-400 font-sans">
            / {plan.period}
          </span>
        </div>

        <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {plan.description}
        </p>

        {/* Features Checklist */}
        <div className="mt-8 space-y-3 pt-6 border-t border-slate-800">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
            What is included:
          </div>
          {plan.features.map((feat, fIdx) => (
            <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
              <div
                className={`mt-0.5 rounded-full p-0.5 shrink-0 ${
                  plan.isPopular
                    ? 'bg-cyan-500 text-slate-950'
                    : 'bg-slate-800 text-cyan-400'
                }`}
              >
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span className="leading-tight">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-8 pt-6 border-t border-slate-800">
        <button
          onClick={() => onSelectPlan(plan.name)}
          onMouseMove={magneticButton.handleMouseMove}
          onMouseLeave={magneticButton.handleMouseLeave}
          style={magneticButton.buttonStyle}
          className={`shine-effect w-full py-3.5 px-6 rounded-xl font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${
            plan.isPopular
              ? 'bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold shadow-[0_0_30px_rgba(6,182,212,0.45)]'
              : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-600'
          }`}
        >
          <span>{plan.ctaText}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

interface PricingSectionProps {
  onOpenEnquiry: (planName: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenEnquiry }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
    <section id="plans" ref={containerRef} className="relative py-28 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center max-w-3xl mx-auto transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Transparent Investment
          </div>
          <h2
            className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Clear pricing. Zero hidden fees. Built to scale your business.
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Choose the ideal deployment sprint for your company. Every package includes our 60fps performance guarantee and responsive verification.
          </p>
        </div>

        {/* 9. Staggered Pricing Cards Grid with 3D tilt */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch perspective-1000">
          {PRICING_PLANS.map((plan, idx) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              delayIndex={idx}
              isVisible={isVisible}
              onSelectPlan={planName => onOpenEnquiry(planName)}
            />
          ))}
        </div>

        {/* Money back / Quality guarantee note */}
        <div
          className={`mt-14 max-w-2xl mx-auto p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-center gap-4 text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
          <div className="text-xs text-slate-300 text-left">
            <span className="font-semibold text-white">Quality Guarantee:</span> We conduct milestone check-ins throughout design and development. You review live interactive prototypes before final release.
          </div>
        </div>
      </div>
    </section>
  );
};
