"use client"

import { Settings, LogOut } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AvatarProfileMobileview() {
  const { data: session } = useSession()

  const userName = session?.user?.name || "User"
  const userEmail = session?.user?.email || "user@example.com"
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full justify-start gap-2 pl-2">
          <Avatar className="">
            <AvatarImage src={session?.user?.image || "/placeholder.svg?height=32&width=32"} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground text-xs font-semibold">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start text-left">
            <span className="text-md font-bold">{userName}</span>
            <span className="text-xs text-muted-foreground">{userEmail}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Settings className="mr-2 size-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
          <LogOut className="mr-2 size-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}