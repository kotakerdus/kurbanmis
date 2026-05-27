import { UserIcon } from 'lucide-react';

export function NavUser() {
  return (
    <li className='hover:bg-foreground/10 flex w-full items-center justify-center px-2 py-2 sm:mt-auto sm:justify-normal sm:gap-2 sm:rounded-md'>
      <div className='h-6 w-6'>
        <UserIcon />
      </div>
      <span className='hidden md:block'>Viqo</span>
    </li>
  );
}
