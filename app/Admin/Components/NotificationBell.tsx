"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { pusherClient } from "@/lib/pusherClient";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<string[]>([]);
  const [unread, setUnread] = useState(false);

  useEffect(() => {
    const channel = pusherClient.subscribe("admin-channel");

      channel.bind("pusher:subscription_succeeded", () => {
    console.log("✅ Subscribed to admin-channel");
  });


    channel.bind("customer-created", (data: any) => {
    console.log("📩 customer-created event received:", data);
    setNotifications((prev) => [...prev, data.message]);
    setUnread(true);
    });

    channel.bind("status-updated", (data: any) => {
      setNotifications((prev) => [...prev, data.message]);
      setUnread(true);
    });

    return () => {
      pusherClient.unsubscribe("admin-channel");
    };
  }, []);

  return (
    <div className="relative">
      <Bell className="h-6 w-6" />
      {unread && (
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-red-500"></span>
      )}
    </div>
  );
}
