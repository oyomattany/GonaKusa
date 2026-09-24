import React, { useState } from 'react';
import { Tractor, ArrowLeft, Menu, X, Layers, Calendar, Command } from 'lucide-react';

interface NavbarProps {
  currentView: 'landing' | 'provider';
  onNavigate: (view: 'landing' | 'provider') => void;
  openClustersCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: 'landing' | 'provider', hash?: string) => {
    setMobileMenuOpen(false);
    onNavigate(view);
    if (hash && view === 'landing') {
      setTimeout(() => {
        const el = document.querySelector(hash);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-950/10 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo & Hub Info */}
          <div 
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-700 flex items-center justify-center text-white shadow-sm group-hover:bg-emerald-800 transition-colors shrink-0">
              <Tractor className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-heading text-lg sm:text-xl font-bold tracking-tight text-emerald-950 truncate">
                  Gona<span className="text-emerald-700">Kusa</span>
                </span>
                <span className="hidden xs:inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
                  Assakio Pilot
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-stone-500 font-medium truncate">
                Bringing Farm Machines Closer
              </p>
            </div>
          </div>

          {/* Desktop Navigation & Actions */}
          <div className="hidden md:flex items-center gap-5">
            {currentView === 'landing' ? (
              <>
                <nav className="flex items-center gap-6 text-sm font-medium text-stone-600">
                  <a href="#how-it-works" className="hover:text-emerald-800 transition-colors">
                    How It Works
                  </a>
                  <a href="#cluster-demo" className="hover:text-emerald-800 transition-colors flex items-center gap-1.5">
                    <span>Clustering Demo</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                  </a>
                </nav>

                <div className="flex items-center gap-3">
                  <a
                    href="#request-form"
                    className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] transition shadow-xs"
                  >
                    Request a Machine
                  </a>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300">
                  <Command className="w-3.5 h-3.5" />
                  <span>Operator Portal (Active)</span>
                </span>
                <button
                  onClick={() => onNavigate('landing')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-emerald-950 bg-stone-100 hover:bg-stone-200 active:scale-[0.98] transition border border-stone-200 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Farmer View</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2">
            {currentView === 'landing' ? (
              <>
                <a
                  href="#request-form"
                  className="inline-flex items-center justify-center px-3 py-2 rounded-lg text-xs font-bold text-white bg-emerald-700 active:scale-[0.97] transition shadow-xs"
                >
                  Request
                </a>
              </>
            ) : (
              <button
                onClick={() => onNavigate('landing')}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-bold text-emerald-950 bg-stone-100 border border-stone-200 active:scale-[0.97] transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Farmer View</span>
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer / Slide-Down Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-5 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 px-2">
            Navigation Menu
          </div>

          <div className="space-y-1">
            <button
              onClick={() => handleNavClick('landing', '#how-it-works')}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-stone-800 hover:bg-stone-50 transition text-left"
            >
              <span>How It Works (4 Steps)</span>
              <span className="text-xs text-stone-400">→</span>
            </button>

            <button
              onClick={() => handleNavClick('landing', '#cluster-demo')}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-stone-800 hover:bg-stone-50 transition text-left"
            >
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-700" />
                <span>Live Clustering Demo</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                Live
              </span>
            </button>

            <button
              onClick={() => handleNavClick('landing', '#request-form')}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-emerald-950 bg-emerald-50/80 hover:bg-emerald-100 transition text-left"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-700" />
                <span>Request a Machine (Booking Form)</span>
              </div>
              <span className="text-xs text-emerald-700 font-bold">Open</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
