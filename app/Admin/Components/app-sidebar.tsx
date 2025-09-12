"use client";

import { Home, User, Bell } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useNotifications } from "../contexts/NotificationsContext";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", href: "/admin/dashboard", icon: Home },
  { title: "Customers", href: "/admin/customers", icon: User },
  { title: "Profile", href: "/admin/profile", icon: User },
  { title: "Admins", href: "/admin/admin_list", icon: User },
  { title: "Notifications", href: "/admin/notifications", icon: Bell },
];

export function AppSidebar() {
  const { unread, markAsRead } = useNotifications();
  const pathname = usePathname();

  // Clear unread when visiting notifications
  useEffect(() => {
    if (pathname === "/admin/notifications") {
      markAsRead();
    }
  }, [pathname, markAsRead]);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href} className="relative flex items-center">
                      {item.icon && <item.icon className="mt-1 mr-2 h-4 w-4" />}
                      <span>{item.title}</span>

                      {item.title === "Notifications" && unread && (
                        <span className="absolute bottom-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
