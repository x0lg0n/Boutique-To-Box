
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import DashboardSidebar from '@/components/DashboardSidebar';
import { PanelLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

const DashboardLayout = () => {
  const { user, isLoading } = useAuth();

  // Show loading state while checking auth status
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fashion-purple"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <DashboardSidebar />
        </div>
        
        {/* Mobile Sidebar with Drawer */}
        <div className="md:hidden">
          <Drawer>
            <DrawerTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                className="fixed top-4 left-4 z-40"
              >
                <PanelLeft className="h-4 w-4" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-[80%] p-0">
              <DashboardSidebar />
            </DrawerContent>
          </Drawer>
        </div>

        <SidebarInset className="bg-gray-50">
          <div className="p-6 md:p-6 pt-16 md:pt-6">
            <Outlet />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
