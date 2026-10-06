import { useState, useCallback, useRef, useEffect } from 'react';

export function useMagneticButton(maxOffset: number = 7) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const isTouchRef = useRef(false);

  useEffect(() => {
    isTouchRef.current =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (isTouchRef.current) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);

      setOffset({
        x: Math.max(-maxOffset, Math.min(maxOffset, deltaX * maxOffset)),
        y: Math.max(-maxOffset, Math.min(maxOffset, deltaY * maxOffset)),
      });
      setIsHovered(true);
    },
    [maxOffset]
  );

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  const buttonStyle: React.CSSProperties = {
    transform: isHovered
      ? `translate3d(${offset.x.toFixed(1)}px, ${offset.y.toFixed(1)}px, 0px) scale(1.03)`
      : 'translate3d(0px, 0px, 0px) scale(1)',
    transition: isHovered
      ? 'transform 150ms cubic-bezier(0.16, 1, 0.3, 1)'
      : 'transform 450ms cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: isHovered ? 'transform' : 'auto',
  };

  return {
    handleMouseMove,
    handleMouseLeave,
    buttonStyle,
    isHovered,
  };
}
