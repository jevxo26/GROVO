"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

const modes = [
  { href: "/login", label: "Sign in" },
  { href: "/register", label: "Create account" },
] as const

export function AuthModeTabs() {
  const pathname = usePathname()

  return (
    <div className="grid grid-cols-2 gap-1 rounded-lg bg-muted p-1">
      {modes.map(({ href, label }) => {
        const active = pathname === href
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-md px-3 py-1.5 text-center text-sm font-medium transition-colors",
              active
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {label}
          </Link>
        )
      })}
    </div>
  )
}
