'use client';

import { Button, Input } from '@heroui/react';
import { useLocale, useTranslations } from 'next-intl';
import { useTransition, type FormEvent } from 'react';

import { MethodSelector } from '@/features/rest-client/components/method-selector';
import { useReplaceWithVariable } from '@/features/variables/hooks/use-replace-with-variable';
import { useExecuteRequest, useIsLoading, useSetUrl, useUrl } from '@/stores/rest-client/selectors';

export const HttpRequestSubmit = () => {
  const [, startTransition] = useTransition();
  const locale = useLocale();
  const replaceVariables = useReplaceWithVariable();

  const url = useUrl();
  const isLoading = useIsLoading();
  const setUrl = useSetUrl();
  const executeRequest = useExecuteRequest();

  const t = useTranslations('RestClient');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    startTransition(async () => {
      const routeUrl = await executeRequest(locale, replaceVariables);

      if (routeUrl) {
        window.history.replaceState(null, '', routeUrl);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex flex-row">
      <MethodSelector />
      <Input
        value={url}
        placeholder={t('url')}
        onValueChange={setUrl}
        radius="none"
        className="border-1 border-l-0 border-gray-600"
      />
      <Button
        type="submit"
        color="primary"
        radius="none"
        className="h-auto"
        isDisabled={isLoading}
        isLoading={isLoading}
      >
        {t('send')}
      </Button>
    </form>
  );
};
