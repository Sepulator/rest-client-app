'use client';

import { useEffect, useState } from 'react';

import { throttle } from '@/utils/throttle';

export function useChangeOnScroll(offset: number, delay?: number) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > offset);
    }, delay);

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [delay, offset]);

  return isScrolled;
}
