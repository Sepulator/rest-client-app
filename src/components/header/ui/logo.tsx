import Image from 'next/image';

import logo from '@/assets/images/logo.webp';
import { safeSource } from '@/utils/safe-source';

export function Logo() {
  return (
    <div className="no-wrap text-foreground flex items-center">
      <Image width={30} height={24} alt="course logo" src={safeSource(logo)} />
      <span className="text-medium ml-2 font-bold">V-REST</span>
    </div>
  );
}
