import * as React from "react"
import { GalleryVerticalEnd, Minus, Plus } from "lucide-react"

import { SearchForm } from "@/components/search-form"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"

const data = {
  navMain: [
    {
      "title": "Styles",
      "url": "arts/",
      "items": [
        {
          "title": "All",
          "url": "arts/",
          isActive: true,
        },
        {
          "title": "Abstract",
          "url": "/arts/style/abstract"
        },
        {
          "title": "Vintage",
          "url": "/arts/style/vintage"
        },
        {
          "title": "Classic",
          "url": "/arts/style/classic"
        },
        {
          "title": "Black and White",
          "url": "/arts/style/bg"
        },
        {
          "title": "Minimalist",
          "url": "/arts/style/minimalist"
        },
        {
          "title": "Boho",
          "url": "/arts/style/boho"
        },
        {
          "title": "Typography",
          "url": "/arts/style/typography"
        },
        {
          "title": "Watercolor",
          "url": "/arts/style/watercolor"
        },
        {
          "title": "Surreal",
          "url": "/arts/style/surreal"
        },
        {
          "title": "Retro",
          "url": "/arts/style/retro"
        },
        {
          "title": "Light & Airy",
          "url": "/arts/style/light-airy"
        },
        {
          "title": "Rustic",
          "url": "/arts/style/rustic"
        },
        {
          "title": "Still Life",
          "url": "/arts/style/still-life"
        },
        {
          "title": "Whimsical",
          "url": "/arts/style/whimsical"
        },
        {
          "title": "Vibrant",
          "url": "/arts/style/vibrant"
        },
        {
          "title": "Mute",
          "url": "/arts/style/mute"
        }
      ]
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Tools</span>
                  {/* <span className="">v1.0.0</span> */}
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        {/* <SearchForm /> */}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item, index) => (
              <Collapsible
                key={item.title}
                defaultOpen={index === 0}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {item.title}{"asdasd "}
                      <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                      <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={item.isActive}
                            >
                              <Link href={item.url}>{item.title}</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
