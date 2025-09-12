"use client";
import { AppSidebar } from "@/app/admin/Components/app-sidebar";
import {Breadcrumb,BreadcrumbItem,BreadcrumbLink,BreadcrumbList,} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {SidebarInset,SidebarProvider,SidebarTrigger,} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";

interface AdminProfile {
  id: number;
  fullName: string;
  age: number;
  status: string;
  username: string;
  email: string;
  phone: string;
  gender: string;
  nid: string;
  nidImage?: string; // base64 string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<AdminProfile>>({});
  const router = useRouter();

useEffect(() => {
  fetchProfile();
}, []);

const fetchProfile = async () => {
  setLoading(true);
  setError(""); 
  try {
    const response = await api.get("/admin/profile");
        console.log("Profile data received:", response.data); // Add this line

    setProfile(response.data);
    setEditForm(response.data); 
  } catch (err: any) {
    handleFetchError(err);
  } finally {
    setLoading(false);
  }
};

const handleFetchError = (err: any) => {
  if (err.response?.status === 403 || err.response?.status === 401) {
    setError("Authentication required. Redirecting to login...");
    // setTimeout(() => {
    //   router.push("/admin/login");
    // }, 2000);
  } else {
    setError("Failed to load profile data");
    console.error("Profile fetch error:", err);
  }
};
  const handleSave = async () => {
    try {
      const response = await api.patch("/admin/profile", editForm);
      setProfile(response.data);
      setIsEditing(false);
      setError(""); 
    } catch (err: any) {
      if (err.response?.status === 403 || err.response?.status === 401) {
        setError("Session expired. Redirecting to login...");
        setTimeout(() => {
          router.push("/admin/login");
        }, 2000);
      } else {
        setError("Failed to update profile");
      }
      console.error("Profile update error:", err);
    }
  };

  const handleInputChange = (field: keyof AdminProfile, value: string | number) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = async () => {
     router.push("/admin/login");

  };

  if (loading) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/admin/profile">Profile</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 bg-white rounded-lg shadow-sm p-6">
                <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="h-24 w-24 bg-gray-200 rounded-full mx-auto animate-pulse mb-4"></div>
                <div className="h-6 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-6 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-6 w-full bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-6">
                <div className="h-8 w-40 bg-gray-200 rounded animate-pulse mb-4"></div>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="mb-4">
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  if (error && error.includes("Redirecting")) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/admin/profile">Profile</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex flex-1 flex-col items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-sm p-6 w-full max-w-md text-center">
              <h2 className="text-red-500 text-xl font-semibold mb-4">Authentication Required</h2>
              <p className="mb-4">{error}</p>
              <Button onClick={() => router.push("/admin/login")}>
                Go to Login Now
              </Button>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/admin/profile">Profile</BreadcrumbLink>
              </BreadcrumbItem>
            
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-4"
                onClick={() => setError("")}
              >
                Dismiss
              </Button>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
            <p className="text-gray-600">
              Manage account settings and personal information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Information Card */}
            <div className="md:col-span-1 bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-2">Profile Information</h2>
              <p className="text-gray-600 mb-4">
                 Personal details and account status
              </p>
              
              <div className="flex justify-center mb-4 relative">
                <div className="relative">
                  {profile?.nidImage ? (
                    <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-blue-200 shadow-sm">
                      <img 
                        src={profile.nidImage} 
                        alt="Profile" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center border-2 border-blue-100 shadow-sm">
                      <span className="text-2xl font-semibold text-blue-700">
                        {profile ? getInitials(profile.fullName) : "AD"}
                      </span>
                    </div>
                  )}
                  
                  {/* Dynamic status indicator based on profile status */}
                  <div className={`absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-2 border-white flex items-center justify-center shadow-sm ${
                    profile?.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                  }`}>
                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 8 8">
                      <circle cx="4" cy="4" r="3" />
                    </svg>
                  </div>
                  
                  {/* Pulse animation only for active status */}
                  {profile?.status === 'active' && (
                    <div className="absolute -bottom-2 -right-2 h-7 w-7 bg-green-400 rounded-full opacity-75 animate-ping"></div>
                  )}
                </div>
              </div>
              
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold">{profile?.fullName}</h3>
                <p className="text-gray-600">@{profile?.username}</p>
              </div>
              
              <div className="flex justify-center mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  profile?.status === "active" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-gray-100 text-gray-800"
                }`}>
                  {profile?.status?.toUpperCase()}
                </span>
              </div>

              <Button variant="outline" className="w-full" onClick={handleLogout}>
                Logout
              </Button>
            </div>

            {/* Edit Form Card */}
            <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Personal Information</h2>
                  <p className="text-gray-600">
                    Update personal information and contact details
                  </p>
                </div>
                
                {!isEditing ? (
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(true)}
                    className="mt-4 md:mt-0"
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={isEditing ? editForm.fullName || "" : profile?.fullName || ""}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={isEditing ? editForm.username || "" : profile?.username || ""}
                      onChange={(e) => handleInputChange("username", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={isEditing ? editForm.email || "" : profile?.email || ""}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={isEditing ? editForm.phone || "" : profile?.phone || ""}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={isEditing ? editForm.age || "" : profile?.age || ""}
                      onChange={(e) => handleInputChange("age", parseInt(e.target.value) || 0)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Input
                      id="gender"
                      value={isEditing ? editForm.gender || "" : profile?.gender || ""}
                      onChange={(e) => handleInputChange("gender", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                {/* NID Number Field - Make sure it's visible even if empty */}
                <div className="space-y-2">
                  <Label htmlFor="nid">National ID (NID)</Label>
                  <Input
                    id="nid"
                    value={isEditing ? editForm.nid || "" : profile?.nid || "No NID provided"}
                    onChange={(e) => handleInputChange("nid", e.target.value)}
                    disabled={!isEditing}
                    placeholder="No NID provided"
                  />
                </div>

                
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}