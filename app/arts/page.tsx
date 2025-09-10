import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import ArtItem from "./components/ArtItem";

export default function ArtsPage() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4">
            
            <ArtItem artId="2701727d-7e2e-4961-bf74-b01950f62f78" title="test" artistName="asd" imagePath="http://localhost:3000/uploads/art/astarrynight.jpg" price={123}/>

          </div>
        </SidebarInset>
      </SidebarProvider>

    </>
  )
}
