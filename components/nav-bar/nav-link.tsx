import { toTitleCase } from '@/utils/toTitleCase';
import {
  ClipboardCheckIcon,
  LayoutDashboardIcon,
  ScrollTextIcon,
  ShoppingBagIcon,
  TruckIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type IconType =
  | 'pengambilan'
  | 'dashboard'
  | 'pengiriman'
  | 'penyembelihan'
  | 'logs';
type IconProps = { link: IconType };

export default function NavLink({ link }: IconProps) {
  const path = usePathname();
  const isActive = path === `/${link}`;
  const iconNode: Record<IconType, React.ReactNode> = {
    dashboard: <LayoutDashboardIcon />,
    pengiriman: <TruckIcon />,
    logs: <ScrollTextIcon />,
    pengambilan: <ShoppingBagIcon />,
    penyembelihan: <ClipboardCheckIcon />,
  };

  return (
    <li
      className={`w-full hover:bg-black/10 sm:rounded-md md:w-auto ${isActive ? 'text-accent' : ''}`}
    >
      <Link
        href={link}
        className={
          'relative flex items-center justify-center gap-2 px-2 py-2 sm:justify-normal'
        }
      >
        {isActive && (
          <div className='bg-accent absolute left-0.5 hidden h-6 w-0.5 sm:bottom-[unset] md:block' />
        )}
        <div className='h-6 w-6'>{iconNode[link]}</div>
        <span className='hidden md:block'>{toTitleCase(link)}</span>
      </Link>
    </li>
  );
}
