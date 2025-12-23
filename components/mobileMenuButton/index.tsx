"use client"
import Link from "next/link"
import { Heart, Users, Newspaper, Menu, X } from "lucide-react"
import { useState } from "react"

interface MobileMenuButtonProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

  const navItems = [
    { href: "/", label: "Feed", icon: Newspaper },
    { href: "/opportunities", label: "Opportunities", icon: Heart },
    { href: "/register", label: "Register", icon: Users },
  ]

export function MobileMenuButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>    <button
      className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
      onClick={() => setIsOpen(!isOpen)}
    >
      {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
    </button>
    {isOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-foreground hover:bg-secondary transition-colors w-full"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        </>

  )
}