import { useTranslations } from 'next-intl';

import type { Header } from '@/types/http-request';

import { FormHeading } from '@/components/forms-ui/forms-heading';
import { HeaderRequest } from '@/features/rest-client/components/header-request';
import { useAddHeader, useHeaders, useRemoveHeader, useUpdateHeader } from '@/stores/rest-client/selectors';

export const HeadersSection = () => {
  const headers = useHeaders();
  const addHeader = useAddHeader();
  const updateHeader = useUpdateHeader();
  const removeHeader = useRemoveHeader();
  const t = useTranslations('RestClient');

  const handleUpdate = (id: string) => (updates: Partial<Header>) => {
    updateHeader(id, updates);
  };

  const handleRemove = (id: string) => () => {
    removeHeader(id);
  };

  return (
    <>
      <FormHeading action={addHeader} heading={t('headers')} actionText={t('addHeader')} />

      {headers.map((header) => (
        <HeaderRequest
          key={header.id}
          header={header}
          onUpdate={handleUpdate(header.id)}
          onRemove={handleRemove(header.id)}
        />
      ))}
    </>
  );
};
