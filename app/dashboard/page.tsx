import { PageTitle } from '@/components';
import { Card, CardNumber } from '@/components/card';
import { ChartProgress } from '@/components/chart';
import { WrapperCard, WrapperMain } from '@/components/wrapper';
import client from '@/lib/mongodb';
import { QurbanList } from '@/types';

export default async function DashboardPage() {
  const db = client.db('kurban1447h');
  const data = await db
    .collection<QurbanList>('qurban_lists')
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
          title='Total Sapi'
          value={data.length}
          prefix='ekor'
          className='col-span-1 lg:col-span-2'
        />
        <CardNumber title='Limosin' value={totalLimo} prefix='ekor' />
        <CardNumber title='Bali' value={totalBali} prefix='ekor' />
      </WrapperCard>
      <Card title='Penyembelihan'>
        <div className='flex flex-col gap-4'>
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
    </WrapperMain>
  );
}
