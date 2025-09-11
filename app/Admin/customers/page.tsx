"use client";

import { useState, useEffect } from "react";
import { AppSidebar } from "@/app/admin/Components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import api from "@/lib/axios";

interface Customer {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  gender?: string;
  username: string;
}

interface AdminProfile {
  id: number;
  username: string;
  email: string;
}

export default function Page() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const [deleteCustomerId, setDeleteCustomerId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [adminId, setAdminId] = useState<number | null>(null);

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    console.log('Customers state:', customers);
  }, [customers]);

  useEffect(() => {
    fetchAdminProfile();
  }, []);

  useEffect(() => {
    if (adminId) {
      fetchCustomers();
    }
  }, [adminId]);

  const fetchAdminProfile = async () => {
    try {
      const response = await api.get('/admin/profile');
      setAdminId(response.data.id);
    } catch (error) {
      console.error("Error fetching admin profile:", error);
      showNotification("Failed to fetch admin profile", "error");
    }
  };

  const fetchCustomers = async () => {
    if (!adminId) {
      showNotification("Admin ID not found", "error");
      return;
    }
    try {
      setLoading(true);
      const response = await api.get(`/admin/${adminId}/customers`);
      console.log("Fetched customers:", response.data);
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
      showNotification("Failed to fetch customers", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!adminId) {
    showNotification("Admin not authenticated", "error");
    return;
  }
  
  try {
    setLoading(true);
    
    // Debug what you're sending
    console.log("Sending form data:", formData);
    
    if (selectedCustomer) {
      await api.patch(`/admin/${adminId}/customers/${selectedCustomer.id}`, formData);
      showNotification("Customer updated successfully", "success");
    } else {
      await api.post(`/admin/${adminId}/customers`, formData);
      showNotification("Customer created successfully", "success");
    }
    setIsFormOpen(false);
    setSelectedCustomer(null);
    setFormData({ fullName: "", email: "", phone: "", gender: "", username: "" });
    fetchCustomers();
  } catch (error: any) {
    console.error("Full API Error:", error.response?.data);
    console.error("Validation errors:", error.response?.data?.message);
    
    // Show specific validation errors if available
    if (error.response?.data?.message && Array.isArray(error.response.data.message)) {
      const errorMessages = error.response.data.message.join(', ');
      showNotification(`Validation errors: ${errorMessages}`, "error");
    } else {
      showNotification(error.response?.data?.message || "Failed to save customer", "error");
    }
  } finally {
    setLoading(false);
  }
};
  const handleDelete = async () => {
    if (!deleteCustomerId || !adminId) return;
    try {
      setLoading(true);
      await api.delete(`/admin/${adminId}/customers/${deleteCustomerId}`);
      showNotification("Customer deleted successfully", "success");
      setIsDeleteConfirmOpen(false);
      setDeleteCustomerId(null);
      fetchCustomers();
    } catch (error) {
      showNotification("Failed to delete customer", "error");
    } finally {
      setLoading(false);
    }
  };

  const openCreateForm = () => {
    setSelectedCustomer(null);
    setFormData({ fullName: "", email: "", phone: "", gender: "", username: "" });
    setIsFormOpen(true);
  };

  const openEditForm = (customer: Customer) => {
    setSelectedCustomer(customer);
    setFormData({
      fullName: customer.fullName,
      email: customer.email,
      phone: customer.phone || "",
      gender: customer.gender || "",
      username: customer.username,
    });
    setIsFormOpen(true);
  };

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
                <BreadcrumbLink href="/admin/customers">Customers</BreadcrumbLink>
              </BreadcrumbItem>
              
            </BreadcrumbList>
          </Breadcrumb>
        </header>

<div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Customer Management</h1>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={openCreateForm}
              disabled={!adminId}
            >
              Add New Customer
            </button>
          </div>

          {notification && (
            <div
              className={`fixed top-4 right-4 p-4 rounded-md text-white ${
                notification.type === "success" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {notification.message}
            </div>
          )}

          {!adminId ? (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <p>Loading admin information...</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Customer List</h2>
              {loading ? (
                <p>Loading...</p>
              ) : customers.length === 0 ? (
                <p>No customers found</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Full Name</th>
                        <th className="text-left p-3 font-semibold">Username</th>
                        <th className="text-left p-3 font-semibold">Email</th>
                        <th className="text-left p-3 font-semibold">Phone</th>
                        <th className="text-left p-3 font-semibold">Gender</th>
                        <th className="text-left p-3 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((customer) => (
                        <tr key={customer.id} className="border-b hover:bg-gray-50">
                          <td className="p-3 font-medium">{customer.fullName}</td>
                          <td className="p-3">{customer.username}</td>
                          <td className="p-3">{customer.email}</td>
                          <td className="p-3">{customer.phone || "-"}</td>
                          <td className="p-3">{customer.gender || "-"}</td>
                          <td className="p-3">
                            <div className="flex space-x-2">
                              <button
                                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 text-sm"
                                onClick={() => openEditForm(customer)}
                              >
                                Edit
                              </button>
                              <button
                                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm"
                                onClick={() => {
                                  setDeleteCustomerId(customer.id);
                                  setIsDeleteConfirmOpen(true);
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        {isFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">
                {selectedCustomer ? "Edit Customer" : "Add New Customer"}
              </h2>
              <form onSubmit={handleCreateOrUpdate} className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    className="w-full border rounded-md p-2"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full border rounded-md p-2"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="username" className="block text-sm font-medium">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    className="w-full border rounded-md p-2"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium">
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="text"
                    className="w-full border rounded-md p-2"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium">
                    Gender
                  </label>
                  <select
                    id="gender"
                    className="w-full border rounded-md p-2"
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
                    onClick={() => setIsFormOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isDeleteConfirmOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
              <p className="mb-4">
                Are you sure you want to delete this customer? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
                  onClick={() => setIsDeleteConfirmOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}