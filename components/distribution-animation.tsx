import { DistributionStatus } from '@/types';
import { toTwentyFourHours } from '@/utils/toTwentyFourHours';
import { HouseIcon, SchoolIcon, TruckIcon } from 'lucide-react';

type DistributionAnimationProps = {
  status: DistributionStatus;
  timestampStart: string | null;
  timestampFin: string | null;
  showTime?: boolean;
};

export function DistributionAnimation({
  status,
  timestampStart,
  timestampFin,
  showTime = true,
}: DistributionAnimationProps) {
  return (
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
        <div className='aspect-square h-2 rounded-full bg-black dark:bg-white' />
        <div className='h-0.5 w-2 rounded-full bg-black dark:bg-white' />
        <div className='h-0.5 w-2 rounded-full bg-black dark:bg-white' />
        <div className='h-0.5 w-2 rounded-full bg-black dark:bg-white' />
        <div className='aspect-square h-2 rounded-full bg-black dark:bg-white' />
        <div className='h-0.5 w-2 rounded-full bg-black dark:bg-white' />
        <div className='h-0.5 w-2 rounded-full bg-black dark:bg-white' />
        <div className='h-0.5 w-2 rounded-full bg-black dark:bg-white' />
        <div className='aspect-square h-2 rounded-full bg-black dark:bg-white' />
      </div>
      {showTime && (
        <div className='flex items-center justify-between px-1'>
          <span className='text-sm'>
            {timestampStart ? toTwentyFourHours(timestampStart) : '‎'}
          </span>
          <span className='text-sm'>
            {timestampFin ? toTwentyFourHours(timestampFin) : '‎'}
          </span>
        </div>
      )}
    </div>
  );
}
