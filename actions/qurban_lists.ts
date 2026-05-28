import client from '@/lib/mongodb';
import { CowType, QurbanList } from '@/types';
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';
import { logAction } from './logs';

// ----------------------------------------------------------------------------

type UpdateCowParams = {
  id: string;
  killed: boolean;
  type: CowType;
  order: number;
};

export async function updateCowsState({
  id,
  killed,
  type,
  order,
}: UpdateCowParams) {
  const db = client.db('kurban1447h');
  const query = { _id: new ObjectId(id) };

  const now = new Date().toISOString();
  const updateSet = { killed, killedAt: killed ? now : null };

  await db.collection('qurban_lists').updateOne(query, { $set: updateSet });
  await logAction({
    text: `Sapi ${type} #${order} telah disembelih`,
    type: 'penyembelihan',
  });

  revalidatePath('/penyembelihan');
  revalidatePath('/pengambilan');
}

// ----------------------------------------------------------------------------

type UpdateSohibulParams = {
  id: string;
  index: number;
  name: string;
  pickedUp: boolean;
};

export async function updateSohibulState({
  id,
  index,
  name,
  pickedUp,
}: UpdateSohibulParams) {
  const db = client.db('kurban1447h');
  const query = { _id: new ObjectId(id) };

  const now = new Date().toISOString();
  const updateSet = {
    [`sohibul.${index}.pickedUp`]: pickedUp,
    [`sohibul.${index}.pickedUpAt`]: pickedUp ? now : null,
  };

  await db.collection('qurban_lists').updateOne(query, { $set: updateSet });
  await logAction({
    text: `Daging sapi atas nama ${name} telah diambil`,
    type: 'pengambilan',
  });

  revalidatePath('/pengambilan');
}

// ----------------------------------------------------------------------------

type UpdateFlowParams = Omit<QurbanList, 'sohibul' | 'killed' | 'killedAt'> & {
  id: string;
};

export async function updateFlow({ id, type, order, flow }: UpdateFlowParams) {
  const db = client.db('kurban1447h');
  const query = { _id: new ObjectId(id) };

  const flowObj = (() => {
    let message = '';
    const newFlow = flow;
    const now = new Date().toISOString();

    if (newFlow.status === null) {
      message = `Sapi ${type} #${order} sedang bersiap menuju tempat penyembelihan`;
      newFlow.status = 'start';
      newFlow.startAt = now;
    } else if (newFlow.status === 'start') {
      message = `Sapi ${type} #${order} telah disembelih`;
      newFlow.status = 'penyembelihan';
      newFlow.penyembelihanAt = now;
    } else if (newFlow.status === 'penyembelihan') {
      newFlow.status = 'proses';
      message = `Sapi ${type} #${order} sedang dalam tahap proses pengulitan, penulangan, dan pembungkusan`;
      newFlow.prosesAt = now;
    } else if (newFlow.status === 'proses') {
      message = `Daging sapi ${type} #${order} siap untuk diambil`;
      newFlow.status = 'ready';
      newFlow.readyAt = now;
    }

    return { newFlow, message };
  })();

  const updateSet = { flow: { ...flowObj.newFlow } };
  await db.collection('qurban_lists').updateOne(query, { $set: updateSet });

  await logAction({
    text: flowObj.message,
    type: 'proses',
  });

  revalidatePath('/penyembelihan');
  revalidatePath('/pengambilan');
}
