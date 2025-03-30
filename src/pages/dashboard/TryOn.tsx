
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const TryOn = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">3D Try On</h1>
        <p className="text-muted-foreground">
          Virtually try on your custom designs
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Virtual Fitting Room</CardTitle>
          <CardDescription>Try on your designs in 3D</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-8 text-center">
            <p className="text-muted-foreground mb-4">Select a design to try on</p>
            <button className="bg-fashion-purple hover:opacity-90 text-white px-4 py-2 rounded-md">
              Browse Designs
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TryOn;
