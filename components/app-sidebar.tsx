"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart, FileIcon as FilePresentation, Home, Mic, Settings, Upload } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"

export function AppSidebar() {
  const pathname = usePathname()

  const routes = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Upload",
      href: "/upload",
      icon: Upload,
    },
    {
      title: "Practice",
      href: "/practice",
      icon: Mic,
    },
    {
      title: "Feedback",
      href: "/feedback",
      icon: BarChart,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ]

  return (
    <Sidebar className="bg-sidebar-primary">
      <SidebarHeader className="flex items-center justify-between p-4 glass-header">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <FilePresentation className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">CueCard</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="b">
        <SidebarMenu>
          {routes.map((route) => (
            <SidebarMenuItem key={route.href}>
              <SidebarMenuButton asChild isActive={pathname === route.href}>
                <Link href={route.href}>
                  <route.icon className="h-5 w-5" />
                  <span>{route.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" className="gap-2" asChild>
            <Link href="/practice">
              <Mic className="h-4 w-4 text-primary" />
              <span>Quick Practice</span>
            </Link>
          </Button>
          <ModeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
