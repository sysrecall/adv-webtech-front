"use client";

import { AppSidebar } from "@/app/admin/Components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useNotifications } from "../contexts/NotificationsContext";

export default function NotificationsPage() {
  const { notifications } = useNotifications();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/notifications">
                  Notifications
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-6">
          <h1 className="text-xl font-semibold mb-4">Notifications</h1>

          {notifications.length === 0 ? (
            <p className="text-gray-500">No notifications yet.</p>
          ) : (
            <ul className="space-y-2">
              {notifications.map((note, idx) => (
                <li
                  key={idx}
                  className="rounded-md bg-gray-100 p-4 shadow hover:bg-gray-200"
                >
                  <p className="font-semibold">{note.message}</p>
                  {note.customer && (
                    <div className="text-sm text-gray-600 mt-1">
                      <p><strong>Name:</strong> {note.customer.fullName}</p>
                      <p><strong>Email:</strong> {note.customer.email}</p>
                      <p><strong>Phone:</strong> {note.customer.phone}</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
