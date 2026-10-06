import { useState, useEffect } from 'react';

export interface ParallaxOffsets {
  backgroundX: number;
  backgroundY: number;
  graphicX: number;
  graphicY: number;
  cardX: number;
  cardY: number;
  isTouch: boolean;
}

export function useMouseParallax(): ParallaxOffsets {
  const [offsets, setOffsets] = useState<ParallaxOffsets>({
    backgroundX: 0,
    backgroundY: 0,
    graphicX: 0,
    graphicY: 0,
    cardX: 0,
    cardY: 0,
    isTouch: false,
  });

  useEffect(() => {
    // Detect touch capability to completely disable on mobile/touch
    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;

    if (isTouchDevice) {
      setOffsets(prev => ({ ...prev, isTouch: true }));
      return;
    }

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      // Normalized between -1 and 1 from center
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      targetX = (e.clientX - centerX) / centerX;
      targetY = (e.clientY - centerY) / centerY;
    };

    // Smooth lerp loop for 60fps cinematic feel
    const loop = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      // background: 5px opposite direction (-5)
      // graphic: 10px
      // floating cards: 15px
      setOffsets({
        backgroundX: -currentX * 6,
        backgroundY: -currentY * 6,
        graphicX: currentX * 10,
        graphicY: currentY * 10,
        cardX: currentX * 16,
        cardY: currentY * 16,
        isTouch: false,
      });

      animationFrameId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return offsets;
}
