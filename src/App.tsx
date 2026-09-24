/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorksSection } from './components/HowItWorksSection';
import { RequestFormSection } from './components/RequestFormSection';
import { ClusteringDemoSection } from './components/ClusteringDemoSection';
import { ProviderView } from './components/ProviderView';
import { Footer } from './components/Footer';
import { 
  getStoredClusters, 
  addFarmerRequestToClusters, 
  acceptClusterJob, 
  resetClustersToDefault 
} from './data/mockData';
import { Cluster, ServiceType } from './types';
import { Tractor, ShieldCheck, X } from 'lucide-react';

export default function App() {
  const [clusters, setClusters] = useState<Cluster[]>(() => getStoredClusters());
  const [currentView, setCurrentView] = useState<'landing' | 'provider'>('landing');
  const [selectedService, setSelectedService] = useState<ServiceType>('Land Preparation / Ploughing');
  const [shortcutToast, setShortcutToast] = useState<{
    visible: boolean;
    title: string;
    description: string;
  }>({
    visible: false,
    title: '',
    description: '',
  });

  // Handle URL route sync for /provider or ?view=provider
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname;
      const search = window.location.search;
      if (path === '/provider' || search.includes('view=provider')) {
        setCurrentView('provider');
      } else {
        setCurrentView('landing');
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  const navigateTo = (view: 'landing' | 'provider') => {
    setCurrentView(view);
    if (view === 'provider') {
      window.history.pushState({}, '', '/provider');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.history.pushState({}, '', '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Keyboard shortcut listener: Ctrl + Shift + A (or Cmd + Shift + A on macOS)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;
      const isShift = e.shiftKey;
      const isA = e.key === 'A' || e.key === 'a' || e.code === 'KeyA';

      if (isCtrlOrCmd && isShift && isA) {
        e.preventDefault();
        setCurrentView((prev) => {
          if (prev === 'landing') {
            window.history.pushState({}, '', '/provider');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setShortcutToast({
              visible: true,
              title: 'Machinery Operator Portal Activated',
              description: 'Command [Ctrl+Shift+A] recognized. Viewing live cluster jobs in Assakio.',
            });
            return 'provider';
          } else {
            window.history.pushState({}, '', '/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setShortcutToast({
              visible: true,
              title: 'Returned to Public Landing Page',
              description: 'Command [Ctrl+Shift+A] toggled operator view off.',
            });
            return 'landing';
          }
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto-hide shortcut toast after 4 seconds
  useEffect(() => {
    if (shortcutToast.visible) {
      const timer = setTimeout(() => {
        setShortcutToast((prev) => ({ ...prev, visible: false }));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [shortcutToast.visible]);

  const handleSubmitRequest = (formData: {
    farmerName: string;
    phoneNumber: string;
    farmLocation: string;
    serviceNeeded: ServiceType;
    farmSizeHectares: number;
    preferredDate: string;
  }) => {
    const result = addFarmerRequestToClusters(clusters, formData);
    setClusters(result.updatedClusters);
    return result;
  };

  const handleAcceptJob = (
    clusterId: string,
    operatorData: {
      operatorName: string;
      operatorPhone: string;
      machineDetails: string;
    }
  ) => {
    const updated = acceptClusterJob(clusters, clusterId, operatorData);
    setClusters(updated);
  };

  const handleResetDemoData = () => {
    if (window.confirm('Reset clusters back to initial Assakio demo data?')) {
      const reset = resetClustersToDefault();
      setClusters(reset);
    }
  };

  // Aggregated metrics for hero & header
  const openClusters = clusters.filter((c) => c.status === 'Looking for Provider');
  const totalCombinedHectares = clusters.reduce(
    (acc, c) => acc + c.farmers.reduce((sum, f) => sum + f.farmSizeHectares, 0),
    0
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1E293B] flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-950">
      {/* Shortcut Command Feedback Notification Banner/Toast */}
      {shortcutToast.visible && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm sm:max-w-md bg-stone-900 text-white rounded-2xl p-4 shadow-2xl border border-stone-700 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center shrink-0 mt-0.5">
              <Tractor className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-amber-400 tracking-wide uppercase flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Shortcut Command
                </span>
                <button
                  onClick={() => setShortcutToast((prev) => ({ ...prev, visible: false }))}
                  className="text-stone-400 hover:text-white transition"
                  aria-label="Dismiss toast"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <h4 className="font-bold text-sm text-white mt-0.5">
                {shortcutToast.title}
              </h4>
              <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                {shortcutToast.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Header */}
      <Navbar
        currentView={currentView}
        onNavigate={navigateTo}
        openClustersCount={openClusters.length}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'landing' ? (
          <>
            {/* 1. Hero Section */}
            <Hero
              onExploreClusters={() => {
                const el = document.getElementById('cluster-demo');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onRequestClick={() => {
                const el = document.getElementById('request-form');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              activeClusterStats={{
                totalClusters: clusters.length,
                openClusters: openClusters.length,
                combinedHectares: parseFloat(totalCombinedHectares.toFixed(1)),
              }}
            />

            {/* 2. How It Works Section */}
            <HowItWorksSection />

            {/* 3. Request Form Section */}
            <RequestFormSection
              selectedService={selectedService}
              onSelectService={setSelectedService}
              onSubmitRequest={handleSubmitRequest}
            />

            {/* 4. Clustering Demo Section */}
            <ClusteringDemoSection
              clusters={clusters}
            />
          </>
        ) : (
          /* Provider View (/provider) - Activated only via Ctrl+Shift+A or direct URL */
          <ProviderView
            clusters={clusters}
            onAcceptJob={handleAcceptJob}
            onBackToLanding={() => navigateTo('landing')}
            onResetDemoData={handleResetDemoData}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigateToLanding={() => navigateTo('landing')}
      />
    </div>
  );
}
