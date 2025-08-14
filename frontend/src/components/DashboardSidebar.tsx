
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  Scissors,
  Image, 
  Box, 
  TrendingUp, 
  Settings,
  User,
  LogOut
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";

const DashboardSidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const { isMobile } = useSidebar();
  
  // Dashboard navigation items
  const navItems = [
    {
      title: "Overview",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "AI Generated Designs",
      path: "/dashboard/ai-designs",
      icon: Image,
    },
    {
      title: "3D Try On",
      path: "/dashboard/try-on",
      icon: Box,
    },
    {
      title: "Tailor Connector",
      path: "/dashboard/tailor",
      icon: Scissors,
    },
    {
      title: "Trend Engine",
      path: "/dashboard/trends",
      icon: TrendingUp,
    }
  ];

  // Account related items
  const accountItems = [
    {
      title: "Account",
      path: "/dashboard/account",
      icon: User,
    },
    {
      title: "Settings",
      path: "/dashboard/settings",
      icon: Settings,
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="bg-fashion-purple text-white p-1 rounded-md">
            <Scissors size={20} />
          </div>
          <span className="text-lg font-bold">ThreadTailor</span>
          
          {/* Only show the trigger on desktop */}
          {!isMobile && <SidebarTrigger className="ml-auto" />}
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.path)} 
                    tooltip={item.title}
                  >
                    <Link to={item.path}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarSeparator />
        
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.path)} 
                    tooltip={item.title}
                  >
                    <Link to={item.path}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={logout}>
                  <LogOut />
                  <span>Sign Out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
