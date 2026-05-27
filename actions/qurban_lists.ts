import client from '@/lib/mongodb';
import { CowType } from '@/types';
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
