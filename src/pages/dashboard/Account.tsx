
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSupabase } from '@/contexts/SupabaseContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

type Profile = {
  id: string;
  name: string | null;
  email: string | null;
  avatar_url: string | null;
};

const Account = () => {
  const { user } = useSupabase();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadProfile() {
      if (!user) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (error) {
          console.error('Error loading profile:', error);
          return;
        }
        
        setProfile(data);
      } catch (error) {
        console.error('Unexpected error loading profile:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadProfile();
  }, [user]);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account</h1>
        <p className="text-muted-foreground">
          Manage your account information
        </p>
      </div>
      
      {loading ? (
        <div>Loading profile information...</div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>View and update your profile details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Email</h3>
                <p>{user?.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Name</h3>
                <p>{profile?.name || user?.user_metadata?.name || 'Not set'}</p>
              </div>
              <Button 
                className="bg-fashion-purple hover:opacity-90 text-white px-4 py-2 rounded-md mt-4"
                onClick={() => {
                  toast({
                    title: "Coming soon",
                    description: "Profile editing will be available in the next update.",
                  });
                }}
              >
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Account;
