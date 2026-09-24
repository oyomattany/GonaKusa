import { Cluster, FarmerRequest, ServiceType } from '../types';

export const INITIAL_CLUSTERS: Cluster[] = [
  {
    id: 'cluster-assakio-ploughing-1',
    title: 'Assakio Ploughing Cluster',
    location: 'Assakio, Nasarawa State',
    service: 'Land Preparation / Ploughing',
    status: 'Looking for Provider',
    targetHectares: 10,
    farmers: [
      {
        id: 'req-1',
        farmerName: 'Audu Danladi',
        phoneNumber: '0803 412 8891',
        farmLocation: 'Assakio Central (Near Old Market)',
        serviceNeeded: 'Land Preparation / Ploughing',
        farmSizeHectares: 2.0,
        preferredDate: '2026-10-02',
        submittedAt: '2026-09-22 08:30',
      },
      {
        id: 'req-2',
        farmerName: 'Maryam Yakubu',
        phoneNumber: '0814 550 1928',
        farmLocation: 'Assakio - Sabon Gari Road',
        serviceNeeded: 'Land Preparation / Ploughing',
        farmSizeHectares: 1.5,
        preferredDate: '2026-10-03',
        submittedAt: '2026-09-22 11:15',
      },
      {
        id: 'req-3',
        farmerName: 'Ibrahim Musa',
        phoneNumber: '0706 832 9401',
        farmLocation: 'Assakio - Gidan Buba Axis',
        serviceNeeded: 'Land Preparation / Ploughing',
        farmSizeHectares: 1.0,
        preferredDate: '2026-10-03',
        submittedAt: '2026-09-23 09:40',
      },
      {
        id: 'req-4',
        farmerName: 'Bitrus Emmanuel',
        phoneNumber: '0802 711 6352',
        farmLocation: 'Assakio North (Yam Farmlands)',
        serviceNeeded: 'Land Preparation / Ploughing',
        farmSizeHectares: 2.5,
        preferredDate: '2026-10-04',
        submittedAt: '2026-09-23 14:05',
      },
      {
        id: 'req-5',
        farmerName: 'Fatima Aliyu',
        phoneNumber: '0905 223 7410',
        farmLocation: 'Assakio West Farmland',
        serviceNeeded: 'Land Preparation / Ploughing',
        farmSizeHectares: 1.0,
        preferredDate: '2026-10-04',
        submittedAt: '2026-09-24 07:10',
      },
    ],
  },
  {
    id: 'cluster-assakio-planting-1',
    title: 'Assakio Maize Planting Cluster',
    location: 'Assakio, Nasarawa State',
    service: 'Planting',
    status: 'Looking for Provider',
    targetHectares: 8,
    farmers: [
      {
        id: 'req-6',
        farmerName: 'Suleiman Garba',
        phoneNumber: '0807 199 4321',
        farmLocation: 'Assakio - Rice Valley Road',
        serviceNeeded: 'Planting',
        farmSizeHectares: 2.5,
        preferredDate: '2026-10-06',
        submittedAt: '2026-09-23 16:20',
      },
      {
        id: 'req-7',
        farmerName: 'Ladi Bala',
        phoneNumber: '0813 904 8872',
        farmLocation: 'Assakio Central',
        serviceNeeded: 'Planting',
        farmSizeHectares: 1.5,
        preferredDate: '2026-10-07',
        submittedAt: '2026-09-24 06:45',
      },
      {
        id: 'req-8',
        farmerName: 'Yohanna Kalu',
        phoneNumber: '0701 445 2311',
        farmLocation: 'Assakio - Gidan Buba',
        serviceNeeded: 'Planting',
        farmSizeHectares: 1.5,
        preferredDate: '2026-10-07',
        submittedAt: '2026-09-24 08:00',
      },
    ],
  },
  {
    id: 'cluster-assakio-spraying-1',
    title: 'Assakio Pre-emergence Spraying Cluster',
    location: 'Assakio, Nasarawa State',
    service: 'Spraying',
    status: 'Provider Matched',
    targetHectares: 6,
    acceptedBy: {
      operatorName: 'Lafia Agro-Tractors Ltd',
      operatorPhone: '0803 555 9012',
      machineDetails: 'Mahindra 75HP with 600L Boom Sprayer',
      acceptedAt: '2026-09-23 15:40',
    },
    farmers: [
      {
        id: 'req-9',
        farmerName: 'Usman Jibril',
        phoneNumber: '0806 312 8840',
        farmLocation: 'Assakio South Farmlands',
        serviceNeeded: 'Spraying',
        farmSizeHectares: 2.0,
        preferredDate: '2026-09-28',
        submittedAt: '2026-09-21 14:10',
      },
      {
        id: 'req-10',
        farmerName: 'Grace Joshua',
        phoneNumber: '0818 765 4321',
        farmLocation: 'Assakio - Sabon Gari Road',
        serviceNeeded: 'Spraying',
        farmSizeHectares: 2.0,
        preferredDate: '2026-09-28',
        submittedAt: '2026-09-22 09:20',
      },
      {
        id: 'req-11',
        farmerName: 'Bala Mohammed',
        phoneNumber: '0903 881 2290',
        farmLocation: 'Assakio Central',
        serviceNeeded: 'Spraying',
        farmSizeHectares: 2.0,
        preferredDate: '2026-09-29',
        submittedAt: '2026-09-22 13:00',
      },
    ],
  },
];

