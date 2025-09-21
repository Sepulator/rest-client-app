import type { HistoryInsertData } from '@/features/history/types/history-data';

import { HistoryDynamic } from '@/features/history/components/history';
import { fetchHistory } from '@/utils/supabase/fetch-history';

type HistoryFetchData = { data?: HistoryInsertData[] };

export default async function HistoryPage() {
  const { data }: HistoryFetchData = await fetchHistory();

  return <HistoryDynamic historyData={data} />;
}
