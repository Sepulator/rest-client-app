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

  const { data: authData, error } = await supabase.auth.signUp(data);

  if (error) {
    redirect({ href: '/sign-up?error=' + encodeURIComponent(error.message), locale });
  }

  if (authData.user) {
    revalidatePath('/', 'layout');
    revalidatePath('/', 'page');
    redirect({ href: '/', locale });
  }

  redirect({ href: '/sign-up?error=' + encodeURIComponent('An unexpected error occurred. Please try again.'), locale });
}

export async function signIn(formData: FormData) {
  const supabase = await createClient();
  const locale = await getLocale();

  const data = createCredentials(formData);

  const { data: authData, error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect({ href: '/login?error=' + encodeURIComponent(error.message), locale });
  }

  if (authData.session) {
    revalidatePath('/', 'layout');
    revalidatePath('/', 'page');
    redirect({ href: '/', locale });
  }

  redirect({ href: '/login?error=' + encodeURIComponent('An unexpected error occurred. Please try again.'), locale });
}
