export type CowType = 'Limosin' | 'Bali';
export type FlowStatus = 'start' | 'penyembelihan' | 'proses' | 'ready';
export type LogType = 'penyembelihan' | 'proses' | 'pengambilan' | 'distribusi';
export type DistributionStatus = 'otw' | 'finish' | null;

export type Flow = {
  status: FlowStatus | null;
  startAt: string | null;
  penyembelihanAt: string | null;
  prosesAt: string | null;
  readyAt: string | null;
};

type Sohibul = {
  name: string;
  order: number;
  pickedUp: boolean;
  pickedUpAt: string | null;
};

export type QurbanList = {
  type: CowType;
  order: number;
  flow: Flow;
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
