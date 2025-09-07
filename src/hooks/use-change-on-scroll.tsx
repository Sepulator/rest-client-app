'use client';

import { useEffect, useState } from 'react';

import { isClient } from '@/utils/contants';
import { throttle } from '@/utils/trottle';

export function useChangeOnScroll(offset: number, delay?: number) {
  const [isScrolled, setIsScrolled] = useState(() => isClient && window.scrollY > offset);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > offset);
    }, delay);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [delay, offset]);

  return isScrolled;
}
