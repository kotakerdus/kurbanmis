import { QurbanList } from '@/types';
import { toTwentyFourHours } from '@/utils/toTwentyFourHours';
import { CheckIcon } from 'lucide-react';
import Image from 'next/image';

type CardCoverProps = Omit<QurbanList, 'sohibul'> & { imgPath: string };
export function CardCover({
  type,
  order,
  killed,
  killedAt,
  imgPath,
}: CardCoverProps) {
  return (
    <div className='relative flex h-25 w-full items-center justify-center overflow-clip text-white'>
      <Image
        fill
        alt={type}
        src={imgPath}
        style={{
          objectFit: 'cover',
          filter: `${killed ? 'grayscale(100%)' : ''}`,
        }}
      />
      <span className='absolute top-2 left-3 text-2xl font-bold lg:text-3xl'>{`${type} #${order}`}</span>
      {killed && killedAt && (
        <div className='absolute right-2 bottom-2 flex gap-2'>
          <p className='font-mono'>{toTwentyFourHours(killedAt)}</p>
          <CheckIcon />
        </div>
      )}
    </div>
  );
}
