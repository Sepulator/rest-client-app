import { HttpRequestFormDynamic } from '@/features/rest-client/components/http-request-form';

type Props = {
  params?: Promise<{ rest?: string[] }>;
  searchParams?: Promise<Record<string, string>>;
};

export default async function ClientPage({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  return <HttpRequestFormDynamic initialParams={resolvedParams?.rest} initialSearchParams={resolvedSearchParams} />;
}
