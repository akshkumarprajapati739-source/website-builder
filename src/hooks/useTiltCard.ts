import { useState, useCallback, useRef, useEffect } from 'react';

export interface TiltState {
  rotateX: number;
  rotateY: number;
  glareX: number;
  glareY: number;
  isHovered: boolean;
}

export function useTiltCard(maxTiltDegrees: number = 6) {
  const [tilt, setTilt] = useState<TiltState>({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
    isHovered: false,
  });

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
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt: mouse on right turns rotateY positive, mouse on top turns rotateX negative
      const rotateX = -((y - centerY) / centerY) * maxTiltDegrees;
      const rotateY = ((x - centerX) / centerX) * maxTiltDegrees;

      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;

      setTilt({
        rotateX: Math.max(-maxTiltDegrees, Math.min(maxTiltDegrees, rotateX)),
        rotateY: Math.max(-maxTiltDegrees, Math.min(maxTiltDegrees, rotateY)),
        glareX,
        glareY,
        isHovered: true,
      });
    },
    [maxTiltDegrees]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt(prev => ({
      ...prev,
      rotateX: 0,
      rotateY: 0,
      isHovered: false,
    }));
  }, []);

  const cardStyle: React.CSSProperties = {
    transform: tilt.isHovered
      ? `perspective(1000px) rotateX(${tilt.rotateX.toFixed(2)}deg) rotateY(${tilt.rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`
      : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: tilt.isHovered
      ? 'transform 120ms cubic-bezier(0.16, 1, 0.3, 1)'
      : 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1)',
    transformStyle: 'preserve-3d',
    willChange: tilt.isHovered ? 'transform' : 'auto',
  };

  const glareStyle: React.CSSProperties = {
    background: tilt.isHovered
      ? `radial-gradient(circle 280px at ${tilt.glareX}% ${tilt.glareY}%, rgba(56, 189, 248, 0.12), transparent 70%)`
      : 'none',
  };

  return {
    handleMouseMove,
    handleMouseLeave,
    cardStyle,
    glareStyle,
    isHovered: tilt.isHovered,
  };
}
