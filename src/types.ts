export type ServiceType = 
  | 'Land Preparation / Ploughing'
  | 'Planting'
  | 'Spraying'
  | 'Harvesting and Threshing';

export type ClusterStatus = 'Looking for Provider' | 'Provider Matched' | 'In Progress' | 'Completed';

export interface FarmerRequest {
  id: string;
  farmerName: string;
  phoneNumber: string;
  farmLocation: string;
  serviceNeeded: ServiceType;
  farmSizeHectares: number;
  preferredDate: string;
  submittedAt: string;
}

export interface Cluster {
  id: string;
  title: string;
  location: string;
  service: ServiceType;
  status: ClusterStatus;
  farmers: FarmerRequest[];
  targetHectares: number;
  acceptedBy?: {
    operatorName: string;
    operatorPhone: string;
    machineDetails: string;
    acceptedAt: string;
  };
}
