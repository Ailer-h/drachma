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

export async function check_session(redirect, logged_in) {
  
  const { data } = await supabase.auth.getSession();

    if (Boolean(data.session) == logged_in) {
      window.location.href = redirect;
    }

}