import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

import type { HistoryData, HistoryInsertData } from '@/features/history/types/history-data';

import { Loading } from '@/components/loading/loading';
import { ROUTES } from '@/config/routes';
import { HistoryItem } from '@/features/history/components/history-item';
import { Link } from '@/i18n/navigation';

export type HistoryProps = {
  historyData?: HistoryInsertData[];
};

export function HistoryData({ historyData }: HistoryProps) {
  const t = useTranslations('History');

  const renderContent = () => {
    if (!historyData || historyData.length === 0) {
      return (
        <div className="flex h-[50vh] w-full flex-col items-center justify-center text-center">
          <h2 className="mb-2">{t('title')}</h2>
          <p className="mb-8">{t('description')}</p>
          <Link
            href={ROUTES.CLIENT}
            className="bg-primary-200 rounded-medium hover:bg-primary-100 px-6 py-3 transition"
          >
            {t('link')}
          </Link>
        </div>
      );
    }

    return (
      <ul>
        {historyData.map(({ method, url, body, headers, ...rest }) => (
          <HistoryItem key={rest.id} url={url} body={body} headers={headers} method={method} analytics={rest} />
        ))}
      </ul>
    );
  };

  return (
    <section>
      <h2 className="text-large mb-5">{t('pageTitle')}</h2>
      {renderContent()}
    </section>
  );
}

export const HistoryDynamic = dynamic(
  () => import('@/features/history/components/history').then((module_) => module_.HistoryData),
  { loading: () => <Loading /> }
);
