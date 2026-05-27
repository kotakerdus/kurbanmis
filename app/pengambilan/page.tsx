import { updateSohibulState } from '@/actions/qurban_lists';
import { Button, PageTitle } from '@/components';
import { Card } from '@/components/card';
import { WrapperCard, WrapperMain } from '@/components/wrapper';
import client from '@/lib/mongodb';
import { QurbanList } from '@/types';
import { CheckIcon } from 'lucide-react';

export default async function SlaughteringPage() {
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
      <WrapperCard className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
        {limosin.map((limo) => (
          <Card key={limo._id.toString()}>
            <p className='truncate text-xl font-bold text-ellipsis'>{`${limo.type} #${limo.order}`}</p>
            <ul className='space-y-2'>
              {limo.sohibul.map((sohibul, i) => (
                <form
                  key={limo._id.toString() + 'form'}
                  action={async () => {
                    'use server';
                    await updateSohibulState({
                      id: limo._id.toString(),
                      name: sohibul.name,
                      pickedUp: !sohibul.pickedUp,
                    });
                  }}
                >
                  <li key={sohibul.name + '-' + i} className='w-full'>
                    <Button className='flex w-full justify-between gap-2'>
                      <p className='truncate'>{sohibul.name}</p>
                      {sohibul.pickedUp && (
                        <div className='text-ctp-green h-6 w-6'>
                          <CheckIcon />
                        </div>
                      )}
                    </Button>
                  </li>
                </form>
              ))}
            </ul>
          </Card>
        ))}
      </WrapperCard>
      <WrapperCard className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
        {bali.map((bali) => (
          <Card key={bali._id.toString()}>
            <p className='truncate text-xl font-bold text-ellipsis'>{`${bali.type} #${bali.order}`}</p>
            <ul className='space-y-2'>
              {bali.sohibul.map((sohibul, i) => (
                <form
                  key={bali._id.toString() + 'form'}
                  action={async () => {
                    'use server';
                    await updateSohibulState({
                      id: bali._id.toString(),
                      name: sohibul.name,
                      pickedUp: !sohibul.pickedUp,
                    });
                  }}
                >
                  <li key={sohibul.name + '-' + i} className='w-full'>
                    <Button className='flex w-full justify-between gap-2'>
                      <p className='truncate'>{sohibul.name}</p>
                      {sohibul.pickedUp && (
                        <div className='text-ctp-green h-6 w-6'>
                          <CheckIcon />
                        </div>
                      )}
                    </Button>
                  </li>
                </form>
              ))}
            </ul>
          </Card>
        ))}
      </WrapperCard>
    </WrapperMain>
  );
}
