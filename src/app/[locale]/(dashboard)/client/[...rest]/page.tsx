import { HttpRequestForm } from '@/features/rest-client/components/http-request-form';

type PageProps = {
  params: Promise<{ rest: string[] }>;
  searchParams: Promise<Record<string, string>>;
};

export default async function ClientWithParamsPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  return <HttpRequestForm initialParams={resolvedParams.rest} initialSearchParams={resolvedSearchParams} />;
}
