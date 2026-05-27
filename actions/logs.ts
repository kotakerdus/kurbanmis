import client from '@/lib/mongodb';
import { Log, LogType } from '@/types';
import { revalidatePath } from 'next/cache';

type DataLogParams = { text: string; type: LogType; timestamp?: string };
export async function logAction({ text, type, timestamp }: DataLogParams) {
  const db = client.db('kurban1447h');

  const time = timestamp?.trim() || new Date().toISOString();
  await db.collection<Log>('logs').insertOne({ text, type, timestamp: time });

  revalidatePath('/dashboard');
  revalidatePath('/logs');
}
