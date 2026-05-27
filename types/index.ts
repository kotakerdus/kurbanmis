export type CowType = 'Limosin' | 'Bali';
export type LogType = 'penyembelihan' | 'pengambilan' | 'distribusi';

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
