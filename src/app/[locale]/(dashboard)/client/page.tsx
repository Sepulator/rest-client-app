import { LoadingIcon } from '@heroui/shared-icons';
import { lazy, Suspense } from 'react';

const HttpRequestForm = lazy(() =>
  import('@/features/rest-client/components/http-request-form').then((module) => ({ default: module.HttpRequestForm }))
);

export default function ClientPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-64 items-center justify-center">
          <LoadingIcon width="48px" />
        </div>
      }
    >
      <HttpRequestForm />
    </Suspense>
  );
}
