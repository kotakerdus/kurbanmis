import { updateDistribution } from '@/actions/distributions';
import { Button, PageTitle } from '@/components';
import { Card } from '@/components/card';
import { WrapperCard, WrapperMain } from '@/components/wrapper';
import client from '@/lib/mongodb';
import { Distribution } from '@/types';
import { toTwentyFourHours } from '@/utils/toTwentyFourHours';
import { CheckIcon, HouseIcon, SchoolIcon, TruckIcon } from 'lucide-react';

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
                <h2 className='text-3xl'>RT {trans.rt}</h2>
                {status === 'finish' && (
                  <CheckIcon size={30} className='text-ctp-green' />
                )}
              </div>
              <div className='flex flex-col gap-2'>
                <div className='flex justify-between'>
                  {status && <SchoolIcon size={36} />}
                  <TruckIcon
                    size={36}
                    className={`${status === 'otw' ? 'animate-bounce-tilt' : ''}`}
                  />
                  {status !== 'finish' && <HouseIcon size={36} />}
                </div>
                <div className='flex items-center justify-between px-4'>
                  <div className='aspect-square h-2 rounded-full bg-black' />
                  <div className='h-0.5 w-2 rounded-full bg-black' />
                  <div className='h-0.5 w-2 rounded-full bg-black' />
                  <div className='h-0.5 w-2 rounded-full bg-black' />
                  <div className='aspect-square h-2 rounded-full bg-black' />
                  <div className='h-0.5 w-2 rounded-full bg-black' />
                  <div className='h-0.5 w-2 rounded-full bg-black' />
                  <div className='h-0.5 w-2 rounded-full bg-black' />
                  <div className='aspect-square h-2 rounded-full bg-black' />
                </div>
                <div className='flex items-center justify-between px-1'>
                  <span className='text-sm'>
                    {trans.timestampStart
                      ? toTwentyFourHours(trans.timestampStart)
                      : '‎'}
                  </span>
                  <span className='text-sm'>
                    {trans.timestampFin
                      ? toTwentyFourHours(trans.timestampFin)
                      : '‎'}
                  </span>
                </div>
              </div>
              <form
                key={trans._id.toString() + 'form'}
                className='flex'
                action={async () => {
                  'use server';
                  await updateDistribution({
                    id: trans._id.toString(),
                    status,
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
