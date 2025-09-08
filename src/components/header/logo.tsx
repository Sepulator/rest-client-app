import React from 'react';

import { LogoIcon } from '@/components/icons/logo-icon';

export function Logo() {
  return (
    <div className="no-wrap text-foreground flex">
      <LogoIcon className="text-primary text-2xl" />
      <span className="text-medium ml-2 font-bold">V-REST</span>
    </div>
  );
}
