"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface MultiCategoryFilterProps {
  categories: string[]
  selectedCategories: string[]
  onCategoryToggle: (category: string) => void
  onClearCategories: () => void
  templateCounts: Record<string, number>
}

export function MultiCategoryFilter({
  categories,
  selectedCategories,
  onCategoryToggle,
  onClearCategories,
  templateCounts,
}: MultiCategoryFilterProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Filtrar por Categoria</h3>
        {selectedCategories.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearCategories}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
          >
            <X className="h-4 w-4 mr-1" />
            Limpar filtros
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category)
          return (
            <Button
              key={category}
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryToggle(category)}
              className={`transition-colors ${
                isSelected
                  ? "bg-blue-600 hover:bg-blue-700 text-white border-blue-600"
                  : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-500"
              }`}
            >
              {category}
              <Badge
                variant="secondary"
                className={`ml-2 ${
                  isSelected
                    ? "bg-white/20 text-white border-0"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                }`}
              >
                {templateCounts[category] || 0}
              </Badge>
            </Button>
          )
        })}
      </div>

      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap gap-1">
          <span className="text-sm text-gray-600 dark:text-gray-300 mr-2">Filtros ativos:</span>
          {selectedCategories.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-900/50 border border-blue-200 dark:border-blue-700"
              onClick={() => onCategoryToggle(category)}
            >
              {category}
              <X className="h-3 w-3 ml-1" />
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
