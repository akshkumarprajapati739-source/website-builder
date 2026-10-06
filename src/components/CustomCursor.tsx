import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    const isTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;

    if (isTouch) return;
    setMounted(true);

    let mouseX = -100;
    let mouseY = -100;
    let followerX = -100;
    let followerY = -100;
    let animFrame: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);

      // Check if hovering clickable
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = Boolean(
          target.closest('button') ||
          target.closest('a') ||
          target.closest('[role="button"]') ||
          target.closest('.interactive-card') ||
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA'
        );
        setIsHoveringClickable(isClickable);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const updatePosition = () => {
      // Small lag/inertia for glowing follower
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
      }

      animFrame = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    animFrame = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  if (!mounted || !isVisible) return null;

  return (
    <>
      {/* Precision inner dot following exact cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
        style={{ willChange: 'transform' }}
      >
        <div
          className={`rounded-full bg-cyan-400 transition-all duration-200 ${
            isHoveringClickable
              ? 'w-2 h-2 opacity-0'
              : 'w-1.5 h-1.5 opacity-80 shadow-[0_0_8px_rgba(34,211,238,0.9)]'
          }`}
        />
      </div>

      {/* Trailing soft glowing ring / aura */}
      <div
        ref={followerRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
        style={{ willChange: 'transform' }}
      >
        <div
          className={`rounded-full border border-cyan-400/40 transition-all duration-200 ${
            isHoveringClickable
              ? 'w-10 h-10 -m-5 bg-cyan-500/15 border-cyan-400/70 shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-110'
              : 'w-7 h-7 -m-3.5 bg-cyan-500/5 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
          }`}
        />
      </div>
    </>
  );
};
