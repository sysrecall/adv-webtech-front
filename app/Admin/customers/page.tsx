import { AppSidebar } from "@/app/admin/Components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/admin/customers">
                  Customers
                </BreadcrumbLink>
              </BreadcrumbItem>
              
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Main content */}
        <div className="flex flex-1 flex-col gap-4 p-4">
          <h1 className="text-2xl font-bold">Customer Management</h1>
          <p className="text-gray-600">
            This is a dummy page for managing customers.
          </p>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Customer List</h2>
            <ul className="space-y-2">
              <li className="flex justify-between items-center p-3 border rounded-md">
                <span>John Doe - john.doe@example.com</span>
                <button className="text-blue-500 hover:underline">View Details</button>
              </li>
              <li className="flex justify-between items-center p-3 border rounded-md">
                <span>Jane Smith - jane.smith@example.com</span>
                <button className="text-blue-500 hover:underline">View Details</button>
              </li>
              <li className="flex justify-between items-center p-3 border rounded-md">
                <span>Peter Jones - peter.jones@example.com</span>
                <button className="text-blue-500 hover:underline">View Details</button>
              </li>
            </ul>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
