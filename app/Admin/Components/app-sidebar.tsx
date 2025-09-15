"use client";

import { Home, User, Bell } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect,useState } from "react";
import { useNotifications } from "../contexts/NotificationsContext";
import api from "@/lib/axios";
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
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const menuItems = [
  { title: "Dashboard", href: "/admin/dashboard", icon: Home },
  { title: "Customers", href: "/admin/customers", icon: User },
  { title: "Profile", href: "/admin/profile", icon: User },
  { title: "Admins", href: "/admin/admin_list", icon: User },
  { title: "Notifications", href: "/admin/notifications", icon: Bell },
];
interface AdminProfile {
  id: number;
  username: string;
  email: string;
}

export function AppSidebar() {

  const { unread, markAsRead } = useNotifications();
  const pathname = usePathname();
  // const loggedInUser = { id: 123, name: "Sifat" };
  const [profile, setProfile] = useState<AdminProfile | null>(null);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const response = await api.get("/admin/profile");
        setProfile(response.data);
        console.log("Fetched admin profile:", response.data);
      } catch (error) {
        console.error("Error fetching admin profile:", error);
      }
    };

    fetchAdminProfile();
  }, []);

  // Clear unread when visiting notifications
  useEffect(() => {
    if (pathname === "/admin/notifications") {
      markAsRead();
    }
  }, [pathname, markAsRead]);

  return (
       <Sidebar>
      <SidebarContent>
        {/* Main Section */}
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

        {/* Dynamic User Section */}
        <SidebarGroup>
          <SidebarGroupLabel>My Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={`/admin/${profile?.id}`}>
                    <User className="mt-1 mr-2 h-4 w-4" />
                    <span>{profile?.username}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout Section */}
        <SidebarGroup>
          <SidebarGroupLabel> </SidebarGroupLabel>
          <SidebarGroupContent className="p-4">
            <Link href="/admin/login" className="w-full">
              <Button variant="default" className="w-full flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </Link>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
