import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [fadingOut, setFadingOut] = useState(false);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 98) {
          clearInterval(progressTimer);
          return 100;
        }
        const increment = Math.floor(Math.random() * 22) + 12;
        return Math.min(100, prev + increment);
      });
    }, 140);

    const timer = setTimeout(() => {
      setFadingOut(true);
      const exitTimer = setTimeout(() => {
        onComplete();
      }, 550);
      return () => clearTimeout(exitTimer);
    }, 1150);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div
      role="status"
      aria-label="Loading WS Web Studio"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#040711] transition-opacity duration-500 ease-out ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Animated Gradient Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-600/20 via-blue-600/15 to-indigo-600/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute inset-0 tech-grid-bg opacity-30" />
      </div>

      {/* Central Brand Lockup */}
      <div className="relative flex flex-col items-center">
        {/* Rotating Circular Ring */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full -rotate-90 animate-[spin_6s_linear_infinite]" viewBox="0 0 100 100">
            {/* Background Ring Track */}
            <circle
              cx="50"
              cy="50"
              r="44"
              className="text-slate-800/80 stroke-current"
              strokeWidth="2"
              fill="transparent"
            />
            {/* Glowing Active Ring */}
            <circle
              cx="50"
              cy="50"
              r="44"
              className="text-cyan-400 stroke-current drop-shadow-[0_0_12px_rgba(6,182,212,0.8)]"
              strokeWidth="2.5"
              strokeDasharray="276"
              strokeDashoffset={276 - (276 * progress) / 100}
              strokeLinecap="round"
              fill="transparent"
              style={{ transition: 'stroke-dashoffset 200ms ease-out' }}
            />
          </svg>

          {/* Logo Container with Blue/Cyan Glow */}
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-cyan-400/60 flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.6)] transition-transform duration-1000 ease-out transform scale-100 bg-[#070b19]">
            <img
              src="/logo.png"
              alt="WS Web Studio Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* Brand Name & Loading Indicator */}
        <div className="mt-8 flex flex-col items-center">
          <div className="text-sm font-semibold tracking-[0.25em] uppercase text-slate-300 font-display flex items-center gap-2">
            <span>WS Web Studio</span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs font-mono text-cyan-400/80">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="tabular-nums font-mono">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
