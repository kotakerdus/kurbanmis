import { updateCowsState } from '@/actions/qurban_lists';
import { Button, PageTitle } from '@/components';
import { Card } from '@/components/card';
import { CardCover } from '@/components/penyembelihan/card-cover';
import { WrapperCard, WrapperMain } from '@/components/wrapper';
import client from '@/lib/mongodb';
import { QurbanList } from '@/types';

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
        {limosin.map((cow) => (
          <form
            key={cow._id.toString() + 'form'}
            action={async () => {
              'use server';
              await updateCowsState({
                id: cow._id.toString(),
                killed: !cow.killed,
                type: cow.type,
                order: cow.order,
              });
            }}
          >
            <Card
              key={cow._id.toString()}
              coverNode={CardCover({
                type: cow.type,
                order: cow.order,
                killed: cow.killed,
                killedAt: cow.killedAt,
                imgPath: '/images/sapi-limosin.webp',
              })}
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
              coverNode={CardCover({
                type: bali.type,
                order: bali.order,
                killed: bali.killed,
                killedAt: bali.killedAt,
                imgPath: '/images/sapi-bali.webp',
              })}
            >
              <Button type='submit'>Sembelih</Button>
            </Card>
          </form>
        ))}
      </WrapperCard>
    </WrapperMain>
  );
}
