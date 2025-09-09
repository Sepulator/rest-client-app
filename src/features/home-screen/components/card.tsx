'use client';
import { Card, CardHeader, CardFooter, Divider } from '@heroui/react';

type CardProps = {
  title: string;
  icon: string;
  description: string;
};

export function FeatureCard({ title, icon, description }: CardProps) {
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
