"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Search, Sun, Moon, ShoppingCart, LogOut, Menu } from "lucide-react"
import { useTheme } from "next-themes"
import { GlobalSearch } from "@/components/global-search"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import Link from "next/link"

interface HeaderMenuProps {
  user: SupabaseUser | null
  onLoginDialogOpen: () => void
}

export function HeaderMenu({ user, onLoginDialogOpen }: HeaderMenuProps) {
  const { setTheme, theme } = useTheme()
  const [searchOpen, setSearchOpen] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Menu className="h-5 w-5 gradient-blue-text dark:gradient-blue-text-dark" />
            <span className="sr-only">Menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 bg-white dark:bg-gray-800 thin-border border-black dark:border-gray-600 dropdown-slide-from-header shadow-2xl text-black dark:text-white"
          style={{
            borderTopLeftRadius: "0",
            borderTopRightRadius: "0",
            borderTop: "none",
            marginTop: "0",
          }}
        >
          <DropdownMenuItem
            onClick={() => setSearchOpen(true)}
            className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
          >
            <Search className="h-4 w-4 mr-2 gradient-blue-text dark:gradient-blue-text-dark" />
            Pesquisar
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href="/carrinho"
              className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
            >
              <ShoppingCart className="h-4 w-4 mr-2 gradient-blue-text dark:gradient-blue-text-dark" />
              Carrinho
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />

          {user && (
            <>
              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard"
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                >
                  <span className="h-4 w-4 mr-2 gradient-blue-text dark:gradient-blue-text-dark">👤</span>
                  Área do Cliente
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleSignOut}
                className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2 text-red-600" />
                Sair
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
            </>
          )}

          <DropdownMenuItem
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
          >
            {theme === "dark" ? (
              <>
                <Sun className="h-4 w-4 mr-2 gradient-blue-text dark:gradient-blue-text-dark" />
                Tema Claro
              </>
            ) : (
              <>
                <Moon className="h-4 w-4 mr-2 gradient-blue-text dark:gradient-blue-text-dark" />
                Tema Escuro
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <GlobalSearch trigger={<div />} open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}
