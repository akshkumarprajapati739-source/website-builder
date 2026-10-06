import React from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#04060d] border-t border-slate-800/80 py-16 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-slate-800/80">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-cyan-400 to-blue-600 shadow-[0_0_15px_rgba(6,182,212,0.4)] shrink-0">
                <img
                  src="/logo.png"
                  alt="WS Web Studio Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="text-xl font-bold font-display text-white">
                WS Web Studio
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-400 max-w-sm">
              Engineering high-performance web applications and digital flagships with fluid 60fps animations.
            </p>
          </div>

          {/* Navigation Links Mirror */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300">
            <a href="#services" className="hover:text-cyan-400 transition-colors">Services</a>
            <a href="#portfolio" className="hover:text-cyan-400 transition-colors">Portfolio</a>
            <a href="#process" className="hover:text-cyan-400 transition-colors">Process</a>
            <a href="#plans" className="hover:text-cyan-400 transition-colors">Plans</a>
            <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
          </div>

          {/* Scroll to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>

        {/* Bottom copyright & direct details */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} WS Web Studio. All rights reserved.
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <span>Direct WhatsApp: +91 6206184568</span>
            <span>·</span>
            <span>Worldwide Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
