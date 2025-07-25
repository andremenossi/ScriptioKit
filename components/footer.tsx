"use client"

import Link from "next/link"
import { BriefcaseBusiness } from "lucide-react"
import { GlobalSearch } from "@/components/global-search"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-sk-gray-900 dark:bg-sk-gray-950 text-sk-white-DEFAULT py-8 md:py-12 border-t border-sk-gray-700 dark:border-sk-gray-800 transition-colors duration-300">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl text-sk-white-DEFAULT">
              <BriefcaseBusiness className="h-6 w-6" style={{ color: "#2A68E1" }} />
              <span>ScriptioKit</span>
            </div>
            <p className="text-sk-gray-300 text-sm">
              Documentos jurídicos prontos para proteger seu negócio. Modelos criados por especialistas para sua
              tranquilidade.
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sk-white-DEFAULT">Links Rápidos</h3>
            <nav className="flex flex-col gap-2 text-sm">
              <Link
                href="/templates"
                className="text-sk-gray-300 hover:text-white transition-colors"
                prefetch={false}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#2A68E1")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "")}
              >
                Templates
              </Link>
              <Link
                href="/sobre"
                className="text-sk-gray-300 hover:text-white transition-colors"
                prefetch={false}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#2A68E1")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "")}
              >
                Sobre
              </Link>
              <Link
                href="/faq"
                className="text-sk-gray-300 hover:text-white transition-colors"
                prefetch={false}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#2A68E1")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "")}
              >
                FAQ
              </Link>
              <Link
                href="/contato"
                className="text-sk-gray-300 hover:text-white transition-colors"
                prefetch={false}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#2A68E1")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "")}
              >
                Contato
              </Link>
            </nav>
          </div>

          {/* Pesquisa e Suporte */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sk-white-DEFAULT">Encontre o que precisa</h3>
            <GlobalSearch
              trigger={
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent border-sk-gray-600 text-sk-gray-300 hover:bg-sk-gray-800 hover:text-white hover:border-sk-blue-DEFAULT"
                >
                  🔍 Pesquisar templates...
                </Button>
              }
              placeholder="Pesquisar templates, categorias..."
            />
            <div className="text-sm text-sk-gray-400">
              <p>Precisa de ajuda?</p>
              <Link
                href="/contato"
                className="text-sk-blue-DEFAULT hover:text-sk-blue-300 transition-colors"
                prefetch={false}
              >
                Entre em contato conosco
              </Link>
            </div>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t border-sk-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-sk-gray-400">
              &copy; {new Date().getFullYear()} ScriptioKit. Todos os direitos reservados.
            </p>
            <div className="flex gap-4 text-xs">
              <Link
                href="/politica-privacidade"
                className="text-sk-gray-400 hover:text-sk-blue-DEFAULT transition-colors"
                prefetch={false}
              >
                Política de Privacidade
              </Link>
              <Link
                href="/termos-uso"
                className="text-sk-gray-400 hover:text-sk-blue-DEFAULT transition-colors"
                prefetch={false}
              >
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
