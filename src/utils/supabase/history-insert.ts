import type { HistoryInsertData } from '@/features/history/types/history-data';

import { createClient } from '@/utils/supabase/client';

export const supabase = createClient();

export const insertHistory = async (data: HistoryInsertData) => await supabase.from('history').insert(data).single();
