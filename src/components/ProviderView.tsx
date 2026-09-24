import React, { useState } from 'react';
import { 
  Tractor, 
  MapPin, 
  Users, 
  CheckCircle2, 
  Phone, 
  Calendar, 
  Check, 
  ArrowLeft, 
  Layers, 
  Clock, 
  AlertCircle
} from 'lucide-react';
import { Cluster } from '../types';

interface ProviderViewProps {
  clusters: Cluster[];
  onAcceptJob: (clusterId: string, operatorData: {
    operatorName: string;
    operatorPhone: string;
    machineDetails: string;
  }) => void;
  onBackToLanding: () => void;
  onResetDemoData: () => void;
}

export const ProviderView: React.FC<ProviderViewProps> = ({
  clusters,
  onAcceptJob,
  onBackToLanding,
  onResetDemoData,
}) => {
  const [filter, setFilter] = useState<'all' | 'open' | 'matched'>('open');
  const [selectedClusterToAccept, setSelectedClusterToAccept] = useState<Cluster | null>(null);

  // Form states for operator accepting
  const [operatorName, setOperatorName] = useState('');
  const [operatorPhone, setOperatorPhone] = useState('');
  const [machineDetails, setMachineDetails] = useState('');
  const [justAcceptedClusterId, setJustAcceptedClusterId] = useState<string | null>(null);

  const filteredClusters = clusters.filter((c) => {
    if (filter === 'open') return c.status === 'Looking for Provider';
    if (filter === 'matched') return c.status === 'Provider Matched';
    return true;
  });

  const openCount = clusters.filter(c => c.status === 'Looking for Provider').length;
  const matchedCount = clusters.filter(c => c.status === 'Provider Matched').length;

  const handleOpenAcceptModal = (cluster: Cluster) => {
    setSelectedClusterToAccept(cluster);
    setOperatorName('Nasarawa Mechanisation Hub (Assakio)');
    setOperatorPhone('0803 200 4819');
    setMachineDetails('75HP Massey Ferguson Tractor + 3-Disc Plough');
  };

  const handleConfirmAccept = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClusterToAccept) return;

    if (!operatorName.trim() || !operatorPhone.trim()) {
      alert('Please fill in your operator name and phone number.');
      return;
    }

    onAcceptJob(selectedClusterToAccept.id, {
      operatorName: operatorName.trim(),
      operatorPhone: operatorPhone.trim(),
      machineDetails: machineDetails.trim() || 'Standard Tractor & Implement',
    });

    setJustAcceptedClusterId(selectedClusterToAccept.id);
    setSelectedClusterToAccept(null);
  };

  return (
    <div className="min-h-screen bg-stone-100/90 pb-20">
      {/* Top Banner / Operator Header */}
      <div className="bg-emerald-950 text-white border-b border-emerald-900 pt-6 pb-10 sm:pt-8 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-stone-950">
                  /provider
                </span>
                <span className="text-xs text-emerald-300 font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>Assakio Hub, Nasarawa State</span>
                </span>
              </div>
              <h1 className="text-2xl xs:text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
                Machinery Operator Dashboard
              </h1>
              <p className="text-emerald-200 mt-2 text-xs sm:text-sm md:text-base max-w-2xl font-light">
                Browse pre-clustered smallholder farms. No more wasted diesel or negotiations for 1 isolated hectare — accept complete contiguous blocks ready for tractor mobilization.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <button
                onClick={onBackToLanding}
                className="inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 shrink-0" />
                <span>Farmer Landing Page</span>
              </button>
              <button
                onClick={onResetDemoData}
                className="text-xs text-emerald-300 hover:text-white underline px-2 py-1 cursor-pointer"
                title="Reset demo data to default Assakio clusters"
              >
                Reset Demo Data
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-emerald-900/60">
            <div className="bg-emerald-900/50 rounded-xl p-3 border border-emerald-800/40">
              <span className="text-[11px] sm:text-xs text-emerald-300 block">Available Jobs</span>
              <span className="text-xl sm:text-2xl font-black text-white">{openCount}</span>
            </div>
            <div className="bg-emerald-900/50 rounded-xl p-3 border border-emerald-800/40">
              <span className="text-[11px] sm:text-xs text-emerald-300 block">Accepted / Matched</span>
              <span className="text-xl sm:text-2xl font-black text-amber-400">{matchedCount}</span>
            </div>
            <div className="bg-emerald-900/50 rounded-xl p-3 border border-emerald-800/40">
              <span className="text-[11px] sm:text-xs text-emerald-300 block">Total Active Hectares</span>
              <span className="text-xl sm:text-2xl font-black text-white truncate">
                {clusters.reduce((acc, c) => acc + c.farmers.reduce((s, f) => s + f.farmSizeHectares, 0), 0).toFixed(1)} ha
              </span>
            </div>
            <div className="bg-emerald-900/50 rounded-xl p-3 border border-emerald-800/40">
              <span className="text-[11px] sm:text-xs text-emerald-300 block">Location Focus</span>
              <span className="text-base sm:text-lg font-bold text-white truncate">Assakio & Environs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
        {/* Success Alert if just accepted */}
        {justAcceptedClusterId && (
          <div className="mb-6 bg-emerald-600 text-white rounded-2xl p-4 sm:p-5 shadow-lg flex items-start justify-between gap-4 animate-in fade-in duration-300">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base">Job Successfully Accepted!</h3>
                <p className="text-emerald-100 text-xs sm:text-sm">
                  The cluster has been matched to your machinery firm. Farmer phone numbers are unlocked below for field coordination.
                </p>
              </div>
            </div>
            <button
              onClick={() => setJustAcceptedClusterId(null)}
              className="text-white/80 hover:text-white text-xs font-semibold px-2 py-1 shrink-0 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Filter Pills */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 mb-6 shadow-xs border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 select-none">
            <button
              onClick={() => setFilter('open')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 flex items-center gap-1.5 cursor-pointer ${
                filter === 'open'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Looking for Provider ({openCount})</span>
            </button>

            <button
              onClick={() => setFilter('matched')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 flex items-center gap-1.5 cursor-pointer ${
                filter === 'matched'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Accepted ({matchedCount})</span>
            </button>

            <button
              onClick={() => setFilter('all')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 cursor-pointer ${
                filter === 'all'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              All ({clusters.length})
            </button>
          </div>

          <div className="text-xs text-stone-500 font-medium">
            Showing <span className="font-bold text-stone-900">{filteredClusters.length}</span> cluster(s)
          </div>
        </div>

        {/* Cluster Cards List */}
        <div className="space-y-6">
          {filteredClusters.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 sm:p-12 text-center border border-stone-200">
              <Layers className="w-10 h-10 sm:w-12 sm:h-12 text-stone-400 mx-auto mb-3" />
              <h3 className="text-base sm:text-lg font-bold text-stone-800">No clusters match this filter</h3>
              <p className="text-stone-500 text-xs sm:text-sm mt-1">Try switching tabs or check back for new farmer requests.</p>
              <button
                onClick={() => setFilter('all')}
                className="mt-4 px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs sm:text-sm font-semibold cursor-pointer"
              >
                Show All Clusters
              </button>
            </div>
          ) : (
            filteredClusters.map((cluster) => {
              const totalHectares = cluster.farmers.reduce((sum, f) => sum + f.farmSizeHectares, 0);
              const isLooking = cluster.status === 'Looking for Provider';
              const farmerCount = cluster.farmers.length;

              return (
                <div
                  key={cluster.id}
                  className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                    isLooking 
                      ? 'border-emerald-300 shadow-md hover:border-emerald-500' 
                      : 'border-stone-200 opacity-95 shadow-xs'
                  }`}
                >
                  {/* Header Row */}
                  <div className={`p-4 sm:p-6 border-b ${isLooking ? 'bg-gradient-to-r from-emerald-50/50 to-white border-emerald-100' : 'bg-stone-50 border-stone-200'}`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-bold ${
                            isLooking 
                              ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                              : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          }`}>
                            {cluster.status}
                          </span>
                          <span className="text-xs text-stone-500 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                            <span>{cluster.location}</span>
                          </span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-extrabold text-stone-900 font-heading">
                          {cluster.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                          Service Needed: <span className="font-semibold text-emerald-800">{cluster.service}</span>
                        </p>
                      </div>

                      {/* Accept Job Action Button */}
                      <div className="shrink-0 flex items-center">
                        {isLooking ? (
                          <button
                            onClick={() => handleOpenAcceptModal(cluster)}
                            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md shadow-emerald-900/10 active:scale-[0.98] transition cursor-pointer"
                          >
                            <Tractor className="w-4 h-4 shrink-0" />
                            <span>Accept Job</span>
                          </button>
                        ) : (
                          <div className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs sm:text-sm font-bold">
                            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                            <span>Job Accepted</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-6">
                    {/* Key Metrics 3-box */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
                      <div className="bg-stone-50 rounded-xl p-3.5 sm:p-4 border border-stone-200">
                        <span className="text-[10px] sm:text-xs font-bold uppercase text-stone-500 block">Total Workload</span>
                        <span className="text-xl sm:text-2xl font-extrabold text-stone-900">
                          {totalHectares.toFixed(1)} Hectares
                        </span>
                        <span className="text-[11px] text-emerald-700 block mt-0.5 font-medium">
                          Guaranteed contiguous mobilization
                        </span>
                      </div>

                      <div className="bg-stone-50 rounded-xl p-3.5 sm:p-4 border border-stone-200">
                        <span className="text-[10px] sm:text-xs font-bold uppercase text-stone-500 block">Combined Farmers</span>
                        <span className="text-xl sm:text-2xl font-extrabold text-stone-900">
                          {farmerCount} Farmers
                        </span>
                        <span className="text-[11px] text-stone-500 block mt-0.5">
                          Avg { (totalHectares / (farmerCount || 1)).toFixed(1) } ha per farmer
                        </span>
                      </div>

                      <div className="bg-stone-50 rounded-xl p-3.5 sm:p-4 border border-stone-200">
                        <span className="text-[10px] sm:text-xs font-bold uppercase text-stone-500 block">Timing Window</span>
                        <span className="text-sm sm:text-base font-bold text-stone-900 block truncate">
                          {cluster.farmers[0]?.preferredDate || 'Within 7 Days'}
                        </span>
                        <span className="text-[11px] text-stone-500 block mt-0.5">
                          Flexible for weather window
                        </span>
                      </div>
                    </div>

                    {/* Operator Assignment Details if already accepted */}
                    {cluster.acceptedBy && (
                      <div className="mb-6 p-3.5 sm:p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
                        <div className="space-y-0.5">
                          <span className="font-bold text-emerald-950">Assigned Machinery Provider:</span>
                          <p className="text-emerald-900 font-semibold">{cluster.acceptedBy.operatorName} ({cluster.acceptedBy.operatorPhone})</p>
                          <p className="text-stone-600 text-xs">Equipment: {cluster.acceptedBy.machineDetails}</p>
                        </div>
                        <span className="text-[11px] sm:text-xs text-stone-500">Accepted on {cluster.acceptedBy.acceptedAt}</span>
                      </div>
                    )}

                    {/* Clustered Farmers Contact Manifest */}
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                        <h4 className="text-xs sm:text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                          <Users className="w-4 h-4 text-emerald-700 shrink-0" />
                          <span>Farmer Manifest & Land Allocation ({farmerCount} plots)</span>
                        </h4>
                        <span className="text-[11px] sm:text-xs text-stone-500">
                          {isLooking ? 'Contacts will be unlocked upon accepting job' : 'Live Phone Numbers Active'}
                        </span>
                      </div>

                      {/* Desktop / Tablet Table View (hidden on small phones) */}
                      <div className="hidden md:block overflow-x-auto border border-stone-200 rounded-xl">
                        <table className="w-full text-left text-sm">
                          <thead className="bg-stone-50 text-stone-600 text-xs font-bold border-b border-stone-200">
                            <tr>
                              <th className="py-3 px-4">#</th>
                              <th className="py-3 px-4">Farmer Name</th>
                              <th className="py-3 px-4">Plot Location</th>
                              <th className="py-3 px-4">Land Size</th>
                              <th className="py-3 px-4">Preferred Date</th>
                              <th className="py-3 px-4">Contact Phone</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-stone-200">
                            {cluster.farmers.map((farmer, idx) => (
                              <tr key={farmer.id} className="hover:bg-stone-50/70">
                                <td className="py-3 px-4 font-mono text-xs text-stone-400">{idx + 1}</td>
                                <td className="py-3 px-4 font-bold text-stone-900">{farmer.farmerName}</td>
                                <td className="py-3 px-4 text-stone-600 text-xs">{farmer.farmLocation}</td>
                                <td className="py-3 px-4">
                                  <span className="font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-xs">
                                    {farmer.farmSizeHectares.toFixed(1)} ha
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-stone-600 text-xs">{farmer.preferredDate}</td>
                                <td className="py-3 px-4">
                                  {isLooking ? (
                                    <span className="text-xs font-mono text-stone-400">
                                      {farmer.phoneNumber.slice(0, 4)} ••• ••••
                                    </span>
                                  ) : (
                                    <a
                                      href={`tel:${farmer.phoneNumber}`}
                                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200"
                                    >
                                      <Phone className="w-3 h-3" />
                                      <span>{farmer.phoneNumber}</span>
                                    </a>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Mobile Card View (shown on phones < md) */}
                      <div className="block md:hidden space-y-2.5">
                        {cluster.farmers.map((farmer, idx) => (
                          <div key={farmer.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                            <div className="flex items-center justify-between mb-1.5">
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono text-[10px] text-stone-400 bg-white px-1.5 py-0.5 rounded border border-stone-200">
                                  #{idx + 1}
                                </span>
                                <span className="font-bold text-stone-900 text-sm">{farmer.farmerName}</span>
                              </div>
                              <span className="font-extrabold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded text-xs">
                                {farmer.farmSizeHectares.toFixed(1)} ha
                              </span>
                            </div>

                            <div className="text-stone-600 space-y-1 mb-2">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                                <span className="truncate">{farmer.farmLocation}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-stone-400 shrink-0" />
                                <span>Date: {farmer.preferredDate}</span>
                              </div>
                            </div>

                            <div className="pt-2 border-t border-stone-200/80 flex items-center justify-between">
                              <span className="text-[11px] text-stone-500">Phone:</span>
                              {isLooking ? (
                                <span className="font-mono text-stone-400 text-xs">
                                  {farmer.phoneNumber.slice(0, 4)} ••• ••••
                                </span>
                              ) : (
                                <a
                                  href={`tel:${farmer.phoneNumber}`}
                                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-white px-2.5 py-1 rounded-md border border-emerald-300"
                                >
                                  <Phone className="w-3 h-3" />
                                  <span>{farmer.phoneNumber}</span>
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Operator Job Acceptance Modal - mobile scroll-safe */}
      {selectedClusterToAccept && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-7 md:p-8 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200 my-auto">
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-stone-200">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Tractor className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base sm:text-lg">Accept Combined Job</h3>
                  <p className="text-[11px] sm:text-xs text-stone-500">{selectedClusterToAccept.title}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedClusterToAccept(null)}
                className="text-stone-400 hover:text-stone-600 text-xl font-bold p-1 cursor-pointer"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Cluster Summary inside modal */}
            <div className="my-4 sm:my-5 p-3.5 sm:p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-1">
              <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-emerald-950">
                <span>Total Workload:</span>
                <span className="text-sm sm:text-base text-emerald-800">
                  {selectedClusterToAccept.farmers.reduce((s, f) => s + f.farmSizeHectares, 0).toFixed(1)} Hectares
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] sm:text-xs text-emerald-900">
                <span>Grouped Smallholders:</span>
                <span className="font-bold">{selectedClusterToAccept.farmers.length} Farmers in {selectedClusterToAccept.location}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] sm:text-xs text-emerald-900">
                <span>Service:</span>
                <span className="font-bold">{selectedClusterToAccept.service}</span>
              </div>
            </div>

            <form onSubmit={handleConfirmAccept} className="space-y-3.5 sm:space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Machinery Operator / Firm Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lafia Agro Mechanics / Danladi Tractors"
                  value={operatorName}
                  onChange={(e) => setOperatorName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Operator Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0803 200 4819"
                  value={operatorPhone}
                  onChange={(e) => setOperatorPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Available Machine & Implements
                </label>
                <input
                  type="text"
                  placeholder="e.g. 75HP Tractor + 3-Disc Plough"
                  value={machineDetails}
                  onChange={(e) => setMachineDetails(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>By accepting, you commit to deploying machinery to Assakio for the clustered dates. You will immediately receive the phone numbers of all {selectedClusterToAccept.farmers.length} farmers.</span>
              </div>

              <div className="pt-2 flex flex-col-reverse sm:flex-row items-center justify-end gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedClusterToAccept(null)}
                  className="w-full sm:w-auto px-4 py-2.5 text-stone-600 hover:text-stone-800 text-xs sm:text-sm font-semibold cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm transition shadow-md shadow-emerald-900/10 cursor-pointer text-center"
                >
                  Confirm & Accept Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
