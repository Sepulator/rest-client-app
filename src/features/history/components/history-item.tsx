import { cn } from '@heroui/react';
import { StatusCodes } from 'http-status-codes';
import { useLocale, useTranslations } from 'next-intl';

import type { HistoryData } from '@/features/history/types/history-data';

import { ChevronIcon } from '@/components/icons/chevron';
import { ANALYTIC_KEYS } from '@/features/history/constants/analitic-keys';
import { Link } from '@/i18n/navigation';
import { generateRouteUrl } from '@/utils/route-generator';

type AnalyticKeys = (typeof ANALYTIC_KEYS)[number];

type HistoryItemProps = {
  method: string;
  url: string;
  body?: string;
  headers: Record<string, string>;
  analytics: Partial<{ [K in AnalyticKeys]?: HistoryData[K] }>;
};

export function HistoryItem({ method, url, body, headers, analytics }: HistoryItemProps) {
  const t = useTranslations('History');
  const locale = useLocale();
  const routeUrl = generateRouteUrl(method, url, locale, body, headers);
  const isSuccess =
    analytics.status && analytics.status >= StatusCodes.OK && analytics.status < StatusCodes.MULTIPLE_CHOICES;

  return (
    <li className="mb-3">
      <Link
        href={routeUrl}
        className="hover:bg-default-50 border-default-300 flex w-full items-center justify-between border-y-1 p-3"
      >
        <div className="flex items-center">
          <span className={cn('text-medium mr-5 font-bold', isSuccess ? 'text-success-500' : 'text-danger-500')}>
            {method}
          </span>
          <p>{url}</p>
        </div>
        <ChevronIcon className="rotate-180" />
      </Link>

      <div className="p-3">
        <h3 className="text-small mb-2 font-bold">{t('analytics')}</h3>
        {ANALYTIC_KEYS.map((key) => (
          <p key={key} data-testid={`analytic-${key}`}>
            <strong>{t(key)}</strong>
            {analytics[key] ?? '-'}
          </p>
        ))}
      </div>
    </li>
  );
}
