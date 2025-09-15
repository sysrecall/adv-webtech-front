import { AppSidebar } from "@/components/app-sidebar-account"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { Navbar04 } from "@/components/ui/shadcn-io/navbar-04"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="relative w-full">
        <Navbar04 />
      </div>
      <SidebarProvider >
        <AppSidebar variant="inset" className="mt-16"/>
        <SidebarInset className="p-4">
          {children}
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}