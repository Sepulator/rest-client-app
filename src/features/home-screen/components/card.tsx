'use client';
import { Card, CardHeader, CardFooter, Divider } from '@heroui/react';

import type { keyFeatures } from '@/features/home-screen/constants/key-features';

type CardProps = {
  cardInfo: (typeof keyFeatures)[number];
};

export function FeatureCard({ cardInfo: { title, icon, description } }: CardProps) {
  return (
    <Card shadow="none" key={title} className="min-w-80 flex-1 p-2 outline-1">
      <CardHeader className="flex flex-col items-start gap-8">
        <span className="text-4xl">{icon}</span>
        <h3>{title}</h3>
      </CardHeader>

      <Divider />

      <CardFooter className="min-h-30">
        <p className="text-small">{description}</p>
      </CardFooter>
    </Card>
  );
}
