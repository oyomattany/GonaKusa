import React from 'react';
import { Tractor, MapPin, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigateToLanding: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToLanding }) => {
  return (
    <footer className="bg-emerald-950 text-emerald-100 border-t border-emerald-900 py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-700 flex items-center justify-center text-white shrink-0">
                <Tractor className="w-5 h-5" />
              </div>
              <span className="font-heading text-xl font-bold tracking-tight text-white">
                Gona<span className="text-emerald-400">Kusa</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-200/80 max-w-sm leading-relaxed">
              <span className="text-white font-semibold">GonaKusa</span> — Bringing Farm Machines Closer. Agricultural mechanisation platform connecting smallholder farmers with machinery operators through smart farmer clustering.
            </p>
            <div className="flex items-start gap-2 text-xs text-emerald-300 font-medium pt-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>Pilot Location: Assakio, Lafia East LGA, Nasarawa State, Nigeria</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-emerald-200/80">
              <li>
                <button 
                  onClick={onNavigateToLanding} 
                  className="hover:text-white transition py-1 cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition py-1 block">
                  How Clustering Works
                </a>
              </li>
              <li>
                <a href="#request-form" className="hover:text-white transition py-1 block">
                  Request a Machine
                </a>
              </li>
              <li>
                <a href="#cluster-demo" className="hover:text-white transition py-1 block">
                  Clustering Demo
                </a>
              </li>
            </ul>
          </div>

          {/* Mission & Pilot Focus */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Assakio Pilot
            </h4>
            <p className="text-xs text-emerald-200/80 leading-relaxed">
              Eliminating the mechanisation gap for smallholder cassava, yam, maize, and rice farmers across Nasarawa State.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-amber-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Serving Assakio & surrounding farming communities</span>
            </div>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-emerald-400 text-center sm:text-left">
          <p>© {new Date().getFullYear()} GonaKusa. Bringing Farm Machines Closer — Starting in Assakio, Nasarawa State.</p>
          <p>Connecting smallholder farmers to tractor power.</p>
        </div>
      </div>
    </footer>
  );
};
