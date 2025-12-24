import type React from "react"

import { Heart } from "lucide-react"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NotificationsButton } from "@/components/notifications-button"
import { AvatarProfileMobileview } from "@/components/avatar-profile";
import { SuperadminSidebarMenuitem } from "@/components/superadmin-sidebar-menuitem"



export function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar collapsible="offcanvas" className="border-r border-sidebar-border shadow-sm">
        <SidebarHeader className="border-b border-sidebar-border bg-gradient-to-br from-primary/5 to-transparent">
          <div className="flex items-center gap-3 px-2 py-4">
            <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-md shadow-primary/20">
              <Heart className="size-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-sidebar-foreground">Sirsa Foundation</span>
              <span className="text-xs font-medium text-primary">Super Admin</span>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SuperadminSidebarMenuitem />
        </SidebarContent>

        <SidebarFooter className="border-t border-sidebar-border">
          <div className="p-2">
            <AvatarProfileMobileview />
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 shadow-sm md:px-6">
          <SidebarTrigger />
          <div className="flex flex-1 items-center justify-end gap-3">
            <NotificationsButton />
            <Avatar className="size-9 ring-2 ring-primary/10 md:hidden">
              <AvatarImage src="/placeholder.svg?height=36&width=36" />
              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground text-xs font-semibold">
                SA
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
