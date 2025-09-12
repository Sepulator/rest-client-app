import { Spinner } from '@heroui/react';
import { StatusCodes } from 'http-status-codes';
import { useTranslations } from 'next-intl';

import type { ResponseData } from '@/types/http-request';

import { RequestBodyEditor } from '@/features/rest-client/components/request-body-editor';

type Props = {
  response: ResponseData | null;
  isLoading: boolean;
};

export const ResponseSection = ({ response, isLoading }: Props) => {
  const t = useTranslations('RestClient');
  const statusStyle = (response?.status ?? 0) >= StatusCodes.BAD_REQUEST ? 'text-danger-500' : 'text-success-500';

  if (isLoading) {
    return <Spinner color="warning" label="Loading..." />;
  }

  if (response?.error) {
    return (
      <section className="mb-4 rounded bg-red-100 p-3 text-red-800">
        <strong>Error:</strong> {response.error}
      </section>
    );
  }

  return (
    <section>
      <div className="mb-4">
        <span className="text-sm text-gray-500">{t('status')}:</span>
        <span className={`ml-2 font-semibold ${statusStyle}`}>
          {response?.status} {response?.statusText}
        </span>
      </div>

      {response?.body && <RequestBodyEditor body={response.body} mode="json" readOnly title={t('resBody')} />}
    </section>
  );
};
