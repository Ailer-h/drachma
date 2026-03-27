import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,

  {
    auth: {
      persistSession: true,
      autoRefreshToken: true
    }
  }
);

export async function check_session(redirect, isLoggedIn) {
  
  const { data } = await supabase.auth.getSession();

    if (Boolean(data.session) == isLoggedIn) {
      window.location.href = redirect;
    }

}

export async function addPaymentType(paymentTypeName, icon_id) {
  const { data: sessionData } = await supabase.auth.getSession()

  if (!sessionData.session) {
    return { success: false, error: 'User not authenticated' }
  }

  const { data, error } = await supabase
    .from('paymentType')
    .insert([{ paymentTypeName, icon_id }])
    .select()

  if (error) {
    return { success: false, error }
  }

  return { success: true, data }
}