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
// import { NotificationsButton } from "@/components/notifications-button"
import { AvatarProfileMobileview } from "@/components/avatar-profile";
import { SuperadminSidebarMenuitem } from "@/components/superadmin-sidebar-menuitem"
import Image from "next/image"
import NotificationsButton from "./notifications-button";



export function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar collapsible="offcanvas" className="border-r border-sidebar-border shadow-md">
        <SidebarHeader className="border-b border-sidebar-border bg-gradient-to-br from-primary/5 to-transparent ">
          <div className="flex items-center gap-3 px-2 py-4">
              <Image src="/sirsafoundation.png" alt="Sirsa Foundation Logo" width={100} height={100} className="rounded-xl shadow-lg border border-primary/20" />

            <div className="flex flex-col">
              <span className="text-lg font-bold text-sidebar-foreground">Sirsa Foundation</span>
              <span className="text-xs font-medium text-primary">Super Admin</span>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SuperadminSidebarMenuitem />
        </SidebarContent>

        <SidebarFooter className="border-t border-sidebar-border max-w-fit">
            <AvatarProfileMobileview />
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-30 w-full flex items-center gap-4 border-b bg-gradient-to-br from-primary/5 to-transparent px-4 shadow-sm md:px-6 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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

        <main className="flex-1 pt-4 px-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
