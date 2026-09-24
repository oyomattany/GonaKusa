import React, { useState } from 'react';
import { Calendar, MapPin, Phone, User, Sprout, CheckCircle2, ArrowRight, Layers } from 'lucide-react';
import { ServiceType } from '../types';

interface RequestFormSectionProps {
  selectedService: ServiceType;
  onSelectService: (service: ServiceType) => void;
  onSubmitRequest: (formData: {
    farmerName: string;
    phoneNumber: string;
    farmLocation: string;
    serviceNeeded: ServiceType;
    farmSizeHectares: number;
    preferredDate: string;
  }) => { assignedClusterTitle: string; totalHectares: number; farmerCount: number };
}

export const RequestFormSection: React.FC<RequestFormSectionProps> = ({
  selectedService,
  onSelectService,
  onSubmitRequest,
}) => {
  const [farmerName, setFarmerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [farmLocation, setFarmLocation] = useState('Assakio Central');
  const [customLocation, setCustomLocation] = useState('');
  const [farmSizeHectares, setFarmSizeHectares] = useState<number | ''>(1.5);
  const [preferredDate, setPreferredDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 5);
    return d.toISOString().split('T')[0];
  });

  const [submittedClusterInfo, setSubmittedClusterInfo] = useState<{
    assignedClusterTitle: string;
    totalHectares: number;
    farmerCount: number;
    farmerName: string;
    hectares: number;
  } | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const servicesList: ServiceType[] = [
    'Land Preparation / Ploughing',
    'Planting',
    'Spraying',
    'Harvesting and Threshing',
  ];

  const assakioLocations = [
    'Assakio Central (Township)',
    'Assakio - Sabon Gari Road',
    'Assakio - Market Road',
    'Assakio - Gidan Buba Axis',
    'Assakio North (Yam Farmlands)',
    'Assakio South (Rice Plains)',
    'Other Assakio Farmland',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!farmerName.trim()) {
      setErrorMessage('Please enter the farmer name.');
      return;
    }

    if (!phoneNumber.trim() || phoneNumber.trim().length < 8) {
      setErrorMessage('Please enter a valid phone number (e.g. 0803 123 4567).');
      return;
    }

    const size = typeof farmSizeHectares === 'number' ? farmSizeHectares : parseFloat(farmSizeHectares);
    if (!size || isNaN(size) || size <= 0) {
      setErrorMessage('Please specify your farm size in hectares (e.g. 1.5).');
      return;
    }

    if (!preferredDate) {
      setErrorMessage('Please choose your preferred date for the machine operation.');
      return;
    }

    const finalLocation = farmLocation === 'Other Assakio Farmland' 
      ? (customLocation.trim() || 'Assakio Farmland')
      : farmLocation;

    setIsSubmitting(true);

    try {
      const result = onSubmitRequest({
        farmerName: farmerName.trim(),
        phoneNumber: phoneNumber.trim(),
        farmLocation: finalLocation,
        serviceNeeded: selectedService,
        farmSizeHectares: size,
        preferredDate,
      });

      setSubmittedClusterInfo({
        assignedClusterTitle: result.assignedClusterTitle,
        totalHectares: result.totalHectares,
        farmerCount: result.farmerCount,
        farmerName: farmerName.trim(),
        hectares: size,
      });

      // Clear non-service fields
      setFarmerName('');
      setPhoneNumber('');
    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="request-form" className="py-12 sm:py-16 lg:py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs sm:text-sm font-bold tracking-wider text-emerald-800 uppercase bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-200 inline-block">
            Farmer Booking
          </span>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-extrabold text-emerald-950 mt-3 tracking-tight">
            Request a Machine
          </h2>
          <p className="text-stone-600 mt-2 text-sm sm:text-base">
            Fill in your farm details below. We automatically place your request into the nearest Assakio cluster.
          </p>
        </div>

        {/* Success Confirmation Card */}
        {submittedClusterInfo && (
          <div className="mb-8 sm:mb-10 bg-white rounded-2xl p-4 sm:p-7 md:p-8 border-2 border-emerald-500 shadow-lg animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div className="space-y-2 flex-1 w-full">
                <span className="text-[11px] sm:text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block">
                  Request Clustered Successfully
                </span>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-stone-900 leading-snug">
                  Welcome to the {submittedClusterInfo.assignedClusterTitle}!
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm md:text-base leading-relaxed">
                  Thank you, <span className="font-semibold text-stone-900">{submittedClusterInfo.farmerName}</span>. Your <span className="font-semibold text-stone-900">{submittedClusterInfo.hectares} hectare</span> plot has been grouped with adjacent farmers.
                </p>

                {/* Cluster Metric Highlights */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-2">
                  <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-2.5 sm:p-3">
                    <span className="text-[10px] sm:text-[11px] font-bold text-emerald-800 uppercase block">Cluster Total</span>
                    <span className="text-lg sm:text-xl font-extrabold text-emerald-950">{submittedClusterInfo.totalHectares.toFixed(1)} Hectares</span>
                  </div>
                  <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-2.5 sm:p-3">
                    <span className="text-[10px] sm:text-[11px] font-bold text-emerald-800 uppercase block">Grouped Farmers</span>
                    <span className="text-lg sm:text-xl font-extrabold text-emerald-950">{submittedClusterInfo.farmerCount} Farmers</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1 bg-amber-50 border border-amber-200 rounded-xl p-2.5 sm:p-3">
                    <span className="text-[10px] sm:text-[11px] font-bold text-amber-800 uppercase block">Status</span>
                    <span className="text-xs sm:text-sm font-bold text-amber-900">Open for Operator</span>
                  </div>
                </div>

                {/* Actions after submit */}
                <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row flex-wrap items-center gap-2.5 sm:gap-3">
                  <a
                    href="#cluster-demo"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold bg-emerald-700 hover:bg-emerald-800 text-white transition shadow-xs"
                  >
                    <Layers className="w-4 h-4" />
                    <span>View in Clustering Demo</span>
                  </a>
                  <button
                    onClick={() => setSubmittedClusterInfo(null)}
                    className="w-full sm:w-auto text-xs text-stone-600 hover:text-stone-900 px-3 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 transition text-center font-medium"
                  >
                    + Submit another request
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Request Form */}
        <div className="bg-white rounded-2xl p-4 sm:p-8 md:p-10 border border-stone-200 shadow-sm">
          {errorMessage && (
            <div className="mb-5 sm:mb-6 p-3.5 sm:p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm font-medium">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {/* Service Selection */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-stone-900 mb-2">
                1. Service Needed <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                {servicesList.map((svc) => (
                  <button
                    key={svc}
                    type="button"
                    onClick={() => onSelectService(svc)}
                    className={`text-left p-3 sm:p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition flex items-center justify-between min-h-[46px] cursor-pointer ${
                      selectedService === svc
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/20'
                        : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-white'
                    }`}
                  >
                    <span className="leading-snug">{svc}</span>
                    {selectedService === svc && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 ml-2" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Farmer Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-stone-900 mb-1.5 sm:mb-2">
                  2. Farmer Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alhaji Aminu Haruna"
                    value={farmerName}
                    onChange={(e) => setFarmerName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-300 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-stone-900 mb-1.5 sm:mb-2">
                  3. Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0803 456 7890"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-300 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 bg-white"
                  />
                </div>
                <span className="text-[10px] sm:text-[11px] text-stone-500 mt-1 block">
                  Used by operator to confirm exact field entrance.
                </span>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-stone-900 mb-1.5 sm:mb-2">
                4. Farm Location in Assakio <span className="text-red-500">*</span>
              </label>
              <div className="relative mb-2">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <select
                  value={farmLocation}
                  onChange={(e) => setFarmLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-300 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 bg-white appearance-none cursor-pointer"
                >
                  {assakioLocations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {farmLocation === 'Other Assakio Farmland' && (
                <input
                  type="text"
                  placeholder="Specify village or landmark (e.g. Near River Bridge, Assakio)"
                  value={customLocation}
                  onChange={(e) => setCustomLocation(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white mt-2"
                />
              )}
            </div>

            {/* Farm Size & Preferred Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-stone-900 mb-1.5 sm:mb-2">
                  5. Farm Size (Hectares) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <Sprout className="w-4 h-4" />
                  </div>
                  <input
                    type="number"
                    step="0.1"
                    min="0.2"
                    max="100"
                    required
                    placeholder="e.g. 1.5"
                    value={farmSizeHectares}
                    onChange={(e) => setFarmSizeHectares(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-300 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 bg-white"
                  />
                </div>
                {/* Quick Size Selectors */}
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  <span className="text-[10px] sm:text-[11px] text-stone-500">Quick select:</span>
                  {[1.0, 1.5, 2.0, 3.0, 5.0].map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setFarmSizeHectares(sz)}
                      className={`px-2 py-1 text-xs rounded-md border cursor-pointer active:scale-95 transition ${
                        farmSizeHectares === sz
                          ? 'bg-emerald-700 text-white border-emerald-700 font-bold'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-200'
                      }`}
                    >
                      {sz} ha
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-stone-900 mb-1.5 sm:mb-2">
                  6. Preferred Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-300 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 bg-white"
                  />
                </div>
                <span className="text-[10px] sm:text-[11px] text-stone-500 mt-1 block">
                  When you need the tractor or equipment in Assakio.
                </span>
              </div>
            </div>

            {/* Clustering Explainer Preview Banner */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3.5 sm:p-4 flex items-start gap-3">
              <Layers className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
                <span className="font-bold">Clustering Guarantee:</span> Your {typeof farmSizeHectares === 'number' ? farmSizeHectares : '1.5'} ha request will be pooled with nearby farmers in {farmLocation.split('(')[0].trim()} requesting {selectedService}.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 sm:py-4 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] text-white font-bold text-sm sm:text-base transition shadow-md shadow-emerald-900/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Grouping Request...' : 'Submit Request & Join Cluster'}</span>
              <ArrowRight className="w-5 h-5 shrink-0" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
