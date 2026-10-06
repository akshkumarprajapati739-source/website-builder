import React, { useEffect, useRef } from 'react';

interface HeroBackgroundProps {
  offsetX?: number;
  offsetY?: number;
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({
  offsetX = 0,
  offsetY = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Floating particles setup - lightweight (30 particles)
    const particleCount = Math.min(35, Math.floor(width / 45));
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.8,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: -Math.random() * 0.4 - 0.1, // gently float upward
      opacity: Math.random() * 0.4 + 0.15,
      pulse: Math.random() * Math.PI,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render subtle glowing floating particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += 0.02;

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        const currentOpacity = p.opacity + Math.sin(p.pulse) * 0.15;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${Math.max(0.05, currentOpacity)})`;
        ctx.shadowColor = 'rgba(6, 182, 212, 0.4)';
        ctx.shadowBlur = 6;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      style={{
        transform: `translate3d(${offsetX}px, ${offsetY}px, 0)`,
        transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform',
      }}
    >
      {/* 1. Thin Animated Grid */}
      <div className="absolute inset-0 tech-grid-bg opacity-[0.25] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />

      {/* 2. Slowly moving cyan/blue gradient blobs */}
      <div
        className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[750px] h-[550px] bg-gradient-to-tr from-cyan-600/20 via-blue-600/15 to-transparent rounded-full blur-[130px] animate-float opacity-80"
        style={{ animationDuration: '14s' }}
      />
      <div
        className="absolute top-[25%] -left-[10%] w-[550px] h-[450px] bg-gradient-to-r from-blue-700/15 via-indigo-600/10 to-transparent rounded-full blur-[120px] animate-float-delayed opacity-70"
        style={{ animationDuration: '18s' }}
      />
      <div
        className="absolute top-[35%] -right-[10%] w-[500px] h-[450px] bg-gradient-to-l from-cyan-500/15 via-teal-600/10 to-transparent rounded-full blur-[120px] animate-float opacity-65"
        style={{ animationDuration: '16s' }}
      />

      {/* 3. Occasional subtle light sweep */}
      <div
        className="absolute -inset-x-full top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent animate-[button-shine_10s_ease-in-out_infinite]"
        style={{ opacity: 0.6 }}
      />

      {/* 4. Canvas floating particle layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
