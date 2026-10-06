import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink, ArrowUpRight, CheckCircle2, X } from 'lucide-react';
import { PortfolioProject } from '../types.ts';
import { useTiltCard } from '../hooks/useTiltCard.ts';
import novapayImg from '../assets/images/portfolio_fintech_dashboard_1791095472772.jpg';
import chronosImg from '../assets/images/portfolio_luxury_ecommerce_1791095487342.jpg';
import pulsemetricsImg from '../assets/images/portfolio_saas_analytics_1791095501710.jpg';

const PORTFOLIO_DATA: PortfolioProject[] = [
  {
    id: 'novapay',
    title: 'NovaPay Global',
    client: 'NovaPay Technologies Ltd.',
    category: 'Fintech & Investment Banking',
    impactMetric: '+215%',
    impactLabel: 'Increase in User Signups in 90 Days',
    image: novapayImg,
    description:
      'High-velocity banking platform interface built with real-time portfolio tracking, dark-mode glassmorphic aesthetics, and sub-100ms interaction latency.',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'WebSockets'],
    liveUrl: 'https://novapay-global.applet.internal',
  },
  {
    id: 'chronos',
    title: 'Chronos Atelier',
    client: 'Chronos Horology Geneva',
    category: 'Luxury E-Commerce & Horology',
    impactMetric: '3.4x',
    impactLabel: 'Higher Average Order Value',
    image: chronosImg,
    description:
      'Minimalist luxury watch storefront showcasing bespoke horological craftsmanship with dynamic 3D timepiece previews and zero-friction checkout.',
    technologies: ['React', 'Next.js Arch', 'Tailwind CSS', 'Stripe Integration', 'WebGL Preview'],
    liveUrl: 'https://chronos-atelier.luxury.internal',
  },
  {
    id: 'pulsemetrics',
    title: 'PulseMetrics Cloud',
    client: 'Pulse Corp. San Francisco',
    category: 'Cloud SaaS & AI Telemetry',
    impactMetric: '99.9%',
    impactLabel: 'Performance Score & Core Web Vitals',
    image: pulsemetricsImg,
    description:
      'Enterprise cloud monitoring platform delivering real-time telemetry graphs, predictive anomaly alerts, and instant team workspace collaboration.',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'D3 Charts', 'Edge Functions'],
    liveUrl: 'https://pulsemetrics-ai.cloud.internal',
  },
];

