import type { PostgrestError } from '@supabase/supabase-js';

import type { HistoryInsertData } from '@/features/history/types/history-data';

import { createClient } from '@/utils/supabase/server';

type FetchHistoryResponse = {
  data: HistoryInsertData[] | null;
  error: PostgrestError | null;
};

export const fetchHistory = async () => {
  const supabase = await createClient();

  const { data, error }: FetchHistoryResponse = await supabase
    .from('history')
    .select('*')
    .order('timestamp', { ascending: false });

  if (error) {
    console.error('Error fetching data:', error);

    return null;
  }

  return data;
};
