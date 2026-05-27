'use client';

import { toTitleCase } from '@/utils/toTitleCase';
import { usePathname } from 'next/navigation';

type PageTitleProps = { title?: string };
export function PageTitle({ title }: PageTitleProps) {
  const path = toTitleCase(usePathname().split('/')[1]);
  return (
    <div className='mb-2 flex flex-col gap-1'>
      <h1 className='text-3xl font-bold'>{title || path}</h1>
      <p className='text-ctp-subtext0 text-sm'>
        {"Kurban Masjid Imam Syafi'i Banjarmasin 1447H"}
      </p>
    </div>
  );
}
