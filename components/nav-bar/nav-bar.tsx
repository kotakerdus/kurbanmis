'use client';

import { useState } from 'react';
import NavLink from './nav-link';
import NavUser from './nav-user';
import { PanelLeftCloseIcon, PanelLeftOpenIcon } from 'lucide-react';

export default function NavBar() {
  const [hide, setHide] = useState(false);

  return (
    <>
      <div
        className={`border-t-ctp-text/20 sm:border-r-ctp-text/20 bg-ctp-mantle border-t select-none sm:border-t-0 sm:border-r sm:px-2 sm:py-4 md:p-5 ${hide ? 'sm:hidden' : 'block'}`}
      >
        <ul className='flex h-full flex-row justify-between sm:flex-col sm:gap-2'>
          <NavLink link='dashboard' />
          <NavLink link='penyembelihan' />
          <NavLink link='pengambilan' />
          <NavLink link='pengiriman' />
          <NavLink link='logs' />
          <NavUser />
        </ul>
      </div>
      <button
        onClick={() => setHide(!hide)}
        className={`hover:text-accent focus:text-accent border-ctp-text/20 absolute bottom-4 z-10 hidden h-10 w-10 items-center justify-center rounded-full border opacity-30 backdrop-blur-xs hover:opacity-100 focus:opacity-100 sm:flex ${!hide ? 'sm:left-19 md:left-54' : 'left-4'}`}
      >
        {!hide && <PanelLeftCloseIcon absoluteStrokeWidth size={20} />}
        {hide && <PanelLeftOpenIcon absoluteStrokeWidth size={20} />}
      </button>
    </>
  );
}
