'use client';

import { PanelLeftCloseIcon, PanelLeftOpenIcon } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from '.';

export function NavBar() {
  const [hide, setHide] = useState(false);

  return (
    <>
      <div
        className={`border-t-ctp-surface1 sm:border-r-ctp-surface1 bg-ctp-mantle border-t select-none sm:border-t-0 sm:border-r sm:px-2 sm:py-4 md:p-5 ${hide ? 'sm:hidden' : 'block'}`}
      >
        <ul className='flex h-full flex-row sm:flex-col sm:gap-2'>
          <NavLink link='dashboard' />
          <NavLink link='penyembelihan' />
          <NavLink link='pengambilan' />
          <NavLink link='pengiriman' />
          <NavLink link='logs' />
        </ul>
      </div>
      <button
        onClick={() => setHide(!hide)}
        className={`hover:text-accent focus:text-accent border-ctp-surface1 absolute bottom-4 z-10 hidden h-10 w-10 items-center justify-center rounded-full border opacity-30 backdrop-blur-xs hover:opacity-100 focus:opacity-100 sm:flex ${!hide ? 'sm:left-19 md:left-54' : 'left-4'}`}
      >
        {!hide && <PanelLeftCloseIcon absoluteStrokeWidth size={20} />}
        {hide && <PanelLeftOpenIcon absoluteStrokeWidth size={20} />}
      </button>
    </>
  );
}
