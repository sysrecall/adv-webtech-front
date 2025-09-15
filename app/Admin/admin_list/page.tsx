"use client";

import { useState, useEffect } from "react";
import { AppSidebar } from "@/app/admin/Components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList

} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import api from "@/lib/axios";

interface Admin {
  id: number;
  fullName: string;
  age: number;
  status: string;
  username: string;
  email: string;
  phone: string;
  gender: string;
}

type FilterType = "all" | "active" | "inactive" | "over40";

export default function AdminListPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [filteredAdmins, setFilteredAdmins] = useState<Admin[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [isFiltering, setIsFiltering] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState<number | null>(null);

  useEffect(() => {
    fetchAdmins();
  }, []);

  useEffect(() => {
    if (filter === "all") {
      filterAdmins();
    }
  }, [searchTerm, admins, filter]);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const response = await api.get("/admin");
      setAdmins(response.data);
      setFilteredAdmins(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch admins. Please try again.");
      console.error("Error fetching admins:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilteredAdmins = async (filterType: FilterType) => {
    try {
      setIsFiltering(true);
      let response;
      
      switch (filterType) {
        case "active":
          response = await api.get("/admin/status/active");
          break;
        case "inactive":
          response = await api.get("/admin/status/inactive");
          break;
        case "over40":
          response = await api.get("/admin/age/older-than-40");
          break;
        default:
          response = await api.get("/admin");
          break;
      }
      
      setFilteredAdmins(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch filtered admins. Please try again.");
      console.error("Error fetching filtered admins:", err);
    } finally {
      setIsFiltering(false);
    }
  };

  const filterAdmins = () => {
    if (!searchTerm.trim()) {
      setFilteredAdmins(admins);
      return;
    }

    const filtered = admins.filter((admin) =>
      Object.values(admin).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredAdmins(filtered);
  };

  const handleFilterChange = async (newFilter: FilterType) => {
    setFilter(newFilter);
    setSearchTerm(""); 
    
    if (newFilter === "all") {
      setFilteredAdmins(admins);
    } else {
      await fetchFilteredAdmins(newFilter);
    }
  };

  const updateAdminStatus = async (adminId: number, newStatus: 'active' | 'inactive') => {
    try {
      setUpdatingStatus(adminId);
      

        //   const response = await api.patch(`/admin/${adminId}/status`, { status: newStatus });
        await api.patch(`/admin/${adminId}/status`, { status: newStatus });
      

      setAdmins(prevAdmins => 
        prevAdmins.map(admin => 
          admin.id === adminId ? { ...admin, status: newStatus } : admin
        )
      );
      
      setFilteredAdmins(prevFilteredAdmins => 
        prevFilteredAdmins.map(admin => 
          admin.id === adminId ? { ...admin, status: newStatus } : admin
        )
      );

      if (filter !== "all") {
        await fetchFilteredAdmins(filter);
      }

      setError("");
    } catch (err) {
      setError("Failed to update admin status. Please try again.");
      console.error("Error updating admin status:", err);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const toggleStatus = (admin: Admin) => {
    const newStatus = admin.status === 'active' ? 'inactive' : 'active';
    updateAdminStatus(admin.id, newStatus);
  };

  if (loading) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/admin/admin_list">
                    Admins
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex justify-center items-center h-64">
              <p>Loading admins...</p>
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
        {}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/admin/admin_list">
                  Admins
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Main content */}
        <div className="flex flex-1 flex-col gap-4 p-4">
          <h1 className="text-2xl font-bold">Admin Management</h1>
          
          {/* Filter and Search Section */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleFilterChange("all")}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  filter === "all"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All Admins
              </button>
             
              <button
                onClick={() => handleFilterChange("inactive")}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  filter === "inactive"
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Inactive
              </button>
              <button
                onClick={() => handleFilterChange("over40")}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  filter === "over40"
                    ? "bg-purple-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Age 40+
              </button>
            </div>

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search admins..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={filter !== "all"}
            />
          </div>

          {filter !== "all" && (
            <div className="text-sm text-blue-600">
              Showing {filter === "active" ? "active" : filter === "inactive" ? "inactive" : "age 40+"} admins
              {searchTerm && " (search disabled for filters)"}
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Admin List</h2>
            
            {isFiltering ? (
              <div className="text-center py-8 text-gray-500">
                Loading filtered admins...
              </div>
            ) : filteredAdmins.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {searchTerm ? "No admins found matching your search." : "No admins available."}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">ID</th>
                      <th className="text-left p-3 font-semibold">Full Name</th>
                      <th className="text-left p-3 font-semibold">Username</th>
                      <th className="text-left p-3 font-semibold">Email</th>
                      <th className="text-left p-3 font-semibold">Phone</th>
                      <th className="text-left p-3 font-semibold">Age</th>
                      <th className="text-left p-3 font-semibold">Gender</th>
                      <th className="text-left p-3 font-semibold">Status</th>
                      <th className="text-left p-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAdmins.map((admin) => (
                      <tr key={admin.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">{admin.id}</td>
                        <td className="p-3 font-medium">{admin.fullName}</td>
                        <td className="p-3">{admin.username}</td>
                        <td className="p-3">{admin.email}</td>
                        <td className="p-3">{admin.phone}</td>
                        <td className="p-3">{admin.age}</td>
                        <td className="p-3">{admin.gender}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              admin.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {admin.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => toggleStatus(admin)}
                            disabled={updatingStatus === admin.id}
                            className={`px-3 py-1 rounded text-sm font-medium ${
                              admin.status === "active"
                                ? "bg-red-500 hover:bg-red-600 text-white"
                                : "bg-green-500 hover:bg-green-600 text-white"
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                          >
                            {updatingStatus === admin.id ? (
                              "Updating..."
                            ) : admin.status === "active" ? (
                              "Deactivate"
                            ) : (
                              "Activate"
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}