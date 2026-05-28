export type CowType = 'Limosin' | 'Bali';
export type LogType = 'penyembelihan' | 'pengambilan' | 'distribusi';
export type DistributionStatus = 'otw' | 'finish' | null;

type Sohibul = {
  name: string;
  order: number;
  pickedUp: boolean;
  pickedUpAt: string | null;
};

export type QurbanList = {
  type: CowType;
  order: number;
  killed: boolean;
  killedAt: string | null;
  sohibul: Sohibul[];
};

export type Log = {
  text: string;
  type: LogType;
  timestamp: string;
};

export type Distribution = {
  locName: string;
  value: string;
  status: DistributionStatus;
  timestampStart: string | null;
  timestampFin: string | null;
};
