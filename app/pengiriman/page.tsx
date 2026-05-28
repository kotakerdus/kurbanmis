import { updateDistribution } from '@/actions/distributions';
import { Button, PageTitle } from '@/components';
import { Card } from '@/components/card';
import { DistributionAnimation } from '@/components/distribution-animation';
import { WrapperCard, WrapperMain } from '@/components/wrapper';
import client from '@/lib/mongodb';
import { Distribution } from '@/types';
import { CheckIcon } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function PengirimanPage() {
  const db = client.db('kurban1447h');
  const dist = await db
    .collection<Distribution>('distributions')
    .find({})
    .sort({ timestamp: -1 })
    .toArray();

  return (
    <WrapperMain>
      <PageTitle />
      <WrapperCard className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {dist.map((trans) => {
          const status = trans.status;
          const buttonStr = !status
            ? 'Berangkat!'
            : status === 'otw'
              ? 'Sampai!'
              : 'Reset';

          return (
            <Card key={trans._id.toString()}>
              <div className='mb-4 flex items-center justify-between'>
                <h2 className='text-3xl'>{trans.locName}</h2>
                {status === 'finish' && (
                  <CheckIcon size={30} className='text-ctp-green' />
                )}
              </div>
              <DistributionAnimation
                status={status}
                timestampStart={trans.timestampStart}
                timestampFin={trans.timestampFin}
              />
              <form
                key={trans._id.toString() + 'form'}
                className='flex'
                action={async () => {
                  'use server';
                  await updateDistribution({
                    id: trans._id.toString(),
                    locName: trans.locName,
                    status,
                    value: trans.value,
                  });
                }}
              >
                <Button className='mt-4 mr-auto ml-auto'>{buttonStr}</Button>
              </form>
            </Card>
          );
        })}
      </WrapperCard>
    </WrapperMain>
  );
}
