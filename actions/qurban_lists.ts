import client from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';

// ----------------------------------------------------------------------------

type UpdateCowParams = { id: string; killed: boolean };

export async function updateCowsState({ id, killed }: UpdateCowParams) {
  const db = client.db('kurban1447h');
  const query = { _id: new ObjectId(id) };

  const now = new Date().toISOString();
  const updateSet = { killed, killedAt: now };

  await db.collection('qurban_lists').updateOne(query, { $set: updateSet });
  revalidatePath('/penyembelihan');
}

// ----------------------------------------------------------------------------

type UpdateSohibulParams = { id: string; name: string; pickedUp: boolean };

export async function updateSohibulState({
  id,
  name,
  pickedUp,
}: UpdateSohibulParams) {
  const db = client.db('kurban1447h');
  const query = { _id: new ObjectId(id), 'sohibul.name': name };

  const now = new Date().toISOString();
  const updateSet = {
    'sohibul.$.pickedUp': pickedUp,
    'sohibul.$.pickedUpAt': now,
  };

  await db.collection('qurban_lists').updateOne(query, { $set: updateSet });
  revalidatePath('/pengambilan');
}
