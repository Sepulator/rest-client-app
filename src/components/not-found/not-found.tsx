'use client';
import { Button, Link } from '@heroui/react';
import Image from 'next/image';

import notFound from '@/assets/images/404.svg';
import { ROUTES } from '@/config/routes';
import { safeSource } from '@/utils/safe-source';

type NotFoundProps = {
  buttonText: string;
  title: string;
  description: string;
};

export function NotFoundComponent({ buttonText, title, description }: NotFoundProps) {
  return (
    <section className="relative flex min-h-full flex-1 flex-col items-center justify-center gap-10 px-6 text-center">
      <div className="relative h-1/7 w-1/2 md:h-1/6">
        <Image fill alt="" aria-hidden="true" src={safeSource(notFound)} priority className="z-10" />
      </div>
      <div>
        <h2 className="mb-3 text-5xl">{title}</h2>
        <p>{description}</p>
      </div>

      <Button as={Link} color="primary" className="w-50" href={ROUTES.MAIN}>
        {buttonText}
      </Button>
    </section>
  );
}
