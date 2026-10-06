import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* 14. Tooltip: "Chat with us" sliding/fading in on hover */}
      <div
        className={`hidden sm:flex items-center px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 text-emerald-300 text-xs font-semibold shadow-xl backdrop-blur-md transition-all duration-300 ease-out pointer-events-none ${
          isHovered
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-3 pointer-events-none'
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 animate-ping" />
        <span>Chat with us</span>
      </div>

      {/* 14. Fixed WhatsApp Button with subtle floating movement, green glow, hover scale, soft pulse ring */}
      <a
        href="https://wa.me/916206184568"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with WS Web Studio on WhatsApp"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:shadow-[0_0_35px_rgba(16,185,129,0.8)] transition-all duration-300 hover:scale-110 active:scale-95 animate-float"
      >
        {/* Soft pulse ring */}
        <span className="absolute inset-0 rounded-full border-2 border-emerald-400/80 pulse-ring-anim pointer-events-none" />

        {/* WhatsApp Icon */}
        <MessageCircle className="w-7 h-7 fill-current text-white drop-shadow-[0_0_5px_rgba(0,0,0,0.4)]" />

        {/* Online Status Green Indicator Dot */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-300 border-2 border-[#050811] shadow-sm" />
      </a>
    </div>
  );
};
