import React, { useState } from 'react';
import { Users, MapPin, Calendar, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Cluster } from '../types';

interface ClusteringDemoSectionProps {
  clusters: Cluster[];
}

export const ClusteringDemoSection: React.FC<ClusteringDemoSectionProps> = ({
  clusters,
}) => {
  // Find the primary cluster (Ploughing cluster) or fallback to first
  const ploughingCluster = clusters.find(c => c.service === 'Land Preparation / Ploughing') || clusters[0];
  const [selectedClusterId, setSelectedClusterId] = useState<string>(ploughingCluster?.id || clusters[0]?.id);

  const activeCluster = clusters.find(c => c.id === selectedClusterId) || ploughingCluster || clusters[0];

  if (!activeCluster) return null;

  const totalHectares = activeCluster.farmers.reduce((sum, f) => sum + f.farmSizeHectares, 0);
  const farmerCount = activeCluster.farmers.length;
  const progressPercent = Math.min(100, Math.round((totalHectares / activeCluster.targetHectares) * 100));

  return (
    <section id="cluster-demo" className="py-12 sm:py-16 lg:py-20 bg-stone-100/80 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs sm:text-sm font-bold tracking-wider text-emerald-800 uppercase bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-200 inline-block">
            Core Innovation: Farmer Clustering
          </span>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-extrabold text-emerald-950 mt-3 tracking-tight">
            How Nearby Requests Become One Job
          </h2>
          <p className="text-stone-600 mt-2 sm:mt-3 text-sm sm:text-base lg:text-lg">
            Instead of a tractor operator turning down an isolated 1-hectare request, GonaKusa aggregates adjacent farms into a high-value single dispatch.
          </p>
        </div>

        {/* Cluster Selector Tabs - Horizontally scrollable on mobile */}
        <div className="flex sm:flex-wrap items-center sm:justify-center gap-2 mb-6 sm:mb-8 overflow-x-auto pb-2 sm:pb-0 px-1 -mx-2 sm:mx-0 select-none">
          {clusters.map((c) => {
            const cTotalHectares = c.farmers.reduce((sum, f) => sum + f.farmSizeHectares, 0);
            const isSelected = c.id === activeCluster.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedClusterId(c.id)}
                className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-800 text-white shadow-sm ring-2 ring-emerald-700/30'
                    : 'bg-white text-stone-700 hover:bg-stone-200/70 border border-stone-300'
                }`}
              >
                <span>{c.service.split('/')[0].trim()} Cluster</span>
                <span className={`px-2 py-0.5 rounded-full text-[11px] sm:text-xs font-bold ${
                  isSelected ? 'bg-emerald-700 text-emerald-100' : 'bg-stone-100 text-stone-700'
                }`}>
                  {cTotalHectares.toFixed(1)} ha
                </span>
              </button>
            );
          })}
        </div>

        {/* Primary Interactive Cluster Demonstration Box */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 border border-stone-300 shadow-lg">
          {/* Main Cluster Banner - Exact required headline */}
          <div className="bg-emerald-900 text-white rounded-2xl p-4 sm:p-7 lg:p-8 mb-6 sm:mb-8 relative overflow-hidden">
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                  <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-wide uppercase bg-amber-400 text-stone-950">
                    Live Cluster In Assakio
                  </span>
                  <span className="text-xs text-emerald-200 font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{activeCluster.location}</span>
                  </span>
                </div>

                {/* EXACT REQUIRED EXAMPLE FORMAT */}
                <h3 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white font-heading break-words">
                  {activeCluster.title} — {farmerCount} Farmers | {totalHectares.toFixed(1)} Hectares | {activeCluster.status}
                </h3>

                <p className="text-emerald-100 text-xs sm:text-sm lg:text-base max-w-2xl font-light">
                  {farmerCount} smallholder farms in close proximity combined into one profitable job for tractor service providers.
                </p>
              </div>

              {/* Status Pill */}
              <div className="shrink-0 flex items-center gap-2.5 sm:gap-3 pt-2 lg:pt-0">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold shadow-xs ${
                  activeCluster.status === 'Provider Matched' 
                    ? 'bg-emerald-400 text-emerald-950 border border-emerald-300'
                    : 'bg-amber-400 text-stone-950 border border-amber-300'
                }`}>
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    activeCluster.status === 'Provider Matched' ? 'bg-emerald-950' : 'bg-stone-950 animate-pulse'
                  }`}></span>
                  <span>{activeCluster.status}</span>
                </div>
              </div>
            </div>

            {/* Subtle background decoration */}
            <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-emerald-800/40 rounded-full blur-2xl pointer-events-none"></div>
          </div>

          {/* Aggregation Progress Bar */}
          <div className="mb-6 sm:mb-8 bg-stone-50 rounded-2xl p-4 sm:p-6 border border-stone-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 mb-3">
              <div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-stone-500">
                  Cluster Viability Meter
                </span>
                <p className="text-sm sm:text-base font-bold text-stone-900">
                  {totalHectares.toFixed(1)} of {activeCluster.targetHectares} Hectares Clustered
                </p>
              </div>
              <div className="text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 self-start sm:self-auto">
                {totalHectares >= 6 ? '✓ Ready for Operator Dispatch' : 'Accumulating Nearby Plots'}
              </div>
            </div>

            {/* Progress bar visual */}
            <div className="w-full h-3.5 sm:h-4 bg-stone-200 rounded-full overflow-hidden flex">
              <div
                className="h-full bg-gradient-to-r from-emerald-600 to-emerald-500 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center text-[10px] sm:text-[11px] text-stone-500 mt-2">
              <span>0 ha (Single)</span>
              <span className="font-semibold text-emerald-800">5 ha (Break-even)</span>
              <span>10 ha (Max Day)</span>
            </div>
          </div>

          {/* Individual Farmer Breakdown inside this Cluster */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700 shrink-0" />
                <h4 className="text-base sm:text-lg font-bold text-stone-900">
                  Clustered Farmers Breakdown ({farmerCount} plots grouped)
                </h4>
              </div>
              <span className="text-xs text-stone-500 font-medium">
                Contiguous & Nearby Assakio Farmland
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {activeCluster.farmers.map((farmer, idx) => (
                <div
                  key={farmer.id}
                  className="bg-white rounded-xl p-3.5 sm:p-4 border border-stone-200 hover:border-emerald-300 transition-all hover:shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] sm:text-xs font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-600">
                        Plot #{idx + 1}
                      </span>
                      <span className="text-xs sm:text-sm font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        {farmer.farmSizeHectares.toFixed(1)} ha
                      </span>
                    </div>

                    <h5 className="font-bold text-stone-900 text-sm sm:text-base">
                      {farmer.farmerName}
                    </h5>

                    <p className="text-xs text-stone-600 flex items-center gap-1.5 mt-1.5">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span className="truncate">{farmer.farmLocation}</span>
                    </p>

                    <p className="text-xs text-stone-500 flex items-center gap-1.5 mt-1">
                      <Calendar className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>Preferred: {farmer.preferredDate}</span>
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500 font-medium">
                    <span>Contact: {farmer.phoneNumber.slice(0, 7)}***</span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      Verified
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom callout: Why operator loves this */}
          <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-2.5 sm:gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5 sm:mt-0" />
              <p className="text-xs sm:text-sm text-stone-600">
                <span className="font-bold text-stone-900">Cluster Advantage:</span> All {farmerCount} farmers agree to contiguous scheduling. Zero dead mileage driving back and forth between isolated plots.
              </p>
            </div>
            <div className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 shrink-0">
              Assakio Cluster Verified
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