interface PortfolioCardProps {
  project: PortfolioProject;
  delayIndex: number;
  isVisible: boolean;
  onOpenDetails: (project: PortfolioProject) => void;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  project,
  delayIndex,
  isVisible,
  onOpenDetails,
}) => {
  const { handleMouseMove, handleMouseLeave, cardStyle, glareStyle, isHovered } = useTiltCard(5);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...cardStyle,
        transitionDelay: `${delayIndex * 120}ms`,
      }}
      className={`interactive-card group relative rounded-2xl overflow-hidden bg-[#070c1b] border border-slate-800 hover:border-cyan-500/50 shadow-2xl transition-all duration-500 flex flex-col ${
        isVisible
          ? 'opacity-100 translate-y-0 filter-none'
          : 'opacity-0 translate-y-12 blur-[4px]'
      }`}
    >
      {/* 5. 3D Glare effect */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-20 rounded-2xl"
        style={glareStyle}
      />

      {/* 12. Portfolio Image Container with Zoom & Pan */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
        <img
          src={project.image}
          alt={project.title}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover transition-transform duration-700 ease-out will-change-transform ${
            isHovered ? 'scale-108 translate-y-[-4px]' : 'scale-100 translate-y-0'
          }`}
          onError={e => {
            // Zero-broken-image fallback
            const target = e.currentTarget;
            target.style.display = 'none';
          }}
        />

        {/* 12. Dark Overlay appears on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/60 to-transparent transition-opacity duration-400 ${
            isHovered ? 'opacity-90' : 'opacity-40'
          }`}
        />

        {/* Category tag */}
        <div className="absolute top-4 left-4 z-10">
          <span className="text-xs font-mono font-medium text-slate-200 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/80 backdrop-blur-md">
            {project.category}
          </span>
        </div>

        {/* 12. Project information & View Project Button fading in */}
        <div
          className={`absolute inset-0 z-10 p-6 flex flex-col justify-end transition-all duration-300 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-90'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-cyan-400 font-mono font-semibold">
                {project.client}
              </div>
              <h3 className="text-2xl font-bold font-display text-white mt-1">
                {project.title}
              </h3>
            </div>

            {/* "View Project" Button appears on hover */}
            <button
              onClick={() => onOpenDetails(project)}
              className={`shine-effect px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs flex items-center gap-1.5 shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all duration-300 ${
                isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
              }`}
            >
              <span>View Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Card Details Body */}
      <div className="p-6 flex flex-col justify-between flex-1 border-t border-slate-800/80 bg-[#070c1b]/90">
        <div>
          <p className="text-sm text-slate-300 leading-relaxed">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.technologies.map(tech => (
              <span
                key={tech}
                className="text-[11px] font-mono text-slate-400 px-2.5 py-0.5 rounded bg-slate-900 border border-slate-800"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Proof of impact */}
        <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold font-mono text-emerald-400">
              {project.impactMetric}
            </span>
            <span className="text-xs text-slate-400">{project.impactLabel}</span>
          </div>

          <button
            onClick={() => onOpenDetails(project)}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
          >
            <span>Case Study</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

interface PortfolioSectionProps {
  onOpenEnquiry: (customDetails?: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onOpenEnquiry }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.12 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section id="portfolio" ref={containerRef} className="relative py-28 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-2xl">
            <div className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Selected Deployments
            </div>
            <h2
              className="mt-3 text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Proven architectural results for market leaders.
            </h2>
            <p className="mt-3 text-base text-slate-300">
              Explore recent digital flagships engineered for conversion performance, high user retention, and organic scale.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <button
              onClick={() => onOpenEnquiry('Portfolio Custom Website')}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors group cursor-pointer"
            >
              <span>Request custom project blueprint</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* 9. Staggered Portfolio Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {PORTFOLIO_DATA.map((project, idx) => (
            <PortfolioCard
              key={project.id}
              project={project}
              delayIndex={idx}
              isVisible={isVisible}
              onOpenDetails={proj => setSelectedProject(proj)}
            />
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="relative max-w-2xl w-full rounded-2xl bg-[#090e1f] border border-cyan-500/40 shadow-2xl p-6 sm:p-8 overflow-hidden">
            {/* Close button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="aspect-[16/9] w-full rounded-xl overflow-hidden mb-6 bg-slate-900 border border-slate-800">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span>{selectedProject.client}</span>
              <span>·</span>
              <span>{selectedProject.category}</span>
            </div>

            <h3 className="mt-2 text-2xl font-bold font-display text-white">
              {selectedProject.title}
            </h3>

            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              {selectedProject.description}
            </p>

            {/* Key Deliverables & Metric */}
            <div className="mt-6 p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400">Measured Outcome</div>
                <div className="text-sm font-semibold text-emerald-400 flex items-center gap-1.5 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{selectedProject.impactLabel} ({selectedProject.impactMetric})</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-slate-400">Core Web Vitals</div>
                <div className="text-sm font-mono font-bold text-cyan-400 mt-0.5">
                  99/100 Mobile & Desktop
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  const title = selectedProject.title;
                  setSelectedProject(null);
                  onOpenEnquiry(`Inspired by ${title}`);
                }}
                className="shine-effect flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs uppercase tracking-wider text-center shadow-lg shadow-cyan-500/25 cursor-pointer"
              >
                Build a Similar Website
              </button>
              <button
                onClick={() => setSelectedProject(null)}
                className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
