"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { type LucideIcon } from "lucide-react"
import { SidebarMenuItem, SidebarMenuButton, SidebarMenu } from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  Users,
  UserCog,
  Activity,
  DollarSign,
  Building2,
  Settings,
  FileText,
  HandHeart,
} from "lucide-react"

interface SuperadminSidebarMenuitemProps {
  item: {
    name: string
    href: string
    icon: LucideIcon
  }
}

const navigation = [
  { name: "Overview", href: "/superadmin", icon: LayoutDashboard },
  { name: "Residents", href:"/superadmin/residents", icon: Users },
  { name: "Staff & Volunteers", href: "/superadmin/staff", icon: UserCog },
  { name: "Medical Records", href: "/superadmin/medical", icon: Activity },
  { name: "Financials", href: "/superadmin/financials", icon: DollarSign },
  { name: "Room Management", href: "/superadmin/rooms", icon: Building2 },
  { name: "Foundation Work", href: "/superadmin/foundation", icon: HandHeart },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function SuperadminSidebarMenuitem() {
  const pathname = usePathname()

  return (
     <SidebarMenu className="mt-5 ml-2 max-w-fit">
        {navigation?.map((item)=>( 
            
    <SidebarMenuItem key={item?.name}>
      <SidebarMenuButton
        asChild
        isActive={pathname === item.href}
        className={(pathname === item.href) ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}
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