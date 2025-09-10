import Image from 'next/image';

import logo from '@/assets/images/logo.webp';
import { saveSource } from '@/utils/save-source';

export function Logo() {
  return (
    <div className="no-wrap text-foreground flex items-center">
      <Image width={30} height={24} alt="course logo" src={saveSource(logo)} />
      <span className="text-medium ml-2 font-bold">V-REST</span>
    </div>
  );
}
