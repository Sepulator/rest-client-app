import { createClient } from '@/utils/supabase/server';

export const fetchHistory = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('history').select('*').order('timestamp', { ascending: false });

  if (error) {
    console.error('Error fetching data:', error);

    return { props: { data: null } };
  }

  return {
    data,
  };
};
