"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, BriefcaseBusiness, User } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import { ThemeToggle } from "@/components/theme-toggle"
import { LoginRegisterDialog } from "@/components/login-register-dialog"
import { GlobalSearch } from "@/components/global-search"

export function Navbar() {
  const router = useRouter()
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

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-sk-gray-200 bg-sk-white-DEFAULT/90 backdrop-blur-sm dark:border-sk-gray-600 dark:bg-background/90 transition-colors duration-300">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl"
          prefetch={false}
          style={{ color: "#2A68E1" }}
        >
          <BriefcaseBusiness className="h-6 w-6" style={{ color: "#2A68E1" }} />
          <span>ScriptioKit</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            href="/"
            className="transition-colors text-sk-gray-700 dark:text-sk-gray-300"
            prefetch={false}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#2A68E1")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "")}
          >
            Home
          </Link>
          <Link
            href="/templates"
            className="transition-colors text-sk-gray-700 dark:text-sk-gray-300"
            prefetch={false}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#2A68E1")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "")}
          >
            Templates
          </Link>
          <Link
            href="/sobre"
            className="transition-colors text-sk-gray-700 dark:text-sk-gray-300"
            prefetch={false}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#2A68E1")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "")}
          >
            Sobre
          </Link>
          <Link
            href="/faq"
            className="transition-colors text-sk-gray-700 dark:text-sk-gray-300"
            prefetch={false}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#2A68E1")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "")}
          >
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {/* Pesquisa Global */}
          <GlobalSearch />

          {user ? (
            <>
              <Link
                href="/dashboard"
                className="hidden md:flex transition-colors items-center gap-1"
                prefetch={false}
                style={{ color: "#2A68E1" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#1F52B3")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#2A68E1")}
              >
                <User className="h-4 w-4" /> Área do Cliente
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="hidden md:flex bg-transparent transition-colors"
                style={{ borderColor: "#2A68E1", color: "#2A68E1" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#1F52B3"
                  e.currentTarget.style.borderColor = "#1F52B3"
                  e.currentTarget.style.color = "white"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"
                  e.currentTarget.style.borderColor = "#2A68E1"
                  e.currentTarget.style.color = "#2A68E1"
                }}
              >
                Sair
              </Button>
            </>
          ) : (
            <LoginRegisterDialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex transition-colors"
                style={{ color: "#2A68E1" }}
                onClick={() => setIsLoginDialogOpen(true)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#D4E0FC"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"
                }}
              >
                <User className="h-5 w-5" />
                <span className="sr-only">Login/Registro</span>
              </Button>
            </LoginRegisterDialog>
          )}

          <ThemeToggle />

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden bg-transparent border-sk-gray-200 dark:border-sk-gray-600 transition-colors"
                style={{ color: "#2A68E1" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#D4E0FC"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"
                }}
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-sk-white-DEFAULT dark:bg-background border-sk-gray-200 dark:border-sk-gray-600"
            >
              <div className="flex flex-col gap-6 py-6">
                <Link
                  href="/"
                  className="text-lg font-semibold transition-colors text-sk-gray-700 dark:text-sk-gray-200"
                  prefetch={false}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#2A68E1")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                >
                  Home
                </Link>
                <Link
                  href="/templates"
                  className="text-lg font-semibold transition-colors text-sk-gray-700 dark:text-sk-gray-200"
                  prefetch={false}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#2A68E1")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                >
                  Templates
                </Link>
                <Link
                  href="/sobre"
                  className="text-lg font-semibold transition-colors text-sk-gray-700 dark:text-sk-gray-200"
                  prefetch={false}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#2A68E1")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                >
                  Sobre
                </Link>
                <Link
                  href="/faq"
                  className="text-lg font-semibold transition-colors text-sk-gray-700 dark:text-sk-gray-200"
                  prefetch={false}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#2A68E1")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                >
                  FAQ
                </Link>
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="text-lg font-semibold transition-colors flex items-center gap-1"
                      prefetch={false}
                      style={{ color: "#2A68E1" }}
                    >
                      <User className="h-5 w-5" /> Área do Cliente
                    </Link>
                    <Button
                      variant="outline"
                      onClick={handleSignOut}
                      className="w-full bg-transparent transition-colors"
                      style={{ borderColor: "#2A68E1", color: "#2A68E1" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#1F52B3"
                        e.currentTarget.style.borderColor = "#1F52B3"
                        e.currentTarget.style.color = "white"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent"
                        e.currentTarget.style.borderColor = "#2A68E1"
                        e.currentTarget.style.color = "#2A68E1"
                      }}
                    >
                      Sair
                    </Button>
                  </>
                ) : (
                  <LoginRegisterDialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
                    <Button
                      className="w-full text-white transition-colors"
                      style={{ backgroundColor: "#2A68E1" }}
                      onClick={() => setIsLoginDialogOpen(true)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#1F52B3"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#2A68E1"
                      }}
                    >
                      <User className="h-5 w-5 mr-2" /> Login/Registro
                    </Button>
                  </LoginRegisterDialog>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
