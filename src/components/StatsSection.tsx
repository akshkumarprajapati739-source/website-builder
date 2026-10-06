import React, { useEffect, useRef, useState } from 'react';
import { StatItem } from '../types.ts';

const STATS_DATA: StatItem[] = [
  {
    id: 'projects',
    value: 50,
    suffix: '+',
    label: 'Websites Launched',
    context: 'High-conversion corporate & SaaS digital flagships',
  },
  {
    id: 'satisfaction',
    value: 100,
    suffix: '%',
    label: 'Client Satisfaction',
    context: 'Zero compromise on timelines, aesthetics & bug-free code',
  },
  {
    id: 'support',
    value: 24,
    suffix: '/7',
    label: 'Direct Support',
    context: 'Rapid engineering response & continuous maintenance',
  },
  {
    id: 'speed',
    value: 99,
    suffix: '%',
    label: 'Performance SLA',
    context: 'Average Google Lighthouse Core Web Vitals score',
  },
];

export const StatsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    projects: 0,
    satisfaction: 0,
    support: 0,
    speed: 0,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate once smoothly over 1.6s
          const duration = 1600;
          const startTime = performance.now();

          const step = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(1, elapsed / duration);
            // Ease out cubic
            const easedProgress = 1 - Math.pow(1 - progress, 3);

            const newCounts: { [key: string]: number } = {};
            STATS_DATA.forEach(stat => {
              newCounts[stat.id] = Math.floor(easedProgress * stat.value);
            });

            setCounts(newCounts);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              const finalCounts: { [key: string]: number } = {};
              STATS_DATA.forEach(stat => {
                finalCounts[stat.id] = stat.value;
              });
              setCounts(finalCounts);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      ref={containerRef}
      className="relative py-16 border-y border-slate-800/80 bg-[#060a16]/60 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {STATS_DATA.map((stat, idx) => (
            <div
              key={stat.id}
              className={`flex flex-col items-start transition-all duration-700 ${
                hasAnimated
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${idx * 120}ms` }}
            >
              {/* Stat number with tabular numerals */}
              <div className="flex items-baseline text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-white">
                <span className="tabular-nums font-mono text-cyan-400 drop-shadow-[0_0_12px_rgba(6,182,212,0.35)]">
                  {counts[stat.id]}
                </span>
                <span className="text-blue-400 text-3xl font-display ml-0.5">{stat.suffix}</span>
              </div>

              {/* Title */}
              <div className="mt-2 text-sm font-semibold uppercase tracking-wider text-slate-200">
                {stat.label}
              </div>

              {/* Context / Adjacency */}
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                {stat.context}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
