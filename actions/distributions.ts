import client from '@/lib/mongodb';
import { Distribution, DistributionStatus } from '@/types';
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';
import { logAction } from './logs';

type DistributionParams = {
  id: string;
  locName: string;
  status: DistributionStatus;
  value: string;
};

export async function updateDistribution({
  id,
  locName,
  status,
  value,
}: DistributionParams) {
  const db = client.db('kurban1447h');
  const query = { _id: new ObjectId(id) };

  const now = new Date().toISOString();

  const nextStatus = !status ? 'otw' : status === 'otw' ? 'finish' : null;
  const updateSet: Partial<Distribution> = { status: nextStatus };

  if (nextStatus === 'otw') {
    updateSet.timestampStart = now;
  }

  if (nextStatus === 'finish') {
    updateSet.timestampFin = now;
  }

  // Reset everything
  if (nextStatus === null) {
    updateSet.timestampStart = null;
    updateSet.timestampFin = null;
  }

  await db.collection('distributions').updateOne(query, {
    $set: updateSet,
  });

  if (nextStatus) {
    const nextStatusText =
      nextStatus === 'otw'
        ? 'Tim distribusi sedang menuju ke ' + locName
        : 'Tim distribusi telah selesai mengirimkan daging kurban ke ' +
          locName +
          ' sebanyak ' +
          value;

    await logAction({
      text: nextStatusText,
      type: 'distribusi',
    });
  }

  revalidatePath('/dashboard');
  revalidatePath('/pengiriman');
  revalidatePath('/logs');
}
