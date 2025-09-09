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
                <BreadcrumbLink href="/admin/dashboard">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Overview</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Main content */}
        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Top stats grid */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-muted/50 rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-medium">Total Customers</h3>
              <p className="text-2xl font-bold mt-2">120</p>
            </div>
            <div className="bg-muted/50 rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-medium">Arts Listed</h3>
              <p className="text-2xl font-bold mt-2">45</p>
            </div>
            <div className="bg-muted/50 rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-medium">Profile Views</h3>
              <p className="text-2xl font-bold mt-2">3,250</p>
            </div>
          </div>

          {/* Content area */}
          <div className="bg-muted/50 rounded-xl p-6 flex-1">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <ul className="space-y-2 text-sm">
              <li>🟢 New customer registered</li>
              <li>🎨 Artwork "Sunset Dreams" added</li>
              <li>👤 Profile updated successfully</li>
            </ul>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
