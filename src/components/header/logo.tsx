import React from 'react';

import { LogoIcon } from '@/components/icons/logo-icon';

export function Logo() {
  return (
    <div className="no-wrap text-foreground-600 flex">
      <LogoIcon className="text-primary text-2xl" />
      <p className="ml-2 font-bold">V-REST</p>
    </div>
  );
}
