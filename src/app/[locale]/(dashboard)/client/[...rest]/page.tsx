import { LoadingIcon } from '@heroui/shared-icons';
import { Suspense } from 'react';

import { HttpRequestForm } from '@/features/rest-client/components/http-request-form';

type Props = {
  params?: Promise<{ rest?: string[] }>;
  searchParams?: Promise<Record<string, string>>;
};

export default async function ClientPage({ params, searchParams }: Props) {
  const resolvedParams = params ? await params : undefined;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  return (
    <Suspense
      fallback={
        <div className="flex h-64 items-center justify-center">
          <LoadingIcon width="48px" />
        </div>
      }
    >
      <HttpRequestForm initialParams={resolvedParams?.rest} initialSearchParams={resolvedSearchParams} />
    </Suspense>
  );
}
