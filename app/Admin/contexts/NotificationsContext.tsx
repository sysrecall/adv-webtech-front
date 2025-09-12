"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusherClient";

type Notification = {
  message: string;
  customer?: {
    id: number;
    fullName: string;
    email: string;
    phone: string;
  };
};

type NotificationsContextType = {
  notifications: Notification[];
  unread: boolean;
  markAsRead: () => void;
};

const NotificationsContext = createContext<NotificationsContextType | null>(null);

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unread, setUnread] = useState(false);

  useEffect(() => {
    const channel = pusherClient.subscribe("admin-channel");

    channel.bind("customer-created", (data: Notification) => {
      console.log("📩 New notification:", data);
      setNotifications((prev) => [...prev, data]);
      setUnread(true);
    });

    channel.bind("status-updated", (data: Notification) => {
      setNotifications((prev) => [...prev, data]);
      setUnread(true);
    });

    return () => {
      channel.unbind_all();
      pusherClient.unsubscribe("admin-channel");
    };
  }, []);

  const markAsRead = () => setUnread(false);

  return (
    <NotificationsContext.Provider value={{ notifications, unread, markAsRead }}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error("useNotifications must be used inside NotificationsProvider");
  return ctx;
}
