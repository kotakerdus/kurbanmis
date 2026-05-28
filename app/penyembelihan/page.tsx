import { updateFlow } from '@/actions/qurban_lists';
import { Button, PageTitle } from '@/components';
import { Card, CardCover } from '@/components/card';
import { WrapperCard, WrapperMain } from '@/components/wrapper';
import client from '@/lib/mongodb';
import { QurbanList } from '@/types';

export const dynamic = 'force-dynamic';

export default async function PenyembelihanPage() {
  const db = client.db('kurban1447h');
  const qurban = await db
    .collection<QurbanList>('qurban_lists')
    .find({})
    .toArray();

  const limosin = qurban.filter((sapi) => sapi.type === 'Limosin');
  const bali = qurban.filter((sapi) => sapi.type === 'Bali');

  return (
    <WrapperMain>
      <PageTitle />
      <WrapperCard className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {limosin.map((limo) => {
          const status = limo.flow.status;
          const id = limo._id.toString();
          const btnStr = (() => {
            if (status === null) {
              return 'Persiapan';
            } else if (status === 'start') {
              return 'Telah disembelih';
            } else if (status === 'penyembelihan') {
              return 'Proses';
            } else if (status === 'proses') {
              return 'Siap diambil';
            } else if (status === 'ready') {
              return 'Selesai';
            }
          })();

          return (
            <Card
              key={limo._id.toString()}
              coverNode={CardCover({
                type: limo.type,
                order: limo.order,
                killed: limo.flow.penyembelihanAt !== null,
                killedAt: limo.flow.penyembelihanAt,
                imgPath: '/images/sapi-limosin.webp',
              })}
            >
              <form
                key={id + 'form'}
                className='flex'
                action={async () => {
                  'use server';
                  await updateFlow({
                    id,
                    type: limo.type,
                    order: limo.order,
                    flow: limo.flow,
                  });
                }}
              >
                <Button type='submit' className='mx-auto'>
                  {btnStr}
                </Button>
              </form>
            </Card>
          );
        })}
      </WrapperCard>
      <WrapperCard className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {bali.map((bali) => {
          const status = bali.flow.status;
          const id = bali._id.toString();
          const btnStr = (() => {
            if (status === null) {
              return 'Persiapan';
            } else if (status === 'start') {
              return 'Telah disembelih';
            } else if (status === 'penyembelihan') {
              return 'Proses';
            } else if (status === 'proses') {
              return 'Siap diambil';
            } else if (status === 'ready') {
              return 'Selesai';
            }
          })();

          return (
            <Card
              key={id}
              coverNode={CardCover({
                type: bali.type,
                order: bali.order,
                killed: bali.flow.penyembelihanAt !== null,
                killedAt: bali.flow.penyembelihanAt,
                imgPath: '/images/sapi-bali.webp',
              })}
            >
              <form
                key={id + 'form'}
                className='flex'
                action={async () => {
                  'use server';
                  await updateFlow({
                    id,
                    type: bali.type,
                    order: bali.order,
                    flow: bali.flow,
                  });
                }}
              >
                <Button
                  disabled={status === 'ready'}
                  type='submit'
                  className='mx-auto'
                >
                  {btnStr}
                </Button>
              </form>
            </Card>
          );
        })}
      </WrapperCard>
    </WrapperMain>
  );
}
