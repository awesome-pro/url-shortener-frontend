"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from '@/components/ui/sidebar';
import {
  Home,
  User,
  Users,
  Shield,
  BarChart3,
  FileText,
  Link as LinkIcon,
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { UserRole } from '@/types';
import Image from 'next/image';

// Define navigation items based on user roles
const getNavigationItems = (userRole: UserRole) => {
  const baseItems = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: Home,
      description: 'Overview and analytics',
    },
    {
      title: 'URLs',
      url: '/dashboard/urls',
      icon: LinkIcon,
      description: 'Manage your URLs',
    },
    {
      title: 'Profile',
      url: '/dashboard/profile',
      icon: User,
      description: 'Your account settings',
    },
  ];

  const adminItems = [
    {
      title: 'Users',
      url: '/dashboard/users',
      icon: Users,
      description: 'Manage users',
    },
    {
      title: 'Analytics',
      url: '/dashboard/analytics',
      icon: BarChart3,
      description: 'System analytics',
    },
    {
      title: 'Reports',
      url: '/dashboard/reports',
      icon: FileText,
      description: 'Generate reports',
    },
    {
      title: 'Admin Settings',
      url: '/dashboard/admin-settings',
      icon: Shield,
      description: 'System configuration',
    },
  ];

  switch (userRole) {
    case UserRole.ADMIN:
      return [...baseItems, ...adminItems];
    default:
      return baseItems;
  }
};

export function AppSidebar({ ...props }) {
  const { user, signOut } = useAuth();
  const pathname = usePathname();

  const navigationItems = getNavigationItems(user?.role || UserRole.USER);

  const getUserInitials = (username: string) => {
    return username
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b flex items-center justify-center">
        <Link href="/dashboard">
          <Image src="/logo.png" alt="LinkShort" width={132} height={32}/>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const isActive = pathname === item.url;
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.description}
                    >
                      <Link href={item.url} className={`flex items-center gap-3 ${isActive ? 'text-primary bg-primary/20' : 'text-sidebar-foreground'}`}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className='border-t'>
        
      </SidebarFooter>
    </Sidebar>
  );
}