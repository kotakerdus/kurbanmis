import { updateCowsState } from '@/actions/qurban_lists';
import { Button, PageTitle } from '@/components';
import { Card } from '@/components/card';
import { WrapperCard, WrapperMain } from '@/components/wrapper';
import client from '@/lib/mongodb';
import { QurbanList } from '@/types';
import { CheckCircle2Icon } from 'lucide-react';

export default async function PenyembelihanPage() {
  const db = client.db('kurban1447h');
  const data = await db
    .collection<QurbanList>('qurban_lists')
    .find({})
    .toArray();

  const limosin = data.filter((sapi) => sapi.type === 'Limosin');
  const bali = data.filter((sapi) => sapi.type === 'Bali');

  return (
    <WrapperMain>
      <PageTitle />
      <WrapperCard className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {limosin.map((limo) => (
          <form
            key={limo._id.toString() + 'form'}
            action={async () => {
              'use server';
              await updateCowsState({
                id: limo._id.toString(),
                killed: !limo.killed,
                type: limo.type,
                order: limo.order,
              });
            }}
          >
            <Card
              key={limo._id.toString()}
              coverNode={
                <div className='bg-ctp-base text-ctp-text relative flex h-35 w-full items-center justify-center'>
                  <span className='absolute top-3 left-3 text-xl font-bold italic md:text-2xl'>{`#${limo.order}`}</span>
                  {limo.killed && (
                    <div className='text-ctp-green absolute right-3 bottom-3'>
                      <CheckCircle2Icon />
                    </div>
                  )}
                </div>
              }
            >
              <Button>Sembelih</Button>
            </Card>
          </form>
        ))}
      </WrapperCard>
      <WrapperCard className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {bali.map((bali) => (
          <form
            key={bali._id.toString() + 'form'}
            action={async () => {
              'use server';
              await updateCowsState({
                id: bali._id.toString(),
                killed: !bali.killed,
                type: bali.type,
                order: bali.order,
              });
            }}
          >
            <Card
              key={bali._id.toString()}
              coverNode={
                <div className='bg-ctp-base text-ctp-text relative flex h-35 w-full items-center justify-center'>
                  <span className='absolute top-3 left-3 text-xl font-bold italic md:text-2xl'>{`#${bali.order}`}</span>
                  {bali.killed && (
                    <div className='text-ctp-green absolute right-3 bottom-3'>
                      <CheckCircle2Icon />
                    </div>
                  )}
                </div>
              }
            >
              <Button>Sembelih</Button>
            </Card>
          </form>
        ))}
      </WrapperCard>
    </WrapperMain>
  );
}
