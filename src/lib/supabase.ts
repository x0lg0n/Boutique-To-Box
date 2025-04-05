
import { createClient } from '@supabase/supabase-js';

// These environment variables are automatically available after connecting through Lovable's Supabase integration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a single supabase client for the entire app
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to get current user
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Helper function to check if user is logged in
export const isUserLoggedIn = async () => {
  const user = await getCurrentUser();
  return !!user;
};
