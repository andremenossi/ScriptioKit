"use client"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { AuthForm } from "@/components/auth-form" // Importação corrigida
import type React from "react"

interface LoginRegisterDialogProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function LoginRegisterDialog({ children, open, onOpenChange }: LoginRegisterDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0 border-none bg-background shadow-lg max-w-md">
        <AuthForm onAuthSuccess={() => onOpenChange?.(false)} />
      </DialogContent>
    </Dialog>
  )
}
