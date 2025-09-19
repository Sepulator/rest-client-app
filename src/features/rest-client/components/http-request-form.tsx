'use client';

import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

import { Loading } from '@/components/loading/loading';
import { CodeGeneration } from '@/features/rest-client/components/code-generation';
import { HeadersSection } from '@/features/rest-client/components/headers-section';
import { HttpRequestSubmit } from '@/features/rest-client/components/http-request-submit';
import { RequestBodySwitcher } from '@/features/rest-client/components/request-body-swticher';
import { ResponseSection } from '@/features/rest-client/components/response-section';
import { useInitializeFromParams } from '@/stores/rest-client/selectors';

type Props = {
  initialParams?: string[];
  initialSearchParams?: Record<string, string>;
};

export const HttpRequestForm = ({ initialParams, initialSearchParams }: Props = {}) => {
  const initializeFromParams = useInitializeFromParams();
  const t = useTranslations('RestClient');

  useEffect(() => {
    initializeFromParams(initialParams, initialSearchParams);
  }, [initialParams, initialSearchParams, initializeFromParams]);

  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-6 @6xl:grid-cols-2">
        <section>
          <HttpRequestSubmit />
          <HeadersSection />
          <RequestBodySwitcher />
        </section>
        <section>
          <ResponseSection />
          <h3 className="mt-6 mb-4 text-lg font-semibold">{t('codeTitle')}</h3>
          <CodeGeneration />
        </section>
      </div>
    </div>
  );
};

export const HttpRequestFormDynamic = dynamic(
  () => import('@/features/rest-client/components/http-request-form').then((module_) => module_.HttpRequestForm),
  { loading: () => <Loading />, ssr: false }
);
