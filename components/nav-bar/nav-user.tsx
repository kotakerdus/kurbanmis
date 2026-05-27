import { UserIcon } from 'lucide-react';

export default function NavUser() {
  return (
    <li className='flex w-full items-center justify-center px-2 py-2 hover:bg-black/10 sm:mt-auto sm:justify-normal sm:gap-2 sm:rounded-md'>
      <div className='h-6 w-6'>
        <UserIcon />
      </div>
      <span className='hidden md:block'>Viqo</span>
    </li>
  );
}
