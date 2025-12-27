
"use client"

import Link from "next/link"
import { Heart, Users, Newspaper, LogOut, PlusCircle } from "lucide-react"
import { MobileMenuButton } from "../mobileMenuButton"
import { GlobalButton } from "../ui/GlobalButton"
import { signOut } from "next-auth/react"


export function Navbar() {
  const navItems = [
    { href: "/", label: "Feed", icon: Newspaper },
    { href: "/opportunities", label: "Opportunities", icon: Heart },
  ]
  return (
    <nav className="sticky top-0 z-50 bg-gray-100 rounded-md  border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">S</div>
              <span className="hidden sm:inline">Volunteer- Sirsa Foundation</span>
            </Link>
            <Link
              href="/volunteer/addFeed"
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Add Feed</span>
            </Link>
          </div>
          

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary"
              >
                <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span>{label}</span>
              </Link>
            ))}
            <GlobalButton
              icon={<LogOut />}
              title="Logout"
              onClick={() => signOut({ callbackUrl: "/" })}
              />
          </div>

          {/* Mobile Menu Button */}
          <MobileMenuButton/>
        </div>

        
      </div>
    </nav>
  )
}
