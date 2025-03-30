
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/contexts/AuthContext';

const DashboardOverview = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name || user?.email.split('@')[0]}!
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>AI Generated Designs</CardTitle>
            <CardDescription>Create custom clothing designs with AI</CardDescription>
          </CardHeader>
          <CardContent>
            <p>You have created 0 designs this month</p>
          </CardContent>
          <CardFooter>
            <a href="/dashboard/ai-designs" className="text-sm text-fashion-purple hover:underline">
              Create a new design →
            </a>
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
            <a href="/dashboard/try-on" className="text-sm text-fashion-purple hover:underline">
              Try on a design →
            </a>
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
            <a href="/dashboard/trends" className="text-sm text-fashion-purple hover:underline">
              View trends →
            </a>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
