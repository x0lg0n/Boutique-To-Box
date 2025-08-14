
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Account = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account</h1>
        <p className="text-muted-foreground">
          Manage your account information
        </p>
      </div>
      
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
            {user?.name && (
              <div>
                <h3 className="text-sm font-medium">Name</h3>
                <p>{user.name}</p>
              </div>
            )}
            <button className="bg-fashion-purple hover:opacity-90 text-white px-4 py-2 rounded-md mt-4">
              Edit Profile
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Account;
