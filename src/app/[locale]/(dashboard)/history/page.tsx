import { HistoryDynamic } from '@/features/history/components/history';
import { mockHistoryData } from '@/testing/mocks/history';

export default function HistoryPage() {
  return <HistoryDynamic historyData={mockHistoryData} />;
}
