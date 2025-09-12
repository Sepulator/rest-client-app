import type { StaticImport } from 'next/dist/shared/lib/get-img-props';

const isStaticImport = (value: unknown): value is StaticImport =>
  !!value && typeof value === 'object' && 'src' in value;

export const safeSource = (value: unknown): string | StaticImport => {
  if (typeof value === 'string') return value;
  if (isStaticImport(value)) return value;

  return '/placeholder.webp';
};
