"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, X, FileText, HelpCircle, Info, Phone, Home } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface GlobalSearchProps {
  trigger?: React.ReactNode
  placeholder?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

type SearchResult = {
  id: string
  title: string
  description: string
  url: string
  type: "template" | "page" | "faq" | "other"
  category?: string
  isPremium?: boolean
  icon: React.ReactNode
}

export function GlobalSearch({
  trigger,
  placeholder = "Pesquisar em todo o site...",
  open,
  onOpenChange,
}: GlobalSearchProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [internalOpen, setInternalOpen] = useState(false)
  const supabase = createClient()

  const isOpen = open !== undefined ? open : internalOpen
  const setIsOpen = onOpenChange || setInternalOpen

  // Páginas estáticas do site
  const staticPages = [
    {
      id: "home",
      title: "Página Inicial",
      description: "Conheça a ScriptioKit e nossos serviços",
      url: "/",
      type: "page" as const,
      icon: <Home className="h-4 w-4" />,
    },
    {
      id: "about",
      title: "Sobre Nós",
      description: "Conheça mais sobre a ScriptioKit e nossa missão",
      url: "/sobre",
      type: "page" as const,
      icon: <Info className="h-4 w-4" />,
    },
    {
      id: "faq",
      title: "Perguntas Frequentes",
      description: "Respostas para as dúvidas mais comuns",
      url: "/faq",
      type: "faq" as const,
      icon: <HelpCircle className="h-4 w-4" />,
    },
    {
      id: "contact",
      title: "Contato",
      description: "Entre em contato com nossa equipe",
      url: "/contato",
      type: "page" as const,
      icon: <Phone className="h-4 w-4" />,
    },
    {
      id: "templates",
      title: "Templates",
      description: "Explore nossa biblioteca de modelos de documentos",
      url: "/templates",
      type: "page" as const,
      icon: <FileText className="h-4 w-4" />,
    },
    {
      id: "privacy",
      title: "Política de Privacidade",
      description: "Informações sobre como tratamos seus dados",
      url: "/politica-privacidade",
      type: "page" as const,
      icon: <Info className="h-4 w-4" />,
    },
  ]

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const searchSite = async () => {
      setLoading(true)

      // Buscar templates no Supabase
      const { data: templateData, error } = await supabase
        .from("templates")
        .select("*")
        .or(`title.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)
        .limit(5)

      // Buscar páginas estáticas que correspondem à consulta
      const matchingPages = staticPages.filter(
        (page) =>
          page.title.toLowerCase().includes(query.toLowerCase()) ||
          page.description.toLowerCase().includes(query.toLowerCase()),
      )

      // Combinar resultados
      const templateResults: SearchResult[] = (templateData || []).map((template) => ({
        id: template.id,
        title: template.title || "Template sem título",
        description: template.description || "Sem descrição",
        url: `/templates?search=${encodeURIComponent(template.title || "")}`,
        type: "template",
        category: template.category || undefined,
        isPremium: template.is_premium || false,
        icon: <FileText className="h-4 w-4" />,
      }))

      // Ordenar resultados: páginas primeiro, depois templates
      const allResults = [...matchingPages, ...templateResults]

      setResults(allResults)
      setLoading(false)
    }

    const debounceTimer = setTimeout(searchSite, 300)
    return () => clearTimeout(debounceTimer)
  }, [query, supabase])

  const clearSearch = () => {
    setQuery("")
    setResults([])
  }

  const handleResultClick = () => {
    setIsOpen(false)
    clearSearch()
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "template":
        return "Template"
      case "page":
        return "Página"
      case "faq":
        return "FAQ"
      default:
        return "Outro"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Search className="h-5 w-5 gradient-blue-text" />
            <span className="sr-only">Pesquisar</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden p-0 bg-white dark:bg-gray-900 thin-border border-black dark:border-gray-600 shadow-2xl">
        <div className="p-4 border-b thin-border border-black dark:border-gray-600">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="text"
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-10 thin-border border-black dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white focus:border-blue-600 focus:ring-blue-600"
              autoFocus
            />
            {query && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {loading && <div className="p-4 text-center text-gray-500 dark:text-gray-400">Pesquisando...</div>}

          {!loading && query && results.length === 0 && (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              Nenhum resultado encontrado para "{query}"
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="p-2">
              <div className="text-sm text-gray-600 dark:text-gray-400 px-2 py-1 mb-2">
                {results.length} resultado{results.length !== 1 ? "s" : ""} encontrado{results.length !== 1 ? "s" : ""}
              </div>
              {results.map((result) => (
                <Link
                  key={result.id}
                  href={result.url}
                  onClick={handleResultClick}
                  className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1 gradient-blue-text">{result.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-black dark:text-white">{result.title}</h3>
                        <Badge
                          variant="outline"
                          className="ml-2 text-xs thin-border border-gray-400 dark:border-gray-500"
                        >
                          {getTypeLabel(result.type)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">{result.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        {result.category && (
                          <Badge
                            variant="secondary"
                            className="text-xs bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                          >
                            {result.category}
                          </Badge>
                        )}
                        {result.type === "template" && result.isPremium !== undefined && (
                          <Badge
                            variant={result.isPremium ? "default" : "outline"}
                            className={`text-xs ${
                              result.isPremium
                                ? "gradient-blue text-white border-0"
                                : "thin-border border-green-600 text-green-600 dark:text-green-400"
                            }`}
                          >
                            {result.isPremium ? "Premium" : "Gratuito"}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!query && (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              Digite para pesquisar em todo o site...
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
