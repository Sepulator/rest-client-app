'use client';

import { createClient } from '@/utils/supabase/client';

export async function clientLogout() {
  const supabase = createClient();

  await supabase.auth.signOut();
}
