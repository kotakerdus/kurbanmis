import { updateSohibulState } from '@/actions/qurban_lists';
import { Button, PageTitle } from '@/components';
import { Card } from '@/components/card';
import { CardCover } from '@/components/card/card-cover';
import { WrapperCard, WrapperMain } from '@/components/wrapper';
import client from '@/lib/mongodb';
import { QurbanList } from '@/types';
import { toTwentyFourHours } from '@/utils/toTwentyFourHours';
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
            <ul className='space-y-2'>
              {limo.sohibul.map((sohibul, i) => (
                <li
                  key={`${limo._id.toString()}-${sohibul.name}-${i}`}
                  className='w-full'
                >
                  <form
                    key={`${limo._id.toString()}-${sohibul.name}-${i}-form`}
                    action={async () => {
                      'use server';
                      await updateSohibulState({
                        id: limo._id.toString(),
                        index: i,
                        name: sohibul.name,
                        pickedUp: !sohibul.pickedUp,
                      });
                    }}
                  >
                    <Button
                      disabled={!limo.killed}
                      className='flex w-full justify-between gap-2'
                    >
                      <p className='truncate'>{sohibul.name}</p>
                      {sohibul.pickedUp && sohibul.pickedUpAt && (
                        <div className='text-ctp-green flex items-center gap-2'>
                          <p className='font-mono text-sm'>
                            {toTwentyFourHours(sohibul.pickedUpAt)}
                          </p>
                          <CheckIcon />
                        </div>
                      )}
                    </Button>
                  </form>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </WrapperCard>
      <WrapperCard className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
        {bali.map((bali) => (
          <Card
            key={bali._id.toString()}
            coverNode={CardCover({
              type: bali.type,
              order: bali.order,
              killed: bali.killed,
              killedAt: bali.killedAt,
              imgPath: '/images/sapi-limosin.webp',
            })}
          >
            <ul className='space-y-2'>
              {bali.sohibul.map((sohibul, i) => (
                <li
                  key={`${bali._id.toString()}-${sohibul.name}-${i}`}
                  className='w-full'
                >
                  <form
                    key={`${bali._id.toString()}-${sohibul.name}-${i}-form`}
                    action={async () => {
                      'use server';
                      await updateSohibulState({
                        id: bali._id.toString(),
                        index: i,
                        name: sohibul.name,
                        pickedUp: !sohibul.pickedUp,
                      });
                    }}
                  >
                    <Button
                      disabled={!bali.killed}
                      className='flex w-full justify-between gap-2'
                    >
                      <p className='truncate'>{sohibul.name}</p>
                      {sohibul.pickedUp && sohibul.pickedUpAt && (
                        <div className='text-ctp-green flex items-center gap-2'>
                          <p className='font-mono text-sm'>
                            {toTwentyFourHours(sohibul.pickedUpAt)}
                          </p>
                          <CheckIcon />
                        </div>
                      )}
                    </Button>
                  </form>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </WrapperCard>
    </WrapperMain>
  );
}
