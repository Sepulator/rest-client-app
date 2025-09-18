import { useTranslations } from 'next-intl';

import type { Header } from '@/types/http-request';

import { FormHeading } from '@/components/forms-ui/forms-heading';
import { HeaderRequest } from '@/features/rest-client/components/header-request';

type HeadersSectionProps = {
  headers: Header[];
  onAddHeader: () => void;
  onUpdateHeader: (id: string, updates: Partial<Header>) => void;
  onRemoveHeader: (id: string) => void;
};

export const HeadersSection = ({ headers, onAddHeader, onUpdateHeader, onRemoveHeader }: HeadersSectionProps) => {
  const t = useTranslations('RestClient');

  return (
    <>
      <FormHeading action={onAddHeader} heading={t('headers')} actionText={t('addHeader')} />

      {headers.map((header) => (
        <HeaderRequest
          key={header.id}
          header={header}
          onUpdate={(updates) => {
            onUpdateHeader(header.id, updates);
          }}
          onRemove={() => {
            onRemoveHeader(header.id);
          }}
        />
      ))}
    </>
  );
};
