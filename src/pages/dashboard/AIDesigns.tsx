
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AIDesigns = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Generated Designs</h1>
        <p className="text-muted-foreground">
          Create and manage your AI-powered clothing designs
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Design Library</CardTitle>
          <CardDescription>All your created designs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-8 text-center">
            <p className="text-muted-foreground mb-4">You haven't created any designs yet</p>
            <button className="bg-fashion-purple hover:opacity-90 text-white px-4 py-2 rounded-md">
              Create New Design
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIDesigns;
