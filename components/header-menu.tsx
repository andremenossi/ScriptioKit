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
import {
  Search,
  Sun,
  Moon,
  ShoppingCart,
  LogOut,
  Menu,
  Home,
  FileText,
  Info,
  HelpCircle,
  Phone,
  User,
} from "lucide-react"
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
          {/* Navegação Principal - apenas visível no mobile */}
          <div className="md:hidden">
            <DropdownMenuItem asChild>
              <Link href="/" className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                <Home className="h-4 w-4 mr-2 gradient-blue-text dark:gradient-blue-text-dark" />
                Home
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link
                href="/templates"
                className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
              >
                <FileText className="h-4 w-4 mr-2 gradient-blue-text dark:gradient-blue-text-dark" />
                Templates
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="/sobre" className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                <Info className="h-4 w-4 mr-2 gradient-blue-text dark:gradient-blue-text-dark" />
                Sobre
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="/faq" className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                <HelpCircle className="h-4 w-4 mr-2 gradient-blue-text dark:gradient-blue-text-dark" />
                FAQ
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link
                href="/contato"
                className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
              >
                <Phone className="h-4 w-4 mr-2 gradient-blue-text dark:gradient-blue-text-dark" />
                Contato
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* Ferramentas - sempre visível */}
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

          {/* Área do usuário - comportamento diferente para mobile/desktop */}
          {user ? (
            <>
              {/* No mobile, mostrar "Área do Cliente" */}
              <div className="md:hidden">
                <DropdownMenuItem asChild>
                  <Link
                    href="/dashboard"
                    className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                  >
                    <User className="h-4 w-4 mr-2 gradient-blue-text dark:gradient-blue-text-dark" />
                    Área do Cliente
                  </Link>
                </DropdownMenuItem>
              </div>

              {/* Sair - sempre visível quando logado */}
              <DropdownMenuItem
                onClick={handleSignOut}
                className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2 text-red-600" />
                Sair
              </DropdownMenuItem>
            </>
          ) : (
            /* Login - apenas no mobile (no desktop está fixo no header) */
            <div className="md:hidden">
              <DropdownMenuItem
                onClick={onLoginDialogOpen}
                className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
              >
                <User className="h-4 w-4 mr-2 gradient-blue-text dark:gradient-blue-text-dark" />
                Login / Registro
              </DropdownMenuItem>
            </div>
          )}

          <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />

          {/* Configurações - sempre visível */}
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
