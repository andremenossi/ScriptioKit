"use client"

import Link from "next/link"
import { BriefcaseBusiness } from "lucide-react"
import { GlobalSearch } from "@/components/global-search"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-black text-white py-8 md:py-12 transition-colors duration-300">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl text-white">
              <BriefcaseBusiness className="h-6 w-6 gradient-blue-text-dark" />
              <span>JuridiDocs</span>
            </div>
            <p className="text-gray-300 text-sm">
              Documentos jurídicos prontos para proteger seu negócio. Modelos criados por especialistas para sua
              tranquilidade.
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Links Rápidos</h3>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/templates" className="text-gray-300 hover:text-blue-400 transition-colors" prefetch={false}>
                Templates
              </Link>
              <Link href="/sobre" className="text-gray-300 hover:text-blue-400 transition-colors" prefetch={false}>
                Sobre
              </Link>
              <Link href="/faq" className="text-gray-300 hover:text-blue-400 transition-colors" prefetch={false}>
                FAQ
              </Link>
              <Link href="/contato" className="text-gray-300 hover:text-blue-400 transition-colors" prefetch={false}>
                Contato
              </Link>
            </nav>
          </div>

          {/* Pesquisa e Suporte */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Encontre o que precisa</h3>
            <GlobalSearch
              trigger={
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent thin-border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-blue-400"
                >
                  🔍 Pesquisar templates...
                </Button>
              }
              placeholder="Pesquisar templates, categorias..."
            />
            <div className="text-sm text-gray-400">
              <p>Precisa de ajuda?</p>
              <Link href="/contato" className="text-blue-400 hover:text-blue-300 transition-colors" prefetch={false}>
                Entre em contato conosco
              </Link>
            </div>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t thin-border border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-400">
              &copy; {new Date().getFullYear()} JuridiDocs. Todos os direitos reservados.
            </p>
            <div className="flex gap-4 text-xs">
              <Link
                href="/politica-privacidade"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                prefetch={false}
              >
                Política de Privacidade
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
