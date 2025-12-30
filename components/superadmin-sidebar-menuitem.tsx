"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { type LucideIcon } from "lucide-react"
import { SidebarMenuItem, SidebarMenuButton, SidebarMenu } from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  Users,
  UserCog,
  DollarSign,
  HandHeart,
} from "lucide-react"

const navigation = [
  { name: "Overview", href: "/superadmin", icon: LayoutDashboard },
  { name: "Residents", href:"/superadmin/residents", icon: Users },
  { name: "Staff Management", href: "/superadmin/staff", icon: UserCog },
  { name: "Volunteer Management", href: "/superadmin/volunteer", icon: UserCog },
  // { name: "Medical Records", href: "/superadmin/medical", icon: Activity },
  { name: "Financials", href: "/superadmin/financials", icon: DollarSign },
  // { name: "Room Management", href: "/superadmin/rooms", icon: Building2 },
  { name: "Foundation Work", href: "/superadmin/foundation", icon: HandHeart },
  // { name: "Reports", href: "/reports", icon: FileText },
]

export function SuperadminSidebarMenuitem() {
  const pathname = usePathname()

  return (
    <SidebarMenu className="mt-5 pl-4 max-w-fit">
      {navigation?.map((item)=>( 
        <SidebarMenuItem key={item?.name}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.href}
            className={
              pathname === item.href
                ? "bg-primary text-primary-foreground hover:bg-primary/90 ring-2 ring-primary/60 shadow-md"
                : "hover:bg-primary/10"
            }
          >
            <Link href={item.href} className="flex items-center gap-6">
              <item.icon className="size-5" />
              <span>{item.name}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
     </SidebarMenu>
  )
}