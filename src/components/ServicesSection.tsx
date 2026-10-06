import React, { useRef, useState, useEffect } from 'react';
import { Globe, Smartphone, TrendingUp, Code2, ArrowUpRight, Check } from 'lucide-react';
import { ServiceItem } from '../types.ts';
import { useTiltCard } from '../hooks/useTiltCard.ts';

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'websites',
    number: '01',
    title: 'High-Conversion Business Websites',
    subtitle: 'Brand Flagships & SaaS Portals',
    description:
      'We architect tailored corporate websites engineered to build instant market authority and drive measurable inbound conversions.',
    iconType: 'website',
    metric: '+180% Avg. Inbound Conversion Rate',
    features: [
      'Tailored Apple-style minimalist aesthetic',
      'Ultra-fast sub-second loading speeds',
      'Interactive micro-animations & storytelling',
    ],
  },
  {
    id: 'mobile',
    number: '02',
    title: 'Mobile-First Responsive Experience',
    subtitle: 'Flawless Across Every Screen',
    description:
      'Engineered fluidly from 320px mobile screens to 4K displays. Touch-optimized navigation and silky 60fps gesture response.',
    iconType: 'mobile',
    metric: '100% Mobile Usability Score',
    features: [
      'Adaptive layouts for mobile & tablet',
      'Zero layout shifts (CLS < 0.01)',
      'Thumb-friendly ergonomically placed CTAs',
    ],
  },
  {
    id: 'growth',
    number: '03',
    title: 'Growth & SEO Performance Engines',
    subtitle: 'Organic Visibility & Lead Flow',
    description:
      'Deep semantic HTML markup, OpenGraph social engines, structured Schema data, and Core Web Vitals tuned for top search rankings.',
    iconType: 'growth',
    metric: 'Top 3 Organic Search Rankings',
    features: [
      'Technical SEO & OpenGraph card automation',
      'Integrated Google Analytics & Event Tracking',
      'Speed-optimized assets & zero bloat',
    ],
  },
  {
    id: 'custom',
    number: '04',
    title: 'Custom Architecture & Web Apps',
    subtitle: 'Bespoke Logic & Client Portals',
    description:
      'Beyond cookie-cutter templates. Custom React, TypeScript, and interactive dashboards configured specifically for your workflow.',
    iconType: 'custom',
    metric: 'Zero Legacy Bloat Guarantee',
    features: [
      'Modular TypeScript component architecture',
      'Seamless API & CRM backend connections',
      'Continuous maintenance & security updates',
    ],
  },
];

interface ServiceCardProps {
  service: ServiceItem;
  delayIndex: number;
  isVisible: boolean;
  onSelect: (serviceTitle: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  delayIndex,
  isVisible,
  onSelect,
}) => {
  const { handleMouseMove, handleMouseLeave, cardStyle, glareStyle, isHovered } = useTiltCard(6);

  // 18. Service Card Icon Animation logic on hover
  const renderIcon = () => {
    switch (service.iconType) {
      case 'website':
        // small bounce/scale
        return (
          <div
            className={`w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center transition-all duration-300 ${
              isHovered ? '-translate-y-1.5 scale-110 shadow-[0_0_20px_rgba(6,182,212,0.4)]' : ''
            }`}
          >
            <Globe className="w-6 h-6" />
          </div>
        );
      case 'mobile':
        // small vertical movement
        return (
          <div
            className={`w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center transition-all duration-300 ${
              isHovered ? 'translate-y-[-4px] scale-110 shadow-[0_0_20px_rgba(59,130,246,0.4)]' : ''
            }`}
          >
            <Smartphone className="w-6 h-6" />
          </div>
        );
      case 'growth':
        // chart rises
        return (
          <div
            className={`w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center transition-all duration-300 ${
              isHovered ? '-translate-y-2 scale-110 shadow-[0_0_20px_rgba(16,185,129,0.4)]' : ''
            }`}
          >
            <TrendingUp className="w-6 h-6" />
          </div>
        );
      case 'custom':
        // code symbols pulse/move
        return (
          <div
            className={`w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center transition-all duration-300 ${
              isHovered ? 'rotate-[-6deg] scale-110 shadow-[0_0_20px_rgba(99,102,241,0.4)]' : ''
            }`}
          >
            <Code2 className="w-6 h-6" />
          </div>
        );
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...cardStyle,
        transitionDelay: `${delayIndex * 100}ms`,
      }}
      className={`interactive-card relative rounded-2xl p-7 bg-[#080d1e]/80 border border-slate-800 hover:border-cyan-500/40 shadow-xl transition-all duration-500 flex flex-col justify-between group overflow-hidden ${
        isVisible
          ? 'opacity-100 translate-y-0 filter-none'
          : 'opacity-0 translate-y-10 blur-[5px]'
      }`}
    >
      {/* 5. 3D Glare follower */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-2xl"
        style={glareStyle}
      />

      {/* Top Bar: Editorial index & animated icon */}
      <div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-semibold text-slate-500 group-hover:text-cyan-400 transition-colors">
            {service.number}
          </span>
          {renderIcon()}
        </div>

        {/* Title & Subtitle */}
        <h3 className="mt-6 text-xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
          {service.title}
        </h3>
        <p className="mt-1 text-xs font-medium text-cyan-400/80">
          {service.subtitle}
        </p>

        {/* Description */}
        <p className="mt-3 text-sm text-slate-300 leading-relaxed">
          {service.description}
        </p>

        {/* Feature bullet list */}
        <div className="mt-5 space-y-2 pt-4 border-t border-slate-800/80">
          {service.features.map((feat, fIdx) => (
            <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-300">
              <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar with outcome metric & action */}
      <div className="mt-7 pt-4 border-t border-slate-800/80 flex items-center justify-between">
        <div className="text-xs text-slate-400">
          <span className="font-mono text-cyan-400 font-semibold">{service.metric}</span>
        </div>

        <button
          onClick={() => onSelect(service.title)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer group-hover:translate-x-1 duration-200"
        >
          <span>Enquire</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
        </button>
      </div>
    </div>
  );
};

interface ServicesSectionProps {
  onOpenEnquiry: (planOrService?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenEnquiry }) => {
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
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={containerRef} className="relative py-28 overflow-hidden">
      {/* Background glow shape */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`max-w-2xl transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-8 blur-[5px]'
          }`}
        >
          <div className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Capabilities & Solutions
          </div>
          <h2
            className="mt-3 text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Engineering websites that act as your highest-performing sales channel.
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            Every website is custom engineered from ground up. No generic bloated WordPress themes.
            Zero sluggish script payloads. Pure speed, precision design, and clear conversion pathways.
          </p>
        </div>

        {/* 9. Staggered Service Cards Grid (0ms, 100ms, 200ms, 300ms) with 3D tilt */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1000">
          {SERVICES_DATA.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              delayIndex={index}
              isVisible={isVisible}
              onSelect={title => onOpenEnquiry(title)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
