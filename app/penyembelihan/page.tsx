import { updateCowsState } from '@/actions/qurban_lists';
import { Button, PageTitle } from '@/components';
import { Card, CardCover } from '@/components/card';
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
        {limosin.map((limo) => (
          <Card
            key={limo._id.toString()}
            coverNode={CardCover({
              type: limo.type,
              order: limo.order,
              killed: limo.killed,
              killedAt: limo.killedAt,
              imgPath: '/images/sapi-limosin.webp',
            })}
          >
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
              <Button>Sembelih</Button>
            </form>
          </Card>
        ))}
      </WrapperCard>
      <WrapperCard className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {bali.map((bali) => (
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
              <Button type='submit'>Sembelih</Button>
            </form>
          </Card>
        ))}
      </WrapperCard>
    </WrapperMain>
  );
}
