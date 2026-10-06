import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useScrollProgress } from '../hooks/useScrollProgress.ts';
import { useMagneticButton } from '../hooks/useMagneticButton.ts';

interface NavbarProps {
  onOpenEnquiry: (planName?: string) => void;
}

const NAV_ITEMS = [
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'process', label: 'Process' },
  { id: 'plans', label: 'Plans' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnquiry }) => {
  const scrollProgress = useScrollProgress();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('services');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const magneticCta = useMagneticButton(5);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section spy
      const sections = NAV_ITEMS.map(item => document.getElementById(item.id)).filter(Boolean);
      const scrollPos = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 15. Scroll Progress Bar (approx 3px high, cyan/blue gradient) */}
      <div
        className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-slate-900/60 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 13. Top Navigation Bar (3-Zone Contract) */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-[#050811]/85 backdrop-blur-xl border-b border-slate-800/80 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Zone 1: Single element wordmark */}
          <a
            href="#"
            className="group flex items-center gap-3 text-xl font-bold tracking-tight font-display text-white transition-opacity hover:opacity-95 shrink-0"
          >
            <div className="relative w-9 h-9 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-cyan-400 to-blue-600 shadow-[0_0_15px_rgba(6,182,212,0.45)] group-hover:shadow-[0_0_22px_rgba(6,182,212,0.75)] transition-all shrink-0">
              <img
                src="/logo.png"
                alt="WS Web Studio Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <span className="text-slate-100">
              WS Web Studio
            </span>
          </a>

          {/* Zone 2: 4-6 nav links with animated underline */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-slate-900/50 border border-slate-800/60 backdrop-blur-md">
            {NAV_ITEMS.map(item => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={e => handleNavClick(e, item.id)}
                  className={`relative px-3.5 py-1.5 text-xs lg:text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive ? 'text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {item.label}
                  {/* Animated Active Underline */}
                  {isActive && (
                    <span
                      className="absolute bottom-0.5 left-3.5 right-3.5 h-[2px] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                      style={{ transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)' }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenEnquiry()}
              onMouseMove={magneticCta.handleMouseMove}
              onMouseLeave={magneticCta.handleMouseLeave}
              style={magneticCta.buttonStyle}
              className="shine-effect relative hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold tracking-wide text-white uppercase rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_20px_rgba(6,182,212,0.35)] transition-all duration-200 whitespace-nowrap active:scale-95"
            >
              <span>Get Started</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 text-cyan-200" />
            </button>

            {/* Mobile hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-3 pb-6 bg-[#070b18]/95 backdrop-blur-2xl border-b border-slate-800 shadow-2xl transition-all">
            <div className="flex flex-col space-y-1">
              {NAV_ITEMS.map(item => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={e => handleNavClick(e, item.id)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenEnquiry();
                  }}
                  className="w-full py-3 text-center text-sm font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
                >
                  Get Started — Free Discovery
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
