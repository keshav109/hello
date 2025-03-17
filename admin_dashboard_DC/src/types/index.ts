export interface Certificate {
  id: string;
  type: string;
  region: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

export interface RegionData {
  region: string;
  pending: number;
  approved: number;
  rejected: number;
}

export interface WorkerLoad {
  region: string;
  load: number;
  efficiency: number;
}