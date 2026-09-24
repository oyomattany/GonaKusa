import React from 'react';
import { FileEdit, Layers, Handshake, Tractor, CheckCircle2, ArrowDown } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Request',
      badge: 'Individual Farmer',
      description: 'You submit your farm size (even 1 or 2 hectares), location in Assakio, and the specific mechanisation service needed.',
      icon: <FileEdit className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-800" />,
      detail: 'No need to own a large estate. Small plots count.',
    },
    {
      step: '02',
      title: 'Cluster',
      badge: 'Smart Aggregation',
      description: 'Farmers in the same area who need the same service are grouped together, combining hectares into one single attractive job.',
      icon: <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-800" />,
      detail: 'e.g. 5 farmers with 1-2 ha become one 8-hectare block.',
    },
    {
      step: '03',
      title: 'Match',
      badge: 'Operator Acceptance',
      description: 'Machinery providers see the combined acreage, guaranteed schedule, and accept the consolidated job without diesel wastage.',
      icon: <Handshake className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-800" />,
      detail: 'Operators accept jobs quickly when land is clustered.',
    },
    {
      step: '04',
      title: 'Mechanise',
      badge: 'Field Execution',
      description: 'The tractor and operator arrive in Assakio. They work across the clustered farms sequentially, finishing your job on time.',
      icon: <Tractor className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-800" />,
      detail: 'Fast tillage, planting, or harvesting before weather shifts.',
    },
  ];

  return (
    <section id="how-it-works" className="py-12 sm:py-16 lg:py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs sm:text-sm font-bold tracking-wider text-emerald-800 uppercase bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-200 inline-block">
            Simple 4-Step Process
          </span>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-extrabold text-emerald-950 mt-3 tracking-tight">
            How It Works
          </h2>
          <p className="text-stone-600 mt-2 sm:mt-3 text-sm sm:text-base lg:text-lg">
            <span className="font-semibold text-emerald-800">Request</span> → <span className="font-semibold text-emerald-800">Cluster</span> → <span className="font-semibold text-emerald-800">Match</span> → <span className="font-semibold text-emerald-800">Mechanise</span>. Solving the smallholder tractor access problem together.
          </p>
        </div>

        {/* 4 Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative">
          {steps.map((item, idx) => (
            <React.Fragment key={item.title}>
              <div className="bg-stone-50 rounded-2xl p-5 sm:p-6 border border-stone-200 hover:border-emerald-300 transition-all hover:shadow-md relative flex flex-col justify-between">
                {/* Connector arrow for desktop */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 text-stone-300 font-bold text-xl select-none">
                    →
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white border border-stone-200 flex items-center justify-center shadow-xs">
                      {item.icon}
                    </div>
                    <span className="text-xl sm:text-2xl font-black text-emerald-800/40 font-heading">
                      {item.step}
                    </span>
                  </div>

                  <div className="mb-2">
                    <span className="text-[10px] sm:text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                      {item.badge}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-emerald-950 tracking-tight">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-200/80 flex items-start gap-2 text-xs text-stone-600 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item.detail}</span>
                </div>
              </div>

              {/* Mobile Step Down Arrow between cards */}
              {idx < steps.length - 1 && (
                <div className="flex md:hidden justify-center items-center -my-1 text-emerald-600">
                  <ArrowDown className="w-4 h-4 opacity-50" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Why Clustering Works Box */}
        <div className="mt-8 sm:mt-12 bg-amber-50/70 border border-amber-200 rounded-2xl p-4 sm:p-7">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-base sm:text-lg shrink-0">
              💡
            </div>
            <div>
              <h4 className="text-sm sm:text-base lg:text-lg font-bold text-stone-900">
                Why Farmer Clustering Makes Mechanisation Affordable
              </h4>
              <p className="text-xs sm:text-sm text-stone-700 mt-1 leading-relaxed">
                Tractor owners rarely accept 1-hectare jobs because diesel and mobilization costs are too high. By clustering 4 to 8 neighboring farmers into a single 8–10 hectare work order, tractor operators can easily come to Assakio and work continuously for 1 to 2 days without wasted fuel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
