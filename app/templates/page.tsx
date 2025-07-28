"use client"

import { useState, useEffect, useMemo } from "react"
import { createClient } from "@/lib/supabase/client"
import { TemplateCard } from "@/components/template-card"
import { SearchBar } from "@/components/search-bar"
import { MultiCategoryFilter } from "@/components/multi-category-filter"
import { PremiumFilter } from "@/components/premium-filter"
import type { Tables } from "@/lib/database.types"
import { Loader2, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Tables<"templates">[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<("free" | "premium")[]>([])
  const supabase = createClient()

  useEffect(() => {
    const fetchTemplates = async () => {
      const { data, error } = await supabase.from("templates").select("*").order("title")

      if (error) {
        console.error("Error fetching templates:", error)
      } else {
        setTemplates(data || [])
      }
      setLoading(false)
    }

    fetchTemplates()
  }, [supabase])

  // Filtrar templates baseado na pesquisa, categoria e tipo
  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const matchesSearch =
        template.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.category?.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory =
        selectedCategories.length === 0 || (template.category && selectedCategories.includes(template.category))

      const matchesType =
        selectedTypes.length === 0 ||
        (selectedTypes.includes("free") && !template.is_premium) ||
        (selectedTypes.includes("premium") && template.is_premium)

      return matchesSearch && matchesCategory && matchesType
    })
  }, [templates, searchQuery, selectedCategories, selectedTypes])

  // Obter categorias únicas e contar templates por categoria
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(templates.map((t) => t.category).filter(Boolean))] as string[]
    return uniqueCategories.sort()
  }, [templates])

  const templateCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    templates.forEach((template) => {
      if (template.category) {
        counts[template.category] = (counts[template.category] || 0) + 1
      }
    })
    return counts
  }, [templates])

  const freeCounts = useMemo(() => {
    return {
      free: templates.filter((t) => !t.is_premium).length,
      premium: templates.filter((t) => t.is_premium).length,
    }
  }, [templates])

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleTypeToggle = (type: "free" | "premium") => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedTypes([])
    setSearchQuery("")
  }

  const activeFiltersCount = selectedCategories.length + selectedTypes.length + (searchQuery ? 1 : 0)

  if (loading) {
    return (
      <div className="container py-12 md:py-24 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-sk-blue-DEFAULT" />
        <span className="ml-2 text-sk-gray-600 dark:text-sk-gray-400">Carregando templates...</span>
      </div>
    )
  }

  const FiltersContent = () => (
    <div className="space-y-6">
      <MultiCategoryFilter
        categories={categories}
        selectedCategories={selectedCategories}
        onCategoryToggle={handleCategoryToggle}
        onClearCategories={() => setSelectedCategories([])}
        templateCounts={templateCounts}
      />

      <PremiumFilter selectedTypes={selectedTypes} onTypeToggle={handleTypeToggle} freeCounts={freeCounts} />

      {activeFiltersCount > 0 && (
        <Button
          variant="outline"
          onClick={clearAllFilters}
          className="w-full border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 bg-white dark:bg-gray-800"
        >
          Limpar todos os filtros ({activeFiltersCount})
        </Button>
      )}
    </div>
  )

  return (
    <div className="container py-12 md:py-24">
      {/* Cabeçalho */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: "#2A68E1" }}>
          Nossos Modelos de Documentos
        </h1>
        <p className="text-sk-gray-600 dark:text-sk-gray-300 max-w-2xl mx-auto mb-8">
          Explore nossa vasta biblioteca de modelos de contratos e documentos jurídicos. Use a pesquisa e filtros para
          encontrar exatamente o que você precisa.
        </p>

        {/* Barra de Pesquisa */}
        <div className="max-w-md mx-auto mb-8">
          <SearchBar onSearch={setSearchQuery} placeholder="Pesquisar por título, descrição ou categoria..." />
        </div>
      </div>

      <div className="flex gap-8">
        {/* Filtros Desktop */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <div className="sticky top-24 bg-sk-white-DEFAULT dark:bg-card border border-sk-gray-200 dark:border-sk-gray-700 rounded-lg p-6">
            <FiltersContent />
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="flex-1">
          {/* Filtros Mobile */}
          <div className="lg:hidden mb-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 bg-white dark:bg-gray-800"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                  {activeFiltersCount > 0 && (
                    <span className="ml-2 bg-blue-600 text-white rounded-full px-2 py-1 text-xs">
                      {activeFiltersCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filtros</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FiltersContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Resultados */}
          <div className="mb-6">
            <p className="text-sm text-sk-gray-600 dark:text-sk-gray-400">
              {filteredTemplates.length === 0
                ? "Nenhum template encontrado com os filtros aplicados."
                : `${filteredTemplates.length} template${filteredTemplates.length !== 1 ? "s" : ""} encontrado${filteredTemplates.length !== 1 ? "s" : ""}`}
              {searchQuery && <span> para "{searchQuery}"</span>}
              {selectedCategories.length > 0 && <span> nas categorias: {selectedCategories.join(", ")}</span>}
              {selectedTypes.length > 0 && <span> • Tipo: {selectedTypes.join(", ")}</span>}
            </p>
          </div>

          {/* Grid de Templates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTemplates.map((template, index) => (
              <TemplateCard key={template.id} template={template} style={{ animationDelay: `${index * 0.05}s` }} />
            ))}
          </div>

          {/* Mensagem quando não há resultados */}
          {filteredTemplates.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2 text-sk-gray-800 dark:text-sk-gray-200">
                Nenhum template encontrado
              </h3>
              <p className="text-sk-gray-600 dark:text-sk-gray-400 mb-4">
                Tente ajustar sua pesquisa ou filtros para encontrar o que procura.
              </p>
              {activeFiltersCount > 0 && (
                <Button onClick={clearAllFilters} className="bg-sk-blue-DEFAULT hover:bg-sk-blue-DEFAULT/90 text-white">
                  Limpar todos os filtros
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
