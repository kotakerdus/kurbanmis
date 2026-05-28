import { PageTitle } from '@/components';
import { Card } from '@/components/card';
import { WrapperMain } from '@/components/wrapper';
import client from '@/lib/mongodb';
import { Log, LogType } from '@/types';
import { toTwentyFourHours } from '@/utils/toTwentyFourHours';

export const dynamic = 'force-dynamic';

export default async function LogsPage() {
  const db = client.db('kurban1447h');
  const logs = await db
    .collection<Log>('logs')
    .find({})
    .sort({ timestamp: -1 })
    .toArray();

  return (
    <WrapperMain>
      <PageTitle />
      {!!logs.length && (
        <Card>
          <ul className='divide-ctp-text/20 space-y-2 divide-y'>
            {logs.map((log) => {
              const tagColor: Record<LogType, string> = {
                distribusi: 'bg-ctp-blue',
                pengambilan: 'bg-ctp-green',
                penyembelihan: 'bg-ctp-red',
                proses: 'bg-ctp-yellow',
              };

              return (
                <li key={log.timestamp} className='not-last:pb-2'>
                  <div className='flex items-center gap-3'>
                    <div
                      className={`h-3 w-3 rounded-full ${tagColor[log.type]}`}
                    />
                    <span className='font-mono text-sm text-gray-500 select-text'>
                      {toTwentyFourHours(log.timestamp)}
                    </span>
                    <p className='flex-1 select-text'>{log.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>
      )}
    </WrapperMain>
  );
}
