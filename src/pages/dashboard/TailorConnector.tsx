
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const TailorConnector = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tailor Connector</h1>
        <p className="text-muted-foreground">
          Connect with local tailors to bring your designs to life
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Find a Tailor</CardTitle>
          <CardDescription>Browse our network of professional tailors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-8 text-center">
            <p className="text-muted-foreground mb-4">No tailors available in your area yet</p>
            <button className="bg-fashion-purple hover:opacity-90 text-white px-4 py-2 rounded-md">
              Notify Me When Available
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TailorConnector;
