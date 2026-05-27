import { AutoRefresh, PageTitle } from '@/components';
import { Card, CardNumber } from '@/components/card';
import { ChartProgress } from '@/components/chart';
import { WrapperCard, WrapperMain } from '@/components/wrapper';
import client from '@/lib/mongodb';
import { Distribution, Log, LogType, QurbanList } from '@/types';
import { relativeTime } from '@/utils/relativeTime';
import { CheckIcon } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const db = client.db('kurban1447h');
  const data = await db
    .collection<QurbanList>('qurban_lists')
    .find({})
    .toArray();
  const logs = await db
    .collection<Log>('logs')
    .find({})
    .limit(20)
    .sort({ timestamp: -1 })
    .toArray();
  const distributons = await db
    .collection<Distribution>('distributions')
    .find({})
    .toArray();

  const totalLimoSl = data.filter(
    (cow) => cow.type === 'Limosin' && cow.killed,
  ).length;
  const totalBaliSl = data.filter(
    (cow) => cow.type === 'Bali' && cow.killed,
  ).length;
  const totalLimo = data.filter((cow) => cow.type === 'Limosin').length;
  const totalBali = data.filter((cow) => cow.type === 'Bali').length;

  return (
    <WrapperMain>
      <PageTitle />
      <WrapperCard className='grid grid-cols-3 grid-rows-1 lg:grid-cols-4'>
        <CardNumber
          title='Total Sapi 🐮'
          value={data.length}
          prefix='ekor'
          className='col-span-1 lg:col-span-2'
        />
        <CardNumber title='Limosin' value={totalLimo} prefix='ekor' />
        <CardNumber title='Bali' value={totalBali} prefix='ekor' />
      </WrapperCard>
      <Card title='Penyembelihan 🔪'>
        <div className='flex flex-col gap-2'>
          <ChartProgress
            title='Limosin'
            value={totalLimoSl}
            total={totalLimo}
            counter={{ enable: true, suffix: 'ekor' }}
          />
          <ChartProgress
            title='Bali'
            value={totalBaliSl}
            total={totalBali}
            counter={{ enable: true, suffix: 'ekor' }}
          />
        </div>
      </Card>
      <WrapperCard className='grid grid-cols-3 grid-rows-2 lg:grid-cols-4'>
        <Card title='Distribusi 🚛' className='col-span-1'>
          <ul className='divide-ctp-text/20 space-y-2 divide-y'>
            {distributons.map((dist) => {
              const id = dist._id.toString();
              const status = dist.status;

              const statusText = !status
                ? 'Standby'
                : status === 'otw'
                  ? 'OTW'
                  : 'Terkirim';

              return (
                <li
                  key={id}
                  className='flex justify-between not-last:pb-2 first:pt-2 last:pb-2'
                >
                  <p>RT {dist.rt}</p>
                  <div className='flex gap-2'>
                    <p>{statusText}</p>
                    {status === 'finish' && (
                      <CheckIcon size={20} className='text-ctp-green' />
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>
        <Card title='Update Terkini 🔥' className='col-span-2 lg:col-span-3'>
          <div className='relative'>
            {!logs.length && (
              <div className='flex h-full w-full items-center justify-center'>
                <p>Belum ada</p>
              </div>
            )}
            {logs.length > 0 && (
              <>
                <div className='dark:from-background absolute top-0 h-5 w-full bg-linear-to-b from-white to-transparent' />
                <div className='dark:from-background absolute bottom-0 h-5 w-full bg-linear-to-t from-white to-transparent' />
                <ul className='divide-ctp-text/20 h-70 space-y-2 divide-y overflow-scroll'>
                  {logs.map((log) => {
                    const tagColor: Record<LogType, string> = {
                      distribusi: 'bg-ctp-blue',
                      pengambilan: 'bg-ctp-green',
                      penyembelihan: 'bg-ctp-red',
                    };

                    return (
                      <li
                        key={log.timestamp}
                        className='not-last:pb-2 first:pt-2 last:pb-2'
                      >
                        <div className='flex items-center gap-3'>
                          <div
                            className={`h-3 w-3 rounded-full ${tagColor[log.type]}`}
                          />
                          <span className='font-mono text-sm text-gray-500 select-text'>
                            {relativeTime(log.timestamp)}
                          </span>
                          <p className='flex-1 select-text'>{log.text}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>
        </Card>
      </WrapperCard>
      <AutoRefresh />
    </WrapperMain>
  );
}
