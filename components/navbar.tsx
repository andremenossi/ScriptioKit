"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BriefcaseBusiness, User } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import { LoginRegisterDialog } from "@/components/login-register-dialog"
import { HeaderMenu } from "@/components/header-menu"

export function Navbar() {
  const supabase = createClient()
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
      if (event === "SIGNED_IN" || event === "INITIAL_SESSION") {
        setIsLoginDialogOpen(false)
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [supabase])

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-sm dark:bg-gray-800 transition-colors duration-300">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl gradient-blue-text dark:text-white"
            prefetch={false}
          >
            <BriefcaseBusiness className="h-6 w-6 gradient-blue-text dark:text-blue-400" />
            <span>JuridiDocs</span>
          </Link>

          <div className="flex items-center gap-2">
            {!user && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsLoginDialogOpen(true)}
                className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <User className="h-5 w-5 gradient-blue-text dark:text-blue-400" />
                <span className="sr-only">Login/Registro</span>
              </Button>
            )}
            <HeaderMenu user={user} onLoginDialogOpen={() => setIsLoginDialogOpen(true)} />
          </div>
        </div>
      </header>

      <LoginRegisterDialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
        <div />
      </LoginRegisterDialog>
    </>
  )
}
