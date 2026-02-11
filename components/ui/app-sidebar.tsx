"use client"

import * as React from "react"
import { 
  Bot, 
  Sparkles, 
  Wrench, 
  GalleryVerticalEnd, 
  Settings,
  User
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Agents",
    url: "/agents",
    icon: Bot,
  },
  {
    title: "Tools",
    url: "/tools",
    icon: Wrench,
  },
  {
    title: "Assistants",
    url: "/assistants",
    icon: Sparkles,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    // 1. collapsible="icon" handles the narrow state automatically
    <Sidebar collapsible="icon" {...props}>
      {/* 2. A Header gives the sidebar a dedicated top section (Logo) */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Vgen Dashboard</span>
                  <span className="">v1.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {/* 3. Tooltip prop is vital for the 'collapsed' icon view */}
                  <SidebarMenuButton 
                    asChild 
                    tooltip={item.title} 
                    isActive={pathname === item.url}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* 4. A Footer anchors user settings/profile to the bottom */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="User Profile">
              <Link href="/settings">
                <User />
                <span>My Account</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      
      {/* 5. The Rail allows dragging/toggling */}
      <SidebarRail />
    </Sidebar>
  )
}