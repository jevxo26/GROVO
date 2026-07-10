"use client"

import { useEffect, useState } from "react"
import { CheckCircle2, XCircle } from "lucide-react"

import { cn } from "@/lib/utils"

export type ToastState = {
  message: string
  variant: "success" | "error"
} | null

export function useAuthToast() {
  const [toast, setToast] = useState<ToastState>(null)

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 3200)
    return () => clearTimeout(timer)
  }, [toast])

  return { toast, setToast }
}

export function AuthToast({ toast }: { toast: ToastState }) {
  if (!toast) return null

  const Icon = toast.variant === "success" ? CheckCircle2 : XCircle

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <div
        className={cn(
          "animate-in fade-in slide-in-from-bottom-2 flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-medium shadow-lg duration-300",
          toast.variant === "success"
            ? "bg-foreground text-background"
            : "bg-destructive text-white"
        )}
      >
        <Icon className="size-4 shrink-0" />
        {toast.message}
      </div>
    </div>
  )
}
