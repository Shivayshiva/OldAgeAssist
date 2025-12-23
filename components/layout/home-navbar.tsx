"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useSession, signOut } from "next-auth/react"

export function HomeNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { status } = useSession()

  return (
    <nav className="relative container mx-auto px-4 py-6">
      <div className="flex justify-between items-center">
        <div className="font-bold text-xl">Old Age Homes Assist</div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-4">
          {status === "authenticated" ? (
            <>
              <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" asChild>
                <Link href="/volunteer">Home</Link>
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
             <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" asChild>
                <Link href="/volunteer">Home</Link>
              </Button>
            <Button variant="secondary" onClick={() => signOut()} className="w-full">
              Sign Out
            </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" className="text-primary-foreground justify-start hover:bg-primary-foreground/10 hover:text-primary-foreground w-full" asChild>
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