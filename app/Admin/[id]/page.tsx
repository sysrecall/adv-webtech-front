"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/axios";

interface AdminProfile {
  id: number;
  username: string;
  email: string;
}

export default function UserPage() {
  const { id } = useParams();
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

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">User Dashboard</h1>

      {profile ? (
        <div className="mt-2 space-y-2">
          <p>
            Welcome back,{" "}
            <span className="text-green-600 font-semibold">
              {profile.username}
            </span>
            !
          </p>
          <p>
            <strong>User ID (from route):</strong> {id}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
        </div>
      ) : (
        <p className="text-gray-500 mt-2">Loading profile...</p>
      )}
    </div>
  );
}
