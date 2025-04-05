
import { supabase } from '@/integrations/supabase/client';

// Designs table operations
export const designsTable = {
  // Create a new design
  create: async (designData: {
    user_id: string;
    design_url: string;
    keywords: string[];
    body_type?: string;
    style_preference?: string;
    garment_type?: string;
    occasion?: string;
    description?: string;
  }) => {
    const { data, error } = await supabase
      .from('designs')
      .insert(designData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  // Get designs for a user
  getByUserId: async (userId: string) => {
    const { data, error } = await supabase
      .from('designs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },
  
  // Get a specific design
  getById: async (designId: string) => {
    const { data, error } = await supabase
      .from('designs')
      .select('*')
      .eq('id', designId)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  // Update a design
  update: async (designId: string, updates: Partial<{
    design_url: string;
    keywords: string[];
    body_type: string;
    style_preference: string;
    garment_type: string;
    occasion: string;
    description: string;
  }>) => {
    const { data, error } = await supabase
      .from('designs')
      .update(updates)
      .eq('id', designId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  // Delete a design
  delete: async (designId: string) => {
    const { error } = await supabase
      .from('designs')
      .delete()
      .eq('id', designId);
    
    if (error) throw error;
    return true;
  }
};

// User profiles operations
export const profilesTable = {
  // Get user profile
  get: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  // Update user profile
  update: async (userId: string, updates: Partial<{
    name: string;
    avatar_url: string;
    body_measurements: Record<string, number>;
    style_preferences: string[];
  }>) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

// Style preferences operations
export const stylePreferencesTable = {
  // Save style preferences
  save: async (userId: string, preferences: {
    body_type: string;
    style_preference: string[];
    favorite_colors: string[];
    favorite_patterns: string[];
    occasions: string[];
  }) => {
    const { data, error } = await supabase
      .from('style_preferences')
      .upsert({
        user_id: userId,
        ...preferences,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  // Get style preferences
  getByUserId: async (userId: string) => {
    const { data, error } = await supabase
      .from('style_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is 'no rows returned'
    return data;
  }
};