const STORAGE_KEY = 'mechanise_connect_clusters_v1';

export function getStoredClusters(): Cluster[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading clusters from storage:', err);
  }
  return INITIAL_CLUSTERS;
}

export function saveStoredClusters(clusters: Cluster[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clusters));
  } catch (err) {
    console.error('Error saving clusters:', err);
  }
}

export function addFarmerRequestToClusters(
  clusters: Cluster[],
  newRequest: Omit<FarmerRequest, 'id' | 'submittedAt'>
): { updatedClusters: Cluster[]; assignedClusterTitle: string; totalHectares: number; farmerCount: number } {
  const fullRequest: FarmerRequest = {
    ...newRequest,
    id: `req-${Date.now()}`,
    submittedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
  };

  // Find existing open cluster for this service and location (Assakio)
  const existingIndex = clusters.findIndex(
    (c) => c.service === fullRequest.serviceNeeded && c.status === 'Looking for Provider'
  );

  let updatedClusters = [...clusters];
  let targetCluster: Cluster;

  if (existingIndex >= 0) {
    const current = clusters[existingIndex];
    targetCluster = {
      ...current,
      farmers: [fullRequest, ...current.farmers],
    };
    updatedClusters[existingIndex] = targetCluster;
  } else {
    // Create a new cluster
    targetCluster = {
      id: `cluster-${Date.now()}`,
      title: `Assakio ${fullRequest.serviceNeeded.split('/')[0].trim()} Cluster`,
      location: fullRequest.farmLocation.includes('Assakio') ? fullRequest.farmLocation : `Assakio - ${fullRequest.farmLocation}`,
      service: fullRequest.serviceNeeded,
      status: 'Looking for Provider',
      targetHectares: 8,
      farmers: [fullRequest],
    };
    updatedClusters = [targetCluster, ...updatedClusters];
  }

  saveStoredClusters(updatedClusters);

  const totalHectares = targetCluster.farmers.reduce((sum, f) => sum + f.farmSizeHectares, 0);
  const farmerCount = targetCluster.farmers.length;

  return {
    updatedClusters,
    assignedClusterTitle: targetCluster.title,
    totalHectares,
    farmerCount,
  };
}

export function acceptClusterJob(
  clusters: Cluster[],
  clusterId: string,
  operator: { operatorName: string; operatorPhone: string; machineDetails: string }
): Cluster[] {
  const updated = clusters.map((c) => {
    if (c.id === clusterId) {
      return {
        ...c,
        status: 'Provider Matched' as const,
        acceptedBy: {
          ...operator,
          acceptedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
        },
      };
    }
    return c;
  });

  saveStoredClusters(updated);
  return updated;
}

export function resetClustersToDefault(): Cluster[] {
  saveStoredClusters(INITIAL_CLUSTERS);
  return INITIAL_CLUSTERS;
}
