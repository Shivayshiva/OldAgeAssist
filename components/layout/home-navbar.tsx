"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useSession, signOut } from "next-auth/react"
import Image from "next/image"

export function HomeNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session, status } = useSession()

  // Determine home route based on user role
  const getHomeRoute = () => {
    if (!session?.user) return "/"
    
    const userRole = session.user.role || session.user.userType
    
    switch (userRole) {
      case "superadmin":
        return "/superadmin"
      case "volunteer":
        return "/volunteer"
      case "donor":
        return "/donors"
      default:
        return "/"
    }
  }

  const homeRoute = getHomeRoute()

  return (
    <nav className="relative container mx-auto px-4 py-6">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
        <Image src="/sirsafoundation.png" alt="Sirsa Foundation Logo" width={120} height={120} className="rounded-xl shadow-lg border border-primary/20" />
        <div className="font-bold animate-fade-in-up">
          <h1
            className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-lg transition-all duration-700 text-primary/90"
            style={{ fontFamily: 'Merriweather, serif', letterSpacing: '0.04em' }}
          >
            SIRSA Foundation
          </h1>
          <p
            className="text-lg md:text-xl font-semibold italic animate-fade-in-up delay-200 text-fuchsia-200 drop-shadow-sm"
            style={{ fontFamily: 'Lato, sans-serif', letterSpacing: '0.02em' }}
          >
            Empowering Communities, Changing Lives
          </p>
        </div>
        </div>

   
        <div className="hidden md:flex gap-4">
          {status === "authenticated" ? (
            <>
              <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" asChild>
                <Link href={homeRoute}>Home</Link>
              </Button>
              <Button variant="secondary" onClick={() => signOut()}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/register">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors text-primary-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 bg-primary border-t border-primary-foreground/10 p-4 md:hidden flex flex-col gap-4 shadow-lg rounded-b-lg">
           {status === "authenticated" ? (
            <>
             <Button variant="default"  asChild>
                <Link href={homeRoute}>Home</Link>
              </Button>
            <Button variant="secondary" onClick={() => signOut()} className="w-full">
              Sign Out
            </Button>
            </>
          ) : (
            <>
              <Button variant="secondary" className="text-primary-foreground justify-start hover:bg-primary-foreground/10 hover:text-primary-foreground w-full" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button variant="secondary" className="w-full" asChild>
                <Link href="/register">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      )}
    </nav>
  )
}