import { Spinner } from '@heroui/react';
import { StatusCodes } from 'http-status-codes';
import { useTranslations } from 'next-intl';

import { RequestBodyEditor } from '@/features/rest-client/components/request-body-editor';
import { useIsLoading, useResponse } from '@/stores/rest-client/selectors';

export const ResponseSection = () => {
  const response = useResponse();
  const isLoading = useIsLoading();
  const t = useTranslations('RestClient');
  const statusStyle = (response?.status ?? 0) >= StatusCodes.BAD_REQUEST ? 'text-danger-500' : 'text-success-500';

  if (isLoading) {
    return <Spinner color="warning" label={t('loading')} />;
  }

  return (
    <div>
      <div className="mb-4">
        <span className="text-sm text-gray-500">{t('status')}:</span>
        <span className={`ml-2 font-semibold ${statusStyle}`}>
          {response?.status ?? ''} {response?.statusText ?? ''}
        </span>
      </div>

      {response?.body && <RequestBodyEditor body={response.body} mode="json" readOnly title={t('resBody')} />}
    </div>
  );
};
