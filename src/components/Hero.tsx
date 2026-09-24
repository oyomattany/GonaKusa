import React from 'react';
import { ArrowDown, CheckCircle2, MapPin, Users, Tractor } from 'lucide-react';
import heroImage from '../assets/images/mechanise_hero_1790237819690.jpg';

interface HeroProps {
  onExploreClusters: () => void;
  onRequestClick: () => void;
  activeClusterStats: {
    totalClusters: number;
    openClusters: number;
    combinedHectares: number;
  };
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClusters,
  onRequestClick,
  activeClusterStats,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-stone-50 to-white pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-16 lg:pb-24 border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Core Message */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
            {/* Location Pill */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-emerald-100/90 text-emerald-900 border border-emerald-300 text-xs sm:text-sm font-semibold shadow-xs max-w-full">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-700 shrink-0" />
              <span className="truncate">Starting in Assakio, Nasarawa State, Nigeria</span>
            </div>

            {/* Exact Headline as specified */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-emerald-950 leading-[1.15]">
              Farm Machines, <br className="hidden sm:inline" />
              <span className="text-emerald-700 underline decoration-amber-400 decoration-wavy decoration-2">
                When You Need Them.
              </span>
            </h1>

            {/* Exact Text as specified */}
            <p className="text-base sm:text-lg lg:text-xl text-stone-700 max-w-2xl font-normal leading-relaxed">
              Book mechanisation services and join nearby farmers to make machinery more accessible.
            </p>

            {/* Value Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-1">
              <div className="flex items-center gap-2 text-stone-700 text-xs sm:text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Small plots welcome (0.5+ ha)</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700 text-xs sm:text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Nearby farm clustering</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700 text-xs sm:text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Local tractor operators</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="#request-form"
                onClick={onRequestClick}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 sm:py-4 rounded-xl text-base font-bold text-white bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] transition shadow-md shadow-emerald-900/10 text-center"
              >
                <Tractor className="w-5 h-5 mr-2 shrink-0" />
                <span>Request a Machine</span>
              </a>

              <a
                href="#cluster-demo"
                onClick={onExploreClusters}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 sm:py-4 rounded-xl text-base font-semibold text-emerald-950 bg-white hover:bg-stone-50 border border-stone-300 active:scale-[0.99] transition shadow-xs text-center"
              >
                <Users className="w-5 h-5 mr-2 text-emerald-700 shrink-0" />
                <span>See Live Clusters</span>
                <ArrowDown className="w-4 h-4 ml-2 text-stone-400 shrink-0" />
              </a>
            </div>

            {/* Local Trust Note */}
            <p className="text-xs text-stone-500 pt-1">
              Built for smallholder farmers across Assakio, Lafia East, and neighboring farming settlements.
            </p>
          </div>

          {/* Right Column: Visual & Floating Cluster Callout */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 sm:border-4 border-white bg-stone-100">
              <img
                src={heroImage}
                alt="Agricultural tractor ploughing farmland in Assakio, Nasarawa State"
                className="w-full h-56 xs:h-64 sm:h-80 lg:h-96 object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

              {/* Caption badge inside image */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white">
                <div className="flex items-center justify-between text-[11px] sm:text-xs font-medium text-emerald-200 mb-1">
                  <span>Assakio Field Operations</span>
                  <span className="bg-emerald-600/90 text-white px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-bold">
                    Active Hub
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-white drop-shadow-xs line-clamp-2 sm:line-clamp-none">
                  Combining small farms into 8+ hectare jobs that tractor operators gladly travel to serve.
                </p>
              </div>
            </div>

            {/* Floating Live Cluster Badge */}
            <div className="mt-3 sm:mt-0 sm:absolute sm:-bottom-6 sm:-left-6 bg-white rounded-xl p-3.5 sm:p-4 shadow-md sm:shadow-lg border border-emerald-100 sm:max-w-sm">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                      Current Assakio Pool
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping shrink-0"></span>
                  </div>
                  <p className="text-sm font-bold text-stone-900 mt-0.5">
                    {activeClusterStats.combinedHectares} Total Hectares Clustered
                  </p>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {activeClusterStats.openClusters} cluster(s) ready for tractor operators to accept
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
