import { AppSidebar } from "@/components/app-sidebar-home"
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
        <AppSidebar/>
        <SidebarInset>
          <div className="flex flex-wrap gap-2 p-4">
            
            <ArtItem artId="727c9a57-4770-4c58-9b5e-4cb8fb72c340" title="test" artistName="asd" imagePath="http://localhost:3000/uploads/art/astarrynight.jpg" price={123}/>
            <ArtItem artId="727c9a57-4770-4c58-9b5e-4cb8fb72c340" title="test" artistName="asd" imagePath="http://localhost:3000/uploads/art/astarrynight.jpg" price={123}/>
            <ArtItem artId="727c9a57-4770-4c58-9b5e-4cb8fb72c340" title="test" artistName="asd" imagePath="http://localhost:3000/uploads/art/astarrynight.jpg" price={123}/>
            <ArtItem artId="727c9a57-4770-4c58-9b5e-4cb8fb72c340" title="test" artistName="asd" imagePath="http://localhost:3000/uploads/art/astarrynight.jpg" price={123}/>
            <ArtItem artId="727c9a57-4770-4c58-9b5e-4cb8fb72c340" title="test" artistName="asd" imagePath="http://localhost:3000/uploads/art/astarrynight.jpg" price={123}/>
            <ArtItem artId="727c9a57-4770-4c58-9b5e-4cb8fb72c340" title="test" artistName="asd" imagePath="http://localhost:3000/uploads/art/astarrynight.jpg" price={123}/>

          </div>
        </SidebarInset>
      </SidebarProvider>

    </>
  )
}
