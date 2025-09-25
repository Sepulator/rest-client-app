import Image from 'next/image';

import logo from '@/assets/images/logo.webp';
import { ROUTES } from '@/config/routes';
import { Link } from '@/i18n/navigation';
import { safeSource } from '@/utils/safe-source';

export function Logo() {
  return (
    <Link href={ROUTES.MAIN} className="no-wrap text-foreground flex items-center">
      <Image width={30} height={30} alt="logo" src={safeSource(logo)} />
      <span className="text-medium ml-2 font-bold">V-REST</span>
    </Link>
  );
}
