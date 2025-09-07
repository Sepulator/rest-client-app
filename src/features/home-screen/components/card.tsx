'use client';
import { Card, CardHeader, CardFooter, Divider } from '@heroui/react';

import type { keyFeatures } from '@/features/home-screen/constants/key-features';

type CardProps = {
  cardInfo: (typeof keyFeatures)[number];
};

export function FeatureCard({ cardInfo: { title, icon, description } }: CardProps) {
  return (
    <Card key={title} className="bg-transparent p-2 outline-1 outline-gray-500/30 outline-solid">
      <CardHeader className="flex flex-col items-start gap-8">
        <span className="text-4xl">{icon}</span>
        <h3 className="text-2xl">{title}</h3>
      </CardHeader>

      <Divider />

      <CardFooter className="text-foreground-500 min-h-30">
        <p>{description}</p>
      </CardFooter>
    </Card>
  );
}
