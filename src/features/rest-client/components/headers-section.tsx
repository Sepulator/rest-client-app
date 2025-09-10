import { Button } from '@heroui/react';
import { useTranslations } from 'next-intl';

import type { Header } from '@/types/http-request';

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
      <div className="mb-4 flex items-center justify-between">
        <h3>HTTP Headers</h3>
        <Button size="sm" variant="flat" radius="none" onPress={onAddHeader}>
          {t('addHeader')}
        </Button>
      </div>

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
