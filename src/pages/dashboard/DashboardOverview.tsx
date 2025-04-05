
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useSupabase } from '@/contexts/SupabaseContext';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const DashboardOverview = () => {
  const { user } = useSupabase();
  const [designCount, setDesignCount] = useState(0);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchDesigns() {
      if (!user) return;
      
      try {
        setLoading(true);
        const { count, error } = await supabase
          .from('designs')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);
        
        if (error) {
          console.error('Error fetching designs:', error);
          return;
        }
        
        setDesignCount(count || 0);
      } catch (error) {
        console.error('Unexpected error fetching designs:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchDesigns();
  }, [user]);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.user_metadata?.name || user?.email?.split('@')[0] || 'Designer'}!
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>AI Generated Designs</CardTitle>
            <CardDescription>Create custom clothing designs with AI</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              {loading 
                ? "Loading your designs..."
                : `You have created ${designCount} design${designCount !== 1 ? 's' : ''}`}
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/design" className="text-sm text-fashion-purple hover:underline">
              Create a new design →
            </Link>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>3D Try On</CardTitle>
            <CardDescription>Virtually try on your designs</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Experience your designs in 3D before ordering</p>
          </CardContent>
          <CardFooter>
            <Link to="/dashboard/try-on" className="text-sm text-fashion-purple hover:underline">
              Try on a design →
            </Link>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Trend Engine</CardTitle>
            <CardDescription>Stay ahead of fashion trends</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Explore the latest fashion trends and analytics</p>
          </CardContent>
          <CardFooter>
            <Link to="/dashboard/trends" className="text-sm text-fashion-purple hover:underline">
              View trends →
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
