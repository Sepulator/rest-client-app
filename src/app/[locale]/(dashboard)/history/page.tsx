import { HistoryDynamic } from '@/features/history/components/history';
import { fetchHistory } from '@/utils/supabase/fetch-history';

export default async function HistoryPage() {
  const data = await fetchHistory();

  return <HistoryDynamic historyData={data} />;
}
