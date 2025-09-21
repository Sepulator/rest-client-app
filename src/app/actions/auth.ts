'use server';

import { getLocale } from 'next-intl/server';
import { revalidatePath } from 'next/cache';

import { redirect } from '@/i18n/navigation';
import { createClient } from '@/utils/supabase/server';

const createCredentials = (formData: FormData) => {
  const email = formData.get('email');
  const password = formData.get('password');

  const data = {
    email: typeof email === 'string' ? email : '',
    password: typeof password === 'string' ? password : '',
  };

  return data;
};

export async function signUp(formData: FormData) {
  const supabase = await createClient();
  const locale = await getLocale();

  const data = createCredentials(formData);

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect({ href: '/sign-up?error=' + encodeURIComponent(error.message), locale });
  }

  revalidatePath('/', 'layout');
  redirect({ href: '/', locale });
}

export async function signIn(formData: FormData) {
  const supabase = await createClient();
  const locale = await getLocale();

  const data = createCredentials(formData);

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect({ href: '/login?error=' + encodeURIComponent(error.message), locale });
  }

  revalidatePath('/', 'layout');
  redirect({ href: '/', locale });
}

export async function signOut() {
  const supabase = await createClient();
  const locale = await getLocale();

  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect({ href: '/login', locale });
}
