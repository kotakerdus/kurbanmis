import Card from '@/components/card/card';
import PageTitle from '@/components/page-title';
import WrapperMain from '@/components/wrapper/wrapper-main';
import client from '@/lib/mongodb';
import { Log, LogType } from '@/types';

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
              };

              const dateTime = new Date(log.timestamp);
              const time = dateTime.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              });

              return (
                <li key={log.timestamp} className='not-last:pb-2'>
                  <div className='flex items-center gap-3'>
                    <div
                      className={`h-3 w-3 rounded-full ${tagColor[log.type]}`}
                    />
                    <span className='font-mono text-sm text-gray-500 select-text'>
                      {time}
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
